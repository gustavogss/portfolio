import React, { Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";

import MainLayout from "@/layouts/MainLayout";
import { useNavigation } from "@/hooks/useNavigation";

const HomeSection = React.lazy(() => import("@/sections/Home"));
const ProjectsSection = React.lazy(() => import("@/sections/Projects"));
const TechSection = React.lazy(() => import("@/sections/Tech"));
const ExperienceSection = React.lazy(() => import("@/sections/Experience"));
const EducationSection = React.lazy(() => import("@/sections/Education"));
const CertificationsSection = React.lazy(() => import("@/sections/Certifications"));
const BlogSection = React.lazy(() => import("@/sections/Blog"));

export default function App() {
  const {
    activeSection,
    setActiveSection,
    activePostId,
    setActivePostId,
  } = useNavigation();

  return (
    <MainLayout
      activeSection={activeSection}
      setActiveSection={setActiveSection}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Suspense
            fallback={
              <div className="flex justify-center items-center p-20 min-h-[50vh]">
                <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            }
          >
            {activeSection === "home" && <HomeSection />}

            {activeSection === "projects" && <ProjectsSection />}

            {activeSection === "tech" && <TechSection />}

            {activeSection === "experience" && <ExperienceSection />}

            {activeSection === "education" && <EducationSection />}

            {activeSection === "certifications" && (
              <CertificationsSection />
            )}

            {activeSection === "blog" && (
              <BlogSection
                activePostId={activePostId}
                setActivePostId={setActivePostId}
              />
            )}
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
}