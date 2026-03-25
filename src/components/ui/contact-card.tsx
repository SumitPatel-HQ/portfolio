"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { socials } from "@/data/socialLinks";

type ContactInfoProps = React.ComponentProps<"div"> & {
  icon: LucideIcon;
  label: string;
  value: string;
};

type ContactCardProps = React.ComponentProps<"div"> & {
  // Content props
  title?: string;
  description?: string;
  contactInfo?: ContactInfoProps[];
  formSectionClassName?: string;
};

export function ContactCard({
  title = "Get in touch",
  description = "Got a question or want to collaborate? Drop me a message and I'll get back to you as soon as possible.",
  contactInfo = socials
    .filter((s) => ["Email", "Phone", "Location"].includes(s.label))
    .map((s) => ({
      icon: s.icon,
      label: s.label,
      value: s.username || "",
      className: s.label === "Location" ? "md:col-span-2 lg:col-span-3" : "",
    })),
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <div
      className={cn(
        "bg-background-secondary border-border-custom relative grid h-full w-full shadow-2xl md:grid-cols-2 lg:grid-cols-3 rounded-xl",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col justify-between lg:col-span-2">
        <div className="relative h-full space-y-4 px-4 py-12 md:px-12 md:pt-16 md:pb-8">
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl text-foreground">
            {title}
          </h1>
          <p className="text-muted-custom max-w-xl text-sm font-thin md:text-base lg:text-lg">
            {description}
          </p>
          <div className="grid gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {contactInfo?.map((info, index) => (
              <ContactInfo key={index} {...info} />
            ))}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "bg-background-dark/80 rounded-r-xl flex h-full w-full items-center border-t border-border-custom p-5 md:col-span-1 md:border-t-0 md:border-l",
          formSectionClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ContactInfo({
  icon: Icon,
  label,
  value,
  className,
  ...props
}: ContactInfoProps) {
  return (
    <div className={cn("flex items-center gap-3 py-3", className)} {...props}>
      <div className="bg-background-dark/50 rounded-lg p-3 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-muted-custom text-xs">{value}</p>
      </div>
    </div>
  );
}
