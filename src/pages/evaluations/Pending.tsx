import { useState } from "react";
import { Clock, AlertTriangle, User, Calendar, Filter, ArrowUpDown, Play, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

const pendingEvaluations = [
  {
    id: 1,
    rfpTitle: "Cloud Infrastructure Services",
    rfpId: "RFP-2025-001",
    vendor: "TechCorp Solutions",
    evaluator1: "Sarah Johnson",
    evaluator2: "Mike Chen",
    dueDate: "2025-01-30",
    priority: "High",
    status: "Not Started",
    assignedDate: "2025-01-20",
    progress: 0,
    estimatedTime: "4 hours",
    category: "Cloud Services",
    evaluator1Status: "pending",
    evaluator2Status: "pending"
  },
  {
    id: 2,
    rfpTitle: "Cloud Infrastructure Services",
    rfpId: "RFP-2025-001",
    vendor: "CloudTech Inc",
    evaluator1: "Sarah Johnson",
    evaluator2: "David Rodriguez",
    dueDate: "2025-01-30",
    priority: "High",
    status: "In Progress",
    assignedDate: "2025-01-20",
    progress: 50,
    estimatedTime: "2 hours remaining",
    category: "Cloud Services",
    evaluator1Status: "completed",
    evaluator2Status: "in-progress"
  },
  {
    id: 3,
    rfpTitle: "Mobile App Development",
    rfpId: "RFP-2025-003",
    vendor: "AppDev Solutions",
    evaluator1: "Emily Davis",
    evaluator2: "John Smith",
    dueDate: "2025-02-05",
    priority: "Medium",
    status: "Overdue",
    assignedDate: "2025-01-15",
    progress: 25,
    estimatedTime: "6 hours",
    category: "Software Development",
    evaluator1Status: "in-progress",
    evaluator2Status: "pending"
  },
  {
    id: 4,
    rfpTitle: "Data Analytics Platform",
    rfpId: "RFP-2025-002",
    vendor: "DataSoft Corporation",
    evaluator1: "Alex Thompson",
    evaluator2: "Lisa Wang",
    dueDate: "2025-02-10",
    priority: "Low",
    status: "Assigned",
    assignedDate: "2025-01-22",
    progress: 0,
    estimatedTime: "5 hours",
    category: "Data Analytics",
    evaluator1Status: "pending",
    evaluator2Status: "pending"
  }
];

export default function PendingEvaluations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedEvaluations, setSelectedEvaluations] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("dueDate");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "warning";
      case "Low": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Not Started": return "secondary";
      case "In Progress": return "warning";
      case "Overdue": return "destructive";
      case "Assigned": return "info";
      default: return "secondary";
    }
  };

  const getEvaluatorStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return "✅";
      case "in-progress": return "⏳";
      case "pending": return "⏸️";
      default: return "❓";
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredEvaluations = pendingEvaluations.filter(evaluation => {
    const matchesSearch = evaluation.rfpTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluation.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluation.rfpId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === "all" || evaluation.priority === selectedPriority;
    const matchesStatus = selectedStatus === "all" || evaluation.status === selectedStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pending Evaluations</h1>
          <p className="text-muted-foreground">Manage and track pending vendor evaluations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Bulk Assign
          </Button>
          <Button>
            <Play className="h-4 w-4 mr-2" />
            Start Evaluation
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">
              {pendingEvaluations.filter(e => e.status === "Overdue").length}
            </div>
            <p className="text-sm text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {pendingEvaluations.filter(e => e.status === "In Progress").length}
            </div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-info">
              {pendingEvaluations.filter(e => e.status === "Not Started").length}
            </div>
            <p className="text-sm text-muted-foreground">Not Started</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {pendingEvaluations.filter(e => getDaysUntilDue(e.dueDate) <= 3).length}
            </div>
            <p className="text-sm text-muted-foreground">Due Soon</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Input
                placeholder="Search evaluations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
                <SelectItem value="Assigned">Assigned</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="assignedDate">Assigned Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedEvaluations.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {selectedEvaluations.length} evaluation(s) selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Reassign Evaluators</Button>
                <Button variant="outline" size="sm">Update Due Date</Button>
                <Button variant="outline" size="sm">Send Reminder</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Evaluations List */}
      <div className="space-y-4">
        {filteredEvaluations.map((evaluation) => {
          const daysUntilDue = getDaysUntilDue(evaluation.dueDate);
          const isOverdue = daysUntilDue < 0;
          const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;

          return (
            <Card key={evaluation.id} className={`${isOverdue ? 'border-destructive/50 bg-destructive/5' : isDueSoon ? 'border-warning/50 bg-warning/5' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedEvaluations.includes(evaluation.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedEvaluations([...selectedEvaluations, evaluation.id]);
                        } else {
                          setSelectedEvaluations(selectedEvaluations.filter(id => id !== evaluation.id));
                        }
                      }}
                      className="mt-1"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{evaluation.rfpTitle}</CardTitle>
                        <Badge variant="outline">{evaluation.rfpId}</Badge>
                      </div>
                      <p className="text-muted-foreground">Vendor: {evaluation.vendor}</p>
                      <p className="text-sm text-muted-foreground">Category: {evaluation.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getPriorityColor(evaluation.priority) as any}>
                      {evaluation.priority}
                    </Badge>
                    <Badge variant={getStatusColor(evaluation.status) as any}>
                      {evaluation.status}
                    </Badge>
                    {isOverdue && <AlertTriangle className="h-5 w-5 text-destructive" />}
                    {isDueSoon && <Clock className="h-5 w-5 text-warning" />}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Evaluation Progress</span>
                      <span className="text-sm text-muted-foreground">{evaluation.progress}%</span>
                    </div>
                    <Progress value={evaluation.progress} className="h-2" />
                  </div>

                  {/* Evaluators */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">Evaluator 1</span>
                        <span className="text-lg">{getEvaluatorStatusIcon(evaluation.evaluator1Status)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{evaluation.evaluator1}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {evaluation.evaluator1Status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">Evaluator 2</span>
                        <span className="text-lg">{getEvaluatorStatusIcon(evaluation.evaluator2Status)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{evaluation.evaluator2}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {evaluation.evaluator2Status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Assigned:</span>
                      <p className="font-medium">{evaluation.assignedDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Due Date:</span>
                      <p className={`font-medium ${isOverdue ? 'text-destructive' : isDueSoon ? 'text-warning' : ''}`}>
                        {evaluation.dueDate}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Days Left:</span>
                      <p className={`font-medium ${isOverdue ? 'text-destructive' : isDueSoon ? 'text-warning' : ''}`}>
                        {isOverdue ? `${Math.abs(daysUntilDue)} days overdue` : `${daysUntilDue} days`}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Est. Time:</span>
                      <p className="font-medium">{evaluation.estimatedTime}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View RFP</Button>
                      <Button variant="outline" size="sm">View Proposal</Button>
                    </div>
                    <div className="flex gap-2">
                      {evaluation.status === "Not Started" && (
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          Start Evaluation
                        </Button>
                      )}
                      {evaluation.status === "In Progress" && (
                        <Button size="sm" variant="outline">
                          Continue Evaluation
                        </Button>
                      )}
                      <Button variant="outline" size="sm">Reassign</Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Reschedule
                      </Button>
                    </div>
                  </div>

                  {/* Warning Messages */}
                  {isOverdue && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <span className="text-sm font-medium text-destructive">
                          This evaluation is {Math.abs(daysUntilDue)} days overdue
                        </span>
                      </div>
                    </div>
                  )}
                  {isDueSoon && !isOverdue && (
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-warning" />
                        <span className="text-sm font-medium text-warning">
                          Due in {daysUntilDue} day{daysUntilDue !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}