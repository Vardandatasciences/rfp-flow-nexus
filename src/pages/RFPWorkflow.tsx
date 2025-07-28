import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  FileText,
  CheckCircle,
  Users,
  Send,
  Globe,
  Target,
  BarChart3,
  Award,
  Handshake,
  Clock,
  ArrowRight,
  Edit,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

const RFPWorkflow = () => {
  const workflowPhases = [
    {
      phase: 1,
      title: "RFP Creation & Setup",
      description: "Create RFP with criteria, budget, timeline, and reviewer assignments",
      icon: Plus,
      status: "active",
      color: "bg-primary",
      tasks: ["Define RFP scope", "Set evaluation criteria", "Assign reviewers"],
    },
    {
      phase: 2,
      title: "Two-Layer Approval",
      description: "Sequential approval workflow with primary and executive reviewers",
      icon: CheckCircle,
      status: "pending",
      color: "bg-warning",
      tasks: ["Primary review", "Executive approval", "Final sign-off"],
    },
    {
      phase: 3,
      title: "Vendor Selection",
      description: "Intelligent vendor matching based on capabilities and requirements",
      icon: Users,
      status: "completed",
      color: "bg-success",
      tasks: ["Capability matching", "Vendor filtering", "Invitation list"],
    },
    {
      phase: 4,
      title: "URL Generation & Distribution",
      description: "Create personalized URLs and distribute to selected vendors",
      icon: Send,
      status: "not_started",
      color: "bg-muted",
      tasks: ["Generate URLs", "Send invitations", "Track delivery"],
    },
    {
      phase: 5,
      title: "Vendor Portal",
      description: "External no-login portal for vendor submissions",
      icon: Globe,
      status: "not_started",
      color: "bg-muted",
      tasks: ["Portal setup", "Submission tracking", "Auto-screening"],
    },
    {
      phase: 6,
      title: "Dual Evaluation",
      description: "Two evaluators per response with weighted scoring",
      icon: Target,
      status: "not_started",
      color: "bg-muted",
      tasks: ["Assign evaluators", "Score responses", "Collect feedback"],
    },
    {
      phase: 7,
      title: "Comparison & Analysis",
      description: "Side-by-side comparison with analytics and charts",
      icon: BarChart3,
      status: "not_started",
      color: "bg-muted",
      tasks: ["Compare responses", "Generate analytics", "Filter results"],
    },
    {
      phase: 8,
      title: "Final Consensus",
      description: "Committee evaluation and final ranking decisions",
      icon: Award,
      status: "not_started",
      color: "bg-muted",
      tasks: ["Committee review", "Final ranking", "Decision rationale"],
    },
    {
      phase: 9,
      title: "Award Process",
      description: "Winner notification and acceptance management",
      icon: Award,
      status: "not_started",
      color: "bg-muted",
      tasks: ["Notify winner", "Manage acceptance", "Contract initiation"],
    },
    {
      phase: 10,
      title: "Vendor Onboarding",
      description: "Track acceptance and integration of awarded vendor",
      icon: Handshake,
      status: "not_started",
      color: "bg-muted",
      tasks: ["Track acceptance", "Profile creation", "Integration setup"],
    },
  ];

  const activeRFPs = [
    {
      id: "RFP-2025-001",
      title: "Cloud Infrastructure Services",
      currentPhase: 6,
      totalPhases: 10,
      status: "evaluation",
      value: "$485,000",
      vendors: 8,
      evaluations: { completed: 6, total: 16 },
      deadline: "2025-02-15",
    },
    {
      id: "RFP-2025-002",
      title: "Security Audit Platform",
      currentPhase: 5,
      totalPhases: 10,
      status: "active",
      value: "$125,000",
      vendors: 12,
      evaluations: { completed: 0, total: 0 },
      deadline: "2025-02-28",
    },
    {
      id: "RFP-2025-003",
      title: "HR Management System",
      currentPhase: 2,
      totalPhases: 10,
      status: "review",
      value: "$320,000",
      vendors: 0,
      evaluations: { completed: 0, total: 0 },
      deadline: "2025-03-10",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "status-badge active";
      case "evaluation": return "status-badge evaluation";
      case "review": return "status-badge review";
      case "completed": return "status-badge awarded";
      default: return "status-badge draft";
    }
  };

  const getPhaseStatusColor = (status: string) => {
    switch (status) {
      case "active": return "border-primary bg-primary/10";
      case "completed": return "border-success bg-success/10";
      case "pending": return "border-warning bg-warning/10";
      default: return "border-muted bg-muted/10";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">RFP Workflow</h1>
          <p className="text-muted-foreground">
            Manage your 10-phase RFP process from creation to vendor onboarding.
          </p>
        </div>
        <Button asChild className="gradient-primary">
          <Link to="/workflow/phase-1">
            <Plus className="h-4 w-4 mr-2" />
            Create New RFP
          </Link>
        </Button>
      </div>

      {/* Workflow Overview */}
      <Card className="phase-card">
        <CardHeader>
          <CardTitle>10-Phase Workflow Overview</CardTitle>
          <CardDescription>
            Click on any phase to view details and manage RFPs in that stage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {workflowPhases.map((phase) => (
              <Link
                key={phase.phase}
                to={`/workflow/phase-${phase.phase}`}
                className={`block p-4 rounded-lg border-2 transition-all hover-lift ${getPhaseStatusColor(phase.status)}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${phase.color} text-white`}>
                    <phase.icon className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-medium">Phase {phase.phase}</div>
                </div>
                <h3 className="font-semibold text-sm mb-2">{phase.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {phase.description}
                </p>
                <div className="space-y-1">
                  {phase.tasks.map((task, index) => (
                    <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                      <div className="w-1 h-1 bg-current rounded-full" />
                      {task}
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active RFPs */}
      <Card className="phase-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active RFPs</CardTitle>
              <CardDescription>
                RFPs currently in progress across all phases
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/my-rfps">
                View All RFPs
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeRFPs.map((rfp) => (
            <div
              key={rfp.id}
              className="p-4 border border-border rounded-lg hover-lift"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{rfp.id}</span>
                    <Badge className={getStatusColor(rfp.status)}>
                      Phase {rfp.currentPhase}: {rfp.status}
                    </Badge>
                  </div>
                  <h3 className="font-semibold">{rfp.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                    <span>{rfp.value}</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {rfp.vendors} vendors
                    </span>
                    {rfp.evaluations.total > 0 && (
                      <span className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {rfp.evaluations.completed}/{rfp.evaluations.total} evaluations
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Due {rfp.deadline}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:w-96">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{Math.round((rfp.currentPhase / rfp.totalPhases) * 100)}%</span>
                    </div>
                    <Progress value={(rfp.currentPhase / rfp.totalPhases) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      Phase {rfp.currentPhase} of {rfp.totalPhases}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/workflow/phase-${rfp.currentPhase}`}>
                        <Eye className="h-3 w-3" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/workflow/phase-${rfp.currentPhase}/edit`}>
                        <Edit className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Phase Navigation */}
      <Card className="phase-card">
        <CardHeader>
          <CardTitle>Phase Navigation</CardTitle>
          <CardDescription>
            Quick access to specific workflow phases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {workflowPhases.map((phase) => (
              <Button
                key={phase.phase}
                variant="outline"
                className="h-16 flex-col gap-1"
                asChild
              >
                <Link to={`/workflow/phase-${phase.phase}`}>
                  <phase.icon className="h-4 w-4" />
                  <span className="text-xs">Phase {phase.phase}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RFPWorkflow;