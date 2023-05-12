import { Post } from "@utils/types";
import PromptCard from "./PromptCard";

interface PromptCardListProps {
  posts: Post[];
  handleTagClick?: (tag: string) => void;
}

const PromptCardList: React.FC<PromptCardListProps> = ({
  posts,
  handleTagClick,
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {posts.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default PromptCardList;
