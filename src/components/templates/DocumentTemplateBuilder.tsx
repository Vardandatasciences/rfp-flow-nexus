import { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Save, 
  Eye, 
  GripVertical, 
  FileText, 
  Hash, 
  Calendar, 
  Upload, 
  CheckSquare,
  Type,
  AlignLeft,
  Table,
  Heading1,
  Heading2,
  Bold,
  Italic,
  Underline,
  List,
  Clock,
  User,
  Star,
  Trash2,
  Copy,
  Edit3,
  MoreVertical
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TemplateSection {
  id: string;
  type: 'header' | 'text' | 'form' | 'table' | 'file-upload' | 'timeline' | 'custom';
  title: string;
  content?: string;
  fields?: TemplateField[];
  required: boolean;
  instructions?: string;
}

interface TemplateField {
  id: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'checkbox' | 'file';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface TemplateMetadata {
  name: string;
  description: string;
  category: string;
  version: string;
  createdBy: string;
  createdDate: string;
  submissionDeadline?: string;
  fileSizeLimit: number;
  tags: string[];
}

interface DocumentTemplateBuilderProps {
  template?: any;
  onSave: (template: any) => void;
  onCancel: () => void;
}

const componentTypes = [
  { type: 'header', label: 'Section Header', icon: Heading1 },
  { type: 'text', label: 'Rich Text Block', icon: AlignLeft },
  { type: 'form', label: 'Form Fields', icon: CheckSquare },
  { type: 'table', label: 'Data Table', icon: Table },
  { type: 'file-upload', label: 'File Upload Area', icon: Upload },
  { type: 'timeline', label: 'Timeline Component', icon: Clock },
];

const predefinedSections = [
  {
    type: 'company-info',
    title: 'Company Information',
    fields: [
      { type: 'text', label: 'Company Name', required: true },
      { type: 'text', label: 'Registration Number', required: true },
      { type: 'textarea', label: 'Company Description', required: true },
      { type: 'text', label: 'Website', required: false },
      { type: 'file', label: 'Company Registration Certificate', required: true },
    ]
  },
  {
    type: 'technical-proposal',
    title: 'Technical Proposal',
    fields: [
      { type: 'textarea', label: 'Technical Approach', required: true },
      { type: 'textarea', label: 'Methodology', required: true },
      { type: 'file', label: 'Technical Documentation', required: true },
    ]
  },
  {
    type: 'commercial-proposal',
    title: 'Commercial Proposal',
    fields: [
      { type: 'number', label: 'Total Price', required: true },
      { type: 'textarea', label: 'Pricing Breakdown', required: true },
      { type: 'file', label: 'Detailed Pricing Sheet', required: true },
    ]
  },
];

export default function DocumentTemplateBuilder({ template, onSave, onCancel }: DocumentTemplateBuilderProps) {
  const { toast } = useToast();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [metadata, setMetadata] = useState<TemplateMetadata>({
    name: template?.name || "",
    description: template?.description || "",
    category: template?.category || "",
    version: template?.version || "1.0",
    createdBy: "Current User",
    createdDate: new Date().toISOString().split('T')[0],
    fileSizeLimit: 10,
    tags: template?.tags || [],
  });
  
  const [sections, setSections] = useState<TemplateSection[]>(template?.sections || []);
  const [selectedText, setSelectedText] = useState("");
  const [showOutline, setShowOutline] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  const editorRef = useRef<HTMLDivElement>(null);

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setInterval(() => {
      if (metadata.name.trim()) {
        const templateData = { metadata, sections };
        localStorage.setItem(`doc_template_draft_${template?.id || 'new'}`, JSON.stringify(templateData));
        setLastSaved(new Date());
      }
    }, 30000);

    return () => clearInterval(autoSave);
  }, [metadata, sections, template?.id]);

  const addSection = (type: string) => {
    const newSection: TemplateSection = {
      id: Date.now().toString(),
      type: type as any,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
      content: type === 'text' ? 'Enter your content here...' : undefined,
      fields: type === 'form' ? [] : undefined,
      required: false,
      instructions: 'Please complete this section',
    };
    setSections([...sections, newSection]);
  };

  const addPredefinedSection = (predefined: any) => {
    const newSection: TemplateSection = {
      id: Date.now().toString(),
      type: 'form',
      title: predefined.title,
      fields: predefined.fields.map((field: any, index: number) => ({
        id: `${Date.now()}_${index}`,
        ...field,
      })),
      required: true,
      instructions: `Please provide accurate ${predefined.title.toLowerCase()} details`,
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (id: string, updates: Partial<TemplateSection>) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, ...updates } : section
    ));
  };

  const removeSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
  };

  const duplicateSection = (id: string) => {
    const section = sections.find(s => s.id === id);
    if (section) {
      const duplicated = {
        ...section,
        id: Date.now().toString(),
        title: `${section.title} (Copy)`,
      };
      setSections([...sections, duplicated]);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSections(items);
  };

  const addFieldToSection = (sectionId: string, fieldType: string) => {
    const newField: TemplateField = {
      id: Date.now().toString(),
      type: fieldType as any,
      label: `New ${fieldType} field`,
      required: false,
      placeholder: fieldType === 'select' ? undefined : "Enter value...",
      options: fieldType === 'select' ? ['Option 1', 'Option 2'] : undefined,
    };

    updateSection(sectionId, {
      fields: [...(sections.find(s => s.id === sectionId)?.fields || []), newField]
    });
  };

  const handleSave = () => {
    if (!metadata.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Template name is required.",
        variant: "destructive",
      });
      return;
    }

    const templateData = {
      ...metadata,
      sections,
      id: template?.id || Date.now().toString(),
    };

    onSave(templateData);
    toast({
      title: "Template Saved",
      description: "Your document template has been saved successfully.",
    });
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const renderSectionPreview = (section: TemplateSection) => {
    switch (section.type) {
      case 'header':
        return (
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary">{section.title}</h2>
            {section.instructions && (
              <p className="text-muted-foreground">{section.instructions}</p>
            )}
          </div>
        );

      case 'text':
        return (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <div 
              className="p-4 border rounded-lg bg-muted/50"
              dangerouslySetInnerHTML={{ __html: section.content || '' }}
            />
          </div>
        );

      case 'form':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{section.title}</h3>
            {section.instructions && (
              <p className="text-sm text-muted-foreground">{section.instructions}</p>
            )}
            <div className="space-y-3">
              {section.fields?.map((field) => (
                <div key={field.id} className="space-y-1">
                  <Label className="flex items-center gap-1">
                    {field.label}
                    {field.required && <span className="text-destructive">*</span>}
                  </Label>
                  {renderFieldPreview(field)}
                </div>
              ))}
            </div>
          </div>
        );

      case 'file-upload':
        return (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium">Drop files here or click to upload</p>
              <p className="text-sm text-muted-foreground">
                Max file size: {metadata.fileSizeLimit}MB
              </p>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((phase) => (
                <div key={phase} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    {phase}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Implementation Phase {phase}</h4>
                    <p className="text-sm text-muted-foreground">Duration and deliverables</p>
                  </div>
                  <Input className="w-32" placeholder="Duration" />
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Unknown section type</div>;
    }
  };

  const renderFieldPreview = (field: TemplateField) => {
    const commonProps = {
      placeholder: field.placeholder,
      disabled: true,
    };

    switch (field.type) {
      case 'text':
        return <Input {...commonProps} />;
      case 'textarea':
        return <Textarea {...commonProps} rows={3} />;
      case 'number':
        return <Input type="number" {...commonProps} />;
      case 'date':
        return <Input type="date" {...commonProps} />;
      case 'select':
        return (
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
          </Select>
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox disabled />
            <Label>{field.placeholder || "Checkbox option"}</Label>
          </div>
        );
      case 'file':
        return (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Upload file</p>
          </div>
        );
      default:
        return <Input {...commonProps} />;
    }
  };

  if (isPreviewMode) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{metadata.name}</h1>
            <p className="text-muted-foreground">{metadata.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsPreviewMode(false)}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Template
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Template
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            {sections.map((section) => (
              <div key={section.id}>
                {renderSectionPreview(section)}
                {section !== sections[sections.length - 1] && <Separator className="my-8" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Document Template Builder</h1>
            {lastSaved && (
              <p className="text-sm text-muted-foreground">
                Auto-saved at {lastSaved.toLocaleTimeString()}
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
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Template
            </Button>
          </div>
        </div>

        {/* Formatting Toolbar */}
        <div className="flex items-center gap-2 mt-4 p-2 border rounded-lg bg-muted/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('bold')}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('italic')}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('underline')}
          >
            <Underline className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('insertUnorderedList')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('formatBlock', 'h1')}
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('formatBlock', 'h2')}
          >
            <Heading2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 border-r bg-muted/30 flex flex-col">
          {/* Template Info */}
          <div className="p-4 border-b">
            <div className="space-y-3">
              <div>
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  value={metadata.name}
                  onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
                  placeholder="Enter template name"
                />
              </div>
              <div>
                <Label htmlFor="template-category">Category</Label>
                <Select
                  value={metadata.category}
                  onValueChange={(value) => setMetadata({ ...metadata, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Services">Services</SelectItem>
                    <SelectItem value="Consulting">Consulting</SelectItem>
                    <SelectItem value="Construction">Construction</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Components */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Template Components</h3>
                <div className="space-y-2">
                  {componentTypes.map((component) => {
                    const Icon = component.icon;
                    return (
                      <Button
                        key={component.type}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => addSection(component.type)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {component.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Pre-built Sections</h3>
                <div className="space-y-2">
                  {predefinedSections.map((section) => (
                    <Button
                      key={section.type}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => addPredefinedSection(section)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {section.title}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Template Outline */}
              <div>
                <h3 className="font-semibold mb-2">Template Outline</h3>
                <div className="space-y-1">
                  {sections.map((section, index) => (
                    <div
                      key={section.id}
                      className="flex items-center gap-2 p-2 rounded text-sm hover:bg-accent"
                    >
                      <span className="text-muted-foreground">{index + 1}.</span>
                      <span className="flex-1 truncate">{section.title}</span>
                      {section.required && (
                        <Star className="h-3 w-3 text-warning" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1">
            <div className="p-8 max-w-4xl mx-auto">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="sections">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                      {sections.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                          <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                          <h3 className="text-lg font-semibold mb-2">Start Building Your Template</h3>
                          <p className="text-muted-foreground mb-4">
                            Add components from the sidebar to create your RFP template
                          </p>
                        </div>
                      ) : (
                        sections.map((section, index) => (
                          <Draggable key={section.id} draggableId={section.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="group relative"
                              >
                                <Card className="border-2 border-transparent hover:border-primary/50 transition-colors">
                                  <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <div {...provided.dragHandleProps}>
                                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <Input
                                          value={section.title}
                                          onChange={(e) => updateSection(section.id, { title: e.target.value })}
                                          className="font-semibold text-lg border-none p-0 h-auto focus-visible:ring-0"
                                        />
                                      </div>
                                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => duplicateSection(section.id)}
                                        >
                                          <Copy className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => removeSection(section.id)}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </CardHeader>
                                  <CardContent>
                                    {renderSectionPreview(section)}
                                  </CardContent>
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}