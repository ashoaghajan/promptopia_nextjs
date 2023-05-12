"use client";

import Form from "@components/Form";
import { Post } from "@utils/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface UpdatePromptProps {}

const UpdatePrompt: React.FC<UpdatePromptProps> = () => {
  const router = useRouter();
  const { data: session }: any = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    promptId &&
      axios
        .get(`api/prompt/${promptId}`)
        .then(({ data }: { data: Post }) => {
          setPost({ prompt: data.prompt, tag: data.tag });
        })
        .catch((err) => console.log(err));
  }, [promptId]);

  const updatePrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!promptId) {
      console.log("Missing prompt id");
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await axios.patch(`/api/prompt/${promptId}`, {
        prompt: post.prompt,
        userId: session?.user?.id,
        tag: post.tag,
      });
      data && router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
