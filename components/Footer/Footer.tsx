"use client";
import React from "react";
import Link from "next/link";
import { Clock, Mail, Map, MessageCircleQuestion } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Image from "next/image";

// Types
interface FooterLink {
  label: string;
  link: string;
}

interface FooterSection {
  label: string;
  list: FooterLink[];
}

interface ContactInfo {
  icon: React.ComponentType<{
    size: number;
    strokeWidth: number;
    className: string;
  }>;
  title: string;
  content: string;
}

// Data
const footerSections: FooterSection[] = [
  {
    label: "LEGAL",
    list: [
      {
        label: "Cancellation and Refund Policy",
        link: "/pages/cancellation-and-refund-policy",
      },
      { label: "Shipping Policy", link: "/pages/shipping-policy" },
      { label: "Privacy policy", link: "/pages/privacy-policy" },
      { label: "Terms of service", link: "/pages/terms-of-service" },
    ],
  },
  {
    label: "QUICK LINKS",
    list: [
      { label: "Home", link: "/" },
      { label: "About Us", link: "/pages/about-us" },
      { label: "Contact Us", link: "/pages/contact-us" },
      { label: "Login", link: "/auth/login" },
      // { label: "Blog Post", link: "/blog" },
      { label: "Sitemap", link: "/sitemap.xml" },
    ],
  },
  {
    label: "USEFUL LINKS",
    list: [
      // { label: "Home", link: "/auth/register" },
      { label: "Hot Wheels Premium", link: "/collections/hotwheels-premium" },
      // { label: "Shop by collections", link: "/collections" },
      { label: "Hot Wheels Mainline", link: "/collections/hotwheels-mainline" },
      { label: "Matchbox Cars", link: "/collections/matchbox-cars" },
      { label: "Mini GT", link: "/collections/mini-gt-kaido-house" },
      { label: "Shop by brands", link: "/brands" },
    ],
  },
];

const contactInfo: ContactInfo[] = [
  // {
  //   icon: Map,
  //   title: "Our Address",
  //   content:
  //     "",
  // },
  // {
  //   icon: Clock,
  //   title: "Our Timing",
  //   content: "Mon to Sat - 11:00 AM to 7:30 PM",
  // },
  {
    icon: MessageCircleQuestion,
    title: "Need Help ?",
    content: "Contact: +91 90044 56480",
  },
  {
    icon: Mail,
    title: "Email Us",
    content: "info@hutzdiecast.com",
  },
];

// Components
const ContactItem: React.FC<ContactInfo> = ({ icon: Icon, title, content }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Icon size={18} strokeWidth={1.5} className="text-gray-400" />
      <span className="text-base tracking-wide">{title}</span>
    </div>
    <p className="text-[13px] tracking-wider">{content}</p>
  </div>
);

const FooterSection: React.FC<FooterSection & { isMobile?: boolean }> = ({
  label,
  list,
  isMobile,
}) =>
  isMobile ? (
    <AccordionItem value={label}>
      <AccordionTrigger>{label}</AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-2 text-[13px]">
          {list?.map((item, idx) => (
            <li key={idx}>
              <Link href={item.link} className="block hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  ) : (
    <div className="space-y-4 w-full md:w-[50%] lg:w-[30%]">
      <h2 className="text-lg tracking-widest">{label}</h2>
      <div className="h-[1px] w-20 bg-gray-600" />
      <ul className="text-[13px] tracking-wider space-y-4">
        {list.map((item, idx) => (
          <li key={idx} className="listHoverAnimation">
            <Link
              href={item.link}
              target={item.link.startsWith("http") ? "_blank" : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

interface Props {
  headerMenu: any;
  logoSettings: any;
}

const Footer: React.FC<Props> = ({ logoSettings, headerMenu }) => {
  return (
    <div className="bg-templatePrimary">
      <div className="hidden  lg:flex gap-8 text-white templateContainer py-6 md:py-8 lg:py-12 w-full">
        <div className="space-y-7 w-full md:w-[50%] lg:w-[40%]">
          <Link href="/" className="inline-block">
            <Image
              className={`w-full h-[80px] object-contain filter invert brightness-0`}
              src={`${process.env.BACKEND}/upload/WebsiteLogos/${logoSettings?.logoPath}`}
              alt={logoSettings?.altText || "Logo"}
              height={500}
              width={460}
            />
          </Link>
          {contactInfo.map((info, idx) => (
            <ContactItem key={idx} {...info} />
          ))}
        </div>
        {footerSections.map((section, idx) => (
          <FooterSection key={idx} {...section} />
        ))}
        {/* {headerMenu && (
          <FooterSection
            label="USEFUL LINKS"
            list={headerMenu?.map((item: any) => ({
              label: item.name,
              link: `${item.url}`,
            }))}
          />
        )} */}
      </div>

      {/* Mobile Footer */}
      <div className="templateContainer bg-black text-white lg:hidden py-8 md:py-8 lg:py-12 space-y-7">
        <div className="space-y-7 w-full">
          <h2 className="text-xl tracking-wide">{process.env.STORE_NAME}</h2>
          {contactInfo.map((info, idx) => (
            <ContactItem key={idx} {...info} />
          ))}
        </div>
        <Accordion type="single" collapsible>
          {footerSections.map((section, idx) => (
            <FooterSection key={idx} {...section} isMobile />
          ))}
        </Accordion>
      </div>
      <div className="templateContainer">
        <hr className="border-white/10" />
      </div>
      {/* Copyright */}
      <div className="bg-templatePrimary p-4 text-center text-templatePrimaryText text-sm tracking-wide templateContainer">
        © {new Date().getFullYear()} {process.env.STORE_NAME}
      </div>
    </div>
  );
};

export default Footer;
