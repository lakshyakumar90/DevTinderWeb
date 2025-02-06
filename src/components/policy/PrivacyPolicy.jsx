import React from 'react'
import { Link } from 'react-router-dom'


export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
          <p className="mb-4">
            We collect information you provide directly to us, such as when you create an account, update your profile,
            or communicate with other users.
          </p>

          <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to provide, maintain, and improve our services, as well as to communicate
            with you.
          </p>

          <h2 className="text-xl font-semibold mb-2">3. Information Sharing and Disclosure</h2>
          <p className="mb-4">
            We do not share your personal information with third parties except as described in this policy.
          </p>

          <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
          <p className="mb-4">
            We take reasonable measures to help protect your personal information from loss, theft, misuse, and
            unauthorized access.
          </p>

          <h2 className="text-xl font-semibold mb-2">5. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new
            privacy policy on this page.
          </p>

          <p className="mt-6">If you have any questions about this Privacy Policy, please <Link to="/contact-us" className="text-blue-600 hover:underline">contact us</Link>.</p>
        </div>
      </div>
    </div>
  )
}

