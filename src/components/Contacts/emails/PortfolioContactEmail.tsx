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
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.headerSection}>
            <Heading style={styles.heading}>Portfolio Inquiry</Heading>
            <Text style={styles.subheading}>
              You&apos;ve received a new message through your portfolio contact
              form.
            </Text>
          </Section>

          <Section style={styles.cardSection}>
            <div style={styles.card}>
              <div>
                <Text style={styles.sectionLabel}>Sender Details</Text>
                <Hr style={styles.divider} />
              </div>

              <div style={styles.fieldGroup}>
                <div style={styles.field}>
                  <Text style={styles.fieldLabel}>Full Name</Text>
                  <Text style={styles.fieldValue}>{senderName}</Text>
                </div>

                <div style={styles.field}>
                  <Text style={styles.fieldLabel}>Email Address</Text>
                  <Link href={`mailto:${senderEmail}`} style={styles.emailLink}>
                    {senderEmail}
                  </Link>
                </div>

                {phone && (
                  <div style={styles.field}>
                    <Text style={styles.fieldLabel}>Phone Number</Text>
                    <Text style={styles.fieldValue}>{phone}</Text>
                  </div>
                )}
              </div>
            </div>
          </Section>

          <Section style={styles.messageSection}>
            <div style={styles.card}>
              <Text style={styles.sectionLabel}>Message Content</Text>
              <div style={styles.messageBox}>
                <Text style={styles.messageText}>
                  &quot;{message}&quot;
                </Text>
              </div>
            </div>
          </Section>

          <Section style={styles.footerSection}>
            <Hr style={styles.footerDivider} />
            <Text style={styles.footerText}>
              This is an automated notification from your portfolio system.
            </Text>
            <Text style={styles.copyright}>
              &copy; {new Date().getFullYear()} PORTFOLIO &bull; SUMIT PATEL
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: "#050505",
    margin: "auto",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: "0 8px",
  },
  container: {
    border: "1px solid #1a1a1a",
    borderRadius: "16px",
    margin: "40px auto",
    padding: "20px",
    maxWidth: "465px",
    backgroundColor: "#0a0a0a",
  },
  headerSection: {
    marginTop: "32px",
    textAlign: "center",
  },
  heading: {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: "700",
    textAlign: "center",
    padding: "0",
    margin: "10px 0",
    letterSpacing: "-0.5px",
    lineHeight: "1.2",
  },
  subheading: {
    color: "#94a3b8",
    fontSize: "15px",
    lineHeight: "24px",
    padding: "0 16px",
    margin: "0",
  },
  cardSection: {
    marginTop: "32px",
    padding: "0 20px",
  },
  card: {
    backgroundColor: "#111111",
    border: "1px solid #1a1a1a",
    borderRadius: "12px",
    padding: "24px",
  },
  sectionLabel: {
    color: "#94a3b8",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    margin: "0 0 8px 0",
  },
  divider: {
    borderColor: "#1a1a1a",
    margin: "0",
    width: "100%",
  },
  fieldGroup: {
    marginTop: "16px",
  },
  field: {
    marginBottom: "16px",
  },
  fieldLabel: {
    color: "#94a3b8",
    fontSize: "12px",
    margin: "0",
  },
  fieldValue: {
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    margin: "4px 0 0 0",
  },
  emailLink: {
    color: "#818cf8",
    fontSize: "16px",
    fontWeight: "600",
    margin: "4px 0 0 0",
    textDecoration: "none",
    display: "block",
  },
  messageSection: {
    marginTop: "24px",
    padding: "0 20px",
  },
  messageBox: {
    backgroundColor: "#050505",
    border: "1px solid #1a1a1a",
    borderRadius: "8px",
    padding: "16px",
    marginTop: "16px",
  },
  messageText: {
    color: "#cbd5e1",
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "0",
    fontStyle: "italic",
  },
  footerSection: {
    marginTop: "40px",
    marginBottom: "32px",
    textAlign: "center",
    padding: "0 20px",
  },
  footerDivider: {
    borderColor: "#1a1a1a",
    margin: "20px 0",
    width: "100%",
  },
  footerText: {
    color: "#475569",
    fontSize: "12px",
    lineHeight: "18px",
    margin: "0",
  },
  copyright: {
    color: "#334155",
    fontSize: "10px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginTop: "24px",
  },
};

export default PortfolioContactEmail;
