"use client";

import { useState } from "react";
import { ORPCTanstackClient } from "@/utils/orpc";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

const SendEmailPage = () => {
  const [to, setTo] = useState("rumzkurama@gmail.com");
  const [subject, setSubject] = useState("Test");
  const [message, setMessage] = useState("Hello World from nodemailer");
  const [htmlMode, setHtmlMode] = useState(false);

  const sendEmail = useMutation({
    ...ORPCTanstackClient.sendEmail.mutationOptions(),
    onSuccess: () => {
      alert("✅ Email sent successfully!");
      setTo("");
      setSubject("");
      setMessage("");
    },
    onError: (error) => {
      alert(`❌ Failed to send email: ${(error as Error).message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !subject || !message) return;
    sendEmail.mutate({
      to,
      subject,
      [htmlMode ? "html" : "text"]: message,
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
            📧 <span>Send Email</span>
          </h1>

          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition"
          >
            Go to Todo Manager
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Email
            </label>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="recipient@example.com"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {htmlMode ? "HTML Content" : "Plain Text Message"}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                htmlMode
                  ? "<h1>Hello!</h1><p>This is an HTML email.</p>"
                  : "Write your message here..."
              }
              className="w-full border border-gray-300 rounded-lg p-3 h-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={htmlMode}
                onChange={(e) => setHtmlMode(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 cursor-pointer"
              />
              Send as HTML
            </label>

            <button
              type="submit"
              disabled={sendEmail.isPending}
              className="bg-linear-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition disabled:opacity-60"
            >
              {sendEmail.isPending ? "Sending..." : "Send Email"}
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Built with <span className="text-indigo-500 font-semibold">oRPC</span>
          , <span className="text-amber-500 font-semibold">Nodemailer</span> &{" "}
          <span className="text-pink-500 font-semibold">TanStack Query</span>
        </p>
      </div>
    </div>
  );
};

export default SendEmailPage;
