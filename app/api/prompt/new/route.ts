import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { PromptToPost } from "@utils/types";

export const POST = async (req: Request) => {
  const { userId, prompt, tag } = (await req.json()) as PromptToPost;
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
