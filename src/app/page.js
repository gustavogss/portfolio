import About from "./sections/about";
import Header from "./components/header";
import Profile from "./sections/profile";
import Projects from "./sections/projects";
import Email from "./sections/email";
import Footer from "./sections/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#212121] ">
      <Header />
      <div className="container mx-auto mt-24 py-4 px-12">
        <Profile />
        <About />
        <Projects />
        <Email />
      </div>
      <Footer />
    </main>
  );
}
