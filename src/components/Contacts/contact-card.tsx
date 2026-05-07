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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {contactInfo?.map((info, index) => (
              <ContactInfo key={index} {...info} />
            ))}
          </div>

          <div className="pt-3">
            <div className="h-px w-full bg-border-custom/50 mb-6" />
            <p className="text-[11px] font-medium tracking-wider text-muted-custom mb-3">
              SOCIALS
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {socials
                .filter((s) =>
                  ["GitHub", "LinkedIn", "Instagram", "Twitter"].includes(s.label)
                )
                .map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 transition-all duration-300"
                      aria-label={social.ariaLabel}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-all duration-300 group-hover:bg-accent group-hover:text-background group-hover:border-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                    </a>
                  );
                })}
            </div>
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
    <div
      className={cn("group flex items-center gap-3 py-3", className)}
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-all duration-300 group-hover:bg-accent group-hover:text-background group-hover:border-accent">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-muted-custom text-xs">{value}</p>
      </div>
    </div>
  );
}
