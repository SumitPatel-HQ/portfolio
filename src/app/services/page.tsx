import { MobileServicePage } from "@/components/mobile/services/MobileServicePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sumit Patel | Services",
  description: "Explore services offered by Sumit Patel, from AI integrations and autonomous agents to full-stack applications, workflow automation, and scalable software systems.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Mobile View */}
      <div className="block md:hidden">
        <MobileServicePage />
      </div>
    </>
  );
}
