'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Contact form component that uses search params
function ContactForm() {
  const searchParams = useSearchParams();
  const source = searchParams.get('source') || 'direct';
  const prefill = searchParams.get('prefill') === 'true';

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <div className="bg-blue-50 p-4 mb-6 rounded-lg">
        <p className="text-sm text-blue-800">
          Source: {source} | Prefill: {prefill ? 'Yes' : 'No'}
        </p>
      </div>
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={prefill ? 'Star Enthusiast' : ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={prefill ? 'contact@stargazing.com' : ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            defaultValue={prefill ? 'StarGazing Tour Inquiry' : ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What would you like to discuss?"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            defaultValue={prefill ? 'I am interested in learning more about stargazing tours in India.' : ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tell us about your interest in stargazing..."
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

// Loading fallback component
function ContactLoading() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-20 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
}

// Main contact page component with Suspense wrapper
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Suspense fallback={<ContactLoading />}>
        <ContactForm />
      </Suspense>
    </div>
  );
}
