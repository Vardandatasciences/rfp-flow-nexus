import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Trash2, 
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
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TemplateField {
  id: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'checkbox' | 'file';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // for select fields
}

interface EvaluationCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;
  isVeto: boolean;
}

interface TemplateData {
  id?: string;
  name: string;
  description: string;
  category: string;
  fields: TemplateField[];
  evaluationCriteria: EvaluationCriteria[];
  tags: string[];
}

interface TemplateEditorProps {
  template?: TemplateData;
  onSave: (template: TemplateData) => void;
  onCancel: () => void;
}

const fieldTypes = [
  { value: 'text', label: 'Text Input', icon: Type },
  { value: 'textarea', label: 'Text Area', icon: AlignLeft },
  { value: 'number', label: 'Number', icon: Hash },
  { value: 'date', label: 'Date', icon: Calendar },
  { value: 'select', label: 'Dropdown', icon: CheckSquare },
  { value: 'checkbox', label: 'Checkbox', icon: CheckSquare },
  { value: 'file', label: 'File Upload', icon: Upload },
];

export default function TemplateEditor({ template, onSave, onCancel }: TemplateEditorProps) {
  const { toast } = useToast();
  const [templateData, setTemplateData] = useState<TemplateData>({
    name: "",
    description: "",
    category: "",
    fields: [],
    evaluationCriteria: [],
    tags: [],
    ...template
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [newTag, setNewTag] = useState("");

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setInterval(() => {
      if (templateData.name.trim()) {
        localStorage.setItem(`template_draft_${template?.id || 'new'}`, JSON.stringify(templateData));
        setLastSaved(new Date());
      }
    }, 30000);

    return () => clearInterval(autoSave);
  }, [templateData, template?.id]);

  const addField = (type: TemplateField['type']) => {
    const newField: TemplateField = {
      id: Date.now().toString(),
      type,
      label: "",
      required: false,
      placeholder: type === 'select' ? undefined : "Enter value...",
      options: type === 'select' ? ['Option 1', 'Option 2'] : undefined,
    };
    setTemplateData({
      ...templateData,
      fields: [...templateData.fields, newField]
    });
  };

  const updateField = (id: string, updates: Partial<TemplateField>) => {
    setTemplateData({
      ...templateData,
      fields: templateData.fields.map(field =>
        field.id === id ? { ...field, ...updates } : field
      )
    });
  };

  const removeField = (id: string) => {
    setTemplateData({
      ...templateData,
      fields: templateData.fields.filter(field => field.id !== id)
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
    setTemplateData({
      ...templateData,
      evaluationCriteria: [...templateData.evaluationCriteria, newCriterion]
    });
  };

  const updateCriterion = (id: string, field: keyof EvaluationCriteria, value: any) => {
    setTemplateData({
      ...templateData,
      evaluationCriteria: templateData.evaluationCriteria.map(criterion =>
        criterion.id === id ? { ...criterion, [field]: value } : criterion
      )
    });
  };

  const removeCriterion = (id: string) => {
    setTemplateData({
      ...templateData,
      evaluationCriteria: templateData.evaluationCriteria.filter(criterion => criterion.id !== id)
    });
  };

  const addTag = () => {
    if (newTag.trim() && !templateData.tags.includes(newTag.trim())) {
      setTemplateData({
        ...templateData,
        tags: [...templateData.tags, newTag.trim()]
      });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTemplateData({
      ...templateData,
      tags: templateData.tags.filter(t => t !== tag)
    });
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(templateData.fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTemplateData({
      ...templateData,
      fields: items
    });
  };

  const handleSave = () => {
    if (!templateData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Template name is required.",
        variant: "destructive",
      });
      return;
    }

    const totalWeight = templateData.evaluationCriteria.reduce((sum, criterion) => sum + criterion.weight, 0);
    if (templateData.evaluationCriteria.length > 0 && totalWeight !== 100) {
      toast({
        title: "Validation Error",
        description: "Evaluation criteria weights must total 100%.",
        variant: "destructive",
      });
      return;
    }

    onSave(templateData);
    toast({
      title: "Template Saved",
      description: "Your template has been saved successfully.",
    });
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
          <h2 className="text-2xl font-bold">Template Preview</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsPreviewMode(false)}>
              Edit Template
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Template
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{templateData.name || "Untitled Template"}</CardTitle>
            <p className="text-muted-foreground">{templateData.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {templateData.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label className="flex items-center gap-1">
                  {field.label || "Untitled Field"}
                  {field.required && <span className="text-destructive">*</span>}
                </Label>
                {renderFieldPreview(field)}
              </div>
            ))}
          </CardContent>
        </Card>

        {templateData.evaluationCriteria.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {templateData.evaluationCriteria.map((criterion) => (
                  <div key={criterion.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{criterion.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{criterion.weight}%</Badge>
                        {criterion.isVeto && <Badge variant="destructive">Veto</Badge>}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{criterion.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{template ? "Edit Template" : "Create New Template"}</h2>
          {lastSaved && (
            <p className="text-sm text-muted-foreground">
              Draft saved at {lastSaved.toLocaleTimeString()}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Template Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Template Name *</Label>
                  <Input
                    id="name"
                    value={templateData.name}
                    onChange={(e) => setTemplateData({ ...templateData, name: e.target.value })}
                    placeholder="e.g., Cloud Infrastructure RFP"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={templateData.category}
                    onValueChange={(value) => setTemplateData({ ...templateData, category: value })}
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

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={templateData.description}
                  onChange={(e) => setTemplateData({ ...templateData, description: e.target.value })}
                  placeholder="Describe what this template is used for..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {templateData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0"
                        onClick={() => removeTag(tag)}
                      >
                        ×
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag..."
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} size="sm">
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Fields */}
          <Card>
            <CardHeader>
              <CardTitle>Form Fields</CardTitle>
            </CardHeader>
            <CardContent>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="fields">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {templateData.fields.map((field, index) => (
                        <Draggable key={field.id} draggableId={field.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="p-4 border rounded-lg space-y-3"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div {...provided.dragHandleProps}>
                                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                  <span className="font-medium">Field {index + 1}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeField(field.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                  <Label>Field Type</Label>
                                  <Select
                                    value={field.type}
                                    onValueChange={(value: TemplateField['type']) =>
                                      updateField(field.id, { type: value })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {fieldTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                          {type.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Field Label</Label>
                                  <Input
                                    value={field.label}
                                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                                    placeholder="Field label..."
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label>Placeholder</Label>
                                <Input
                                  value={field.placeholder || ""}
                                  onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                                  placeholder="Placeholder text..."
                                />
                              </div>

                              {field.type === 'select' && (
                                <div className="space-y-2">
                                  <Label>Options (one per line)</Label>
                                  <Textarea
                                    value={field.options?.join('\n') || ""}
                                    onChange={(e) => updateField(field.id, { 
                                      options: e.target.value.split('\n').filter(o => o.trim()) 
                                    })}
                                    placeholder="Option 1&#10;Option 2&#10;Option 3"
                                    rows={3}
                                  />
                                </div>
                              )}

                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`required-${field.id}`}
                                  checked={field.required}
                                  onCheckedChange={(checked) =>
                                    updateField(field.id, { required: !!checked })
                                  }
                                />
                                <Label htmlFor={`required-${field.id}`}>Required field</Label>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>

          {/* Evaluation Criteria */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <CardTitle>Evaluation Criteria</CardTitle>
                </div>
                <Button onClick={addCriterion} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Criterion
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {templateData.evaluationCriteria.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-medium">Total Weight:</span>
                  <Badge variant={
                    templateData.evaluationCriteria.reduce((sum, c) => sum + c.weight, 0) === 100 
                      ? "default" : "destructive"
                  }>
                    {templateData.evaluationCriteria.reduce((sum, c) => sum + c.weight, 0)}%
                  </Badge>
                </div>
              )}

              <div className="space-y-3">
                {templateData.evaluationCriteria.map((criterion, index) => (
                  <div key={criterion.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Criterion {index + 1}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCriterion(criterion.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
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
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Fields</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {fieldTypes.map((fieldType) => {
                  const IconComponent = fieldType.icon;
                  return (
                    <Button
                      key={fieldType.value}
                      variant="outline"
                      className="justify-start"
                      onClick={() => addField(fieldType.value as TemplateField['type'])}
                    >
                      <IconComponent className="h-4 w-4 mr-2" />
                      {fieldType.label}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Template Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p><strong>Field Order:</strong> Drag and drop to reorder fields</p>
              <p><strong>Required Fields:</strong> Mark essential fields as required</p>
              <p><strong>Evaluation Criteria:</strong> Use 3-7 criteria with weights totaling 100%</p>
              <p><strong>Auto-save:</strong> Your work is automatically saved every 30 seconds</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}