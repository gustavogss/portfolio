"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./tab-button";

const TAB_DATA = [
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2 ">
        <li className="mb-2">
          Tecnólogo em Processamento de Dados em 1999 (ASPER - João Pessoa)
        </li>
        <li className="mb-2">
          Pós-graduação em Desenvolvimento de Sistemas Móveis e Embarcados em
          2014 (Estácio de Sá - João Pessoa)
        </li>
        <li>
          Técnico em Desenvolvimento Web Full Stack em 2022 (Trybe - Remoto)
        </li>
      </ul>
    ),
  },
  {
    title: "Courses",
    id: "courses",
    content: (
      <ul className="list-disc pl-2 ">
        <li className="mb-2">
          Aceleração Java - em formação (Trybe - Assíncrono)
        </li>
        <li className="mb-2">
          Programa Hackers do Bem - em formação (Gov.br e RNP - Assíncrono)
        </li>
        <li>Bootcamp Ignite - em formação (Rocketseat - Assíncrono)</li>
      </ul>
    ),
  },
  {
    title: "Experience",
    id: "experience",
    content: (
      <ul className="list-disc pl-2">
        <li className="mb-2">
          Estágio de Analista de TI no (Projeto Cooperar) - Março de 1998 a
          Outubro de 1998.
        </li>
        <li className="mb-2">
          Participei da modelagem e desenvolvimento do Sistema FROTA de controle
          de veículos do Projeto Cooperar, implementado em Delphi e SQL.
          Colaborei na depuração do projeto, refatoração do código e apontei
          sugestões pontuais na interface da aplicação.
        </li>
        <li className="mb-2">
          Desenvolvedor Magento2 na empresa Way Ecommerce em João Pessoa
          (Freelance) – Outubro de 2020 a Março de 2021.
        </li>
        <li className="mb-2">
          Implementação do site da empresa TB Maquinas e Equipamentos - Agosto
          de 2023 (Freelance - Remoto).
        </li>
        <li className="mb-2">
          Desenvolvedor Web (Freelancer) para a Agência Diastec (João Pessoa)
          desenvolvendo sites institucionais e landpages – Agosto de 2021 a
          Abril de 2024
        </li>
      </ul>
    ),
  },
  {
    title: "Skills",
    id: "skills",
    content: (
      <div className="flex flex-row gap-12">
        <ul className="list-disc pl-2">
          {" "}
          <span className="font-bold">Front-end</span>
          <li>React</li>
          <li>Next</li>
          <li>Typescript</li>
          <li>Material UI</li>
          <li>Tailwind</li>
          <li>Bootstrap</li>
        </ul>
        <ul className="list-disc pl-2 ">
          <span className="font-bold">Back-end</span>
          <li>Nodejs</li>
          <li>Java</li>
          <li>Express</li>
          <li>SQL</li>
          <li>Mysql</li>
          <li>PostgreSQL</li>
          <li>Prisma ORM</li>
          <li>Docker</li>
        </ul>
        <ul className="list-disc pl-2 ">
          <span className="font-bold"> Mobile </span>
          <li>Android</li>
          <li>React Native</li>
          <li>Flutter</li>
        </ul>
        <ul className="list-disc pl-2 ">
          <span className="font-bold"> Outras </span>
          <li>Linux</li>
          <li>Git</li>
          <li>Git Flow</li>
          <li>Magento2</li>
          <li>Scrum, Kaban</li>
          <li>Pentests</li>
        </ul>
      </div>
    ),
  },
];

export default function AboutSection() {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white mt-16 border-t border-[#121212]" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/assets/banner.png" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">Sobre mim</h2>
          <p className="text-base text-justify lg:text-lg">
            Sou um Desenvolvedor de Software apaixonado por criar aplicações
            inovadoras e interativas. Já tive experiências também com
            Infraestrutura e aplicações Desktop. Tenho senso de time, aprendo
            rápido e estou sempre buscando expandir meus conhecimentos e
            habilidades
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              FORMAÇÃO{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("courses")}
              active={tab === "courses"}
            >
              {" "}
              CURSOS{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("experience")}
              active={tab === "experience"}
            >
              {" "}
              EXPERIÊNCIAS{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              HABILIDADES{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
}
