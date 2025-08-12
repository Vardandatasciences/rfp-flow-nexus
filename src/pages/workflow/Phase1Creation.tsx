import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Trash2,
  Save,
  ArrowRight,
  DollarSign,
  Calendar,
  Users,
  Target,
  Settings,
  FileText,
  Lightbulb,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TemplateSelector from "@/components/templates/TemplateSelector";
import DraftManager from "@/components/templates/DraftManager";

interface EvaluationCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;
  isVeto: boolean;
}

const Phase1Creation = () => {
  const { toast } = useToast();
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showDraftRecovery, setShowDraftRecovery] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    category: "",
    budgetMin: "",
    budgetMax: "",
    timeline: "",
    deadline: "",
  });

  const [criteria, setCriteria] = useState<EvaluationCriteria[]>([
    {
      id: "1",
      name: "Technical Capability",
      description: "Vendor's technical expertise and infrastructure",
      weight: 30,
      isVeto: true,
    },
    {
      id: "2",
      name: "Cost Effectiveness",
      description: "Value for money and pricing structure",
      weight: 25,
      isVeto: false,
    },
    {
      id: "3",
      name: "Experience & References",
      description: "Previous experience and client references",
      weight: 20,
      isVeto: true,
    },
    {
      id: "4",
      name: "Implementation Timeline",
      description: "Proposed timeline and delivery schedule",
      weight: 15,
      isVeto: false,
    },
    {
      id: "5",
      name: "Support & Maintenance",
      description: "Ongoing support and maintenance capabilities",
      weight: 10,
      isVeto: false,
    },
  ]);

  const [reviewers, setReviewers] = useState([
    { id: "1", name: "John Smith", email: "john.smith@company.com", role: "Technical Lead" },
    { id: "2", name: "Sarah Johnson", email: "sarah.johnson@company.com", role: "Procurement Manager" },
  ]);

  const totalWeight = criteria.reduce((sum, criterion) => sum + criterion.weight, 0);

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setInterval(() => {
      if (formData.title.trim() || formData.description.trim()) {
        setIsAutoSaving(true);
        const draftData = {
          ...formData,
          criteria,
          reviewers,
          lastSaved: new Date().toISOString(),
        };
        localStorage.setItem('rfp_draft_current', JSON.stringify(draftData));
        setLastSaved(new Date());
        setTimeout(() => setIsAutoSaving(false), 1000);
      }
    }, 30000);

    return () => clearInterval(autoSave);
  }, [formData, criteria, reviewers]);

  // Check for existing drafts on component mount
  useEffect(() => {
    const existingDraft = localStorage.getItem('rfp_draft_current');
    if (existingDraft && !formData.title && !formData.description) {
      setShowDraftRecovery(true);
    }
  }, []);

  const loadTemplate = (template: any) => {
    // Load template data into form
    setFormData({
      title: template.name + " - " + new Date().toLocaleDateString(),
      description: template.description,
      type: template.category.toLowerCase(),
      category: template.category.toLowerCase(),
      budgetMin: "",
      budgetMax: "",
      timeline: "",
      deadline: "",
    });

    if (template.evaluationCriteria) {
      setCriteria(template.evaluationCriteria.map((c: any, index: number) => ({
        ...c,
        id: (index + 1).toString(),
      })));
    }

    toast({
      title: "Template Loaded",
      description: "Template has been loaded successfully. Customize as needed.",
    });
  };

  const handleRestoreDraft = (draft: any) => {
    const draftData = draft.data;
    setFormData({
      title: draftData.title || "",
      description: draftData.description || "",
      type: draftData.type || "",
      category: draftData.category || "",
      budgetMin: draftData.budgetMin || "",
      budgetMax: draftData.budgetMax || "",
      timeline: draftData.timeline || "",
      deadline: draftData.deadline || "",
    });

    if (draftData.criteria) {
      setCriteria(draftData.criteria);
    }

    if (draftData.reviewers) {
      setReviewers(draftData.reviewers);
    }

    setShowDraftRecovery(false);
    toast({
      title: "Draft Restored",
      description: "Your previous work has been restored.",
    });
  };

  const addCriterion = () => {
    const newCriterion: EvaluationCriteria = {
      id: Date.now().toString(),
      name: "",
      description: "",
      weight: 0,
      isVeto: false,
    };
    setCriteria([...criteria, newCriterion]);
  };

  const updateCriterion = (id: string, field: keyof EvaluationCriteria, value: any) => {
    setCriteria(criteria.map(criterion =>
      criterion.id === id ? { ...criterion, [field]: value } : criterion
    ));
  };

  const removeCriterion = (id: string) => {
    setCriteria(criteria.filter(criterion => criterion.id !== id));
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your RFP has been saved as a draft.",
    });
  };

  const handleProceedToApproval = () => {
    if (totalWeight !== 100) {
      toast({
        title: "Validation Error",
        description: "Evaluation criteria weights must total 100%.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "RFP Created",
      description: "RFP has been created and sent for approval.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">Phase 1</Badge>
            <Progress value={10} className="w-32 h-2" />
            {lastSaved && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                {isAutoSaving ? (
                  <>
                    <Clock className="h-3 w-3 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-3 w-3 text-success" />
                    Saved {lastSaved.toLocaleTimeString()}
                  </>
                )}
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight">RFP Creation & Setup</h1>
          <p className="text-muted-foreground">
            Create a comprehensive RFP with evaluation criteria, budget, and reviewer assignments.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowTemplateSelector(true)}>
            <FileText className="h-4 w-4 mr-2" />
            Use Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="phase-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Basic Information</CardTitle>
              </div>
              <CardDescription>
                Define the core details of your RFP
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">RFP Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Cloud Infrastructure Services"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">RFP Type *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software">Software & Technology</SelectItem>
                      <SelectItem value="services">Professional Services</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of your requirements..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cloud">Cloud Services</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="data">Data & Analytics</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Response Deadline *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget & Timeline */}
          <Card className="phase-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <CardTitle>Budget & Timeline</CardTitle>
              </div>
              <CardDescription>
                Set budget parameters and project timeline
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budgetMin">Minimum Budget ($)</Label>
                  <Input
                    id="budgetMin"
                    type="number"
                    placeholder="100,000"
                    value={formData.budgetMin}
                    onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budgetMax">Maximum Budget ($)</Label>
                  <Input
                    id="budgetMax"
                    type="number"
                    placeholder="500,000"
                    value={formData.budgetMax}
                    onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">Project Timeline</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-months">3 Months</SelectItem>
                    <SelectItem value="6-months">6 Months</SelectItem>
                    <SelectItem value="12-months">12 Months</SelectItem>
                    <SelectItem value="18-months">18+ Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Evaluation Criteria */}
          <Card className="phase-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle>Evaluation Criteria</CardTitle>
              </div>
              <CardDescription>
                Define how vendors will be evaluated (weights must total 100%)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Total Weight:</span>
                  <Badge variant={totalWeight === 100 ? "default" : "destructive"}>
                    {totalWeight}%
                  </Badge>
                </div>
                <Button onClick={addCriterion} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Criterion
                </Button>
              </div>

              <div className="space-y-3">
                {criteria.map((criterion, index) => (
                  <div key={criterion.id} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Criterion {index + 1}</span>
                      {criteria.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCriterion(criterion.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          placeholder="e.g., Technical Capability"
                          value={criterion.name}
                          onChange={(e) => updateCriterion(criterion.id, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Weight (%)</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={criterion.weight}
                          onChange={(e) => updateCriterion(criterion.id, "weight", parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        placeholder="Describe what this criterion evaluates..."
                        rows={2}
                        value={criterion.description}
                        onChange={(e) => updateCriterion(criterion.id, "description", e.target.value)}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`veto-${criterion.id}`}
                        checked={criterion.isVeto}
                        onCheckedChange={(checked) => updateCriterion(criterion.id, "isVeto", checked)}
                      />
                      <Label htmlFor={`veto-${criterion.id}`} className="text-sm">
                        Veto Criterion (failing this criterion eliminates the vendor)
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviewer Assignment */}
          <Card className="phase-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle>Reviewer Assignment</CardTitle>
              </div>
              <CardDescription>
                Assign reviewers for the approval process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviewers.map((reviewer, index) => (
                <div key={reviewer.id} className="p-3 border border-border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{reviewer.name}</div>
                      <div className="text-sm text-muted-foreground">{reviewer.email}</div>
                      <Badge variant="outline" className="mt-1">{reviewer.role}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {index === 0 ? "Primary Reviewer" : "Executive Approver"}
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Reviewer
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Tips */}
          <Card className="phase-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-warning" />
                <CardTitle>Quick Tips</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <p><strong>Clear Requirements:</strong> Be specific about your needs to get better proposals.</p>
                <p><strong>Evaluation Criteria:</strong> Use 3-7 criteria with clear weights totaling 100%.</p>
                <p><strong>Veto Criteria:</strong> Mark mandatory requirements as veto criteria.</p>
                <p><strong>Timeline:</strong> Allow sufficient time for vendor responses (typically 2-4 weeks).</p>
              </div>
            </CardContent>
          </Card>

          {/* Progress Summary */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle>Progress Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Basic Information</span>
                  <span className="text-success">✓</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Budget & Timeline</span>
                  <span className="text-warning">⚠</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Evaluation Criteria</span>
                  <span className={totalWeight === 100 ? "text-success" : "text-destructive"}>
                    {totalWeight === 100 ? "✓" : "✗"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Reviewers</span>
                  <span className="text-success">✓</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleSaveDraft} variant="outline" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handleProceedToApproval} className="w-full gradient-primary">
                <ArrowRight className="h-4 w-4 mr-2" />
                Proceed to Approval
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Template Selector */}
      <TemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        onSelectTemplate={loadTemplate}
        onStartFromScratch={() => setShowTemplateSelector(false)}
      />

      {/* Draft Recovery Dialog */}
      {showDraftRecovery && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Resume Previous Work?</h3>
            <p className="text-muted-foreground mb-4">
              We found an auto-saved draft from your previous session. Would you like to continue where you left off?
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem('rfp_draft_current');
                  setShowDraftRecovery(false);
                }}
              >
                Start Fresh
              </Button>
              <Button
                onClick={() => {
                  const draftData = JSON.parse(localStorage.getItem('rfp_draft_current') || '{}');
                  handleRestoreDraft({ data: draftData });
                }}
              >
                Resume Draft
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Phase1Creation;