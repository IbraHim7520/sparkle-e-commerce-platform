"use client";

import { useState } from "react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null >(null);

  const faqsData = [
    {
      question: "How long does shipping take?",
      answer:
        "Most orders are delivered within 3–7 business days. You'll receive tracking details as soon as your order ships.",
    },
    {
      question: "Do you offer free shipping?",
      answer:
        "Yes. We offer free shipping on all orders over $75. Shipping rates are calculated automatically at checkout.",
    },
    {
      question: "Can I return or exchange an item?",
      answer:
        "Absolutely. We offer hassle-free returns and exchanges within 30 days of delivery.",
    },
    {
      question: "Are your products true to size?",
      answer:
        "Our products follow standard sizing. We recommend checking the size guide on each product page before ordering.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit & debit cards, PayPal, Apple Pay, Google Pay, and secure checkout options.",
    },
  ];

  return (
    <section className="py-16 bg-linear-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-[1600px] mx-auto px-3 lg:px-4">
        
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-indigo-600">
            Support
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-3 text-slate-900">
            Frequently Asked Questions
          </h1>

          <p className="text-sm text-slate-500 mt-4 max-w-md mx-auto">
            Everything you need to know about orders, shipping, returns and payments.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {faqsData.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              
              {/* Question */}
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <h2 className="text-sm font-medium text-slate-800">
                  {faq.question}
                </h2>

                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`text-slate-500 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Answer */}
              <div
                className={`px-5 overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-40 pb-5 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm text-slate-500 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}