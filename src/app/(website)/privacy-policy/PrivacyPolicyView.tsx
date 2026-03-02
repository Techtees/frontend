'use client';

import { Shield, Lock, Eye, FileText, UserCheck, Globe, AlertCircle, Mail } from 'lucide-react';

const PrivacyPolicyView = () => {
  const sections = [
    {
      icon: FileText,
      title: 'Information We Collect',
      content: [
        'Personal identification information (name, email, phone number, address)',
        'Medical and health information related to diagnostic tests',
        'Payment and billing information',
        'Device information and IP addresses when you use our platform',
        'Cookies and usage data to improve our services'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'To provide diagnostic and healthcare services',
        'To process test requests and deliver results securely',
        'To facilitate telehealth consultations with healthcare professionals',
        'To improve our services and develop new features',
        'To communicate important updates about your health and our services',
        'To comply with legal and regulatory requirements'
      ]
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'We use industry-standard encryption to protect your data',
        'All health information is stored in HIPAA-compliant secure servers',
        'Access to personal data is restricted to authorized personnel only',
        'Regular security audits and updates to our systems',
        'Secure transmission protocols for all sensitive information'
      ]
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: [
        'Access and review your personal and health information',
        'Request corrections to inaccurate information',
        'Request deletion of your data (subject to legal requirements)',
        'Opt-out of marketing communications at any time',
        'Withdraw consent for data processing where applicable',
        'Request a copy of your data in a portable format'
      ]
    },
    {
      icon: Globe,
      title: 'Information Sharing',
      content: [
        'We do not sell your personal information to third parties',
        'Information may be shared with healthcare providers involved in your care',
        'We may share data with service providers who assist in our operations',
        'Legal authorities when required by law or to protect rights and safety',
        'Research institutions for anonymized studies (with your explicit consent)'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Data Retention',
      content: [
        'Medical records are retained as required by Nigerian healthcare regulations',
        'Personal information is kept as long as necessary to provide services',
        'You may request deletion of non-essential data at any time',
        'Billing and payment information retained for tax and legal purposes',
        'Anonymized data may be retained for research and quality improvement'
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="to-purple-600 bg-gradient-to-r from-blue-400 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 flex justify-center"></div>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Privacy Policy</h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl">
              Your privacy and data security are our top priorities. Learn how we protect your
              information.
            </p>
            <p className="mt-4 text-sm text-blue-300">Last Updated: December 3, 2025</p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 rounded-xl bg-white p-8 shadow-lg">
          <h2 className="text-gray-900 mb-4 text-2xl font-bold">Our Commitment to Your Privacy</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            At NBIOTEK LABS, we are committed to protecting your privacy and ensuring the security
            of your personal and health information. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our diagnostic services,
            telehealth platform, and website.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We comply with all applicable Nigerian data protection laws and international standards,
            including HIPAA guidelines for health information protection. By using our services, you
            consent to the practices described in this policy.
          </p>
        </div>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="rounded-xl bg-white p-8 shadow-lg">
              <div className="mb-6 flex items-start gap-4">
                <div className="to-purple-100 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100">
                  <section.icon className="text-blue-600 h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold">{section.title}</h3>
                </div>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-400" />
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cookies Policy */}
        <div className="mt-8 rounded-xl bg-white p-8 shadow-lg">
          <h3 className="text-gray-900 mb-4 text-2xl font-bold">
            Cookies and Tracking Technologies
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            We use cookies and similar tracking technologies to enhance your experience on our
            platform. These technologies help us understand how you use our services and improve
            functionality.
          </p>
          <div className="mb-4 rounded-lg bg-blue-50 p-4">
            <h4 className="text-gray-900 mb-2 font-semibold">Types of Cookies We Use:</h4>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start">
                <div className="mr-2 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" />
                <span>
                  <strong>Essential Cookies:</strong> Required for platform functionality
                </span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" />
                <span>
                  <strong>Performance Cookies:</strong> Help us improve our services
                </span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" />
                <span>
                  <strong>Functional Cookies:</strong> Remember your preferences
                </span>
              </li>
            </ul>
          </div>
          <p className="text-gray-600 text-sm">
            You can control cookie preferences through your browser settings, though disabling
            certain cookies may affect platform functionality.
          </p>
        </div>

        {/* Third-Party Services */}
        <div className="mt-8 rounded-xl bg-white p-8 shadow-lg">
          <h3 className="text-gray-900 mb-4 text-2xl font-bold">Third-Party Services</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            We may use third-party service providers to help us operate our platform and deliver
            services. These providers have access only to the information necessary to perform their
            functions and are obligated to maintain confidentiality.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-gray-900 mb-2 font-semibold">Payment Processors</h4>
              <p className="text-gray-600 text-sm">
                Secure payment information handling through encrypted gateways
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-gray-900 mb-2 font-semibold">Cloud Storage</h4>
              <p className="text-gray-600 text-sm">
                HIPAA-compliant servers for secure data storage
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-gray-900 mb-2 font-semibold">Analytics Services</h4>
              <p className="text-gray-600 text-sm">Anonymized usage data to improve our platform</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-gray-900 mb-2 font-semibold">Communication Tools</h4>
              <p className="text-gray-600 text-sm">Secure messaging for telehealth consultations</p>
            </div>
          </div>
        </div>

        {/* Children's Privacy */}
        <div className="mt-8 rounded-xl bg-white p-8 shadow-lg">
          <h3 className="text-gray-900 mb-4 text-2xl font-bold">Children&apos;s Privacy</h3>
          <p className="text-gray-600 leading-relaxed">
            Our services are not directed to individuals under the age of 18. We do not knowingly
            collect personal information from children. If you are a parent or guardian and believe
            your child has provided us with personal information, please contact us immediately, and
            we will take steps to remove such information from our systems.
          </p>
        </div>

        {/* Policy Updates */}
        <div className="mt-8 rounded-xl bg-white p-8 shadow-lg">
          <h3 className="text-gray-900 mb-4 text-2xl font-bold">Changes to This Privacy Policy</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices
            or legal requirements. We will notify you of any material changes by posting the updated
            policy on our website and updating the &quot;Last Updated&quot; date.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We encourage you to review this Privacy Policy periodically to stay informed about how
            we protect your information. Your continued use of our services after any changes
            constitutes acceptance of the updated policy.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-8 rounded-xl bg-blue-400  p-8 text-white">
          <div className="flex items-start gap-4">
            <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-bold">Questions About Your Privacy?</h3>
              <p className="mb-6 leading-relaxed text-blue-100">
                If you have any questions, concerns, or requests regarding this Privacy Policy or
                our data practices, please don&apos;t hesitate to contact us. We&apos;re here to
                help and ensure your information is protected.
              </p>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Email: info@nbioteklabs.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Compliance */}
        <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <p className="text-gray-700 text-center text-sm">
            <strong>Legal Compliance:</strong> NBIOTEK LABS operates in compliance with Nigerian
            Data Protection Regulation (NDPR), HIPAA guidelines for health information, and
            international data protection standards. We are committed to maintaining the highest
            standards of privacy and security for all our patients and users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyView;
