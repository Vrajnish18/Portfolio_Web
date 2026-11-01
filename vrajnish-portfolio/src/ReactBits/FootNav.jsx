
import React, { useState } from "react";
// import {
//   Home,
//   FolderKanban,
//   UserRound,
//   Github,
//   Linkedin,
//   Mail,
//   FileText,
// } from "lucide-react";

const dockItems = [
  {
    label: "Home",
    href: "#top",
    type: "section",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v12h14V9" />
        <path d="M9 21v-7h6v7" />
      </svg>
    ),
  },
  // {
  //   label: "Projects",
  //   href: "#projects",
  //   type: "section",
  //   icon: (
  //     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
  //       <rect x="3" y="4" width="18" height="16" rx="2" />
  //       <path d="M8 4V2h8v2M3 9h18M9 14l-2 2 2 2M15 14l2 2-2 2" />
  //     </svg>
  //   ),
  // },
  // {
  //   label: "About",
  //   href: "#about",
  //   type: "section",
  //   icon: (
  //     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
  //       <circle cx="12" cy="8" r="4" />
  //       <path d="M4 21a8 8 0 0 1 16 0" />
  //     </svg>
  //   ),
  // },
  {
    label: "Resume",
    href: "/resume.pdf",
    type: "external",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h9l5 5v13H6z" />
        <path d="M15 3v6h5M9 13h8M9 17h8" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/your-username",
    type: "external",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.51-1.29-1.24-1.63-1.24-1.63-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.78 2.22 3.19 1.58.1-.73.39-1.23.71-1.51-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.1-1.45 3.04-1.15 3.04-1.15.61 1.55.23 2.7.12 2.98.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.24-5.1 5.51.4.35.76 1.02.76 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/your-username",
    type: "external",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.34 18H5.67V9.4h2.67ZM7 8.23a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1ZM18.33 18h-2.66v-4.18c0-1-.02-2.28-1.39-2.28-1.39 0-1.6 1.08-1.6 2.2V18h-2.67V9.4h2.56v1.17h.04a2.8 2.8 0 0 1 2.51-1.38c2.69 0 3.2 1.77 3.2 4.08Z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:your-email@gmail.com",
    type: "external",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];


export default function Dock() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div
        className="
          flex items-end gap-2
          rounded-2xl
          border border-white/10
          bg-[#292725]/85
          px-3 py-3
          shadow-2xl shadow-black/30
          backdrop-blur-xl
        "
        onMouseLeave={() => setActiveIndex(null)}
      >
        {dockItems.map((item, index) => {
          // const Icon = item.icon;
          const isActive = activeIndex === index;

          return (
            <a
              key={item.label}
              href={item.href}
              target={item.type === "external" && !item.href.startsWith("mailto:") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={item.label}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              className={`
                group relative
                flex items-center justify-center
                rounded-xl
                transition-all duration-300 ease-out
                ${isActive
                  ? "h-14 w-14 -translate-y-3 bg-[#ff7a45]/15 text-[#ff7a45]"
                  : "h-11 w-11 text-white/70 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              <span className="flex h-6 w-6 items-center justify-center">
                {item.icon}
              </span>

              {/* Tooltip */}
              <span
                className={`
                  pointer-events-none
                  absolute -top-12 left-1/2
                  -translate-x-1/2
                  whitespace-nowrap
                  rounded-lg
                  border border-white/10
                  bg-[#1d1b19]
                  px-3 py-1.5
                  text-xs font-medium text-white
                  shadow-xl
                  transition-all duration-200
                  ${isActive
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                  }
                `}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
