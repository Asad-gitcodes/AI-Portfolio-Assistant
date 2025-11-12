// app/page.tsx - Home page with scroll animations

"use client";
import FloatingTechLogos from "@/components/ui/TechLogosEnhanced";
import FloatingChatButton from "@/components/chat/FloatingChatButton";
import SimpleSummary from "@/components/summary/SimpleSummary";
import CompactSkillsShowcase from "@/components/skills/CompactSkillsShowcase";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import CertificationsSection from "@/components/certifications/CertificationsSection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import ContactSection from "@/components/contact/ContactSection";
//import FloatingTechLogos from "@/components/ui/FloatingTechLogos";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";

function ScrollSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation(0.1, true); // true = hide when scrolling up

  return (
    <div
      ref={ref}
      className={`scroll-fade-in ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a0f08] via-[#2a1810] to-[#1a0f08] relative overflow-hidden">
      {/* Animated gradient orbs in background */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/15 rounded-full blur-3xl animate-float-delayed"></div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      ></div>

      {/* 3D Floating Tech Logos */}
      <FloatingTechLogos />

      {/* Header - Always visible */}
      <header className="glass border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 animate-slide-in-left">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <img
                src="/logo3.png"
                alt="Logo"
                className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(251,146,60,0.6)]"
              />
            </div>
            <div>
              <h1 className="font-bold text-white text-sm md:text-base">
                AI Portfolio Assistant
              </h1>
              <p className="text-[10px] md:text-xs text-orange-300/80 hidden sm:block">
                Powered by GPT-4 & RAG
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <a
              href="https://www.linkedin.com/in/asad-abdul/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-400 transition-all duration-300 hover:scale-110"
              title="LinkedIn"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <button className="glass px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-white text-xs md:text-sm hover:glass-strong transition-all glow-hover bg-gradient-to-r from-orange-500/20 to-red-600/20 border-orange-500/30">
              {/* Icon only on mobile, text on desktop */}
              <span className="sm:hidden">📄</span>
              <span className="hidden sm:inline">📄 Resume</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Always visible on load */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10">
        <div className="text-center mb-8 md:mb-16 animate-fade-in px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 mb-6 md:mb-8">
            {/* Text Section */}
            <div className="flex-1 text-center lg:text-left w-full lg:w-auto">
              <p className="text-orange-400 font-semibold mb-2 md:mb-3 text-sm md:text-base">
                Hi, I’m the AI Assistant representing
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
                <span className="gradient-text block">Asad Abdul</span>
              </h2>

              <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-4 md:mb-6 px-4 lg:px-0">
                Explore my background, experience, and projects through an
                interactive chat
                <br className="hidden sm:block" />
                <br className="hidden sm:block" />
                <span className="text-orange-400 font-semibold">
                  available 24/7 to answer your questions!
                </span>
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs md:text-sm text-gray-400">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
                <span>
                  Powered by{" "}
                  <span className="font-semibold text-orange-400">
                    Retrieval-Augmented Generation
                  </span>{" "}
                  for precise, context-aware responses.
                </span>
              </div>
            </div>

            {/* Avatar/Character Section */}
            <div className="flex-1 relative w-full max-w-[280px] sm:max-w-sm lg:max-w-md mx-auto lg:mx-0">
              <div className="relative w-full">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full blur-3xl animate-pulse-glow"></div>

                {/* Avatar placeholder */}
                <div className="relative z-10 flex items-center justify-center">
                  {/* Tech icons floating around - with real logos */}

                  {/* Lightning/Speed Icon - Top Left */}
                  <div className="absolute -top-4 sm:-top-6 md:-top-10 -left-4 sm:-left-6 md:-left-10 animate-float opacity-80 hidden sm:block">
                    <div className="glass p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl md:rounded-2xl border border-orange-500/30 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-red-600/10">
                      <img
                        src="/logos/react.png"
                        alt="Speed"
                        className="w-6 sm:w-7 md:w-10 h-6 sm:h-7 md:h-10 object-contain"
                        onError={(e) => {
                          e.currentTarget.src =
                            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23fb923c"><path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/></svg>';
                        }}
                      />
                    </div>
                  </div>

                  {/* Rocket Icon - Bottom Right */}
                  <div className="absolute -bottom-4 sm:-bottom-6 md:-bottom-10 -right-4 sm:-right-6 md:-right-10 animate-float-delayed opacity-80 hidden sm:block">
                    <div className="glass p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl md:rounded-2xl border border-orange-500/30 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-red-600/10">
                      <img
                        src="/logos/aws.png"
                        alt="Innovation"
                        className="w-6 sm:w-7 md:w-10 h-6 sm:h-7 md:h-10 object-contain"
                        onError={(e) => {
                          e.currentTarget.src =
                            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23fb923c"><path d="M12 2c3.9 0 7 3.1 7 7 0 2.4-1.2 4.5-3 5.7V20c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1v-5.3c-1.8-1.2-3-3.3-3-5.7 0-3.9 3.1-7 7-7zm0 2c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"/></svg>';
                        }}
                      />
                    </div>
                  </div>

                  {/* AI/Bot Icon - Top Right */}
                  <div
                    className="absolute top-0 right-0 animate-float opacity-80 hidden md:block"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="glass p-2 rounded-xl border border-orange-500/30 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-red-600/10">
                      <img
                        src="/logos/docker.png"
                        alt="AI"
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.src =
                            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23fb923c"><circle cx="9" cy="9" r="2"/><circle cx="15" cy="9" r="2"/><path d="M12 17c2.2 0 4-1.3 4-3h-8c0 1.7 1.8 3 4 3z"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/></svg>';
                        }}
                      />
                    </div>
                  </div>

                  {/* Main avatar */}
                  <div className="glass-strong rounded-2xl md:rounded-3xl p-4 md:p-8 border-2 border-orange-500/30 glow-orange w-full">
                    <div className="w-full aspect-square max-w-xs mx-auto bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-xl md:rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <img
                          src="/avatar.jpg"
                          alt="AI Assistant Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Summary Section - Appears on scroll */}
        <ScrollSection delay={0}>
          <div className="mt-16 md:mt-24">
            <SimpleSummary />
          </div>
        </ScrollSection>

        {/* Experience Timeline - Appears on scroll */}
        <ScrollSection delay={0}>
          <div className="mt-12 md:mt-20">
            <ExperienceTimeline />
          </div>
        </ScrollSection>

        {/* Skills Showcase - Appears on scroll */}
        <ScrollSection delay={0}>
          <div className="mt-12 md:mt-20">
            <CompactSkillsShowcase />
          </div>
        </ScrollSection>

        {/* Certifications - Appears on scroll */}
        <ScrollSection delay={0}>
          <div className="mt-12 md:mt-20">
            <CertificationsSection />
          </div>
        </ScrollSection>

        {/* Testimonials - Appears on scroll */}
        <ScrollSection delay={0}>
          <div className="mt-12 md:mt-20">
            <TestimonialsSection />
          </div>
        </ScrollSection>

        {/* Contact Section - Appears on scroll */}
        <ScrollSection delay={0}>
          <div className="mt-12 md:mt-20">
            <ContactSection />
          </div>
        </ScrollSection>
      </section>

      {/* Footer - Appears on scroll */}
      <ScrollSection delay={0}>
        <footer className="glass border-t border-white/10 backdrop-blur-xl mt-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">
                © 2024 AI Portfolio Assistant. Powered by innovation.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Terms
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors flex items-center gap-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>
      </ScrollSection>

      {/* Floating Chat Button */}
      <FloatingChatButton />
    </main>
  );
}
