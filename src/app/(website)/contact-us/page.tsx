import { Metadata } from 'next';
import ContactUsView from './ContactUsView';

export const metadata: Metadata = {
  title: 'Contact Us | NBiotek Labs',
  description:
    'Get in touch with NBIOTEK LABS. We&apos;re here to answer your questions about our diagnostic services, telehealth consultations, and research facilities.',
  keywords:
    'contact NBiotek Labs, customer support, healthcare inquiries, medical laboratory contact'
};

const ContactUsPage = () => {
  return <ContactUsView />;
};

export default ContactUsPage;
