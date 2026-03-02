import { Metadata } from 'next';
import { Stethoscope, Users, Award, MapPin, Video, Microscope, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | NBiotek Labs',
  description:
    "At NBIOTEK LABS, our patient's best interest is the only interest that matters. Discover our commitment to delivering world-class diagnostic services with integrity, innovation, and excellence.",
  keywords:
    'NBiotek Labs, medical diagnostics, laboratory services, healthcare, Nigeria, telehealth, research and development, medical testing, patient care'
};

const teamMembers = [
  {
    id: 1,
    name: 'Dr. Tolu Ajayi',
    title: 'Co-Founder, NBIOTEK LABS',
    image: '/tolu.png',
    bio: "Dr. Tolu Ajayi is a trailblazing Researcher and Data Scientist whose work sits at the intersection of advanced analytics, technological innovation, and scientific discovery. He holds a Master's degree in Engineering from the prestigious University of Durham in the United Kingdom and a PhD in Physics from Ohio University, USA. Before co-founding NBIOTEK LABS, Dr. Ajayi served as a Research Associate at Argonne National Laboratory—one of America's leading science and engineering research institutions—where his work contributed to high-impact discoveries published in world-renowned journals, including Nature. With a strong career as a Data Scientist and an exceptional record of research excellence, he brings a unique blend of scientific rigor, innovation, and real-world problem-solving to the mission of transforming diagnostics and research in Nigeria. Dr. Ajayi is driven by a passion to build systems that empower healthcare providers, advance scientific research, and improve lives through precision, technology, and data-driven insight."
  },
  {
    id: 2,
    name: 'Dr Folusho Ajayi',
    title: 'Co-Founder, NBIOTEK LABS',
    image: '/folu.png',
    bio: 'Dr Folusho Ajayi is a co-founder of NBIOTEK laboratories. he is a dynamic microbiologist with extensive academic, industrial, and research experience spanning microbiology, molecular biology, and biotechnology. He holds a Bachelor, Masters and a Ph.D. degree in applied Microbiology and Biotechnology. He has over a decade of combined experience in laboratory research, university teaching, medical device sterilization and quality control. He is passionate about application of low-cost molecular diagnostic techniques in healthcare and plant based edible vaccines. He currently resides in Brockton, Massachusetts.'
  },
  {
    id: 3,
    name: 'Mr. Anthony Taiwo',
    title: 'Co-Founder, NBIOTEK LABS',
    image: '/inec.png',
    bio: "Anthony Taiwo is a senior Treasury and Payments Consultant with a proven record supporting major financial institutions, including Deloitte Canada and the Bank of Canada. He brings deep expertise in treasury operations, large-value payment systems, and enterprise payment modernization, helping organizations strengthen liquidity governance, cash-management structures, and risk-control frameworks. Alongside his financial leadership experience, Anthony is deeply passionate about improving healthcare outcomes across Africa. He is committed to advancing initiatives that enhance healthcare financing, streamline funding and payment channels, and support sustainable, accessible healthcare systems throughout the continent. His work is driven by a belief that modern financial infrastructure and effective liquidity management are foundational to sustainable, equitable healthcare delivery in Africa. He holds a master's degree in economics from the University of Windsor in Ontario, Canada, along with the Certified Treasury Professional (CTP) designation. Known for his strategic judgment, disciplined execution, and ability to navigate complex financial environments, Anthony provides clear leadership and trusted advisory support to organizations operating at scale and in service of public well-being."
  },
  {
    id: 4,
    name: 'Mr. Bankole Ajayi',
    title: 'Co-Founder, NBIOTEK LABS',
    image: '/kole.png',
    bio: "Bankole Ajayi is an accomplished technology and project management leader with over 15 years of experience driving complex digital transformation initiatives across diverse industries. As a PMP® and SAFe® certified professional, Bankole brings expertise in aligning advanced technologies with strategic business goals—skills that are critical in the fast-evolving biotech landscape. His background includes managing enterprise-scale IT projects, implementing innovative digital solutions, and optimizing processes for efficiency and scalability. Bankole's ability to lead cross-functional teams and deliver high-impact technology solutions positions him as a key contributor to NBiotek Labs' mission of leveraging cutting-edge science and technology to improve health outcomes."
  },
  {
    id: 5,
    name: 'Dr. Seyi Ajayi',
    title: 'Co-Founder, NBIOTEK LABS',
    image: '/seyi.png',
    bio: 'Dr. Oluwaseyi Ajayi is a cybersecurity innovator and academic leader with extensive expertise in securing digital systems across healthcare environments. He is the CEO of SWYFTNG and currently serves as the Activity Director and Assistant Professor of Computer Engineering (with Cybersecurity) at Vaughn College of Aeronautics and Technology, where he develops next-generation cybersecurity curricula, leads applied research initiatives, and mentors emerging professionals in network security, cloud architecture, and cyber defense technologies. His approach merges scientific depth with operational practicality, enabling healthcare professionals and organizations to strengthen their resilience against modern cyber threats. A recognized researcher and U.S. patent holder, Dr. Ajayi has developed blockchain-based architectures and cybersecurity frameworks that enhance secure patient data exchange, protect critical healthcare infrastructure, and strengthen resilience against insider and external threats. His contributions include a granted U.S. patent in cybersecurity and a patent disclosure for a blockchain-secured inter-healthcare electronic health record exchange. Dr. Ajayi holds a Ph.D. in Electrical Engineering from The City College of New York, an M.S. in Communication Engineering from the University of Manchester, and a B.Tech. in Physics with first-class honors. With a proven record of innovation, thought leadership, and cross-sector collaboration, he brings a mission-driven approach to advancing secure, compliant, and patient-centered digital transformation across medical diagnostics and research in Nigeria.'
  },
  {
    id: 6,
    name: 'Mr. Oladimeji Ajayi',
    title: 'General Manager, NBIOTEK LABS',
    image: '/dimeji.png',
    bio: 'As the Laboratory General Manager, Oladimeji demonstrates strong competence in leading multidisciplinary teams and overseeing multi-million-naira budgets. Trained in parasitology and now transitioning into Biotechnology and Molecular Diagnostics, he is driven by a clear vision to bridge complex scientific concepts with operational excellence. He leverages deep expertise in pathogen biology and host–parasite interactions to advance the development of innovative molecular tools for disease detection. Oladimeji is committed to applying advanced biotechnological frameworks—particularly PCR-based assay development—to address complex diagnostic challenges in infectious disease research and clinical diagnostics.'
  }
];

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="to-blue-800 bg-gradient-to-r from-blue-400 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">About NBIOTEK LABS</h1>
            <p className="mx-auto max-w-3xl text-xl md:text-2xl">
              Our patient&apos;s best interest is the only interest that matters
            </p>
          </div>
        </div>
      </div>

      {/* Main About Us Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-lg mx-auto max-w-none">
          <div className="mb-12 rounded-lg bg-white p-8 shadow-lg">
            {/* <div className="mb-6 flex items-center justify-center">
              <Heart className="text-blue-600 mr-3 h-12 w-12" />
            </div> */}
            <p className="text-gray-700 mb-6 text-center text-lg leading-relaxed">
              At NBIOTEK LABS, we are guided by a simple but powerful belief:{' '}
              <strong>Our patient&apos;s best interest is the only interest that matters.</strong>
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              This principle shapes every aspect of our work driving us to deliver solutions with
              integrity, innovation and excellence while always placing patient care at the center
              with compassion, precision, and personal touch. We aim to leave a lasting positive
              impact on every life we touch.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We believe that accurate and timely diagnostics are the foundation of effective
              healthcare. That&apos;s why we are committed to delivering world-class laboratory
              services using modern medical technologies in a warm and supportive environment.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our dedicated team combines deep expertise and advanced technologies to provide
              precise and reliable diagnostic solutions. Every test, every result, and every
              interaction is handled with care ensuring that healthcare providers and patients
              receive the information they need to make confident and informed decisions.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Through global partnerships and continuous innovation, NBIOTEK LABS is bringing
              cutting-edge diagnostics closer to home, making high-quality laboratory services
              accessible, affordable and trustworthy.
            </p>
            <p className="text-gray-700 text-center font-semibold leading-relaxed">
              We strive to redefine the standards of diagnostic excellence because we believe
              healthcare should begin with clarity, compassion and accuracy.
            </p>
          </div>
        </div>
      </div>

      {/* Telehealth Section */}
      <div className="to-indigo-50 bg-gradient-to-br from-blue-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-center">
              <Video className="text-blue-600 mr-4 h-10 w-10" />
              <h2 className="text-gray-900 text-3xl font-bold">Telehealth</h2>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              In today&apos;s fast-changing world, healthcare must be accessible anytime, anywhere.
              At NBIOTEK LABS, our Telehealth services bridge the gap and distance between
              diagnostics and medical care.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Through our secure digital platform, patients and healthcare providers can:
            </p>
            <ul className="text-gray-700 mb-6 space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">✓</span>
                <span>Access test results remotely.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">✓</span>
                <span>Consult with licensed physicians and specialists for interpretation.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">✓</span>
                <span>Receive personalized guidance on treatment options.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">✓</span>
                <span>Track health history over time for better long-term care.</span>
              </li>
            </ul>
            <p className="text-gray-700 font-medium leading-relaxed">
              By integrating diagnostics with virtual care, we make healthcare more seamless,
              convenient, and patient-centered.
            </p>
          </div>
        </div>
      </div>

      {/* Research & Development Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="from-purple-50 to-pink-50 rounded-lg bg-gradient-to-br p-8 shadow-xl">
            <div className="mb-6 flex items-center">
              <Microscope className="text-purple-600 mr-4 h-10 w-10" />
              <h2 className="text-gray-900 text-3xl font-bold">Research & Development</h2>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Beyond diagnostics, NBIOTEK LABS is also committed to advancing science, education,
              and innovation. Our Research & Development arm provides a collaborative platform for
              students, researchers and institutions.
            </p>
            <div className="mb-6">
              <h3 className="text-gray-900 mb-4 text-xl font-semibold">We:</h3>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 mt-1">•</span>
                  <span>
                    Offer state-of-the-art laboratory facilities for molecular biology,
                    biotechnology, and medical research.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 mt-1">•</span>
                  <span>
                    Partner with universities, research centers, and healthcare providers to design
                    and execute impactful studies.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 mt-1">•</span>
                  <span>
                    Support students and faculty with mentorship, training, and access to equipment.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 mt-1">•</span>
                  <span>
                    Drive innovation by exploring new diagnostic techniques and medical solutions
                    tailored to the African healthcare landscape.
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-gray-700 font-medium leading-relaxed">
              With R&D, we are building a future where Nigeria not only benefits from global
              discoveries but also contributes homegrown innovations to the world of science and
              medicine.
            </p>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-gray-900 mb-4 text-3xl font-bold">Meet Our Team</h2>
            <p className="text-gray-600 mx-auto max-w-2xl text-xl">
              Our dedicated professionals are committed to delivering excellence in diagnostic
              services and patient care
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="bg-gray-200 aspect-square w-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-gray-900 mb-1 text-xl font-bold">{member.name}</h3>
                  <p className="text-blue-600 mb-3 text-sm font-semibold">{member.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Team Group Photo */}
          <div className="mt-16">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img src="/team.jpg" alt="NBIOTEK LABS Team" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Locations */}
      <div className="bg-gray-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-gray-900 mb-4 text-3xl font-bold">Our Locations</h2>
            <p className="text-gray-600 text-xl">
              Serving communities across Nigeria with convenient access to quality healthcare
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-2 flex items-center">
                <MapPin className="text-blue-600 mr-2 h-5 w-5" />
                <h3 className="font-semibold">Ondo</h3>
              </div>
              <p className="text-gray-600 text-sm">
                our main branch located in the heart of Ondo city
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-2 flex items-center">
                <MapPin className="text-blue-600 mr-2 h-5 w-5" />
                <h3 className="font-semibold">Ondo</h3>
              </div>
              <p className="text-gray-600 text-sm">
                our main branch located in the heart of Ondo city
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-2 flex items-center">
                <MapPin className="text-blue-600 mr-2 h-5 w-5" />
                <h3 className="font-semibold">Ondo</h3>
              </div>
              <p className="text-gray-600 text-sm">
                our main branch located in the heart of Ondo city
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-blue-400 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl">
            Contact us today to learn more about our services or schedule your appointment
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="hover:bg-gray-100 rounded-lg bg-white px-8 py-3 font-semibold text-blue-400 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="/patient/appointment/booking"
              className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-blue-400"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
