import React from "react";
import { Link } from "react-router-dom";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="mb-4">By accessing or using devTinder, you agree to be bound by these Terms of Service.</p>

          <h2 className="text-xl font-semibold mb-2">2. Description of Service</h2>
          <p className="mb-4">
            devTinder is a platform that connects developers for collaboration and networking purposes.
          </p>

          <h2 className="text-xl font-semibold mb-2">3. User Conduct</h2>
          <p className="mb-4">
            You agree to use devTinder only for lawful purposes and in accordance with these Terms of Service.
          </p>

          <h2 className="text-xl font-semibold mb-2">4. Intellectual Property Rights</h2>
          <p className="mb-4">
            The content on devTinder, including text, graphics, logos, and software, is the property of devTinder or its
            licensors.
          </p>

          <h2 className="text-xl font-semibold mb-2">5. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account and access to devTinder at our sole discretion, without notice, for
            any reason.
          </p>

          <h2 className="text-xl font-semibold mb-2">6. Limitation of Liability</h2>
          <p className="mb-4">
            devTinder shall not be liable for any indirect, incidental, special, consequential, or punitive damages
            resulting from your use of the service.
          </p>

          <p className="mt-6">
            By using devTinder, you acknowledge that you have read, understood, and agree to be bound by these Terms of
            Service.
          </p>
        </div>
      </div>
    </div>
  )
}

