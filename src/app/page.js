import Profile from "./components/profile-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#212121] ">
      <div className="container mx-auto py-4 px-12">
        <Profile />
      </div>
    </main>
  );
}
