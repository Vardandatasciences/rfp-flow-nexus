import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  FileText,
  Building2,
  Target,
  Clock,
  DollarSign,
  Users,
  AlertCircle,
  Plus,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const kpiData = [
    {
      title: "Active RFPs",
      value: "12",
      change: "+2 from last month",
      trend: "up",
      icon: FileText,
      color: "text-info",
    },
    {
      title: "Total Vendors",
      value: "248",
      change: "+18 from last month",
      trend: "up",
      icon: Building2,
      color: "text-success",
    },
    {
      title: "Pending Evaluations",
      value: "8",
      change: "-3 from last week",
      trend: "down",
      icon: Target,
      color: "text-warning",
    },
    {
      title: "Total Value",
      value: "$1.2M",
      change: "+15% from last quarter",
      trend: "up",
      icon: DollarSign,
      color: "text-primary",
    },
  ];

  const recentRFPs = [
    {
      id: "RFP-2025-001",
      title: "Cloud Infrastructure Services",
      status: "evaluation",
      phase: 6,
      totalPhases: 10,
      value: "$485,000",
      deadline: "2025-02-15",
      vendors: 8,
    },
    {
      id: "RFP-2025-002",
      title: "Security Audit Platform",
      status: "active",
      phase: 5,
      totalPhases: 10,
      value: "$125,000",
      deadline: "2025-02-28",
      vendors: 12,
    },
    {
      id: "RFP-2025-003",
      title: "HR Management System",
      status: "review",
      phase: 2,
      totalPhases: 10,
      value: "$320,000",
      deadline: "2025-03-10",
      vendors: 0,
    },
    {
      id: "RFP-2025-004",
      title: "Marketing Analytics Tool",
      status: "draft",
      phase: 1,
      totalPhases: 10,
      value: "$180,000",
      deadline: "2025-03-20",
      vendors: 0,
    },
  ];

  const upcomingTasks = [
    {
      title: "Review vendor proposals for Cloud Infrastructure",
      rfp: "RFP-2025-001",
      dueDate: "Today",
      priority: "high",
    },
    {
      title: "Approve Security Audit RFP for distribution",
      rfp: "RFP-2025-002",
      dueDate: "Tomorrow",
      priority: "medium",
    },
    {
      title: "Complete evaluation criteria for HR System",
      rfp: "RFP-2025-003",
      dueDate: "Jan 30",
      priority: "medium",
    },
    {
      title: "Finalize vendor shortlist for Marketing Tool",
      rfp: "RFP-2025-004",
      dueDate: "Feb 2",
      priority: "low",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "status-badge draft";
      case "review": return "status-badge review";
      case "active": return "status-badge active";
      case "evaluation": return "status-badge evaluation";
      case "awarded": return "status-badge awarded";
      case "rejected": return "status-badge rejected";
      default: return "status-badge draft";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your RFP activities.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Link>
          </Button>
          <Button asChild className="gradient-primary">
            <Link to="/workflow/phase-1">
              <Plus className="h-4 w-4 mr-2" />
              Create RFP
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="phase-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {kpi.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-success" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1 text-destructive" />
                )}
                {kpi.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent RFPs */}
        <Card className="lg:col-span-2 phase-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent RFPs</CardTitle>
                <CardDescription>
                  Your most recent RFP activities
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard/my-rfps">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentRFPs.map((rfp) => (
              <div
                key={rfp.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg hover-lift cursor-pointer"
                onClick={() => window.location.href = `/workflow/phase-${rfp.phase}`}
              >
                <div className="space-y-2 sm:space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{rfp.id}</span>
                    <Badge className={getStatusColor(rfp.status)}>
                      {rfp.status}
                    </Badge>
                  </div>
                  <h3 className="font-medium">{rfp.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Phase {rfp.phase}/{rfp.totalPhases}</span>
                    <span>{rfp.value}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {rfp.deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {rfp.vendors} vendors
                    </span>
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 sm:w-32">
                  <Progress value={(rfp.phase / rfp.totalPhases) * 100} className="h-2" />
                  <span className="text-xs text-muted-foreground mt-1 block">
                    {Math.round((rfp.phase / rfp.totalPhases) * 100)}% complete
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="phase-card">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>
              Items requiring your attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.map((task, index) => (
              <div
                key={index}
                className="p-3 border border-border rounded-lg hover-lift cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.rfp}</p>
                  </div>
                  <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                  {task.dueDate === "Today" && (
                    <AlertCircle className="h-3 w-3 text-destructive" />
                  )}
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm" asChild>
              <Link to="/dashboard">
                View All Tasks
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="phase-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to get you started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link to="/workflow/phase-1">
                <Plus className="h-5 w-5" />
                Create New RFP
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link to="/vendors">
                <Building2 className="h-5 w-5" />
                Manage Vendors
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link to="/evaluations">
                <Target className="h-5 w-5" />
                Review Evaluations
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link to="/analytics">
                <BarChart3 className="h-5 w-5" />
                View Analytics
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;