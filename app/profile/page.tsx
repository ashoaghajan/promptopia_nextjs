"use client";

import Profile from "@components/Profile";
import { Post } from "@utils/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: session } = useSession() as any;
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.id) {
      axios
        .get(`/api/users/${session.user.id}/posts`)
        .then(({ data }) => setPosts(data))
        .catch((err) => console.log(err));
    }
  }, [session.user.id]);

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this prompt?");
    if (confirmed) {
      try {
        await axios.delete(`/api/prompt/${id}`);
        setPosts((prev) => prev.filter((post) => post._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
