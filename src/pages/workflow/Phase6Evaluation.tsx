import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Target,
  Star,
  FileText,
  Building2,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Download,
  Eye,
  Save,
  Send,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Phase6Evaluation = () => {
  const { toast } = useToast();
  const [activeProposal, setActiveProposal] = useState("1");
  const [scores, setScores] = useState({
    "1": { technical: 8.5, cost: 7.2, experience: 9.0, timeline: 8.0, support: 7.5 },
    "2": { technical: 7.8, cost: 8.5, experience: 8.2, timeline: 7.0, support: 8.0 },
  });

  const rfpData = {
    id: "RFP-2025-001",
    title: "Cloud Infrastructure Services",
    value: "$485,000",
    deadline: "2025-02-15",
    responses: 8,
    evaluationsCompleted: 6,
    evaluationsTotal: 16,
  };

  const evaluationCriteria = [
    { 
      id: "technical", 
      name: "Technical Capability", 
      weight: 30, 
      isVeto: true,
      description: "Vendor's technical expertise and infrastructure capabilities"
    },
    { 
      id: "cost", 
      name: "Cost Effectiveness", 
      weight: 25, 
      isVeto: false,
      description: "Value for money and competitive pricing structure"
    },
    { 
      id: "experience", 
      name: "Experience & References", 
      weight: 20, 
      isVeto: true,
      description: "Previous experience and client references in similar projects"
    },
    { 
      id: "timeline", 
      name: "Implementation Timeline", 
      weight: 15, 
      isVeto: false,
      description: "Proposed timeline and delivery schedule feasibility"
    },
    { 
      id: "support", 
      name: "Support & Maintenance", 
      weight: 10, 
      isVeto: false,
      description: "Ongoing support and maintenance capabilities"
    },
  ];

  const vendorProposals = [
    {
      id: "1",
      vendor: {
        name: "CloudTech Inc.",
        logo: "/api/placeholder/60/60",
        location: "San Francisco, CA",
        employees: 250,
        founded: 2015,
      },
      proposal: {
        price: "$420,000",
        timeline: "8 months",
        submittedDate: "2025-01-20",
        documentSize: "12.3 MB",
        keyFeatures: ["Multi-cloud architecture", "24/7 monitoring", "Auto-scaling", "Disaster recovery"],
      },
      evaluations: [
        {
          evaluator: "Sarah Johnson",
          role: "Technical Lead",
          status: "completed",
          completedDate: "2025-01-25",
          overallScore: 8.2,
          comments: "Strong technical proposal with comprehensive cloud architecture. Pricing is competitive.",
        },
        {
          evaluator: "Mike Wilson",
          role: "Infrastructure Manager", 
          status: "pending",
          completedDate: null,
          overallScore: null,
          comments: "",
        },
      ],
    },
    {
      id: "2",
      vendor: {
        name: "TechCorp Solutions",
        logo: "/api/placeholder/60/60",
        location: "Austin, TX",
        employees: 180,
        founded: 2012,
      },
      proposal: {
        price: "$395,000",
        timeline: "10 months",
        submittedDate: "2025-01-22",
        documentSize: "8.7 MB",
        keyFeatures: ["Hybrid cloud setup", "DevOps integration", "Security compliance", "Performance optimization"],
      },
      evaluations: [
        {
          evaluator: "Sarah Johnson",
          role: "Technical Lead",
          status: "completed",
          completedDate: "2025-01-26",
          overallScore: 7.9,
          comments: "Good technical approach but concerns about timeline. Lower pricing is attractive.",
        },
        {
          evaluator: "Mike Wilson",
          role: "Infrastructure Manager",
          status: "in_progress",
          completedDate: null,
          overallScore: null,
          comments: "",
        },
      ],
    },
  ];

  const currentProposal = vendorProposals.find(p => p.id === activeProposal);
  const currentEvaluator = { name: "Mike Wilson", role: "Infrastructure Manager" };

  const calculateWeightedScore = (scores: any) => {
    return evaluationCriteria.reduce((total, criterion) => {
      const score = scores[criterion.id] || 0;
      return total + (score * criterion.weight / 100);
    }, 0);
  };

  const handleScoreChange = (criterionId: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    if (numValue >= 0 && numValue <= 10) {
      setScores(prev => ({
        ...prev,
        [activeProposal]: {
          ...prev[activeProposal],
          [criterionId]: numValue
        }
      }));
    }
  };

  const handleSaveEvaluation = () => {
    toast({
      title: "Evaluation Saved",
      description: "Your evaluation has been saved as draft.",
    });
  };

  const handleSubmitEvaluation = () => {
    toast({
      title: "Evaluation Submitted",
      description: "Your evaluation has been submitted successfully.",
    });
  };

  const getEvaluationStatusBadge = (status: string) => {
    switch (status) {
      case "completed": return <Badge className="status-badge active">Completed</Badge>;
      case "in_progress": return <Badge className="status-badge evaluation">In Progress</Badge>;
      default: return <Badge className="status-badge draft">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">Phase 6</Badge>
            <Progress value={60} className="w-32 h-2" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Dual Evaluation System</h1>
          <p className="text-muted-foreground">
            Two evaluators per response with weighted scoring matrix.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span>{rfpData.evaluationsCompleted}/{rfpData.evaluationsTotal} evaluations completed</span>
          <Progress value={(rfpData.evaluationsCompleted / rfpData.evaluationsTotal) * 100} className="w-20 h-2" />
        </div>
      </div>

      {/* RFP Overview */}
      <Card className="phase-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>RFP Overview</CardTitle>
            </div>
            <Badge className="status-badge evaluation">Evaluation Phase</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{rfpData.responses}</div>
              <div className="text-sm text-muted-foreground">Vendor Responses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{rfpData.value}</div>
              <div className="text-sm text-muted-foreground">Budget</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{rfpData.evaluationsCompleted}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{rfpData.deadline}</div>
              <div className="text-sm text-muted-foreground">Deadline</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Vendor List */}
        <Card className="phase-card">
          <CardHeader>
            <CardTitle>Vendor Proposals</CardTitle>
            <CardDescription>Select a proposal to evaluate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {vendorProposals.map((proposal) => (
              <div
                key={proposal.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  activeProposal === proposal.id ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                }`}
                onClick={() => setActiveProposal(proposal.id)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={proposal.vendor.logo} />
                    <AvatarFallback>{proposal.vendor.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{proposal.vendor.name}</div>
                    <div className="text-xs text-muted-foreground">{proposal.proposal.price}</div>
                    <div className="flex gap-1 mt-1">
                      {proposal.evaluations.map((evalItem, index) => (
                        <div key={index} className="w-2 h-2 rounded-full bg-current opacity-20" 
                             style={{ opacity: evalItem.status === "completed" ? 1 : 0.2 }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Main Evaluation Area */}
        <div className="lg:col-span-3 space-y-6">
          {currentProposal && (
            <>
              {/* Vendor Details */}
              <Card className="phase-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={currentProposal.vendor.logo} />
                        <AvatarFallback>{currentProposal.vendor.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{currentProposal.vendor.name}</CardTitle>
                        <CardDescription>{currentProposal.vendor.location}</CardDescription>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Proposal
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Price:</span>
                      <div className="font-medium">{currentProposal.proposal.price}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Timeline:</span>
                      <div className="font-medium">{currentProposal.proposal.timeline}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Employees:</span>
                      <div className="font-medium">{currentProposal.vendor.employees}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Founded:</span>
                      <div className="font-medium">{currentProposal.vendor.founded}</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm text-muted-foreground">Key Features:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {currentProposal.proposal.keyFeatures.map((feature, index) => (
                        <Badge key={index} variant="outline">{feature}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Evaluation Tabs */}
              <Tabs defaultValue="scoring" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="scoring">Scoring</TabsTrigger>
                  <TabsTrigger value="evaluations">Other Evaluations</TabsTrigger>
                  <TabsTrigger value="proposal">Proposal Details</TabsTrigger>
                </TabsList>

                <TabsContent value="scoring" className="space-y-6">
                  {/* Current Evaluator */}
                  <Card className="phase-card">
                    <CardHeader>
                      <CardTitle>Your Evaluation</CardTitle>
                      <CardDescription>Score each criterion from 0-10</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {evaluationCriteria.map((criterion) => (
                        <div key={criterion.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Label className="font-medium">{criterion.name}</Label>
                              <Badge variant="outline">{criterion.weight}%</Badge>
                              {criterion.isVeto && (
                                <Badge variant="destructive" className="text-xs">Veto</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                min="0"
                                max="10"
                                step="0.1"
                                className="w-20 text-center"
                                value={scores[activeProposal]?.[criterion.id] || ""}
                                onChange={(e) => handleScoreChange(criterion.id, e.target.value)}
                              />
                              <span className="text-sm text-muted-foreground">/ 10</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{criterion.description}</p>
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Weighted Score:</span>
                          <span className="text-2xl font-bold text-primary">
                            {calculateWeightedScore(scores[activeProposal] || {}).toFixed(1)} / 10
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Overall Comments</Label>
                        <Textarea 
                          placeholder="Provide your overall assessment and feedback..."
                          rows={4}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleSaveEvaluation}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Draft
                        </Button>
                        <Button onClick={handleSubmitEvaluation} className="gradient-primary">
                          <Send className="h-4 w-4 mr-2" />
                          Submit Evaluation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="evaluations" className="space-y-4">
                  <Card className="phase-card">
                    <CardHeader>
                      <CardTitle>Evaluation Progress</CardTitle>
                      <CardDescription>View other evaluators' progress</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {currentProposal.evaluations.map((evaluationItem, index) => (
                        <div key={index} className="p-4 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="font-medium">{evaluationItem.evaluator}</div>
                              <div className="text-sm text-muted-foreground">{evaluationItem.role}</div>
                            </div>
                            {getEvaluationStatusBadge(evaluationItem.status)}
                          </div>
                          {evaluationItem.status === "completed" && (
                            <>
                              <div className="flex items-center gap-2 mb-2">
                                <Star className="h-4 w-4 text-warning" />
                                <span className="font-medium">Score: {evaluationItem.overallScore}/10</span>
                                <span className="text-sm text-muted-foreground">
                                  Completed: {evaluationItem.completedDate}
                                </span>
                              </div>
                              {evaluationItem.comments && (
                                <div className="bg-muted/50 p-3 rounded-lg text-sm">
                                  <div className="flex items-center gap-2 mb-1">
                                    <MessageSquare className="h-3 w-3" />
                                    <span className="font-medium">Comments:</span>
                                  </div>
                                  {evaluationItem.comments}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="proposal" className="space-y-4">
                  <Card className="phase-card">
                    <CardHeader>
                      <CardTitle>Proposal Details</CardTitle>
                      <CardDescription>Detailed proposal information and documents</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-muted-foreground">Submitted:</span>
                            <div className="font-medium">{currentProposal.proposal.submittedDate}</div>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Document Size:</span>
                            <div className="font-medium">{currentProposal.proposal.documentSize}</div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4">
                        <Button variant="outline" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          View Full Proposal Document
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Phase6Evaluation;