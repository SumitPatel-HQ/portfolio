import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sumit Patel | AboutMe",
  description: "Learn more about my background, experience, and the technologies I work with.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
