import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  FileText,
  ZoomIn,
  ZoomOut,
  Download,
  RotateCcw,
  Users,
  Eye,
  Save,
  Send,
  ChevronLeft,
  ChevronRight,
  Timer,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProposalDocument {
  id: string;
  title: string;
  pages: number;
  sections: {
    name: string;
    startPage: number;
    endPage: number;
  }[];
}

interface EvaluationCriterion {
  id: string;
  name: string;
  weight: number;
  maxScore: number;
  description: string;
}

interface VendorProposal {
  id: string;
  vendorName: string;
  document: ProposalDocument;
  primaryScore?: number;
  secondaryScore?: number;
  primaryComments?: string;
  secondaryComments?: string;
  primaryStatus: "pending" | "in_progress" | "completed";
  secondaryStatus: "pending" | "in_progress" | "completed";
}

const SplitScreenEvaluator = () => {
  const { toast } = useToast();
  const [currentProposal, setCurrentProposal] = useState(0);
  const [evaluatorMode, setEvaluatorMode] = useState<"primary" | "secondary">("primary");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSection, setCurrentSection] = useState("technical");
  const [scores, setScores] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [overallComments, setOverallComments] = useState("");

  // Sample data
  const evaluationCriteria: EvaluationCriterion[] = [
    {
      id: "technical",
      name: "Technical Capability",
      weight: 40,
      maxScore: 100,
      description: "Technical expertise, architecture, and solution quality"
    },
    {
      id: "commercial",
      name: "Commercial",
      weight: 20,
      maxScore: 100,
      description: "Pricing, value for money, and commercial terms"
    },
    {
      id: "implementation",
      name: "Implementation",
      weight: 25,
      maxScore: 100,
      description: "Implementation approach, timeline, and risk management"
    },
    {
      id: "support",
      name: "Support & Maintenance",
      weight: 15,
      maxScore: 100,
      description: "Ongoing support, maintenance, and service levels"
    },
  ];

  const vendorProposals: VendorProposal[] = [
    {
      id: "1",
      vendorName: "CloudTech Inc.",
      document: {
        id: "doc1",
        title: "Cloud Infrastructure Proposal",
        pages: 45,
        sections: [
          { name: "Technical", startPage: 1, endPage: 20 },
          { name: "Commercial", startPage: 21, endPage: 30 },
          { name: "Implementation", startPage: 31, endPage: 45 },
        ]
      },
      primaryScore: 85,
      primaryComments: "Strong technical approach with comprehensive architecture.",
      primaryStatus: "completed",
      secondaryStatus: "in_progress",
    },
    {
      id: "2",
      vendorName: "TechCorp Solutions",
      document: {
        id: "doc2",
        title: "Enterprise Cloud Solution",
        pages: 52,
        sections: [
          { name: "Technical", startPage: 1, endPage: 25 },
          { name: "Commercial", startPage: 26, endPage: 35 },
          { name: "Implementation", startPage: 36, endPage: 52 },
        ]
      },
      primaryStatus: "pending",
      secondaryStatus: "pending",
    },
  ];

  const currentVendor = vendorProposals[currentProposal];
  const isOtherEvaluatorComplete = evaluatorMode === "primary" 
    ? currentVendor.secondaryStatus === "completed"
    : currentVendor.primaryStatus === "completed";

  const calculateWeightedScore = () => {
    let totalScore = 0;
    let totalWeight = 0;
    
    evaluationCriteria.forEach(criterion => {
      const score = scores[criterion.id];
      if (score !== undefined) {
        totalScore += score * (criterion.weight / 100);
        totalWeight += criterion.weight;
      }
    });
    
    return totalWeight > 0 ? totalScore : 0;
  };

  const handleScoreChange = (criterionId: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setScores(prev => ({ ...prev, [criterionId]: numValue }));
    }
  };

  const handleCommentChange = (criterionId: string, value: string) => {
    setComments(prev => ({ ...prev, [criterionId]: value }));
  };

  const handleSaveEvaluation = () => {
    toast({
      title: "Evaluation Saved",
      description: "Your evaluation progress has been saved as draft.",
    });
  };

  const handleSubmitEvaluation = () => {
    toast({
      title: "Evaluation Submitted",
      description: `Your ${evaluatorMode} evaluation has been submitted successfully.`,
    });
  };

  const jumpToSection = (sectionName: string) => {
    const section = currentVendor.document.sections.find(s => 
      s.name.toLowerCase() === sectionName.toLowerCase()
    );
    if (section) {
      setCurrentPage(section.startPage);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-background">
        <div className="flex items-center gap-4">
          <Select value={currentProposal.toString()} onValueChange={(value) => setCurrentProposal(parseInt(value))}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {vendorProposals.map((vendor, index) => (
                <SelectItem key={vendor.id} value={index.toString()}>
                  {vendor.vendorName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-2">
            <Button
              variant={evaluatorMode === "primary" ? "default" : "outline"}
              size="sm"
              onClick={() => setEvaluatorMode("primary")}
            >
              Primary Evaluator
            </Button>
            <Button
              variant={evaluatorMode === "secondary" ? "default" : "outline"}
              size="sm"
              onClick={() => setEvaluatorMode("secondary")}
            >
              Secondary Evaluator
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Timer className="h-3 w-3" />
            Auto-saved 2 min ago
          </Badge>
          <Button variant="outline" size="sm" onClick={handleSaveEvaluation}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button size="sm" onClick={handleSubmitEvaluation} className="gradient-primary">
            <Send className="h-4 w-4 mr-2" />
            Submit Evaluation
          </Button>
        </div>
      </div>

      {/* Split Panel Layout */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Panel - Document Viewer */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col">
            {/* Document Controls */}
            <div className="flex items-center justify-between p-3 border-b bg-muted/20">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="font-medium">{currentVendor.document.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setZoomLevel(prev => Math.max(50, prev - 25))}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm w-12 text-center">{zoomLevel}%</span>
                <Button variant="ghost" size="sm" onClick={() => setZoomLevel(prev => Math.min(200, prev + 25))}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Section Navigation */}
            <div className="flex items-center gap-1 p-2 border-b bg-muted/10">
              {currentVendor.document.sections.map((section) => (
                <Button
                  key={section.name}
                  variant={currentSection === section.name.toLowerCase() ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setCurrentSection(section.name.toLowerCase());
                    jumpToSection(section.name);
                  }}
                >
                  {section.name}
                </Button>
              ))}
            </div>

            {/* Document Viewer */}
            <div className="flex-1 bg-muted/5 flex items-center justify-center">
              <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-4" style={{ zoom: zoomLevel / 100 }}>
                <div className="aspect-[8.5/11] bg-white border border-gray-200 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <div className="text-lg font-medium">Document Preview</div>
                    <div className="text-sm">Page {currentPage} of {currentVendor.document.pages}</div>
                    <div className="text-sm mt-2">Section: {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Page Navigation */}
            <div className="flex items-center justify-between p-3 border-t bg-muted/20">
              <Button 
                variant="ghost" 
                size="sm" 
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="1"
                  max={currentVendor.document.pages}
                  value={currentPage}
                  onChange={(e) => setCurrentPage(parseInt(e.target.value) || 1)}
                  className="w-16 text-center"
                />
                <span className="text-sm">of {currentVendor.document.pages}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                disabled={currentPage >= currentVendor.document.pages}
                onClick={() => setCurrentPage(prev => Math.min(currentVendor.document.pages, prev + 1))}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel - Evaluation Scoring */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">
                  {evaluatorMode.charAt(0).toUpperCase() + evaluatorMode.slice(1)} Evaluation
                </h3>
                {isOtherEvaluatorComplete && (
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Compare Scores
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Evaluate {currentVendor.vendorName} proposal
              </p>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-6">
              {/* Evaluation Criteria */}
              {evaluationCriteria.map((criterion) => (
                <Card key={criterion.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Label className="font-medium">{criterion.name}</Label>
                          <Badge variant="outline">{criterion.weight}%</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {criterion.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="0-100"
                          className="w-20 text-center"
                          value={scores[criterion.id] || ""}
                          onChange={(e) => handleScoreChange(criterion.id, e.target.value)}
                        />
                        <span className="text-sm text-muted-foreground">/ 100</span>
                      </div>
                    </div>
                    
                    <Textarea
                      placeholder={`Comments for ${criterion.name.toLowerCase()}...`}
                      value={comments[criterion.id] || ""}
                      onChange={(e) => handleCommentChange(criterion.id, e.target.value)}
                      rows={2}
                    />

                    {isOtherEvaluatorComplete && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">
                          Other evaluator's score:
                        </div>
                        <div className="font-medium">82/100</div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}

              {/* Overall Score */}
              <Card className="p-4 border-primary/20 bg-primary/5">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Weighted Total Score</div>
                  <div className="text-3xl font-bold text-primary">
                    {calculateWeightedScore().toFixed(1)} / 100
                  </div>
                </div>
              </Card>

              {/* Overall Comments */}
              <Card className="p-4">
                <Label className="text-base font-medium">Overall Comments</Label>
                <Textarea
                  placeholder="Provide your overall assessment of this proposal..."
                  value={overallComments}
                  onChange={(e) => setOverallComments(e.target.value)}
                  rows={4}
                  className="mt-2"
                />
              </Card>

              {/* Comparison View */}
              {isOtherEvaluatorComplete && (
                <Card className="p-4 border-warning/20 bg-warning/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">Score Comparison</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Your Score:</span>
                      <span className="font-medium">{calculateWeightedScore().toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other Evaluator:</span>
                      <span className="font-medium">78.5</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Difference:</span>
                      <span className="font-medium text-warning">
                        {Math.abs(calculateWeightedScore() - 78.5).toFixed(1)} points
                      </span>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SplitScreenEvaluator;