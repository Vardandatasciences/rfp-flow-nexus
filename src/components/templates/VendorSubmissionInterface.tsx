import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Save, 
  Send, 
  Upload, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Eye,
  History
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SubmissionData {
  [sectionId: string]: {
    [fieldId: string]: any;
  };
}

interface VendorSubmissionInterfaceProps {
  template: any;
  existingSubmission?: SubmissionData;
  onSave: (data: SubmissionData) => void;
  onSubmit: (data: SubmissionData) => void;
  onCancel: () => void;
}

export default function VendorSubmissionInterface({ 
  template, 
  existingSubmission,
  onSave, 
  onSubmit, 
  onCancel 
}: VendorSubmissionInterfaceProps) {
  const { toast } = useToast();
  const [submissionData, setSubmissionData] = useState<SubmissionData>(existingSubmission || {});
  const [currentSection, setCurrentSection] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File}>({});

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setInterval(() => {
      if (Object.keys(submissionData).length > 0) {
        localStorage.setItem(`submission_draft_${template.id}`, JSON.stringify(submissionData));
        setLastSaved(new Date());
        onSave(submissionData);
      }
    }, 30000);

    return () => clearInterval(autoSave);
  }, [submissionData, template.id, onSave]);

  const updateFieldValue = (sectionId: string, fieldId: string, value: any) => {
    setSubmissionData(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [fieldId]: value
      }
    }));
  };

  const handleFileUpload = (sectionId: string, fieldId: string, file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [`${sectionId}_${fieldId}`]: file
    }));
    updateFieldValue(sectionId, fieldId, file.name);
  };

  const calculateProgress = () => {
    if (!template?.sections) return 0;
    
    const totalFields = template.sections.reduce((total: number, section: any) => {
      return total + (section.fields?.filter((f: any) => f.required).length || 0);
    }, 0);

    const completedFields = template.sections.reduce((completed: number, section: any) => {
      const sectionData = submissionData[section.id] || {};
      return completed + (section.fields?.filter((field: any) => 
        field.required && sectionData[field.id]
      ).length || 0);
    }, 0);

    return totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;
  };

  const getSectionStatus = (section: any) => {
    const sectionData = submissionData[section.id] || {};
    const requiredFields = section.fields?.filter((f: any) => f.required) || [];
    const completedRequired = requiredFields.filter((field: any) => sectionData[field.id]);
    
    if (completedRequired.length === 0) return 'not-started';
    if (completedRequired.length === requiredFields.length) return 'completed';
    return 'in-progress';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const validateSubmission = () => {
    const errors: string[] = [];
    
    if (!template?.sections) return errors;
    
    template.sections.forEach((section: any) => {
      const sectionData = submissionData[section.id] || {};
      section.fields?.forEach((field: any) => {
        if (field.required && !sectionData[field.id]) {
          errors.push(`${section.title}: ${field.label} is required`);
        }
      });
    });

    return errors;
  };

  const handleSubmit = () => {
    const errors = validateSubmission();
    if (errors.length > 0) {
      toast({
        title: "Submission Incomplete",
        description: `Please complete all required fields: ${errors.slice(0, 3).join(', ')}${errors.length > 3 ? ` and ${errors.length - 3} more` : ''}`,
        variant: "destructive",
      });
      return;
    }

    onSubmit(submissionData);
    toast({
      title: "Submission Successful",
      description: "Your proposal has been submitted successfully.",
    });
  };

  const renderField = (section: any, field: any) => {
    const value = submissionData[section.id]?.[field.id] || '';
    
    const commonProps = {
      value,
      onChange: (e: any) => updateFieldValue(section.id, field.id, e.target.value),
      placeholder: field.placeholder,
    };

    switch (field.type) {
      case 'text':
        return <Input {...commonProps} />;
      
      case 'textarea':
        return <Textarea {...commonProps} rows={4} />;
      
      case 'number':
        return <Input type="number" {...commonProps} />;
      
      case 'date':
        return <Input type="date" {...commonProps} />;
      
      case 'select':
        return (
          <Select value={value} onValueChange={(val) => updateFieldValue(section.id, field.id, val)}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: string) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={value}
              onCheckedChange={(checked) => updateFieldValue(section.id, field.id, checked)}
            />
            <Label>{field.placeholder || field.label}</Label>
          </div>
        );
      
      case 'file':
        return (
          <div className="space-y-2">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {value ? `Uploaded: ${value}` : 'Choose file to upload'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Max size: {template.metadata?.fileSizeLimit || 10}MB
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      handleFileUpload(section.id, field.id, file);
                    }
                  };
                  input.click();
                }}
              >
                Browse Files
              </Button>
            </div>
            {value && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{value}</span>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        );
      
      default:
        return <Input {...commonProps} />;
    }
  };

  const renderSection = (section: any) => {
    switch (section.type) {
      case 'header':
        return (
          <div className="space-y-2 text-center py-8">
            <h2 className="text-3xl font-bold text-primary">{section.title}</h2>
            {section.instructions && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {section.instructions}
              </p>
            )}
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{section.title}</h3>
            <div 
              className="prose max-w-none p-6 border rounded-lg bg-muted/30"
              dangerouslySetInnerHTML={{ __html: section.content || '' }}
            />
          </div>
        );

      case 'form':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                {section.title}
                {section.required && <Badge variant="destructive">Required</Badge>}
              </h3>
              {section.instructions && (
                <p className="text-muted-foreground">{section.instructions}</p>
              )}
            </div>
            
            <div className="grid gap-6">
              {section.fields?.map((field: any) => (
                <div key={field.id} className="space-y-2">
                  <Label className="flex items-center gap-1 text-base">
                    {field.label}
                    {field.required && <span className="text-destructive">*</span>}
                  </Label>
                  {renderField(section, field)}
                </div>
              ))}
            </div>
          </div>
        );

      case 'file-upload':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{section.title}</h3>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
              <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h4 className="text-lg font-medium mb-2">Upload Documents</h4>
              <p className="text-muted-foreground mb-4">
                Drag and drop files here or click to browse
              </p>
              <Button>
                Choose Files
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Maximum file size: {template.metadata?.fileSizeLimit || 10}MB per file
              </p>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">{section.title}</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((phase) => (
                <Card key={phase}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                        {phase}
                      </div>
                      <div className="flex-1 space-y-2">
                        <Input placeholder={`Phase ${phase} Title`} />
                        <Textarea placeholder="Describe deliverables, milestones, and timeline" rows={2} />
                      </div>
                      <div className="space-y-2">
                        <Label>Duration</Label>
                        <Input placeholder="e.g., 4 weeks" className="w-32" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Unknown section type: {section.type}</div>;
    }
  };

  if (isPreviewMode) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Submission Preview</h1>
            <p className="text-muted-foreground">Review your responses before submitting</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsPreviewMode(false)}>
              <Eye className="h-4 w-4 mr-2" />
              Continue Editing
            </Button>
            <Button onClick={handleSubmit}>
              <Send className="h-4 w-4 mr-2" />
              Submit Proposal
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            {template?.sections?.map((section: any, index: number) => (
              <div key={section.id}>
                {renderSection(section)}
                {index < template.sections.length - 1 && <Separator className="my-8" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = calculateProgress();

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{template.metadata?.name || template.name}</h1>
            <p className="text-muted-foreground">{template.metadata?.description || template.description}</p>
            {lastSaved && (
              <p className="text-sm text-muted-foreground">
                Last saved: {lastSaved.toLocaleTimeString()}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="outline" onClick={() => setIsPreviewMode(true)}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSubmit}>
              <Send className="h-4 w-4 mr-2" />
              Submit
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Completion Progress</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar Navigation */}
        <div className="w-80 border-r bg-muted/30">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Sections</h3>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {template?.sections?.map((section: any, index: number) => {
                const status = getSectionStatus(section);
                return (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(index)}
                    className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                      currentSection === index 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-accent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{section.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusIcon(status)}
                          <Badge variant={getStatusColor(status) as any} className="text-xs">
                            {status.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>
                      {section.required && (
                        <span className="text-destructive text-xs ml-2">*</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <ScrollArea className="h-full">
            <div className="p-8 max-w-4xl mx-auto">
              {template?.sections?.[currentSection] && (
                <div className="space-y-8">
                  {renderSection(template.sections[currentSection])}
                  
                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-8 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                      disabled={currentSection === 0}
                    >
                      Previous Section
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          localStorage.setItem(`submission_draft_${template.id}`, JSON.stringify(submissionData));
                          onSave(submissionData);
                          toast({
                            title: "Progress Saved",
                            description: "Your work has been saved as a draft.",
                          });
                        }}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Draft
                      </Button>
                      
                      {currentSection < (template?.sections?.length || 0) - 1 ? (
                        <Button
                          onClick={() => setCurrentSection(currentSection + 1)}
                        >
                          Next Section
                        </Button>
                      ) : (
                        <Button onClick={() => setIsPreviewMode(true)}>
                          Review & Submit
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}