// components/contact/ContactSection.tsx - Professional contact form with 3D illustration (Enhanced Responsive)

"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // ✅ REAL MongoDB submission - not simulated!
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success!
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });

        // Reset after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        // Error from server
        setSubmitStatus("error");
        setErrorMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      // Network or other error
      console.error("Failed to submit form:", error);
      setSubmitStatus("error");
      setErrorMessage("Failed to submit. Please try again or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
      {/* Header Badge - Responsive */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-orange-500/30 mb-4 sm:mb-6">
          <span className="text-base sm:text-lg md:text-xl">💬</span>
          <span className="text-xs sm:text-sm text-gray-300">
            Have questions or ideas? Let's talk! 🚀
          </span>
        </div>
      </div>

      {/* Section Title - Responsive */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 px-2">
          Get in Touch – <span className="gradient-text">Let's Connect</span>
        </h3>
      </div>

      {/* Contact Form + Illustration - Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
        {/* Left Side - Contact Form */}
        <div className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-orange-500/30 hover:border-orange-500/50 transition-all order-2 lg:order-1">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/30 border border-gray-700 rounded-lg text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="What's your email address?"
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/30 border border-orange-500/50 rounded-lg text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can I help you?"
                required
                rows={4}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/30 border border-gray-700 rounded-lg text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
              />
            </div>

            {/* Submit Button - Responsive */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg transition-all ${
                isSubmitting
                  ? "bg-gray-600 cursor-not-allowed"
                  : submitStatus === "success"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              } text-white shadow-lg hover:shadow-xl active:scale-95 sm:hover:scale-105`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : submitStatus === "success" ? (
                <span className="flex items-center justify-center gap-2">
                  ✓ Message Sent Successfully!
                </span>
              ) : (
                "SEND MESSAGE"
              )}
            </button>

            {/* Success Message */}
            {submitStatus === "success" && (
              <div className="glass-strong rounded-lg p-3 sm:p-4 border border-green-500/30 bg-green-500/10">
                <p className="text-green-400 text-center text-xs sm:text-sm">
                  Thanks for reaching out! I'll get back to you soon. 🚀
                </p>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === "error" && (
              <div className="glass-strong rounded-lg p-3 sm:p-4 border border-red-500/30 bg-red-500/10">
                <p className="text-red-400 text-center text-xs sm:text-sm">
                  ❌ {errorMessage || "Failed to submit. Please try again."}
                </p>
              </div>
            )}
          </form>

          {/* Contact Info - Responsive */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-orange-500/20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <a
                href="mailto:your.email@example.com"
                className="glass rounded-lg p-2.5 sm:p-3 hover:glass-strong transition-all active:scale-95 sm:hover:scale-105 flex items-center gap-2 sm:gap-3 group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <span className="text-base sm:text-xl">📧</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-xs sm:text-sm text-white font-semibold truncate">
                    your.email@example.com
                  </p>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-lg p-2.5 sm:p-3 hover:glass-strong transition-all active:scale-95 sm:hover:scale-105 flex items-center gap-2 sm:gap-3 group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <span className="text-base sm:text-xl">💼</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-400">LinkedIn</p>
                  <p className="text-xs sm:text-sm text-white font-semibold truncate">
                    Connect with me
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - 3D Illustration - Responsive */}
        <div className="relative order-1 lg:order-2">
          <div className="relative glass-strong rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-orange-500/30 overflow-hidden group hover:border-orange-500/50 transition-all">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* Image - Responsive */}
            <img
              src="/contact-illustration.png"
              alt="Contact Illustration - Modern workspace"
              className="w-full h-auto rounded-lg sm:rounded-xl relative z-10 group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                // Fallback if image doesn't exist
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement!.innerHTML +=
                  '<div class="w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-lg sm:rounded-xl flex items-center justify-center"><span class="text-4xl sm:text-5xl md:text-6xl">🖥️</span></div>';
              }}
            />
          </div>

          {/* Floating decorative elements - Hide on small screens */}
          <div className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-orange-500/20 rounded-full blur-2xl animate-float hidden sm:block"></div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 sm:w-32 sm:h-32 bg-red-600/20 rounded-full blur-2xl animate-float-delayed hidden sm:block"></div>
        </div>
      </div>
    </div>
  );
}
