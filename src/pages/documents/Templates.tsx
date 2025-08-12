import { useState } from "react";
import { Search, Plus, Copy, Edit, Download, Eye, Star, Clock, Users, BarChart3, Filter, FileText, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TemplateEditor from "@/components/templates/TemplateEditor";
import TemplateSelector from "@/components/templates/TemplateSelector";
import DraftManager from "@/components/templates/DraftManager";

const templates = [
  {
    id: 1,
    name: "Cloud Infrastructure RFP Template",
    category: "Technology",
    version: "3.2",
    status: "Active",
    lastModified: "2024-01-20",
    author: "Sarah Chen",
    usage: 45,
    rating: 4.8,
    size: "1.2 MB",
    description: "Comprehensive template for cloud infrastructure procurement with technical specifications and evaluation criteria.",
    tags: ["Cloud", "Infrastructure", "AWS", "Azure", "Technical"],
    approvals: {
      required: 2,
      received: 2
    }
  },
  {
    id: 2,
    name: "Professional Services RFP Template",
    category: "Services",
    version: "2.1",
    status: "Active", 
    lastModified: "2024-01-18",
    author: "Mike Johnson",
    usage: 32,
    rating: 4.6,
    size: "980 KB",
    description: "Standard template for professional services procurement including consulting, legal, and advisory services.",
    tags: ["Professional", "Consulting", "Legal", "Advisory"],
    approvals: {
      required: 2,
      received: 2
    }
  },
  {
    id: 3,
    name: "Software Development RFP Template",
    category: "Technology",
    version: "1.8",
    status: "Draft",
    lastModified: "2024-01-15",
    author: "Alex Rodriguez",
    usage: 28,
    rating: 4.9,
    size: "1.5 MB",
    description: "Detailed template for custom software development projects with agile methodology requirements.",
    tags: ["Software", "Development", "Agile", "Custom"],
    approvals: {
      required: 2,
      received: 1
    }
  },
  {
    id: 4,
    name: "Marketing Services RFP Template",
    category: "Marketing",
    version: "2.3",
    status: "Active",
    lastModified: "2024-01-12",
    author: "Emma Davis",
    usage: 19,
    rating: 4.4,
    size: "750 KB",
    description: "Template for marketing and advertising services procurement with campaign requirements and metrics.",
    tags: ["Marketing", "Advertising", "Digital", "Campaign"],
    approvals: {
      required: 2,
      received: 2
    }
  },
  {
    id: 5,
    name: "Facilities Management RFP Template",
    category: "Operations",
    version: "1.0",
    status: "Under Review",
    lastModified: "2024-01-10",
    author: "David Kim",
    usage: 0,
    rating: null,
    size: "890 KB",
    description: "New template for facilities management and maintenance services procurement.",
    tags: ["Facilities", "Maintenance", "Operations", "Physical"],
    approvals: {
      required: 2,
      received: 0
    }
  }
];

const categories = [
  { name: "Technology", count: 8, color: "bg-blue-500" },
  { name: "Services", count: 12, color: "bg-green-500" },
  { name: "Marketing", count: 5, color: "bg-purple-500" },
  { name: "Operations", count: 7, color: "bg-orange-500" },
  { name: "Finance", count: 4, color: "bg-red-500" }
];

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [showEditor, setShowEditor] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("library");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "success";
      case "Draft": return "warning";
      case "Under Review": return "info";
      case "Archived": return "secondary";
      default: return "secondary";
    }
  };

  const filteredTemplates = templates.filter(template => {
    if (selectedCategory !== "all" && template.category !== selectedCategory) return false;
    if (selectedStatus !== "all" && template.status !== selectedStatus) return false;
    return true;
  });

  const handleCreateTemplate = () => {
    setEditingTemplate(null);
    setShowEditor(true);
  };

  const handleEditTemplate = (template: any) => {
    setEditingTemplate(template);
    setShowEditor(true);
  };

  const handleSaveTemplate = (templateData: any) => {
    // Here you would save to your backend
    console.log('Saving template:', templateData);
    setShowEditor(false);
    setEditingTemplate(null);
  };

  const handleRestoreDraft = (draft: any) => {
    if (draft.type === 'template') {
      setEditingTemplate(draft.data);
      setShowEditor(true);
    }
    setShowDrafts(false);
  };

  const handleDeleteDraft = (draftId: string) => {
    // Handle draft deletion
    console.log('Deleting draft:', draftId);
  };

  if (showEditor) {
    return (
      <TemplateEditor
        template={editingTemplate}
        onSave={handleSaveTemplate}
        onCancel={() => {
          setShowEditor(false);
          setEditingTemplate(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">RFP Templates</h1>
          <p className="text-muted-foreground">Manage and create RFP templates for efficient procurement</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowDrafts(true)}>
            <FileText className="h-4 w-4 mr-2" />
            View Drafts
          </Button>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Usage Analytics
          </Button>
          <Button onClick={handleCreateTemplate}>
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="library">Template Library</TabsTrigger>
          <TabsTrigger value="drafts">Drafts & Auto-save</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">36</div>
            <p className="text-sm text-muted-foreground">Total Templates</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">28</div>
            <p className="text-sm text-muted-foreground">Active Templates</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-info">124</div>
            <p className="text-sm text-muted-foreground">Total Usage</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">4.7</div>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={selectedCategory === "all" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory("all")}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "secondary" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${category.color}`} />
                    {category.name}
                  </div>
                  <Badge variant="outline">{category.count}</Badge>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search templates..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Under Review">Review</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{template.category}</Badge>
                      <Badge variant={getStatusColor(template.status) as any}>
                        {template.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      {template.rating && (
                        <>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{template.rating}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">Version {template.version}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Author:</span>
                      <p className="font-medium">{template.author}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Modified:</span>
                      <p className="font-medium">{template.lastModified}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Usage:</span>
                      <p className="font-medium">{template.usage} times</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Size:</span>
                      <p className="font-medium">{template.size}</p>
                    </div>
                  </div>

                  {template.status === "Under Review" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Approvals</span>
                        <span>{template.approvals.received}/{template.approvals.required}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(template.approvals.received / template.approvals.required) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="text-sm text-muted-foreground">Tags:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {template.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Copy className="h-4 w-4 mr-2" />
                      Use
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleEditTemplate(template)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
        </TabsContent>

        <TabsContent value="drafts" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Drafts & Auto-save</h2>
            <p className="text-muted-foreground mb-6">
              Recover your work and continue where you left off
            </p>
            <DraftManager 
              onRestoreDraft={handleRestoreDraft}
              onDeleteDraft={handleDeleteDraft}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Drafts Dialog */}
      <Dialog open={showDrafts} onOpenChange={setShowDrafts}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Your Drafts</DialogTitle>
          </DialogHeader>
          <DraftManager 
            onRestoreDraft={handleRestoreDraft}
            onDeleteDraft={handleDeleteDraft}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}