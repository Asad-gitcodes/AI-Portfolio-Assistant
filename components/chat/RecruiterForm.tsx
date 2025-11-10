// components/chat/RecruiterForm.tsx - Form to collect recruiter info

"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface RecruiterFormProps {
  sessionId: string;
  onSubmit: () => void;
}

export default function RecruiterForm({
  sessionId,
  onSubmit,
}: RecruiterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    role: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role/Position is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/recruiter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          sessionId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit");
      }

      setIsSubmitted(true);
      setTimeout(() => {
        onSubmit();
      }, 2000);
    } catch (error: any) {
      console.error("Submission error:", error);
      setErrors({
        submit: error.message || "Failed to submit. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">
          Your information has been submitted successfully.
          <br />
          I'll get back to you shortly!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Let's Connect! 🤝
        </h2>
        <p className="text-gray-600">
          Please share your details and I'll get back to you soon.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Your Name *"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
          />

          <Input
            label="Company *"
            type="text"
            placeholder="Tech Corp Inc."
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            error={errors.company}
          />
        </div>

        <Input
          label="Email Address *"
          type="email"
          placeholder="john@company.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />

        <Input
          label="Role/Position You're Hiring For *"
          type="text"
          placeholder="Senior AI Engineer"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          error={errors.role}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Additional Message (Optional)
          </label>
          <textarea
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            rows={4}
            placeholder="Tell me more about the role or your team..."
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </div>

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {errors.submit}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit & Connect"}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Your information is secure and will only be used to contact you about
          opportunities.
        </p>
      </form>
    </div>
  );
}
