import { useState } from "react";
import { Folder, Plus, Edit, Trash2, Users, TrendingUp, Star, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  {
    id: 1,
    name: "Cloud Services",
    description: "Cloud infrastructure, SaaS, PaaS, and related services",
    vendorCount: 8,
    avgPerformance: 91.2,
    subcategories: [
      { id: 11, name: "Infrastructure as a Service", vendorCount: 4, performance: 93.5 },
      { id: 12, name: "Platform as a Service", vendorCount: 2, performance: 89.0 },
      { id: 13, name: "Software as a Service", vendorCount: 2, performance: 88.9 }
    ],
    criteria: [
      { name: "Technical Expertise", weight: 40, type: "score" },
      { name: "Security Compliance", weight: 30, type: "boolean" },
      { name: "Scalability", weight: 20, type: "score" },
      { name: "Support Quality", weight: 10, type: "score" }
    ],
    totalProjects: 42,
    totalValue: "$2.4M"
  },
  {
    id: 2,
    name: "Software Development",
    description: "Custom software development and application services",
    vendorCount: 12,
    avgPerformance: 84.7,
    subcategories: [
      { id: 21, name: "Web Development", vendorCount: 6, performance: 86.2 },
      { id: 22, name: "Mobile Development", vendorCount: 4, performance: 83.1 },
      { id: 23, name: "Enterprise Applications", vendorCount: 2, performance: 84.8 }
    ],
    criteria: [
      { name: "Development Quality", weight: 35, type: "score" },
      { name: "Project Management", weight: 25, type: "score" },
      { name: "Communication", weight: 20, type: "score" },
      { name: "Innovation", weight: 20, type: "narrative" }
    ],
    totalProjects: 28,
    totalValue: "$1.8M"
  },
  {
    id: 3,
    name: "Data & Analytics",
    description: "Data analytics, business intelligence, and data science services",
    vendorCount: 6,
    avgPerformance: 88.9,
    subcategories: [
      { id: 31, name: "Business Intelligence", vendorCount: 3, performance: 91.0 },
      { id: 32, name: "Data Science", vendorCount: 2, performance: 87.5 },
      { id: 33, name: "Data Engineering", vendorCount: 1, performance: 86.2 }
    ],
    criteria: [
      { name: "Analytical Skills", weight: 40, type: "score" },
      { name: "Data Security", weight: 25, type: "boolean" },
      { name: "Tool Expertise", weight: 20, type: "score" },
      { name: "Visualization", weight: 15, type: "score" }
    ],
    totalProjects: 18,
    totalValue: "$1.2M"
  },
  {
    id: 4,
    name: "IT Infrastructure",
    description: "Network, hardware, and infrastructure services",
    vendorCount: 5,
    avgPerformance: 89.8,
    subcategories: [
      { id: 41, name: "Network Services", vendorCount: 3, performance: 92.1 },
      { id: 42, name: "Hardware Supply", vendorCount: 2, performance: 86.4 }
    ],
    criteria: [
      { name: "Reliability", weight: 40, type: "score" },
      { name: "Response Time", weight: 30, type: "score" },
      { name: "Cost Effectiveness", weight: 20, type: "score" },
      { name: "Certifications", weight: 10, type: "boolean" }
    ],
    totalProjects: 35,
    totalValue: "$3.1M"
  }
];

export default function VendorCategories() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showEditCriteria, setShowEditCriteria] = useState(false);

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-warning";
    return "text-destructive";
  };

  const getCriteriaTypeIcon = (type: string) => {
    switch (type) {
      case "score": return "📊";
      case "boolean": return "✅";
      case "narrative": return "📝";
      default: return "❓";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vendor Categories</h1>
          <p className="text-muted-foreground">Organize and manage vendor categories and evaluation criteria</p>
        </div>
        <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="categoryName">Category Name</Label>
                <Input id="categoryName" placeholder="Enter category name" />
              </div>
              <div>
                <Label htmlFor="categoryDesc">Description</Label>
                <Textarea id="categoryDesc" placeholder="Describe this category" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddCategory(false)}>Cancel</Button>
                <Button>Create Category</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Overview Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{categories.length}</div>
            <p className="text-sm text-muted-foreground">Total Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {categories.reduce((acc, cat) => acc + cat.vendorCount, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Vendors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-info">
              {Math.round(categories.reduce((acc, cat) => acc + cat.avgPerformance, 0) / categories.length)}%
            </div>
            <p className="text-sm text-muted-foreground">Avg Performance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {categories.reduce((acc, cat) => acc + cat.totalProjects, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Projects</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Category Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
          <TabsTrigger value="criteria">Evaluation Criteria</TabsTrigger>
          <TabsTrigger value="management">Category Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Folder className="h-6 w-6 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Category
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="h-4 w-4 mr-2" />
                          Manage Vendors
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Category
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Category Stats */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{category.vendorCount}</div>
                        <p className="text-xs text-muted-foreground">Vendors</p>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getPerformanceColor(category.avgPerformance)}`}>
                          {category.avgPerformance}%
                        </div>
                        <p className="text-xs text-muted-foreground">Avg Performance</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-warning">{category.totalProjects}</div>
                        <p className="text-xs text-muted-foreground">Projects</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-success">{category.totalValue}</div>
                        <p className="text-xs text-muted-foreground">Total Value</p>
                      </div>
                    </div>

                    {/* Subcategories */}
                    <div>
                      <h4 className="font-medium mb-2">Subcategories</h4>
                      <div className="grid gap-2">
                        {category.subcategories.map((sub) => (
                          <div key={sub.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                            <span className="text-sm font-medium">{sub.name}</span>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-muted-foreground">{sub.vendorCount} vendors</span>
                              <span className={getPerformanceColor(sub.performance)}>
                                {sub.performance}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Evaluation Criteria Preview */}
                    <div>
                      <h4 className="font-medium mb-2">Evaluation Criteria</h4>
                      <div className="flex gap-2 flex-wrap">
                        {category.criteria.slice(0, 3).map((criteria, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {getCriteriaTypeIcon(criteria.type)} {criteria.name} ({criteria.weight}%)
                          </Badge>
                        ))}
                        {category.criteria.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{category.criteria.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setSelectedCategory(category)}
                    >
                      View Details & Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Folder className="h-5 w-5" />
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Performance</span>
                      <span className={`font-bold ${getPerformanceColor(category.avgPerformance)}`}>
                        {category.avgPerformance}%
                      </span>
                    </div>
                    <Progress value={category.avgPerformance} className="h-2" />
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Subcategory Performance</h5>
                      {category.subcategories.map((sub) => (
                        <div key={sub.id} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{sub.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20">
                              <Progress value={sub.performance} className="h-1" />
                            </div>
                            <span className={`font-medium ${getPerformanceColor(sub.performance)}`}>
                              {sub.performance}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="criteria" className="space-y-4">
          <div className="grid gap-4">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Folder className="h-5 w-5" />
                      {category.name} - Evaluation Criteria
                    </CardTitle>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Criteria
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.criteria.map((criteria, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{getCriteriaTypeIcon(criteria.type)}</span>
                          <div>
                            <h4 className="font-medium">{criteria.name}</h4>
                            <p className="text-sm text-muted-foreground capitalize">
                              {criteria.type} evaluation
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">{criteria.weight}%</div>
                          <p className="text-xs text-muted-foreground">Weight</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Total Weight:</span>
                      <span className="font-bold">
                        {category.criteria.reduce((acc, c) => acc + c.weight, 0)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="management" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Category Management Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <Users className="h-8 w-8 mb-2 text-primary" />
                  <span className="font-medium">Bulk Vendor Assignment</span>
                  <span className="text-sm text-muted-foreground text-center">
                    Assign multiple vendors to categories at once
                  </span>
                </Button>
                
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <Star className="h-8 w-8 mb-2 text-warning" />
                  <span className="font-medium">Criteria Templates</span>
                  <span className="text-sm text-muted-foreground text-center">
                    Create reusable evaluation criteria templates
                  </span>
                </Button>
                
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <TrendingUp className="h-8 w-8 mb-2 text-success" />
                  <span className="font-medium">Performance Analysis</span>
                  <span className="text-sm text-muted-foreground text-center">
                    Analyze category performance trends
                  </span>
                </Button>
                
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <Folder className="h-8 w-8 mb-2 text-info" />
                  <span className="font-medium">Category Hierarchy</span>
                  <span className="text-sm text-muted-foreground text-center">
                    Manage category and subcategory structure
                  </span>
                </Button>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Quick Actions</h4>
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="outline">Export Category Data</Button>
                  <Button size="sm" variant="outline">Import Vendors</Button>
                  <Button size="sm" variant="outline">Generate Report</Button>
                  <Button size="sm" variant="outline">Archive Category</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}