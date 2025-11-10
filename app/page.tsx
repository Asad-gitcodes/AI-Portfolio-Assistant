// app/page.tsx - Warm brown/orange themed page

"use client";

import ChatBox from "@/components/chat/ChatBox";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a0f08] via-[#2a1810] to-[#1a0f08] relative overflow-hidden">
      {/* Animated gradient orbs with warm colors */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/15 rounded-full blur-3xl animate-float-delayed"></div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      ></div>

      {/* Floating tech icons */}
      <div className="absolute top-40 right-20 animate-float opacity-30">
        <div className="text-6xl">⚡</div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float-delayed opacity-30">
        <div className="text-6xl">🚀</div>
      </div>
      <div
        className="absolute top-1/3 right-32 animate-float opacity-25"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="text-5xl">💻</div>
      </div>
      <div
        className="absolute top-2/3 left-32 animate-float-delayed opacity-25"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="text-5xl">🧠</div>
      </div>
      <div
        className="absolute bottom-1/3 right-40 animate-float opacity-20"
        style={{ animationDelay: "2s" }}
      >
        <div className="text-5xl">⚙️</div>
      </div>

      {/* Header */}
      <header className="glass border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-slide-in-left">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center glow-orange animate-pulse-glow">
              <span className="text-white text-xl font-bold">AI</span>
            </div>
            <div>
              <h1 className="font-bold text-white">AI Portfolio Assistant</h1>
              <p className="text-xs text-orange-300/80">
                Powered by GPT-4 & RAG
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-400 transition-all duration-300 hover:scale-110"
              title="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-400 transition-all duration-300 hover:scale-110"
              title="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <button className="glass px-4 py-2 rounded-lg text-white text-sm hover:glass-strong transition-all glow-hover bg-gradient-to-r from-orange-500/20 to-red-600/20 border-orange-500/30">
              📄 Download Resume
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6"></div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-8">
            {/* Text Section */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-orange-400 font-semibold mb-3">
                Hello! I’m the
              </p>
              <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="gradient-text">
                  AI Assistant representing Asad Abdul
                </span>
              </h2>

              <p className="text-xl text-gray-300 max-w-2xl mb-6">
                Ask me anything about his background, technical skills,
                experience, or projects.
                <br />
                <br />
                <span className="text-orange-400 font-semibold">
                  I'm here 24/7 to provide clear, professional insights and help
                  you learn more about him.
                </span>
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-400">
                <svg
                  className="w-5 h-5 text-orange-400"
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
                  {" "}
                  <span className="font-semibold text-orange-400">
                    powered by GPT-4 & RAG
                  </span>{" "}
                  here to guide you through his professional journey.
                </span>
              </div>
            </div>

            {/* Avatar/Character Section */}
            <div className="flex-1 relative">
              <div className="relative w-full max-w-md mx-auto">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full blur-3xl animate-pulse-glow"></div>

                {/* Avatar placeholder - Replace with your 3D character */}
                <div className="relative z-10 flex items-center justify-center">
                  {/* Tech icons floating around */}
                  <div className="absolute -top-10 -left-10 text-5xl animate-float opacity-80">
                    <div className="glass p-3 rounded-2xl border border-orange-500/30">
                      ⚡
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 text-5xl animate-float-delayed opacity-80">
                    <div className="glass p-3 rounded-2xl border border-orange-500/30">
                      🚀
                    </div>
                  </div>
                  <div
                    className="absolute top-0 right-0 text-4xl animate-float opacity-80"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="glass p-2 rounded-xl border border-orange-500/30">
                      🤖
                    </div>
                  </div>

                  {/* Main avatar - Replace this with your image */}
                  <div className="glass-strong rounded-3xl p-8 border-2 border-orange-500/30 glow-orange">
                    <div className="w-64 h-64 bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-2xl flex items-center justify-center">
                      {/* Placeholder - Replace with: <img src="/your-avatar.png" alt="Avatar" className="w-full h-full object-contain" /> */}
                      <img
                        src="/avatar.jpg"
                        alt="AI Assistant Avatar"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div
          className="max-w-5xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <ChatBox />
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: "🧠",
              title: "Context-Aware Intelligence",
              description:
                "Uses RAG to retrieve relevant information and provide accurate, personalized answers",
              gradient: "from-orange-500/20 to-red-600/20",
              border: "border-orange-500/30",
            },
            {
              icon: "⚡",
              title: "Instant Responses",
              description:
                "Get immediate answers powered by GPT-4, available 24/7 whenever you need",
              gradient: "from-red-500/20 to-orange-600/20",
              border: "border-red-500/30",
            },
            {
              icon: "🎯",
              title: "Smart Lead Capture",
              description:
                "Interested recruiters can easily share their information for follow-up",
              gradient: "from-amber-500/20 to-orange-600/20",
              border: "border-amber-500/30",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`glass rounded-2xl p-6 hover:glass-strong transition-all duration-300 glow-hover animate-fade-in group ${feature.border}`}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border ${feature.border}`}
              >
                <span className="text-4xl">{feature.icon}</span>
              </div>
              <h3 className="font-bold text-lg text-white mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Built with cutting-edge technology
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              "Next.js",
              "TypeScript",
              "OpenAI GPT-4",
              "MongoDB",
              "Tailwind CSS",
              "RAG",
            ].map((tech, index) => (
              <span
                key={index}
                className="glass px-4 py-2 rounded-lg text-gray-300 text-sm border border-orange-500/20 hover:border-orange-500/40 transition-all hover:text-orange-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-white/10 backdrop-blur-xl mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
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
    </main>
  );
}
