
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg">
          <p>
            At Karigar, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
          <p>
            We collect personal information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our products and services, when you participate in activities on the platform, or otherwise when you contact us.
          </p>
          <p>
            Your privacy is important to us, and we strive to be transparent about our data practices. We do not share your personal information with third parties without your explicit consent.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;

