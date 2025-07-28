import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Link2, 
  Send, 
  Copy, 
  Mail, 
  MessageSquare, 
  Phone,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  ArrowRight,
  Users,
  Globe,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Phase4URLGeneration = () => {
  const { toast } = useToast();
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [phoneEnabled, setPhoneEnabled] = useState(false);
  const [genericUrlEnabled, setGenericUrlEnabled] = useState(true);

  const invitedVendors = [
    {
      id: "tech-corp",
      name: "TechCorp Solutions",
      email: "contact@techcorp.com",
      phone: "+1 (555) 123-4567",
      personalizedUrl: "https://rfp.company.com/submit/tc-2025-001-5f8a9b",
      token: "tc-2025-001-5f8a9b",
      status: "sent",
      sentDate: "2025-01-20",
      lastAccessed: "2025-01-21",
      acknowledged: true
    },
    {
      id: "cloudtech",
      name: "CloudTech Inc",
      email: "hello@cloudtech.com",
      phone: "+1 (555) 987-6543",
      personalizedUrl: "https://rfp.company.com/submit/ct-2025-001-8d2c1e",
      token: "ct-2025-001-8d2c1e",
      status: "delivered",
      sentDate: "2025-01-20",
      lastAccessed: "2025-01-22",
      acknowledged: false
    },
    {
      id: "startup-tech",
      name: "StartupTech Solutions",
      email: "team@startuptech.com",
      phone: "+1 (555) 456-7890",
      personalizedUrl: "https://rfp.company.com/submit/st-2025-001-3a7f4b",
      token: "st-2025-001-3a7f4b",
      status: "pending",
      sentDate: null,
      lastAccessed: null,
      acknowledged: false
    },
    {
      id: "datasoft",
      name: "DataSoft Corporation",
      email: "info@datasoft.com",
      phone: "+1 (555) 321-0987",
      personalizedUrl: "https://rfp.company.com/submit/ds-2025-001-9e6d2a",
      token: "ds-2025-001-9e6d2a",
      status: "bounced",
      sentDate: "2025-01-20",
      lastAccessed: null,
      acknowledged: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent": return "status-badge active";
      case "delivered": return "status-badge evaluation";
      case "pending": return "status-badge draft";
      case "bounced": return "status-badge danger";
      case "opened": return "status-badge awarded";
      default: return "status-badge draft";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent": return <Send className="h-3 w-3" />;
      case "delivered": return <CheckCircle2 className="h-3 w-3" />;
      case "pending": return <Clock className="h-3 w-3" />;
      case "bounced": return <XCircle className="h-3 w-3" />;
      case "opened": return <Eye className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard" });
  };

  const sendInvitation = (vendorId: string) => {
    toast({ 
      title: "Invitation Sent", 
      description: "Vendor invitation has been sent successfully." 
    });
  };

  const resendInvitation = (vendorId: string) => {
    toast({ 
      title: "Invitation Resent", 
      description: "Vendor invitation has been resent." 
    });
  };

  const sentCount = invitedVendors.filter(v => v.status === "sent" || v.status === "delivered").length;
  const acknowledgedCount = invitedVendors.filter(v => v.acknowledged).length;
  const pendingCount = invitedVendors.filter(v => v.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Phase 4: URL Generation & Distribution</h1>
          <p className="text-muted-foreground">
            Generate personalized URLs and distribute invitations to selected vendors.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="status-badge active">
            Phase 4 of 10
          </Badge>
        </div>
      </div>

      {/* Distribution Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Vendors</p>
                <p className="text-2xl font-bold">{invitedVendors.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Send className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Invitations Sent</p>
                <p className="text-2xl font-bold">{sentCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <CheckCircle2 className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Acknowledged</p>
                <p className="text-2xl font-bold">{acknowledgedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted/10">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="configuration" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="configuration">URL Configuration</TabsTrigger>
          <TabsTrigger value="distribution">Distribution Status</TabsTrigger>
          <TabsTrigger value="tracking">Tracking & Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="configuration" className="space-y-6">
          {/* URL Configuration */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="h-5 w-5" />
                URL Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personalized URLs */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Personalized URLs for Invited Vendors
                </h3>
                <div className="bg-muted/20 p-4 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Base URL Pattern:</span>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard("https://rfp.company.com/submit/")}>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <code className="block text-sm bg-background p-3 rounded border">
                    https://rfp.company.com/submit/{"{token}"}
                  </code>
                  <p className="text-xs text-muted-foreground">
                    Each vendor receives a unique token for secure, personalized access.
                  </p>
                </div>
              </div>

              {/* Generic URL */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Generic URL for Open Submissions
                  </h3>
                  <Switch
                    checked={genericUrlEnabled}
                    onCheckedChange={setGenericUrlEnabled}
                  />
                </div>
                {genericUrlEnabled && (
                  <div className="bg-muted/20 p-4 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Public Submission URL:</span>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard("https://rfp.company.com/submit/open/rfp-2025-001")}>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <code className="block text-sm bg-background p-3 rounded border">
                      https://rfp.company.com/submit/open/rfp-2025-001
                    </code>
                    <p className="text-xs text-muted-foreground">
                      Public URL for vendors not in the initial selection to submit proposals.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Communication Settings */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle>Communication Channels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-sm text-muted-foreground">Primary notification method</p>
                    </div>
                  </div>
                  <Switch
                    checked={emailEnabled}
                    onCheckedChange={setEmailEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">SMS</h4>
                      <p className="text-sm text-muted-foreground">Quick notifications</p>
                    </div>
                  </div>
                  <Switch
                    checked={smsEnabled}
                    onCheckedChange={setSmsEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-sm text-muted-foreground">Follow-up calls</p>
                    </div>
                  </div>
                  <Switch
                    checked={phoneEnabled}
                    onCheckedChange={setPhoneEnabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-6">
          {/* Vendor Distribution Table */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle>Vendor Distribution Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Token</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Last Accessed</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invitedVendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{vendor.name}</p>
                          {vendor.acknowledged && (
                            <Badge variant="outline" className="text-xs">
                              Acknowledged
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{vendor.email}</p>
                          <p className="text-muted-foreground">{vendor.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {vendor.token}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => copyToClipboard(vendor.personalizedUrl)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(vendor.status)}>
                          {getStatusIcon(vendor.status)}
                          {vendor.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {vendor.sentDate || "-"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {vendor.lastAccessed || "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {vendor.status === "pending" ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => sendInvitation(vendor.id)}
                            >
                              <Send className="h-3 w-3 mr-1" />
                              Send
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => resendInvitation(vendor.id)}
                            >
                              <Send className="h-3 w-3 mr-1" />
                              Resend
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          {/* Tracking Analytics */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle>Tracking & Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Delivery Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Email Delivery Rate</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Open Rate</span>
                      <span className="font-medium">72%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Click-through Rate</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Portal Access Rate</span>
                      <span className="font-medium">38%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Response Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Response Time</span>
                      <span className="font-medium">3.2 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Fastest Response</span>
                      <span className="font-medium">4 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Days Remaining</span>
                      <span className="font-medium">12 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <Card className="phase-card">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link to="/workflow/phase-3">
                Previous: Vendor Selection
              </Link>
            </Button>
            <Button className="gradient-primary" asChild>
              <Link to="/workflow/phase-5">
                Continue to Vendor Portal
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Phase4URLGeneration;