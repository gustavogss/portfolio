import Header from "./components/header";
import Profile from "./components/profile-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#212121] ">
      <Header />
      <div className="container mx-auto mt-24 py-4 px-12">
        <Profile />
      </div>
    </main>
  );
}
