import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { PROJECTS, TECH_CATEGORIES, BLOG_POSTS, EXPERIENCES, EDUCATION, CERTIFICATIONS, COURSES } from '../constants';

export function usePortfolioData() {
  const [data, setData] = useState({
    projects: PROJECTS,
    techCategories: TECH_CATEGORIES,
    blogPosts: BLOG_POSTS,
    experiences: EXPERIENCES,
    education: EDUCATION,
    certifications: CERTIFICATIONS,
    courses: COURSES,
    settings: {
      name: 'Gustavo Souza',
      title: 'Software Engineer & DevSecOps',
      description: 'Desenvolvedor Full Stack, Mobile e especialista em DevSecOps. Foco em IA e Segurança.',
      github: 'https://github.com/gustavogss',
      linkedin: 'https://www.linkedin.com/in/gustavosouza-jp/',
      email: 'contato@gustavosouza.dev.br'
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          projectsSnap,
          postsSnap,
          coursesSnap,
          skillsSnap,
          settingsSnap,
          experiencesSnap,
          educationSnap,
          certificationsSnap
        ] = await Promise.all([
          getDocs(collection(db, 'projects')),
          getDocs(collection(db, 'posts')),
          getDocs(collection(db, 'courses')),
          getDocs(collection(db, 'skills')),
          getDocs(collection(db, 'settings')),
          getDocs(collection(db, 'experiences')),
          getDocs(collection(db, 'education')),
          getDocs(collection(db, 'certifications'))
        ]);

        const fetchedData = { ...data };

        if (!projectsSnap.empty) {
          fetchedData.projects = projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        }
        if (!postsSnap.empty) {
          fetchedData.blogPosts = postsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        }
        if (!coursesSnap.empty) {
          fetchedData.courses = coursesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        }
        if (!skillsSnap.empty) {
          fetchedData.techCategories = skillsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        }
        if (!settingsSnap.empty) {
          // Assuming single document for settings
          fetchedData.settings = { ...fetchedData.settings, ...settingsSnap.docs[0].data() };
        }
        if (!experiencesSnap.empty) {
          fetchedData.experiences = experiencesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        }
        if (!educationSnap.empty) {
          fetchedData.education = educationSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        }
        if (!certificationsSnap.empty) {
          fetchedData.certifications = certificationsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        }

        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching portfolio data', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading };
}
