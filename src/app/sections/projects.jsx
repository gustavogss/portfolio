"use client";

import React, { useState, useRef } from "react";

import { motion, useInView } from "framer-motion";
import ProjectTag from "../components/project-tag";
import ProjectCard from "../components/project-card";

const data = [
  {
    id: 1,
    title: "shopdev",
    description: "Landpage do tipo ecommerce - HTML e CSS",
    image: "/assets/projects/1.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/gustavogss/shopdev",
  },
  {
    id: 2,
    title: "trivia",
    description: "Aplicação tipo Quiz de perguntas e respostas - React e Redux",
    image: "/assets/projects/2.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/gustavogss/trivia",
  },
  {
    id: 3,
    title: "E-commerce Application",
    description: "Project 3 description",
    image: "/assets/projects/3.png",
    tag: ["All", "Web"],
    gitUrl: "/",
  },
  {
    id: 4,
    title: "recipeApp",
    description: "Aplicativos de receitas  - React Native",
    image: "/assets/projects/7.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/gustavogss/recipe-app",
  },
  {
    id: 5,
    title: "myfit",
    description:
      "Aplicativo para calculo de quantidade de calorias consumidas - React Native e Typescript",
    image: "/assets/projects/4.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/gustavogss/myfit",
  },
  {
    id: 6,
    title: "todolist",
    description: "Aplicativo do tipo todolist - Android e Kotlin",
    image: "/assets/projects/8.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/gustavogss/todolist",
  },
];

export default function Projects() {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = data.filter((project) => project.tag.includes(tag));

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section className="mt-4 pt-16 border-t border-[#121212]" id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        Meus Projetos
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="Todos"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
