import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  HeadphonesIcon,
  Building,
  Users,
  Heart,
  Globe,
  Send,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  Zap,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
    phone: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setIsSubmitted(true);
    // TODO: Implement actual form submission
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "General inquiries and support",
      value: "aapnaghar@annadaan.org",
      action: "mailto:aapnaghar@annadaan.org",
      color: "bg-blue-100 text-blue-600",
      available: "24/7",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Urgent matters and quick help",
      value: "+91 6207651819",
      action: "tel:+916207651819",
      color: "bg-green-100 text-green-600",
      available: "9 AM - 6 PM IST",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      description: "Quick questions and updates",
      value: "+91 6207651819",
      action: "https://wa.me/916207651819",
      color: "bg-green-100 text-green-600",
      available: "9 AM - 9 PM IST",
    },
    {
      icon: HeadphonesIcon,
      title: "Live Chat",
      description: "Real-time assistance",
      value: "Start Chat",
      action: "#",
      color: "bg-purple-100 text-purple-600",
      available: "9 AM - 6 PM IST",
    },
  ];

  const officeLocations = [
    {
      city: "New Garia",
      address: "Garia ,Techno City, Ranabhutia, West Bengal 700152",
      phone: "+91 6207651819",
      email: "Gariakolkata@annadaan.org",
      type: "Headquarters",
      hours: "Mon-Fri: 9 AM - 6 PM IST",
    },
    {
      city: "Siwan",
      address: "Maharajganj, Siwan, Bihar 841238",
      phone: "+91 9128364783",
      email: "siwan@annadadaan.org",
      type: "Regional Office",
      hours: "Mon-Fri: 9 AM - 6 PM IST",
    },
    {
      city: "Patna",
      address: "Floor 3 shree Appartment, Near Zoo , Patna, Bihar 841238",
      phone: "+91 6207651819",
      email: "patna@annadaan.org",
      type: "Tech Hub",
      hours: "Mon-Fri: 9 AM - 6 PM IST",
    },
  ];

  const faqCategories = [
    {
      icon: Users,
      title: "For Donors",
      description: "Questions about food donation process and how your generosity feeds those in need",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: Heart,
      title: "For Volunteers",
      description: "Help with volunteer registration and activities that bring hope to hungry hearts",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Building,
      title: "For NGOs",
      description: "Partnership and collaboration inquiries to expand our impact together",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Globe,
      title: "General",
      description: "Learn about our mission, platform features, and how you can support Annadaan",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-800 mb-4">
              Message Sent Successfully!
            </h1>
            <p className="text-lg text-green-700 mb-6">
              Thank you for reaching out to us. We've received your message and
              will get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                Send Another Message
              </Button>
              <Button className="border border-gray-300 bg-white text-gray-900 hover:bg-gray-100" asChild>
                <a href="/">Back to Home</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://cdn.builder.io/api/v1/image/assets%2Fc8e502a783604533b5c478ab95726ead%2Fff7c08e6ab08488db7b1a337d05f9a55?format=webp&width=800)",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get in{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Have questions? Need support? Want to partner with us? We're here to
            help you make a difference in fighting hunger and food waste.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Can We Help You?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the best way to reach us based on your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6">
                  <div
                    className={`${method.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
                  >
                    <method.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {method.description}
                  </p>
                  <p className="font-semibold text-gray-900 mb-2">
                    {method.value}
                  </p>
                  <Badge className="text-xs border border-gray-300 bg-white text-gray-900">
                    {method.available}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-orange-600">
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+91 6207651819"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("category", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="donor">
                            Food Donor Support
                          </SelectItem>
                          <SelectItem value="volunteer">
                            Volunteer Support
                          </SelectItem>
                          <SelectItem value="ngo">NGO Partnership</SelectItem>
                          <SelectItem value="technical">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="media">Media Inquiries</SelectItem>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                      placeholder="Brief subject of your message"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder="Please describe how we can help you..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Quick Support */}
              <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-700">
                    <Zap className="mr-2 h-5 w-5" />
                    Need Immediate Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 rounded-full p-2">
                      <Phone className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-orange-800">
                        Emergency Hotline
                      </p>
                      <p className="text-sm text-orange-600">
                        +91 6207651819 (24/7)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 rounded-full p-2">
                      <MessageSquare className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-orange-800">
                        WhatsApp Support
                      </p>
                      <p className="text-sm text-orange-600">
                        Quick response guaranteed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="mr-2 h-5 w-5" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription>
                    Find quick answers to common questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {faqCategories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <div className={`${category.color} rounded-lg p-2`}>
                        <category.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {category.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Response Times */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-700">
                    <Clock className="mr-2 h-5 w-5" />
                    Response Times
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600">
                      General Inquiries
                    </span>
                    <Badge className="bg-blue-100 text-blue-800">
                      Within 24 hours
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600">
                      Technical Support
                    </span>
                    <Badge className="bg-blue-100 text-blue-800">
                      Within 4 hours
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600">
                      Emergency Issues
                    </span>
                    <Badge className="bg-red-100 text-red-800">
                      Within 1 hour
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Offices
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit us at our physical locations across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{office.city}</CardTitle>
                    <Badge
                      className={
                        office.type === "Headquarters"
                          ? "bg-orange-600 text-white"
                          : "bg-white text-orange-600 border border-orange-600"
                      }
                    >
                      {office.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <p className="text-sm text-gray-600">{office.address}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-600">{office.phone}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-600">{office.email}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-600">{office.hours}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 bg-amber-50 border-t border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-4">
            <Info className="h-6 w-6 text-amber-600 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">
                Important Notice
              </h3>
              <p className="text-amber-700 leading-relaxed">
                For time-sensitive food donations or emergency situations,
                please call our hotline directly at
                <span className="font-semibold"> +91 6207651819</span>. Our
                emergency response team is available 24/7 to ensure no food goes
                to waste and reaches those in need quickly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
