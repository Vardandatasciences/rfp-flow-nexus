import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Clock, 
  CheckCircle2, 
  User, 
  Building2,
  Mail,
  Phone,
  ArrowRight,
  Save,
  Send,
  AlertCircle,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Phase5VendorPortal = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "TechCorp Solutions",
    contactName: "John Smith",
    email: "john.smith@techcorp.com",
    phone: "+1 (555) 123-4567",
    website: "www.techcorp.com"
  });
  
  const [responses, setResponses] = useState({
    technical: "",
    implementation: "",
    pricing: "",
    timeline: "",
    experience: ""
  });

  const [completionStatus, setCompletionStatus] = useState({
    company: 100,
    responses: 60,
    documents: 40,
    personnel: 80
  });

  const evaluationCriteria = [
    {
      id: "technical",
      title: "Technical Competence",
      weight: 40,
      description: "Demonstrate your technical capabilities for cloud infrastructure management",
      type: "narrative",
      required: true
    },
    {
      id: "implementation",
      title: "Implementation Approach",
      weight: 30,
      description: "Describe your methodology for implementing the solution",
      type: "narrative",
      required: true
    },
    {
      id: "pricing", 
      title: "Commercial Competitiveness",
      weight: 20,
      description: "Provide detailed pricing breakdown",
      type: "pricing",
      required: true
    },
    {
      id: "timeline",
      title: "Project Timeline",
      weight: 10,
      description: "Proposed project timeline and milestones",
      type: "timeline",
      required: true
    }
  ];

  const documents = [
    { name: "Company Profile", uploaded: true, required: true },
    { name: "Technical Certifications", uploaded: true, required: true },
    { name: "Reference Letters", uploaded: false, required: true },
    { name: "Insurance Certificate", uploaded: true, required: false },
    { name: "Financial Statements", uploaded: false, required: true }
  ];

  const keyPersonnel = [
    { role: "Project Manager", name: "Jane Doe", experience: "8 years", certifications: ["PMP", "ITIL"] },
    { role: "Technical Lead", name: "Mike Johnson", experience: "12 years", certifications: ["AWS Solutions Architect", "Kubernetes"] }
  ];

  const overallProgress = Math.round(
    (completionStatus.company + completionStatus.responses + completionStatus.documents + completionStatus.personnel) / 4
  );

  const handleAutoSave = () => {
    toast({ title: "Progress saved automatically" });
  };

  const handleSubmit = () => {
    if (overallProgress < 90) {
      toast({ 
        title: "Submission incomplete", 
        description: "Please complete all required sections before submitting.",
        variant: "destructive"
      });
      return;
    }
    toast({ 
      title: "Proposal submitted successfully", 
      description: "Your proposal has been submitted for evaluation." 
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Badge className="status-badge active">RFP-2025-001</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Cloud Infrastructure Services RFP</h1>
        <p className="text-muted-foreground">
          Please complete all sections below to submit your proposal.
        </p>
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-warning" />
            <span>Deadline: August 1, 2025</span>
          </div>
          <div className="flex items-center gap-1">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span>Budget: $400,000 - $600,000</span>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="phase-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Submission Progress</span>
            <Badge variant={overallProgress >= 90 ? "default" : "secondary"}>
              {overallProgress}% Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={overallProgress} className="h-2" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{completionStatus.company}%</div>
              <div className="text-sm text-muted-foreground">Company Info</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{completionStatus.responses}%</div>
              <div className="text-sm text-muted-foreground">RFP Responses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-muted-foreground">{completionStatus.documents}%</div>
              <div className="text-sm text-muted-foreground">Documents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{completionStatus.personnel}%</div>
              <div className="text-sm text-muted-foreground">Key Personnel</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Information */}
      <Card className="phase-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Information
            <CheckCircle2 className="h-4 w-4 text-success ml-auto" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name *</label>
              <Input
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                placeholder="Enter company name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Contact *</label>
              <Input
                value={formData.contactName}
                onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                placeholder="Enter contact name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number *</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Website</label>
            <Input
              value={formData.website}
              onChange={(e) => setFormData({...formData, website: e.target.value})}
              placeholder="Enter website URL"
            />
          </div>
        </CardContent>
      </Card>

      {/* RFP Responses */}
      <Card className="phase-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            RFP Response Sections
            {completionStatus.responses < 100 && (
              <AlertCircle className="h-4 w-4 text-warning ml-auto" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {evaluationCriteria.map((criteria) => (
            <div key={criteria.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    {criteria.title}
                    {criteria.required && <span className="text-destructive">*</span>}
                  </h4>
                  <p className="text-sm text-muted-foreground">{criteria.description}</p>
                </div>
                <Badge variant="outline">{criteria.weight}% weight</Badge>
              </div>
              
              {criteria.type === "narrative" ? (
                <Textarea
                  value={responses[criteria.id as keyof typeof responses] || ""}
                  onChange={(e) => setResponses({
                    ...responses,
                    [criteria.id]: e.target.value
                  })}
                  placeholder={`Enter your response for ${criteria.title.toLowerCase()}`}
                  className="min-h-32"
                  onBlur={handleAutoSave}
                />
              ) : criteria.type === "pricing" ? (
                <div className="space-y-3">
                  <Textarea
                    value={responses[criteria.id as keyof typeof responses] || ""}
                    onChange={(e) => setResponses({
                      ...responses,
                      [criteria.id]: e.target.value
                    })}
                    placeholder="Provide detailed pricing breakdown including costs, phases, and payment terms"
                    className="min-h-24"
                    onBlur={handleAutoSave}
                  />
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Upload pricing documents (PDF, Excel)</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Choose Files
                    </Button>
                  </div>
                </div>
              ) : (
                <Textarea
                  value={responses[criteria.id as keyof typeof responses] || ""}
                  onChange={(e) => setResponses({
                    ...responses,
                    [criteria.id]: e.target.value
                  })}
                  placeholder={`Enter your ${criteria.title.toLowerCase()}`}
                  className="min-h-24"
                  onBlur={handleAutoSave}
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Document Upload */}
      <Card className="phase-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Required Documents
            {completionStatus.documents < 100 && (
              <AlertCircle className="h-4 w-4 text-warning ml-auto" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {doc.uploaded ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <Upload className="h-4 w-4 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium">
                    {doc.name}
                    {doc.required && <span className="text-destructive ml-1">*</span>}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {doc.uploaded ? "Uploaded successfully" : "Not uploaded"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {doc.uploaded && (
                  <Button variant="ghost" size="sm">
                    <Download className="h-3 w-3" />
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  {doc.uploaded ? "Replace" : "Upload"}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Key Personnel */}
      <Card className="phase-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Key Personnel
            <CheckCircle2 className="h-4 w-4 text-success ml-auto" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {keyPersonnel.map((person, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <p className="font-medium">{person.role}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="font-medium">{person.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Experience</label>
                  <p className="font-medium">{person.experience}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Certifications</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {person.certifications.map((cert) => (
                      <Badge key={cert} variant="secondary" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            <User className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </CardContent>
      </Card>

      {/* Submission Actions */}
      <Card className="phase-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              <p>Last saved: 2 minutes ago</p>
              <p>Auto-save is enabled</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleAutoSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button 
                className="gradient-primary"
                onClick={handleSubmit}
                disabled={overallProgress < 90}
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Proposal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Navigation (only visible in wireframe) */}
      <Card className="phase-card bg-muted/30 border-dashed">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              This is the vendor portal view. In the actual system, this would be a separate, no-login interface.
            </p>
            <div className="flex justify-center gap-2">
              <Button variant="outline" asChild>
                <Link to="/workflow/phase-4">
                  Previous: URL Generation
                </Link>
              </Button>
              <Button className="gradient-primary" asChild>
                <Link to="/workflow/phase-6">
                  Continue to Evaluation
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Phase5VendorPortal;