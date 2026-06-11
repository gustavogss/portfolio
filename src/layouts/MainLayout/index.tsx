import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Section } from "@/types/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

export default function MainLayout({
  children,
  activeSection,
  setActiveSection,
}: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div
      className="flex min-h-screen bg-[#030712] pb-16 md:pb-0"
      id="dashboard-root"
    >
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <main
        className={`flex-grow transition-all duration-300 ${isSidebarOpen ? "md:ml-72" : "md:ml-20"} p-6 lg:p-10`}
        id="main-content"
      >
        <div className="max-w-6xl mx-auto space-y-12">
          {children}
        </div>
      </main>
    </div>
  );
}
