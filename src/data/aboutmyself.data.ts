import { getProfileImageUrl } from "@/lib/imagekit";

export type AboutMe = {
   Name: string;
   image: string;
   tag: string;
   tagLine: string;
   headLine1: string;
   headLine2: string;
   Buidling: string;
   Exploring: string;
   Education: string;
   EducationShort: string;
   ProjectNum: string;
   Available: string;
   Skills: string[];
}

export const AboutMe: AboutMe = {

   Name: "Sumit Patel",
   image: getProfileImageUrl("image.jpg"),
   tag: "AI ENGINEER × FULL-STACK DEV",
   tagLine: "AI engineer by major. Full-stack developer by necessity. Builder by choice.",
   headLine1: "I build scalable web systems.",
   headLine2: "Full Stack Developer focused on performance, clean architecture, and real-world usability.",
   Buidling: "AI-powered DB assistant",
   Exploring: "System design / performance",
   Education: "T.E  Artificial Intelligence and Data Science",
   EducationShort: "T.E AI & DS",
   ProjectNum: "5",
   Available: "Available for work",
   Skills: [
      "Typescript",
      "React", 
      "Next.js",
      "Tailwind CSS", 
      "Node.js",
      "Express.js", 
      "PostgreSQL", 
      "MongoDB", 
      "Docker", 
      "Git", 
      "GitHub"
   ],
}