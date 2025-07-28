import { useState } from "react";
import { CheckCircle, Circle, Clock, User, FileText, Settings, Mail, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const onboardingVendors = [
  {
    id: 1,
    name: "InnovateCloud Solutions",
    contact: "Alex Johnson",
    email: "alex@innovatecloud.com",
    status: "In Progress",
    progress: 75,
    startDate: "2025-01-15",
    expectedCompletion: "2025-01-30",
    currentStep: "Document Review",
    steps: [
      { name: "Initial Contact", completed: true, date: "2025-01-15" },
      { name: "Information Collection", completed: true, date: "2025-01-17" },
      { name: "Document Submission", completed: true, date: "2025-01-20" },
      { name: "Document Review", completed: false, inProgress: true, date: null },
      { name: "Portal Setup", completed: false, date: null },
      { name: "Training & Orientation", completed: false, date: null },
      { name: "Final Approval", completed: false, date: null }
    ]
  },
  {
    id: 2,
    name: "SecureNet Technologies",
    contact: "Maria Rodriguez",
    email: "maria@securenet.com",
    status: "Pending Documents",
    progress: 40,
    startDate: "2025-01-18",
    expectedCompletion: "2025-02-02",
    currentStep: "Document Submission",
    steps: [
      { name: "Initial Contact", completed: true, date: "2025-01-18" },
      { name: "Information Collection", completed: true, date: "2025-01-19" },
      { name: "Document Submission", completed: false, inProgress: true, date: null },
      { name: "Document Review", completed: false, date: null },
      { name: "Portal Setup", completed: false, date: null },
      { name: "Training & Orientation", completed: false, date: null },
      { name: "Final Approval", completed: false, date: null }
    ]
  },
  {
    id: 3,
    name: "DataFlow Analytics",
    contact: "David Kim",
    email: "david@dataflow.com",
    status: "Completed",
    progress: 100,
    startDate: "2025-01-05",
    expectedCompletion: "2025-01-20",
    currentStep: "Completed",
    steps: [
      { name: "Initial Contact", completed: true, date: "2025-01-05" },
      { name: "Information Collection", completed: true, date: "2025-01-07" },
      { name: "Document Submission", completed: true, date: "2025-01-10" },
      { name: "Document Review", completed: true, date: "2025-01-12" },
      { name: "Portal Setup", completed: true, date: "2025-01-15" },
      { name: "Training & Orientation", completed: true, date: "2025-01-18" },
      { name: "Final Approval", completed: true, date: "2025-01-20" }
    ]
  }
];

const documentChecklist = [
  { name: "Business License", required: true, description: "Valid business registration documents" },
  { name: "Insurance Certificate", required: true, description: "General liability and professional indemnity insurance" },
  { name: "Tax Documentation", required: true, description: "W-9 or equivalent tax forms" },
  { name: "Security Certifications", required: false, description: "ISO 27001, SOC 2, or similar certifications" },
  { name: "Financial Statements", required: true, description: "Last 2 years of audited financial statements" },
  { name: "References", required: true, description: "3-5 client references with contact information" },
  { name: "Technical Capabilities", required: true, description: "Detailed technical capability documentation" },
  { name: "Compliance Documentation", required: false, description: "Industry-specific compliance certifications" }
];

export default function VendorOnboarding() {
  const [selectedVendor, setSelectedVendor] = useState<typeof onboardingVendors[0] | null>(null);
  const [showNewOnboarding, setShowNewOnboarding] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "success";
      case "In Progress": return "warning";
      case "Pending Documents": return "destructive";
      default: return "secondary";
    }
  };

  const getStepIcon = (step: any) => {
    if (step.completed) return <CheckCircle className="h-5 w-5 text-success" />;
    if (step.inProgress) return <Clock className="h-5 w-5 text-warning" />;
    return <Circle className="h-5 w-5 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vendor Onboarding</h1>
          <p className="text-muted-foreground">Manage new vendor onboarding processes</p>
        </div>
        <Button onClick={() => setShowNewOnboarding(true)}>
          <User className="h-4 w-4 mr-2" />
          Start New Onboarding
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {onboardingVendors.filter(v => v.status === "In Progress").length}
            </div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {onboardingVendors.filter(v => v.status === "Pending Documents").length}
            </div>
            <p className="text-sm text-muted-foreground">Pending Documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {onboardingVendors.filter(v => v.status === "Completed").length}
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-info">
              {Math.round(onboardingVendors.reduce((acc, v) => acc + v.progress, 0) / onboardingVendors.length)}%
            </div>
            <p className="text-sm text-muted-foreground">Avg Progress</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active Onboarding</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="checklist">Document Checklist</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {onboardingVendors.filter(v => v.status !== "Completed").map((vendor) => (
              <Card key={vendor.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{vendor.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{vendor.contact} • {vendor.email}</p>
                    </div>
                    <Badge variant={getStatusColor(vendor.status) as any}>
                      {vendor.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">{vendor.progress}%</span>
                      </div>
                      <Progress value={vendor.progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Started:</span>
                        <p className="font-medium">{vendor.startDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Expected:</span>
                        <p className="font-medium">{vendor.expectedCompletion}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Current Step:</span>
                        <p className="font-medium">{vendor.currentStep}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Onboarding Steps</h4>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedVendor(vendor)}
                        >
                          View Details
                        </Button>
                      </div>
                      <div className="grid grid-cols-7 gap-2 mt-3">
                        {vendor.steps.map((step, index) => (
                          <div key={index} className="text-center">
                            <div className="flex justify-center mb-1">
                              {getStepIcon(step)}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {step.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {vendor.status === "Pending Documents" && (
                      <div className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-destructive" />
                        <span className="text-sm text-destructive">
                          Waiting for vendor to submit required documents
                        </span>
                        <Button variant="outline" size="sm" className="ml-auto">
                          Send Reminder
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {onboardingVendors.filter(v => v.status === "Completed").map((vendor) => (
              <Card key={vendor.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{vendor.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{vendor.contact} • {vendor.email}</p>
                    </div>
                    <Badge className="bg-success text-success-foreground">Completed</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Started:</span>
                      <p className="font-medium">{vendor.startDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Completed:</span>
                      <p className="font-medium">{vendor.expectedCompletion}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">15 days</p>
                    </div>
                    <div className="text-right">
                      <Button variant="outline" size="sm">View Profile</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Welcome Email</h4>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Initial welcome message sent when onboarding begins
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Document Request</h4>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Template for requesting missing documents
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Training Invitation</h4>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Invitation to vendor training and orientation sessions
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Completion Confirmation</h4>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Congratulations message upon successful completion
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documentChecklist.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium flex items-center gap-2">
                          {doc.name}
                          {doc.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                        </h4>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Vendor Detail Modal would go here */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{selectedVendor.name} - Detailed Progress</h2>
            <div className="space-y-4">
              {selectedVendor.steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  {getStepIcon(step)}
                  <div className="flex-1">
                    <h4 className="font-medium">{step.name}</h4>
                    {step.date && (
                      <p className="text-sm text-muted-foreground">Completed: {step.date}</p>
                    )}
                  </div>
                  {step.inProgress && (
                        <Badge className="bg-warning text-warning-foreground">In Progress</Badge>
                      )}
                      {step.completed && (
                        <Badge className="bg-success text-success-foreground">Completed</Badge>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedVendor(null)}>
                Close
              </Button>
              <Button>Update Progress</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}