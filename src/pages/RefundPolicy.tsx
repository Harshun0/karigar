
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const RefundPolicy = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">Refund Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg">
          <p>
            At Karigar, we strive to ensure your satisfaction with our services. This Refund Policy outlines the conditions under which refunds may be issued.
          </p>
          <p>
            If you are not satisfied with a service received through our platform, you may be eligible for a refund or a credit towards future services. All refund requests must be submitted within 7 days of service completion.
          </p>
          <p>
            Please note that certain services may have specific refund terms which will be communicated to you at the time of booking. We encourage you to review all terms before confirming a service.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RefundPolicy;

