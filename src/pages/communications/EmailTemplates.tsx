import { useState } from "react";
import { Search, Plus, Edit, Copy, Eye, Trash2, Send, BarChart3, Filter, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const emailTemplates = [
  {
    id: 1,
    name: "RFP Invitation",
    category: "Vendor Outreach",
    subject: "Invitation to Participate: {{rfp_title}}",
    description: "Initial invitation email sent to vendors for RFP participation",
    lastModified: "2024-01-20",
    author: "Sarah Chen",
    usage: 45,
    openRate: 87.2,
    responseRate: 34.5,
    status: "Active",
    previewText: "You have been invited to participate in our RFP process for {{rfp_title}}. The submission deadline is {{deadline}}.",
    mergeFields: ["rfp_title", "deadline", "vendor_name", "contact_person", "rfp_url"]
  },
  {
    id: 2,
    name: "Proposal Received Confirmation",
    category: "Confirmations",
    subject: "Proposal Received - {{rfp_title}}",
    description: "Automatic confirmation sent when vendor submits proposal",
    lastModified: "2024-01-18",
    author: "Mike Johnson",
    usage: 128,
    openRate: 95.8,
    responseRate: 12.3,
    status: "Active",
    previewText: "Thank you for submitting your proposal for {{rfp_title}}. We have received your submission and will begin the evaluation process.",
    mergeFields: ["rfp_title", "vendor_name", "submission_date", "next_steps"]
  },
  {
    id: 3,
    name: "Evaluation Reminder",
    category: "Internal",
    subject: "Evaluation Due: {{rfp_title}} - Due {{due_date}}",
    description: "Reminder email sent to evaluators about pending evaluations",
    lastModified: "2024-01-15",
    author: "Alex Rodriguez",
    usage: 67,
    openRate: 92.1,
    responseRate: 78.9,
    status: "Active",
    previewText: "Reminder: Your evaluation for {{rfp_title}} is due on {{due_date}}. Please complete your assessment.",
    mergeFields: ["rfp_title", "due_date", "evaluator_name", "vendor_name", "evaluation_url"]
  },
  {
    id: 4,
    name: "Award Notification",
    category: "Award Process",
    subject: "Congratulations! You have been selected for {{rfp_title}}",
    description: "Notification sent to winning vendor",
    lastModified: "2024-01-12",
    author: "Emma Davis",
    usage: 8,
    openRate: 100.0,
    responseRate: 87.5,
    status: "Active",
    previewText: "Congratulations! Your proposal for {{rfp_title}} has been selected. We look forward to working with you.",
    mergeFields: ["rfp_title", "vendor_name", "award_value", "next_steps", "contact_person"]
  },
  {
    id: 5,
    name: "Rejection Notification",
    category: "Award Process",
    subject: "Thank you for your proposal - {{rfp_title}}",
    description: "Professional rejection email for unsuccessful vendors",
    lastModified: "2024-01-10",
    author: "David Kim",
    usage: 32,
    openRate: 78.4,
    responseRate: 15.6,
    status: "Draft",
    previewText: "Thank you for submitting your proposal for {{rfp_title}}. After careful consideration, we have decided to proceed with another vendor.",
    mergeFields: ["rfp_title", "vendor_name", "feedback_available", "future_opportunities"]
  }
];

const categories = [
  { name: "Vendor Outreach", count: 8, color: "bg-blue-500" },
  { name: "Confirmations", count: 12, color: "bg-green-500" },
  { name: "Internal", count: 15, color: "bg-purple-500" },
  { name: "Award Process", count: 6, color: "bg-orange-500" },
  { name: "Reminders", count: 9, color: "bg-red-500" }
];

export default function EmailTemplates() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof emailTemplates[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "success";
      case "Draft": return "warning";
      case "Archived": return "secondary";
      default: return "secondary";
    }
  };

  const getPerformanceColor = (rate: number) => {
    if (rate >= 80) return "text-success";
    if (rate >= 60) return "text-info";
    if (rate >= 40) return "text-warning";
    return "text-destructive";
  };

  const filteredTemplates = selectedCategory === "all" 
    ? emailTemplates 
    : emailTemplates.filter(template => template.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Email Templates</h1>
          <p className="text-muted-foreground">Manage email templates for RFP communications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">50</div>
            <p className="text-sm text-muted-foreground">Total Templates</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">280</div>
            <p className="text-sm text-muted-foreground">Emails Sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-info">89.3%</div>
            <p className="text-sm text-muted-foreground">Avg Open Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">41.7%</div>
            <p className="text-sm text-muted-foreground">Avg Response Rate</p>
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
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">Subject: {template.subject}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{template.category}</Badge>
                      <Badge variant={getStatusColor(template.status) as any}>
                        {template.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
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
                      <span className="text-muted-foreground">Performance:</span>
                      <div className="flex gap-2">
                        <span className={`font-medium ${getPerformanceColor(template.openRate)}`}>
                          {template.openRate}% open
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-3 rounded-md mb-4">
                    <p className="text-sm italic">{template.previewText}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-muted-foreground">Merge Fields:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.mergeFields.slice(0, 3).map((field) => (
                          <Badge key={field} variant="secondary" className="text-xs">
                            {field}
                          </Badge>
                        ))}
                        {template.mergeFields.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{template.mergeFields.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedTemplate.name}</h2>
              <Button variant="ghost" onClick={() => setSelectedTemplate(null)}>
                ×
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Subject Line</Label>
                <Input value={selectedTemplate.subject} readOnly className="mt-1" />
              </div>
              
              <div>
                <Label className="text-sm font-medium">Email Content</Label>
                <Textarea 
                  value={selectedTemplate.previewText} 
                  readOnly 
                  className="mt-1 h-32" 
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium">Available Merge Fields</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTemplate.mergeFields.map((field) => (
                    <Badge key={field} variant="outline">
                      {field}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                  Close
                </Button>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}