import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Handshake, 
  CheckCircle2, 
  Clock,
  Building2,
  User,
  FileText,
  Target,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  Star,
  Award,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Phase10Onboarding = () => {
  const { toast } = useToast();
  const [onboardingNotes, setOnboardingNotes] = useState("");

  const awardedVendor = {
    id: "cloudtech",
    name: "CloudTech Inc",
    contact: "hello@cloudtech.com",
    phone: "+1 (555) 987-6543",
    projectManager: "Sarah Johnson",
    acceptanceDate: "2025-02-05",
    contractValue: 425000,
    projectStartDate: "2025-02-15",
    expectedDuration: "12 months",
    status: "accepted"
  };

  const onboardingChecklist = [
    {
      category: "Legal & Contracts",
      items: [
        { task: "Contract execution", status: "completed", dueDate: "2025-02-05" },
        { task: "Insurance verification", status: "completed", dueDate: "2025-02-06" },
        { task: "NDA and confidentiality agreements", status: "completed", dueDate: "2025-02-07" },
        { task: "Compliance documentation", status: "in-progress", dueDate: "2025-02-10" }
      ]
    },
    {
      category: "Technical Setup",
      items: [
        { task: "System access provisioning", status: "in-progress", dueDate: "2025-02-12" },
        { task: "Security clearances", status: "pending", dueDate: "2025-02-15" },
        { task: "Development environment setup", status: "pending", dueDate: "2025-02-15" },
        { task: "Tool and platform access", status: "pending", dueDate: "2025-02-16" }
      ]
    },
    {
      category: "Team Integration",
      items: [
        { task: "Team introductions", status: "completed", dueDate: "2025-02-08" },
        { task: "Project kickoff meeting", status: "scheduled", dueDate: "2025-02-15" },
        { task: "Communication protocols", status: "in-progress", dueDate: "2025-02-14" },
        { task: "Regular meeting schedules", status: "pending", dueDate: "2025-02-16" }
      ]
    },
    {
      category: "Administrative",
      items: [
        { task: "Vendor profile creation", status: "completed", dueDate: "2025-02-06" },
        { task: "Invoice and payment setup", status: "completed", dueDate: "2025-02-07" },
        { task: "Reporting requirements", status: "in-progress", dueDate: "2025-02-12" },
        { task: "Performance metrics definition", status: "in-progress", dueDate: "2025-02-14" }
      ]
    }
  ];

  const vendorProfile = {
    basicInfo: {
      companyName: "CloudTech Inc",
      businessType: "Technology Services",
      established: "2018",
      employees: "200-500",
      headquarters: "Austin, TX",
      website: "www.cloudtech.com"
    },
    projectTeam: [
      {
        name: "Sarah Johnson",
        role: "Project Manager",
        email: "sarah.johnson@cloudtech.com",
        phone: "+1 (555) 987-6543",
        experience: "8 years",
        certifications: ["PMP", "AWS Solutions Architect"]
      },
      {
        name: "Michael Chen",
        role: "Technical Lead",
        email: "michael.chen@cloudtech.com", 
        phone: "+1 (555) 987-6544",
        experience: "12 years",
        certifications: ["Azure Expert", "Kubernetes Certified"]
      },
      {
        name: "Lisa Rodriguez",
        role: "DevOps Engineer",
        email: "lisa.rodriguez@cloudtech.com",
        phone: "+1 (555) 987-6545", 
        experience: "6 years",
        certifications: ["Docker Certified", "Terraform Associate"]
      }
    ],
    performance: {
      previousContracts: 24,
      successRate: 95.8,
      averageRating: 4.7,
      onTimeDelivery: 92,
      budgetCompliance: 96
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "status-badge awarded";
      case "in-progress": return "status-badge active";
      case "scheduled": return "status-badge evaluation";
      case "pending": return "status-badge draft";
      default: return "status-badge draft";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-4 w-4" />;
      case "in-progress": return <Clock className="h-4 w-4" />;
      case "scheduled": return <Calendar className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const calculateCategoryProgress = (items: any[]) => {
    const completed = items.filter(item => item.status === "completed").length;
    return Math.round((completed / items.length) * 100);
  };

  const totalItems = onboardingChecklist.reduce((sum, category) => sum + category.items.length, 0);
  const completedItems = onboardingChecklist.reduce(
    (sum, category) => sum + category.items.filter(item => item.status === "completed").length, 
    0
  );
  const overallProgress = Math.round((completedItems / totalItems) * 100);

  const handleCompleteOnboarding = () => {
    if (overallProgress < 100) {
      toast({ 
        title: "Onboarding incomplete", 
        description: "Please complete all checklist items before finalizing onboarding.",
        variant: "destructive"
      });
      return;
    }
    
    toast({ 
      title: "Onboarding completed", 
      description: "Vendor onboarding has been successfully completed." 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Phase 10: Vendor Onboarding</h1>
          <p className="text-muted-foreground">
            Complete vendor integration and project initiation process.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="status-badge awarded">
            Phase 10 of 10
          </Badge>
        </div>
      </div>

      {/* Onboarding Overview */}
      <Card className="phase-card bg-success/5 border-success/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-success" />
            Awarded Vendor: {awardedVendor.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">${(awardedVendor.contractValue / 1000).toFixed(0)}K</div>
              <div className="text-sm text-muted-foreground">Contract Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{awardedVendor.expectedDuration}</div>
              <div className="text-sm text-muted-foreground">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{overallProgress}%</div>
              <div className="text-sm text-muted-foreground">Onboarding</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Feb 15</div>
              <div className="text-sm text-muted-foreground">Start Date</div>
            </div>
          </div>
          
          <div className="bg-background p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p><strong>Contact:</strong> {awardedVendor.contact}</p>
                <p><strong>Phone:</strong> {awardedVendor.phone}</p>
                <p><strong>Project Manager:</strong> {awardedVendor.projectManager}</p>
              </div>
              <div className="space-y-2">
                <p><strong>Acceptance Date:</strong> {awardedVendor.acceptanceDate}</p>
                <p><strong>Project Start:</strong> {awardedVendor.projectStartDate}</p>
                <p><strong>Status:</strong> 
                  <Badge className="status-badge awarded ml-2" size="sm">
                    {awardedVendor.status}
                  </Badge>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="checklist" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="checklist">Onboarding Checklist</TabsTrigger>
          <TabsTrigger value="profile">Vendor Profile</TabsTrigger>
          <TabsTrigger value="integration">Integration Status</TabsTrigger>
          <TabsTrigger value="metrics">Success Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="checklist" className="space-y-6">
          {/* Overall Progress */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Onboarding Progress
                </span>
                <Badge className={overallProgress === 100 ? "status-badge awarded" : "status-badge active"}>
                  {completedItems}/{totalItems} completed
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={overallProgress} className="h-3" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {onboardingChecklist.map((category) => {
                  const progress = calculateCategoryProgress(category.items);
                  return (
                    <div key={category.category}>
                      <div className="text-lg font-bold">{progress}%</div>
                      <div className="text-sm text-muted-foreground">{category.category}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Checklist */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {onboardingChecklist.map((category) => (
              <Card key={category.category} className="phase-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {category.category}
                    <Badge variant="outline">
                      {category.items.filter(item => item.status === "completed").length}/{category.items.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(item.status)}>
                          {getStatusIcon(item.status)}
                        </Badge>
                          <div>
                            <p className="font-medium text-sm">{item.task}</p>
                            <p className="text-xs text-muted-foreground">Due: {item.dueDate}</p>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {item.status}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Progress value={calculateCategoryProgress(category.items)} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          {/* Vendor Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="phase-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Company:</span>
                    <p className="font-medium">{vendorProfile.basicInfo.companyName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <p className="font-medium">{vendorProfile.basicInfo.businessType}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Established:</span>
                    <p className="font-medium">{vendorProfile.basicInfo.established}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Employees:</span>
                    <p className="font-medium">{vendorProfile.basicInfo.employees}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <p className="font-medium">{vendorProfile.basicInfo.headquarters}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Website:</span>
                    <p className="font-medium">{vendorProfile.basicInfo.website}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="phase-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{vendorProfile.performance.previousContracts}</div>
                    <div className="text-sm text-muted-foreground">Previous Contracts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{vendorProfile.performance.successRate}%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold flex items-center justify-center gap-1">
                      {vendorProfile.performance.averageRating}
                      <Star className="h-4 w-4 fill-current text-warning" />
                    </div>
                    <div className="text-sm text-muted-foreground">Average Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{vendorProfile.performance.onTimeDelivery}%</div>
                    <div className="text-sm text-muted-foreground">On-Time Delivery</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Team */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Project Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vendorProfile.projectTeam.map((member, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="text-center space-y-2">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                        <div className="text-xs space-y-1">
                          <p><Mail className="h-3 w-3 inline mr-1" />{member.email}</p>
                          <p><Phone className="h-3 w-3 inline mr-1" />{member.phone}</p>
                          <p><Calendar className="h-3 w-3 inline mr-1" />{member.experience} experience</p>
                        </div>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {member.certifications.map((cert) => (
                            <Badge key={cert} variant="secondary" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          {/* Integration Status */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake className="h-5 w-5" />
                Integration Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "Feb 5, 2025", event: "Contract execution completed", status: "completed" },
                  { date: "Feb 8, 2025", event: "Team introductions completed", status: "completed" },
                  { date: "Feb 12, 2025", event: "System access provisioning", status: "in-progress" },
                  { date: "Feb 15, 2025", event: "Project kickoff meeting", status: "scheduled" },
                  { date: "Feb 16, 2025", event: "Full integration completion", status: "pending" }
                ].map((milestone, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      <Badge className={getStatusColor(milestone.status)}>
                        {getStatusIcon(milestone.status)}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{milestone.event}</p>
                      <p className="text-sm text-muted-foreground">{milestone.date}</p>
                    </div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {milestone.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle>Next Steps & Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Onboarding Notes</label>
                <Textarea
                  value={onboardingNotes}
                  onChange={(e) => setOnboardingNotes(e.target.value)}
                  placeholder="Add notes about the onboarding process, special considerations, or action items..."
                  className="min-h-24"
                />
              </div>
              
              <div className="bg-muted/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Upcoming Milestones:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Complete system access provisioning by Feb 12</li>
                  <li>• Conduct project kickoff meeting on Feb 15</li>
                  <li>• Finalize all integration tasks by Feb 16</li>
                  <li>• Begin project execution phase on Feb 17</li>
                  <li>• First status review scheduled for Feb 24</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          {/* Success Metrics */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Success Metrics & KPIs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Project Success Criteria</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">On-time delivery</span>
                      <Badge variant="outline">Target: 100%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Budget compliance</span>
                      <Badge variant="outline">Target: ±5%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Quality score</span>
                      <Badge variant="outline">Target: ≥4.5/5</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Stakeholder satisfaction</span>
                      <Badge variant="outline">Target: ≥90%</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Performance Tracking</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Weekly status reports</span>
                      <Badge className="status-badge active">Required</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Monthly reviews</span>
                      <Badge className="status-badge active">Scheduled</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Milestone assessments</span>
                      <Badge className="status-badge active">Enabled</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Final evaluation</span>
                      <Badge className="status-badge draft">Pending</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Historical Performance:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-success">95.8%</div>
                    <div className="text-xs text-muted-foreground">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-success">4.7/5</div>
                    <div className="text-xs text-muted-foreground">Avg Rating</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-success">92%</div>
                    <div className="text-xs text-muted-foreground">On-Time</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-success">96%</div>
                    <div className="text-xs text-muted-foreground">Budget</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Final Actions */}
      <Card className="phase-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {overallProgress === 100 ? (
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle2 className="h-4 w-4" />
                  All onboarding tasks completed
                </div>
              ) : (
                `${totalItems - completedItems} tasks remaining`
              )}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/workflow/phase-9">
                  Previous: Award Process
                </Link>
              </Button>
              <Button 
                className="gradient-primary"
                onClick={handleCompleteOnboarding}
                disabled={overallProgress < 100}
              >
                <Handshake className="h-4 w-4 mr-2" />
                Complete Onboarding
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RFP Completion Summary */}
      {overallProgress === 100 && (
        <Card className="phase-card bg-success/5 border-success/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">RFP Process Complete!</h2>
                <p className="text-muted-foreground">
                  Successfully completed all 10 phases of the RFP workflow. Vendor onboarding finished and project is ready to begin.
                </p>
              </div>
              <Button className="gradient-primary" asChild>
                <Link to="/dashboard">
                  Return to Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Phase10Onboarding;