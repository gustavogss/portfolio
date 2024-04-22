"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "../components/tab-button";

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
          <li>React, Next</li>
          <li>Node, Java</li>
          <li>Typescript</li>
          <li>MySQL, SQL, Firebase, Prisma ORM</li>
          <li>Jest, RTL</li>
          <li>Android, React Native</li>
          <li>Tailwind, Styled Components, Material UI</li>
          <li>Arquitetura: MSC, MVC</li>
          <li>Scrum, Kanban</li>
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
              Formação{" "}
            </TabButton>

            <TabButton
              selectTab={() => handleTabChange("experience")}
              active={tab === "experience"}
            >
              {" "}
              Experiência{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Habilidades{" "}
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
