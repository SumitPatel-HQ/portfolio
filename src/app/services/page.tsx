import { MobileServicePage } from "@/components/mobile/services/MobileServicePage";

export default function ServicesPage() {
  return (
    <>
      {/* Desktop View: Empty/Null to preserve existing behavior where it didn't exist */}
      <div className="hidden md:block">
      </div>
      
      {/* Mobile View */}
      <div className="block md:hidden">
        <MobileServicePage />
      </div>
    </>
  );
}
