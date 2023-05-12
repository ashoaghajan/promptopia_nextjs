"use client";

import { ChangeEvent, useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";
import axios from "axios";
import { Post } from "@utils/types";

interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("/api/prompt")
      .then(({ data }) => {
        setPosts(data);
        setFilteredPosts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filteredData = posts.filter(({ creator, prompt, tag }) => {
      const str = (tag + prompt + creator.email + creator.username)
        .replace(" ", "")
        .trim()
        .toLowerCase();
      return str.includes(searchText.replace(" ", "").trim().toLowerCase());
    });
    setFilteredPosts(filteredData);
  }, [searchText, posts]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);
  };

  const handleTagClick = (tag: string) => setSearchText(tag);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          className="search_input peer"
          required
          value={searchText}
          onChange={handleSearch}
        />
      </form>
      <PromptCardList posts={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
