import { NotFoundPage } from "@/components/ui/404-not-found";

export default function NotFound() {
  return (
    <>
      <style>{`
        [data-transition-chrome="true"],
        .transition-brand-layer,
        footer {
          display: none !important;
        }
      `}</style>
      <NotFoundPage />
    </>
  );
}
