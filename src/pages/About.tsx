
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const About = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">About Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg">
          <p>
            Welcome to Karigar, your trusted platform for connecting with skilled workers for all your home and business needs. 
            We believe in empowering local talent and providing seamless, reliable services to our community.
          </p>
          <p>
            Our mission is to simplify the process of finding and hiring professionals. Whether you need a plumber, electrician, 
            carpenter, or any other skilled service, Karigar brings the best local experts right to your fingertips. 
            We are committed to quality, transparency, and customer satisfaction.
          </p>
          <p>
            At Karigar, we foster a community where workers can showcase their expertise and find fulfilling opportunities, 
            while customers can easily access high-quality, vetted services. Join us in building a stronger, more connected community.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;

