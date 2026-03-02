import { Metadata } from 'next';
import PrivacyPolicyView from './PrivacyPolicyView';

export const metadata: Metadata = {
  title: 'Privacy Policy | NBiotek Labs',
  description:
    'Learn how NBIOTEK LABS collects, uses, and protects your personal and health information. Our commitment to your privacy and data security.',
  keywords:
    'privacy policy, data protection, HIPAA compliance, medical data security, patient privacy'
};

const PrivacyPolicyPage = () => {
  return <PrivacyPolicyView />;
};

export default PrivacyPolicyPage;
