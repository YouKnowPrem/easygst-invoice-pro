
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, FileText, Calculator, Bell, Sparkles } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        navigate('/dashboard');
      }
    };
    checkUser();
  }, [navigate]);

  const features = [
    {
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      title: "GST-Compliant Invoices",
      description: "Generate professional invoices with GSTIN, HSN/SAC codes, and proper tax calculations"
    },
    {
      icon: <Calculator className="h-6 w-6 text-green-600" />,
      title: "Auto GST Calculations",
      description: "Automatically calculate CGST, SGST, IGST with monthly GSTR summaries"
    },
    {
      icon: <Bell className="h-6 w-6 text-orange-600" />,
      title: "Filing Reminders",
      description: "Never miss GSTR-1 and GSTR-3B deadlines with automated email reminders"
    },
    {
      icon: <Zap className="h-6 w-6 text-purple-600" />,
      title: "Quick Export",
      description: "Download invoices as PDF and export reports to Excel/CSV instantly"
    }
  ];

  const pricingTiers = [
    {
      name: "Free",
      price: "₹0",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "2 invoices per month",
        "Basic GST calculations",
        "Client management",
        "Email reminders"
      ],
      buttonText: "Start Free",
      highlighted: false
    },
    {
      name: "Pro",
      price: "₹199",
      period: "/month",
      description: "For growing businesses",
      features: [
        "Unlimited invoices",
        "Advanced reporting",
        "Export to Excel/CSV",
        "Priority support",
        "Custom branding"
      ],
      buttonText: "Start Pro",
      highlighted: true
    },
    {
      name: "Agency",
      price: "₹499",
      period: "/month",
      description: "White-label solution",
      features: [
        "Everything in Pro",
        "Remove EasyGST branding",
        "Custom domain support",
        "Multi-user access",
        "API access"
      ],
      buttonText: "Start Agency",
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">EasyGST</h1>
            <Badge variant="secondary" className="ml-2">Beta</Badge>
          </div>
          <Button onClick={() => setShowAuthModal(true)} className="bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Built specifically for Indian businesses
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            GST-Ready Invoicing for<br />
            <span className="text-blue-600">Indian Freelancers</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Generate professional GST-compliant invoices in seconds. Track income, expenses, 
            and never miss a GSTR filing deadline again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => setShowAuthModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
            >
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              Watch Demo
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>CA Approved Format</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>GSTN Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Secure & Encrypted</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for GST Compliance
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Designed by Indian entrepreneurs, for Indian businesses. 
              Handle your GST requirements with confidence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, scale as you grow. No hidden charges.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative ${tier.highlighted ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200'}`}>
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-6 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-gray-500">{tier.period}</span>
                  </div>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${tier.highlighted ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                    onClick={() => setShowAuthModal(true)}
                  >
                    {tier.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Simplify Your GST Compliance?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Indian businesses already using EasyGST
          </p>
          <Button 
            size="lg" 
            onClick={() => setShowAuthModal(true)}
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
          >
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold">EasyGST</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Making GST compliance easy for Indian businesses
          </p>
          <p className="text-sm text-gray-500">
            © 2024 EasyGST. All rights reserved. | Built with ❤️ in India
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          navigate('/dashboard');
        }}
      />
    </div>
  );
};

export default Index;
