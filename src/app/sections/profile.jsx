"use client";

import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

export default function ProfileSection() {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-12 mt-8">
        <div className="col-span-7 place-self-center text-center sm:text-left">
          <h1 className="text-slate-100 mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            Olá, sou {""}
            <span className="text-[#751996]">
              <TypeAnimation
                sequence={[
                  "Web Full Stack Developer",
                  3000,
                  "Mobile Developer",
                  4000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            </span>
          </h1>
          <p className="text-white text-lg text-justify lg:text-xl mb-6">
            Transformo a sua ideia em realidade: desenvolvo soluções web e
            mobile, utilizando as boas práticas em metodologias ágeis, com
            design único.{" "}
          </p>
          <div className="">
            <Link
              href={"https://wa.me/558398015475"}
              alt="What's app"
              target="_blank"
            >
              <button className="px-6 py-3 w:full sm:w-fit rounded-full mr-4 bg-[#751996] hover:bg-[#B319DA] text-white">
                Contrate-me
              </button>
            </Link>
            <Link
              href={"https://gustavosouza.dev.br/curriculum-vitae.pdf"}
              alt="Curriculum"
              target="_blank"
            >
              <button className="px-6 py-3 w:full sm:w-fit rounded-full bg-transparent  hover:bg-[#B319DA] hover:bg-[#B319DA] text-white hover:text-white border border-white hover:border-[#212121] mt-3">
                Download CV
              </button>
            </Link>
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
