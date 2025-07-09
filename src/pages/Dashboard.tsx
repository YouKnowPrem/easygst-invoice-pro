
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calculator,
  Bell,
  Download,
  Settings,
  LogOut,
  IndianRupee,
  Calendar,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for dashboard
  const [dashboardData, setDashboardData] = useState({
    invoicesThisMonth: 5,
    invoiceLimit: 2, // Based on free tier
    totalIncome: 45000,
    totalExpenses: 12000,
    netGST: 3240,
    clients: 8,
    pendingInvoices: 2
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/');
      return;
    }
    setUser(user);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const currentMonth = new Date().toLocaleString('en-IN', { month: 'long', year: 'numeric' });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EasyGST</h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.user_metadata?.full_name || 'User'}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Free Plan
              </Badge>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Invoices This Month</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.invoicesThisMonth}</div>
              <div className="flex items-center justify-between mt-2">
                <Progress value={(dashboardData.invoicesThisMonth / dashboardData.invoiceLimit) * 100} className="w-full mr-2" />
                <span className="text-xs text-muted-foreground">
                  {dashboardData.invoicesThisMonth}/{dashboardData.invoiceLimit}
                </span>
              </div>
              {dashboardData.invoicesThisMonth >= dashboardData.invoiceLimit && (
                <p className="text-xs text-red-600 mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Limit reached - Upgrade to Pro
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <IndianRupee className="h-5 w-5" />
                {dashboardData.totalIncome.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <IndianRupee className="h-5 w-5" />
                {dashboardData.totalExpenses.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-muted-foreground">
                -5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net GST Payable</CardTitle>
              <Calculator className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <IndianRupee className="h-5 w-5" />
                {dashboardData.netGST.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-muted-foreground">
                For {currentMonth}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Button 
                  className="h-24 flex-col space-y-2"
                  onClick={() => navigate('/invoices/new')}
                  disabled={dashboardData.invoicesThisMonth >= dashboardData.invoiceLimit}
                >
                  <Plus className="h-6 w-6" />
                  <span>New Invoice</span>
                </Button>
                
                <Button variant="outline" className="h-24 flex-col space-y-2">
                  <Users className="h-6 w-6" />
                  <span>Add Client</span>
                </Button>
                
                <Button variant="outline" className="h-24 flex-col space-y-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>Add Income</span>
                </Button>
                
                <Button variant="outline" className="h-24 flex-col space-y-2">
                  <TrendingDown className="h-6 w-6" />
                  <span>Add Expense</span>
                </Button>
                
                <Button variant="outline" className="h-24 flex-col space-y-2">
                  <Download className="h-6 w-6" />
                  <span>Export Data</span>
                </Button>
                
                <Button variant="outline" className="h-24 flex-col space-y-2">
                  <Calculator className="h-6 w-6" />
                  <span>GST Summary</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-red-800">GSTR-1 Filing</p>
                  <p className="text-xs text-red-600">Due: 11th Jan 2024</p>
                </div>
                <Badge variant="destructive" className="text-xs">5 days</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-yellow-800">GSTR-3B Filing</p>
                  <p className="text-xs text-yellow-600">Due: 20th Jan 2024</p>
                </div>
                <Badge variant="secondary" className="text-xs bg-yellow-200 text-yellow-800">14 days</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">INV-2024-00{index + 1}</p>
                          <p className="text-sm text-gray-500">Client Name • 2 days ago</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{(15000 + index * 5000).toLocaleString('en-IN')}</p>
                          <Badge variant="secondary" className="text-xs">Paid</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>GST Summary - {currentMonth}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Output GST (Sales)</span>
                      <span className="font-medium">₹8,100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Input GST (Purchases)</span>
                      <span className="font-medium">₹4,860</span>
                    </div>
                    <hr />
                    <div className="flex justify-between items-center font-bold">
                      <span>Net GST Payable</span>
                      <span className="text-blue-600">₹3,240</span>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download GST Summary
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <CardTitle>All Invoices</CardTitle>
                <CardDescription>Manage your invoices and track payments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Invoice management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle>Client Management</CardTitle>
                <CardDescription>Manage your client information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Client management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
                <CardDescription>Export your financial data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Reports and analytics coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Upgrade Prompt */}
        {dashboardData.invoicesThisMonth >= dashboardData.invoiceLimit && (
          <Card className="mt-8 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800">Upgrade to Pro</CardTitle>
              <CardDescription className="text-blue-600">
                You've reached your free plan limit. Upgrade to Pro for unlimited invoices and advanced features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Upgrade to Pro - ₹199/month
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
