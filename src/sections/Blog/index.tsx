import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { BLOG_POSTS } from "@/constants";
import { BlogPostSection } from "@/components/BlogPostSection";

export default function BlogSection({
  activePostId,
  setActivePostId,
}: {
  activePostId: string | null;
  setActivePostId: (id: string | null) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  if (activePostId) {
    return (
      <BlogPostSection
        postId={activePostId}
        onBack={() => setActivePostId(null)}
      />
    );
  }

  const categoriesRaw = Array.from(
    new Set(BLOG_POSTS.map((post) => post.category)),
  );
  categoriesRaw.sort((a, b) => {
    const aHasPublished = BLOG_POSTS.some(
      (p) => p.category === a && p.date !== "Em breve",
    );
    const bHasPublished = BLOG_POSTS.some(
      (p) => p.category === b && p.date !== "Em breve",
    );
    if (aHasPublished && !bHasPublished) return -1;
    if (!aHasPublished && bHasPublished) return 1;
    return 0;
  });
  
  const categories = ["Todos", ...categoriesRaw];
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredPosts =
    activeCategory === "Todos"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory);

  return (
    <div className="space-y-8" id="blog-section">
      <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between text-center md:text-left gap-4 md:gap-0">
        <div>
          <h2 className="text-3xl font-bold text-white">Blog & Insights</h2>
          <p className="text-slate-400 mt-1">
            Pensamentos sobre tecnologia, segurança e futuro.
          </p>
        </div>
      </div>

      <div
        className="flex flex-wrap justify-center md:justify-start gap-2 mb-6"
        id="blog-categories"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
              activeCategory === category
                ? "bg-brand-primary text-white border-brand-primary"
                : "bg-slate-800/50 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        id="blog-grid"
      >
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} onReadPost={setActivePostId} />
        ))}
      </div>
    </div>
  );
}

const BlogCard: React.FC<{ post: any; onReadPost: (id: string) => void }> = ({
  post,
  onReadPost,
}) => {
  return (
    <motion.div
      id={`blog-card-${post.id}`}
      className="flex justify-center h-full"
      whileHover={{ y: -10, scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="glass-morphism rounded-3xl overflow-hidden h-full flex flex-col group w-full max-w-[380px] md:max-w-none hover:border-brand-primary/30 transition-all shadow-lg hover:shadow-2xl hover:shadow-brand-primary/20">
        <div className="h-48 overflow-hidden relative">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-sm text-slate-300 text-[10px] font-bold uppercase rounded-lg">
              {post.date}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-brand-primary/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase rounded-lg">
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col items-center md:items-start text-center md:text-left flex-grow w-full">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-brand-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
            {post.summary}
          </p>
          <button
            onClick={() => onReadPost(post.id)}
            className="flex items-center gap-2 text-white font-bold text-sm bg-slate-800 hover:bg-brand-primary transition-colors w-full justify-center py-3 rounded-xl border border-slate-700"
          >
            Ler mais
          </button>
        </div>
      </div>
    </motion.div>
  );
};
