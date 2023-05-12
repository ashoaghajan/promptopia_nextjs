export type PromptToPost = {
  userId: string;
  prompt: string;
  tag: string;
};

export type User = {
  email: string;
  image: string;
  username: string;
  _id: string;
};

export type Post = {
  _id: string;
  prompt: string;
  tag: string;
  creator: User;
};

export type GetUserPostsParams = {
  id: string;
};

export type DeleteUserPostsParam = {
  id: string;
};
