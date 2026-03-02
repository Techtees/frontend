'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';

const ContactUsView = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details1: '+234 703 330 3854',
      details2: '+234 913 678 0630',
      subDetails: 'Mon-Fri 8am-6pm'
    },
    {
      icon: Mail,
      title: 'Email',
      details1: 'support@nbioteklabs.com',
      details2: 'info@nbioteklabs.com',
      subDetails: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Adaba Road off Akure-Ilesha Expressway, Ibule, Akure, Ondo State, Nigeria',
      subDetails: 'Visit our diagnostic center'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Monday - Friday',
      subDetails: '8:00 AM - 6:00 PM'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-400/70 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Contact Us</h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl">
              Have questions? We&apos;re here to help. Reach out to our team for any inquiries about
              our services.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="to-purple-100 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100">
                <info.icon className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-gray-900 mb-2 text-lg font-semibold">{info.title}</h3>
              {info.details && <p className="text-gray-800 font-medium">{info.details}</p>}
              <p className="text-gray-800 font-medium">{info.details1}</p>
              <p className="text-gray-800 font-medium">{info.details2}</p>
              <p className="text-gray-500 mt-1 text-sm">{info.subDetails}</p>
            </div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-xl bg-white p-8 shadow-lg">
            <div className="mb-6">
              <h2 className="text-gray-900 mb-2 text-3xl font-bold">Send Us a Message</h2>
              <p className="text-gray-600">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="text-gray-700 mb-2 block text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border-gray-300 focus:ring-blue-500 w-full rounded-lg border px-4 py-3 transition focus:border-transparent focus:ring-2"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="email" className="text-gray-700 mb-2 block text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-gray-300 focus:ring-blue-500 w-full rounded-lg border px-4 py-3 transition focus:border-transparent focus:ring-2"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="text-gray-700 mb-2 block text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border-gray-300 focus:ring-blue-500 w-full rounded-lg border px-4 py-3 transition focus:border-transparent focus:ring-2"
                    placeholder="+234 123 456 7890"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="text-gray-700 mb-2 block text-sm font-medium">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="border-gray-300 focus:ring-blue-500 w-full rounded-lg border px-4 py-3 transition focus:border-transparent focus:ring-2"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="diagnostics">Diagnostic Services</option>
                  <option value="telehealth">Telehealth Consultation</option>
                  <option value="research">Research & Development</option>
                  <option value="support">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="text-gray-700 mb-2 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="border-gray-300 focus:ring-blue-500 w-full resize-none rounded-lg border px-4 py-3 transition focus:border-transparent focus:ring-2"
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              <button
                type="submit"
                className="hover:from-blue-700 hover:to-purple-700 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-400 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
              >
                Send Message
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            <div className=" rounded-xl bg-blue-200 p-8 text-white">
              <div className="mb-6">
                <MessageSquare className="mb-4 h-12 w-12" />
                <h3 className="mb-2 text-2xl font-bold">Let&apos;s Connect</h3>
                <p className="text-white/60">
                  We&apos;re committed to providing excellent service and support to all our
                  patients and partners.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="mb-1 font-semibold">Quick Response</h4>
                  <p className="text-sm  text-white/60">
                    Our team typically responds within 24 hours on business days.
                  </p>
                </div>

                <div>
                  <h4 className="mb-1 font-semibold">Expert Support</h4>
                  <p className="text-sm text-white/60">
                    Connect with our healthcare professionals for specialized inquiries.
                  </p>
                </div>

                <div>
                  <h4 className="mb-1 font-semibold">Visit Us</h4>
                  <p className="text-sm text-white/60">
                    Schedule an appointment to visit our state-of-the-art facilities.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h3 className="text-gray-900 mb-4 text-xl font-bold">Frequently Asked</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-gray-900 mb-1 font-semibold">
                    How long do test results take?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Most results are available within 24-48 hours through our digital platform.
                  </p>
                </div>

                <div>
                  <h4 className="text-gray-900 mb-1 font-semibold">
                    Do you offer telehealth services?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Yes, we provide virtual consultations for result interpretation and health
                    guidance.
                  </p>
                </div>

                <div>
                  <h4 className="text-gray-900 mb-1 font-semibold">Where are you located?</h4>
                  <p className="text-gray-600 text-sm">
                    We have multiple diagnostic centers across Lagos, Nigeria.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsView;
