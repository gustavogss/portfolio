"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export default function ProfileSection() {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-7 place-self-center text-center sm:text-left">
          <h1 className="text-slate-100 mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            Olá, Eu sou {""}
            <span className="text-[#751996]">
              <br></br>
              <TypeAnimation
                sequence={[
                  "Gustavo Souza", // Types 'One'
                  3000, // Waits 1s
                  "Web Full Stack Developer", // Deletes 'One' and types 'Two'
                  3000, // Waits 2s
                  "Mobile Developer", // Types 'Three' without deleting 'Two'
                  4000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            </span>
          </h1>
          <p className="text-slate-200 text-lg lg:text-xl mb-6">
            Entusiasta em tecnologia, gosto de aprender e colaborar. Implemento
            soluções Web como Mobile, utilizando as boas práticas em
            metodologias ágeis, com a finalidade de um desenvolvimento mais
            produtivo e seguro.
          </p>
          <div className="">
            <button className="px-6 py-3 w:full sm:w-fit rounded-full mr-4 bg-[#751996] hover:bg-[#B319DA] text-white">
              Contrate-me
            </button>
            <button className="px-6 py-3 w:full sm:w-fit rounded-full bg-transparent  hover:bg-[#B319DA] hover:bg-slate-800 text-white hover:text-[#212121] border border-white hover:border-[#212121] mt-3">
              Download CV
            </button>
          </div>
        </div>
        <div className="col-span-5 place-self-center mt-4 lg:mt-0">
          <div className="rounded-full bg-[#252525] w-[250px] h-[250px] relative">
            <Image
              src="/assets/foto.png"
              alt="foto de gustavo"
              width={300}
              height={300}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
