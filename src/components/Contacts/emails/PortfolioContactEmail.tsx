import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface PortfolioContactEmailProps {
  senderName: string;
  senderEmail: string;
  phone?: string;
  message: string;
}

export const PortfolioContactEmail = ({
  senderName,
  senderEmail,
  phone,
  message,
}: PortfolioContactEmailProps) => {
  const previewText = `New inquiry from ${senderName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#6366f1",
                dark: "#0a0a0a",
                card: "#111111",
                muted: "#94a3b8",
                accent: "#818cf8",
              },
            },
          },
        }}
      >
        <Body className="bg-[#050505] my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#1a1a1a] rounded-[16px] my-[40px] mx-auto p-[20px] max-w-[465px] bg-[#0a0a0a] shadow-2xl">
            <Section className="mt-[32px] text-center">
              <Heading className="text-white text-[28px] font-bold text-center p-0 my-[10px] mx-0 tracking-tight leading-tight">
                Portfolio Inquiry
              </Heading>
              <Text className="text-muted text-[15px] leading-[24px] px-4 m-0">
                You&apos;ve received a new message through your portfolio contact form.
              </Text>
            </Section>

            <Section className="mt-[32px] px-[20px]">
              <div className="bg-card border border-[#1a1a1a] rounded-[12px] p-6 space-y-4">
                <div>
                  <Text className="text-muted text-[11px] font-bold tracking-widest uppercase m-0 mb-2">
                    Sender Details
                  </Text>
                  <Hr className="border-[#1a1a1a] m-0 w-full" />
                </div>

                <div className="space-y-4">
                  <div>
                    <Text className="text-muted text-[12px] m-0">Full Name</Text>
                    <Text className="text-white text-[16px] font-semibold m-0 mt-1">
                      {senderName}
                    </Text>
                  </div>

                  <div>
                    <Text className="text-muted text-[12px] m-0">Email Address</Text>
                    <Link
                      href={`mailto:${senderEmail}`}
                      className="text-accent text-[16px] font-semibold m-0 mt-1 no-underline"
                    >
                      {senderEmail}
                    </Link>
                  </div>

                  {phone && (
                    <div>
                      <Text className="text-muted text-[12px] m-0">Phone Number</Text>
                      <Text className="text-white text-[16px] font-semibold m-0 mt-1">
                        {phone}
                      </Text>
                    </div>
                  )}
                </div>
              </div>
            </Section>

            <Section className="mt-[24px] px-[20px]">
              <div className="bg-card border border-[#1a1a1a] rounded-[12px] p-6">
                <Text className="text-muted text-[11px] font-bold tracking-widest uppercase m-0 mb-4">
                  Message Content
                </Text>
                <div className="bg-[#050505] border border-[#1a1a1a] rounded-[8px] p-4">
                  <Text className="text-[#cbd5e1] text-[15px] leading-[1.6] m-0 italic">
                    &quot;{message}&quot;
                  </Text>
                </div>
              </div>
            </Section>

            <Section className="mt-[40px] mb-[32px] text-center px-[20px]">
              <Hr className="border-[#1a1a1a] my-[20px] mx-0 w-full" />
              <Text className="text-[#475569] text-[12px] leading-[18px] m-0">
                This is an automated notification from your portfolio system.
              </Text>
              <Text className="text-[#334155] text-[10px] font-bold uppercase tracking-[0.1em] mt-[24px]">
                &copy; {new Date().getFullYear()} PORTFOLIO &bull; SUMIT PATEL
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PortfolioContactEmail;
