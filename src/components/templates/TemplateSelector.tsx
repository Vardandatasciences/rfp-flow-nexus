import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Search, 
  Eye, 
  Play, 
  Star, 
  Filter,
  FileText,
  Target,
  Calendar
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  usage: number;
  lastUsed: string;
  author: string;
  tags: string[];
  fields: any[];
  evaluationCriteria: any[];
}

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
  onStartFromScratch: () => void;
}

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Cloud Infrastructure RFP Template",
    description: "Comprehensive template for cloud infrastructure procurement with technical specifications and evaluation criteria.",
    category: "Technology",
    rating: 4.8,
    usage: 45,
    lastUsed: "2024-01-20",
    author: "Sarah Chen",
    tags: ["Cloud", "Infrastructure", "AWS", "Azure", "Technical"],
    fields: [
      { type: "text", label: "Project Title", required: true },
      { type: "textarea", label: "Technical Requirements", required: true },
      { type: "number", label: "Expected Users", required: false },
      { type: "select", label: "Cloud Provider Preference", options: ["AWS", "Azure", "GCP", "Multi-cloud"] },
    ],
    evaluationCriteria: [
      { name: "Technical Capability", weight: 30, isVeto: true },
      { name: "Cost Effectiveness", weight: 25, isVeto: false },
      { name: "Security & Compliance", weight: 25, isVeto: true },
      { name: "Support & SLA", weight: 20, isVeto: false },
    ]
  },
  {
    id: "2",
    name: "Professional Services RFP Template",
    description: "Standard template for professional services procurement including consulting, legal, and advisory services.",
    category: "Services",
    rating: 4.6,
    usage: 32,
    lastUsed: "2024-01-18",
    author: "Mike Johnson",
    tags: ["Professional", "Consulting", "Legal", "Advisory"],
    fields: [
      { type: "text", label: "Service Type", required: true },
      { type: "textarea", label: "Scope of Work", required: true },
      { type: "date", label: "Project Start Date", required: true },
      { type: "number", label: "Budget Range", required: false },
    ],
    evaluationCriteria: [
      { name: "Experience & Expertise", weight: 35, isVeto: true },
      { name: "Cost Proposal", weight: 30, isVeto: false },
      { name: "Methodology", weight: 20, isVeto: false },
      { name: "Timeline", weight: 15, isVeto: false },
    ]
  },
  {
    id: "3",
    name: "Software Development RFP Template",
    description: "Detailed template for custom software development projects with agile methodology requirements.",
    category: "Technology",
    rating: 4.9,
    usage: 28,
    lastUsed: "2024-01-15",
    author: "Alex Rodriguez",
    tags: ["Software", "Development", "Agile", "Custom"],
    fields: [
      { type: "text", label: "Application Type", required: true },
      { type: "textarea", label: "Functional Requirements", required: true },
      { type: "textarea", label: "Non-Functional Requirements", required: true },
      { type: "select", label: "Development Methodology", options: ["Agile", "Waterfall", "DevOps"] },
      { type: "checkbox", label: "Mobile Support Required", required: false },
    ],
    evaluationCriteria: [
      { name: "Technical Expertise", weight: 30, isVeto: true },
      { name: "Portfolio & References", weight: 25, isVeto: true },
      { name: "Development Approach", weight: 20, isVeto: false },
      { name: "Cost & Timeline", weight: 25, isVeto: false },
    ]
  },
];

export default function TemplateSelector({ isOpen, onClose, onSelectTemplate, onStartFromScratch }: TemplateSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(mockTemplates.map(t => t.category)));

  const handleUseTemplate = (template: Template) => {
    onSelectTemplate(template);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Choose How to Start</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Start Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-dashed border-muted-foreground/25">
                <CardContent className="p-6 text-center" onClick={onStartFromScratch}>
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Start from Scratch</h3>
                  <p className="text-muted-foreground text-sm">
                    Create a completely new RFP with custom fields and criteria
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-primary/25">
                <CardContent className="p-6 text-center">
                  <Target className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-medium mb-2">Use Template</h3>
                  <p className="text-muted-foreground text-sm">
                    Start with a pre-built template and customize as needed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Template Library */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Template Library</h3>
              
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search templates..." 
                    className="pl-10" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {filteredTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium mb-1">{template.name}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{template.category}</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{template.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div>Used {template.usage} times</div>
                        <div>By {template.author}</div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {template.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {template.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{template.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => setPreviewTemplate(template)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleUseTemplate(template)}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredTemplates.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No templates found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Template Preview Dialog */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{previewTemplate?.name}</DialogTitle>
          </DialogHeader>

          {previewTemplate && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-muted-foreground">{previewTemplate.description}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Form Fields ({previewTemplate.fields.length})</h4>
                <div className="space-y-2">
                  {previewTemplate.fields.map((field, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{field.type}</Badge>
                        <span className="text-sm">{field.label}</span>
                        {field.required && <span className="text-xs text-destructive">*</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Evaluation Criteria ({previewTemplate.evaluationCriteria.length})</h4>
                <div className="space-y-2">
                  {previewTemplate.evaluationCriteria.map((criterion, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{criterion.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{criterion.weight}%</Badge>
                        {criterion.isVeto && <Badge variant="destructive" className="text-xs">Veto</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
                  Close
                </Button>
                <Button onClick={() => handleUseTemplate(previewTemplate)}>
                  <Play className="h-4 w-4 mr-2" />
                  Use This Template
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}