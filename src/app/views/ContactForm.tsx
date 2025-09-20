"use client";

import { useState } from "react";

interface ContactFormProps {
  id?: string;
}

export default function ContactForm({ id }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Example: POST to your API route (you need to implement /api/contact)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-gray-900 rounded-2xl shadow-lg mt-12" id={id}>
      <h2 className="text-2xl font-bold text-center text-white mb-6 select-none">
        Contact me
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 select-none">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg bg-gray-800 border border-gray-700 text-white p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 select-none">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg bg-gray-800 border border-gray-700 text-white p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 select-none">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg bg-gray-800 border border-gray-700 text-white p-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        {/* Status message */}
        {status === "success" && (
          <p className="text-green-400 text-sm text-center mt-2">
            ✅ Message sent successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm text-center mt-2">
            ❌ Something went wrong. Try again.
          </p>
        )}
      </form>
    </div>
  );
}
