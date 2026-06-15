import { MobileContactPage } from "@/components/mobile/contact/MobileContactPage";
import { ContactCard } from "@/components/Contacts/contact-card";
import { ContactForm } from "@/components/Contacts/ContactForm";

export default function ContactPage() {
  return (
    <>
      {/* Desktop View: Centered Contact Card for direct navigation SEO and UX */}
      <div className="hidden md:flex flex-col flex-1 w-full px-4 lg:px-8 md:pt-36 lg:pt-28 lg:pb-0 md:pb-4 ">
        <div className="max-w-5xl my-auto mx-auto w-full md:border lg:max-w-6xl lg:h-[70vh]  md:border-white/10  md:rounded-2xl lg:rounded-xl">
          <ContactCard>
            <ContactForm />
          </ContactCard>
        </div>
      </div>

      {/* Mobile View: Dedicated Contact Hub */}
      <div className="block md:hidden">
        <MobileContactPage />
      </div>
    </>
  );
}
