import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req: Request) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch all prompt", { status: 500 });
  }
};
