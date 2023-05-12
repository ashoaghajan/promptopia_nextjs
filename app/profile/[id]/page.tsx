"use client";

import Profile from "@components/Profile";
import { Post } from "@utils/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface MyProfiledProps {
  params: { id: string };
}

const MyProfile: React.FC<MyProfiledProps> = ({ params }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: session } = useSession() as any;
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  useEffect(() => {
    if (session?.user?.id) {
      axios
        .get(`/api/users/${params.id}/posts`)
        .then(({ data }) => setPosts(data))
        .catch((err) => console.log(err));
    }
  }, [params.id, session?.user?.id]);

  return (
    <Profile
      name={userName || ""}
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={posts}
    />
  );
};

export default MyProfile;
