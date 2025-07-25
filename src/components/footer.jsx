import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from "lucide-react";
import Wrapper from "./wrapper";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "/#features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Procurement Inbox", href: "/assets/procurement-inbox" },
      { name: "Contract Suite", href: "/assets/contract-execution-suite" },
      { name: "Premium", href: "/assets/vendr-os-premium" },
    ],
    company: [
      { name: "Contact", href: "/contact" },
    ],
    resources: [],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
      { name: "Security", href: "/security" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Facebook", href: "#", icon: Facebook },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-surface border-t border-border">
      <div className="absolute inset-0 section-pattern opacity-10"></div>
      
      <Wrapper className="relative z-10">
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <Link
                href="/"
                className="text-2xl font-bold tracking-tight flex items-center font-plus-jakarta-sans mb-6"
              >
                VENDR <span className="text-primary ml-1 gradient-text">OS</span>
              </Link>
              
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                Transform your government contracting journey with AI-powered tools, 
                smart workflows, and proven strategies. Join thousands of successful vendors.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>support@vendr-os.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>1-800-VENDR-OS</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center text-primary transition-colors"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {footerLinks.resources.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-6">Resources</h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} VENDR OS. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              {footerLinks.legal.map((link, index) => (
                <React.Fragment key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-muted-foreground">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;