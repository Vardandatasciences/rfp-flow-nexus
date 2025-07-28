import { useState } from "react";
import { Users, MessageSquare, Vote, AlertCircle, CheckCircle, Clock, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const consensusItems = [
  {
    id: 1,
    rfpTitle: "Enterprise Cloud Migration",
    rfpId: "RFP-2025-001",
    vendor: "TechCorp Solutions",
    status: "Pending Consensus",
    evaluations: [
      { evaluator: "Sarah Johnson", score: 91.0, submitted: "2025-01-22", comments: "Strong technical capabilities and proven track record." },
      { evaluator: "Mike Chen", score: 88.0, submitted: "2025-01-23", comments: "Good proposal but pricing could be more competitive." }
    ],
    variance: 3.0,
    committee: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
    currentScore: 89.5,
    consensusNeeded: true,
    deadline: "2025-01-30",
    category: "Cloud Services"
  },
  {
    id: 2,
    rfpTitle: "Mobile Banking Application",
    rfpId: "RFP-2025-002",
    vendor: "AppDev Solutions",
    status: "Consensus Reached",
    evaluations: [
      { evaluator: "Emily Davis", score: 84.5, submitted: "2025-01-20", comments: "Solid development approach with good mobile expertise." },
      { evaluator: "John Smith", score: 86.0, submitted: "2025-01-21", comments: "Impressive portfolio and competitive pricing." }
    ],
    variance: 1.5,
    committee: ["Emily Davis", "John Smith", "Alex Thompson"],
    currentScore: 85.3,
    consensusNeeded: false,
    deadline: "2025-01-28",
    finalDecision: "Approved",
    category: "Software Development"
  },
  {
    id: 3,
    rfpTitle: "Data Analytics Platform",
    rfpId: "RFP-2025-003",
    vendor: "DataSoft Corporation",
    status: "Disagreement",
    evaluations: [
      { evaluator: "Alex Thompson", score: 79.2, submitted: "2025-01-18", comments: "Technical solution is adequate but lacks innovation." },
      { evaluator: "Lisa Wang", score: 92.5, submitted: "2025-01-19", comments: "Excellent analytical capabilities and proven ROI." }
    ],
    variance: 13.3,
    committee: ["Alex Thompson", "Lisa Wang", "David Rodriguez"],
    currentScore: 85.9,
    consensusNeeded: true,
    deadline: "2025-01-26",
    category: "Data Analytics",
    requiresMediation: true
  }
];

const committeeMembers = [
  { name: "Sarah Johnson", role: "Technical Lead", evaluations: 23, avgScore: 86.4, active: true },
  { name: "Mike Chen", role: "Project Manager", evaluations: 19, avgScore: 84.7, active: true },
  { name: "Emily Davis", role: "Business Analyst", evaluations: 21, avgScore: 87.1, active: true },
  { name: "John Smith", role: "Security Expert", evaluations: 18, avgScore: 83.9, active: false },
  { name: "Alex Thompson", role: "Data Architect", evaluations: 25, avgScore: 88.2, active: true },
  { name: "Lisa Wang", role: "Solutions Architect", evaluations: 22, avgScore: 89.1, active: true }
];

export default function EvaluationConsensus() {
  const [selectedItem, setSelectedItem] = useState<typeof consensusItems[0] | null>(null);
  const [consensusComment, setConsensusComment] = useState("");
  const [finalDecision, setFinalDecision] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Consensus Reached": return "success";
      case "Pending Consensus": return "warning";
      case "Disagreement": return "destructive";
      default: return "secondary";
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance <= 5) return "text-success";
    if (variance <= 10) return "text-warning";
    return "text-destructive";
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Consensus Management</h1>
          <p className="text-muted-foreground">Manage evaluation consensus and resolve disagreements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Manage Committee
          </Button>
          <Button>
            <Vote className="h-4 w-4 mr-2" />
            Start Consensus
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {consensusItems.filter(item => item.status === "Pending Consensus").length}
            </div>
            <p className="text-sm text-muted-foreground">Pending Consensus</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">
              {consensusItems.filter(item => item.status === "Disagreement").length}
            </div>
            <p className="text-sm text-muted-foreground">Disagreements</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {consensusItems.filter(item => item.status === "Consensus Reached").length}
            </div>
            <p className="text-sm text-muted-foreground">Consensus Reached</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(consensusItems.reduce((acc, item) => acc + item.variance, 0) / consensusItems.length * 10) / 10}%
            </div>
            <p className="text-sm text-muted-foreground">Avg Variance</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active Consensus</TabsTrigger>
          <TabsTrigger value="disagreements">Disagreements</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="committee">Committee</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="space-y-4">
            {consensusItems.filter(item => item.status === "Pending Consensus").map((item) => (
              <Card key={item.id} className="border-warning/50 bg-warning/5">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{item.rfpTitle}</CardTitle>
                        <Badge variant="outline">{item.rfpId}</Badge>
                      </div>
                      <p className="text-muted-foreground">Vendor: {item.vendor}</p>
                      <p className="text-sm text-muted-foreground">Category: {item.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(item.status) as any}>
                        {item.status}
                      </Badge>
                      <Clock className="h-5 w-5 text-warning" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Current Scores */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className={`text-xl font-bold ${getScoreColor(item.currentScore)}`}>
                          {item.currentScore}%
                        </div>
                        <p className="text-xs text-muted-foreground">Current Score</p>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-medium ${getVarianceColor(item.variance)}`}>
                          {item.variance}%
                        </div>
                        <p className="text-xs text-muted-foreground">Variance</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-medium">{item.deadline}</div>
                        <p className="text-xs text-muted-foreground">Deadline</p>
                      </div>
                    </div>

                    {/* Evaluations */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Individual Evaluations</h4>
                      {item.evaluations.map((evaluation, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{evaluation.evaluator}</span>
                            <div className="flex items-center gap-2">
                              <span className={`font-bold ${getScoreColor(evaluation.score)}`}>
                                {evaluation.score}%
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {evaluation.submitted}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{evaluation.comments}</p>
                        </div>
                      ))}
                    </div>

                    {/* Committee */}
                    <div>
                      <h4 className="font-medium mb-2">Committee Members</h4>
                      <div className="flex gap-2 flex-wrap">
                        {item.committee.map((member, index) => (
                          <Badge key={index} variant="secondary">{member}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Add Comment
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => setSelectedItem(item)}>
                          <Vote className="h-4 w-4 mr-2" />
                          Initiate Consensus
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="disagreements" className="space-y-4">
          <div className="space-y-4">
            {consensusItems.filter(item => item.status === "Disagreement").map((item) => (
              <Card key={item.id} className="border-destructive/50 bg-destructive/5">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{item.rfpTitle}</CardTitle>
                        <Badge variant="outline">{item.rfpId}</Badge>
                        {item.requiresMediation && (
                          <Badge variant="destructive" className="text-xs">Mediation Required</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">Vendor: {item.vendor}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive">Disagreement</Badge>
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* High Variance Alert */}
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-destructive" />
                        <span className="text-sm font-medium text-destructive">
                          High variance detected: {item.variance}% difference between evaluators
                        </span>
                      </div>
                    </div>

                    {/* Conflicting Evaluations */}
                    <div className="grid grid-cols-2 gap-4">
                      {item.evaluations.map((evaluation, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{evaluation.evaluator}</span>
                            <span className={`font-bold ${getScoreColor(evaluation.score)}`}>
                              {evaluation.score}%
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{evaluation.comments}</p>
                        </div>
                      ))}
                    </div>

                    {/* Resolution Actions */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Resolution Options</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Schedule Discussion
                        </Button>
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          Add Third Evaluator
                        </Button>
                        <Button variant="outline" size="sm">
                          <ArrowUpDown className="h-4 w-4 mr-2" />
                          Request Re-evaluation
                        </Button>
                        <Button variant="outline" size="sm">
                          Escalate to Manager
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="space-y-4">
            {consensusItems.filter(item => item.status === "Consensus Reached").map((item) => (
              <Card key={item.id} className="border-success/50 bg-success/5">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{item.rfpTitle}</CardTitle>
                        <Badge variant="outline">{item.rfpId}</Badge>
                      </div>
                      <p className="text-muted-foreground">Vendor: {item.vendor}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-success text-success-foreground">Consensus Reached</Badge>
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className={`text-xl font-bold ${getScoreColor(item.currentScore)}`}>
                          {item.currentScore}%
                        </div>
                        <p className="text-xs text-muted-foreground">Final Score</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-medium text-success">{item.variance}%</div>
                        <p className="text-xs text-muted-foreground">Low Variance</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-medium">{item.finalDecision}</div>
                        <p className="text-xs text-muted-foreground">Decision</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm text-muted-foreground">
                        Consensus reached by {item.committee.length} committee members
                      </span>
                      <Button variant="outline" size="sm">View Final Report</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="committee" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Committee Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {committeeMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${member.active ? 'bg-success' : 'bg-muted'}`}></div>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Evaluations:</span>
                          <span className="ml-2 font-medium">{member.evaluations}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Avg Score:</span>
                          <span className={`ml-2 font-medium ${getScoreColor(member.avgScore)}`}>
                            {member.avgScore}%
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">View Profile</Button>
                        <Button variant="outline" size="sm">
                          {member.active ? 'Deactivate' : 'Activate'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Consensus Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Initiate Consensus - {selectedItem.rfpTitle}</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Current Evaluations</h3>
                <div className="space-y-2">
                  {selectedItem.evaluations.map((evaluation, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{evaluation.evaluator}</span>
                      <span className={`font-bold ${getScoreColor(evaluation.score)}`}>
                        {evaluation.score}%
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Variance:</span>
                    <span className={`font-bold ${getVarianceColor(selectedItem.variance)}`}>
                      {selectedItem.variance}%
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="decision">Final Decision</Label>
                <Select value={finalDecision} onValueChange={setFinalDecision}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select final decision" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="conditional">Conditional Approval</SelectItem>
                    <SelectItem value="further-review">Requires Further Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="comment">Consensus Comments</Label>
                <Textarea
                  id="comment"
                  value={consensusComment}
                  onChange={(e) => setConsensusComment(e.target.value)}
                  placeholder="Add comments about the consensus decision..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedItem(null)}>
                  Cancel
                </Button>
                <Button>Record Consensus</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}