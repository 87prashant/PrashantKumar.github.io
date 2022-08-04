import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import React from "react";
import { compareDesc } from "date-fns";
import { allPosts } from "contentlayer/generated";
import PostCard from "../components/PostCard";
import type { Post } from "contentlayer/generated";
import Intro from "../components/Intro";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export async function getStaticProps() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return { props: { posts } };
}

interface Props {
  key: number;
  posts: Post[];
}

export default function Home({ posts }: Props) {
  return (
    <>
      <Header />
      <Main>
        <Intro />
        <div className="flex mb-4 items-center">
          <h1 className="text-lg font-bold">Posts</h1>
          <div className="flex ml-auto font-bold transition-all duration-200 bg-zinc-200 hover:bg-zinc-300 rounded-lg text-black cursor-pointer p-2">
            <Link href="/Post">
              <div className="flex">
                Show All
                <div className="flex items-center justify-center ml-3">
                  <ArrowForwardIcon />
                </div>
              </div>
            </Link>
          </div>
        </div>
        {posts.slice(0, 2).map((post, idx) => (
          <PostCard key={idx} post={post} />
        ))}
      </Main>
      <Footer />
    </>
  );
}
