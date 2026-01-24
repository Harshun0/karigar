
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';

const Contact = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg">
          <p className="text-center mb-6">
            We'd love to hear from you! Please fill out the form below or reach out to us using the contact details provided.
          </p>
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Your Name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Your Email" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your Message" rows={5} />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
          <div className="text-center mt-8 space-y-2">
            <p><strong>Email:</strong> support@karigar.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Karigar Street, Craftsville, KRG 78901</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;

