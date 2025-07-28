import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  User,
  Calendar,
  FileText,
  ArrowRight,
  AlertCircle,
  Edit,
  Send,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Phase2Approval = () => {
  const { toast } = useToast();
  const [comments, setComments] = useState("");

  const rfpData = {
    id: "RFP-2025-003",
    title: "HR Management System",
    description: "Comprehensive HR management platform with payroll, benefits, and performance management capabilities.",
    value: "$320,000",
    timeline: "12 months",
    deadline: "2025-03-10",
    submittedBy: "John Smith",
    submittedDate: "2025-01-28",
  };

  const approvalFlow = [
    {
      step: 1,
      title: "Primary Review",
      reviewer: {
        name: "Sarah Johnson",
        role: "Procurement Manager",
        email: "sarah.johnson@company.com",
        avatar: "/api/placeholder/40/40",
      },
      status: "completed",
      completedDate: "2025-01-28 14:30",
      comments: "Requirements are well-defined. Budget allocation looks reasonable. Recommend proceeding to executive approval.",
      decision: "approved",
    },
    {
      step: 2,
      title: "Executive Approval",
      reviewer: {
        name: "Michael Chen",
        role: "CTO",
        email: "michael.chen@company.com",
        avatar: "/api/placeholder/40/40",
      },
      status: "pending",
      completedDate: null,
      comments: "",
      decision: null,
    },
  ];

  const evaluationCriteria = [
    { name: "Technical Capability", weight: 30, isVeto: true },
    { name: "Cost Effectiveness", weight: 25, isVeto: false },
    { name: "Experience & References", weight: 20, isVeto: true },
    { name: "Implementation Timeline", weight: 15, isVeto: false },
    { name: "Support & Maintenance", weight: 10, isVeto: false },
  ];

  const handleApprove = () => {
    toast({
      title: "RFP Approved",
      description: "RFP has been approved and will proceed to vendor selection.",
    });
  };

  const handleReject = () => {
    toast({
      title: "RFP Rejected",
      description: "RFP has been rejected and sent back for revisions.",
      variant: "destructive",
    });
  };

  const handleRequestChanges = () => {
    toast({
      title: "Changes Requested",
      description: "RFP has been sent back for the requested changes.",
    });
  };

  const getStatusIcon = (status: string, decision: string | null) => {
    if (status === "completed") {
      return decision === "approved" ? 
        <CheckCircle className="h-5 w-5 text-success" /> : 
        <XCircle className="h-5 w-5 text-destructive" />;
    }
    return <Clock className="h-5 w-5 text-warning" />;
  };

  const getStatusBadge = (status: string, decision: string | null) => {
    if (status === "completed") {
      return decision === "approved" ? 
        <Badge className="status-badge active">Approved</Badge> : 
        <Badge className="status-badge rejected">Rejected</Badge>;
    }
    return <Badge className="status-badge review">Pending</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">Phase 2</Badge>
            <Progress value={20} className="w-32 h-2" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Two-Layer Approval Workflow</h1>
          <p className="text-muted-foreground">
            Sequential approval process with primary and executive reviewers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* RFP Summary */}
          <Card className="phase-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>RFP Summary</CardTitle>
              </div>
              <CardDescription>Review the RFP details before approval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg">{rfpData.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{rfpData.id}</p>
                  <p className="text-sm">{rfpData.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Budget:</span>
                    <span className="font-medium">{rfpData.value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Timeline:</span>
                    <span className="font-medium">{rfpData.timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Deadline:</span>
                    <span className="font-medium">{rfpData.deadline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Submitted by:</span>
                    <span className="font-medium">{rfpData.submittedBy}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Evaluation Criteria Review */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle>Evaluation Criteria</CardTitle>
              <CardDescription>Review the proposed evaluation criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {evaluationCriteria.map((criterion, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{criterion.name}</span>
                        {criterion.isVeto && (
                          <Badge variant="outline" className="text-xs">Veto</Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">{criterion.weight}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Approval Timeline */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle>Approval Timeline</CardTitle>
              <CardDescription>Track the approval process progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {approvalFlow.map((approval, index) => (
                  <div key={approval.step} className="relative">
                    {index < approvalFlow.length - 1 && (
                      <div className="absolute left-5 top-12 w-0.5 h-16 bg-border" />
                    )}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-border bg-background flex items-center justify-center">
                        {getStatusIcon(approval.status, approval.decision)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{approval.title}</h3>
                          {getStatusBadge(approval.status, approval.decision)}
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={approval.reviewer.avatar} />
                            <AvatarFallback>
                              {approval.reviewer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{approval.reviewer.name}</div>
                            <div className="text-xs text-muted-foreground">{approval.reviewer.role}</div>
                          </div>
                        </div>
                        {approval.completedDate && (
                          <div className="text-xs text-muted-foreground mb-2">
                            Completed: {approval.completedDate}
                          </div>
                        )}
                        {approval.comments && (
                          <div className="bg-muted/50 p-3 rounded-lg text-sm">
                            <div className="flex items-center gap-2 mb-1">
                              <MessageSquare className="h-3 w-3" />
                              <span className="font-medium">Comments:</span>
                            </div>
                            {approval.comments}
                          </div>
                        )}
                        {approval.status === "pending" && (
                          <div className="mt-3 p-3 border border-warning/20 bg-warning/5 rounded-lg">
                            <div className="flex items-center gap-2 text-warning">
                              <AlertCircle className="h-4 w-4" />
                              <span className="text-sm font-medium">Awaiting your approval</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle>Add Comments</CardTitle>
              <CardDescription>Provide feedback or approval comments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Add your comments, feedback, or approval notes..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Reviewer */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle>Current Reviewer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/api/placeholder/40/40" />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Michael Chen</div>
                  <div className="text-sm text-muted-foreground">CTO</div>
                  <div className="text-xs text-muted-foreground">michael.chen@company.com</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full gradient-primary" onClick={handleApprove}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve RFP
              </Button>
              <Button variant="outline" className="w-full" onClick={handleRequestChanges}>
                <Edit className="h-4 w-4 mr-2" />
                Request Changes
              </Button>
              <Button variant="destructive" className="w-full" onClick={handleReject}>
                <XCircle className="h-4 w-4 mr-2" />
                Reject RFP
              </Button>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>After approval, the RFP will proceed to:</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>Phase 3: Vendor Selection</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>Intelligent vendor matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>Invitation distribution</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Created:</span>
                <span>{rfpData.submittedDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Primary Review:</span>
                <span className="text-success">Completed</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Executive Approval:</span>
                <span className="text-warning">Pending</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Target Distribution:</span>
                <span>Jan 30, 2025</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Phase2Approval;