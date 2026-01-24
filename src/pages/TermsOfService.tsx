
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const TermsOfService = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg">
          <p>
            Welcome to Karigar. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully before using our services.
          </p>
          <p>
            These terms govern your access to and use of all content, products and services available at https://karigar.com (the “Service”), operated by Karigar. Your access to our services is conditioned upon your acceptance of and compliance with these Terms.
          </p>
          <p>
            We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;

