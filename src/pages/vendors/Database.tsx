import { useState } from "react";
import { Search, Filter, Plus, Upload, Download, MoreHorizontal, Star, MapPin, Building2, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

const vendors = [
  {
    id: 1,
    name: "TechCorp Solutions",
    contact: "John Smith",
    email: "john@techcorp.com",
    phone: "+1 (555) 123-4567",
    category: "Cloud Services",
    location: "San Francisco, CA",
    performance: 95.5,
    status: "Active",
    certifications: ["AWS Certified", "ISO 27001", "SOC 2"],
    projects: 24,
    successRate: 96.2,
    avgResponseTime: "2.3 days"
  },
  {
    id: 2,
    name: "CloudTech Inc",
    contact: "Sarah Johnson",
    email: "sarah@cloudtech.com",
    phone: "+1 (555) 234-5678",
    category: "Infrastructure",
    location: "Austin, TX",
    performance: 89.2,
    status: "Active",
    certifications: ["Azure Certified", "PCI DSS"],
    projects: 18,
    successRate: 88.9,
    avgResponseTime: "1.8 days"
  },
  {
    id: 3,
    name: "DataSoft Corporation",
    contact: "Mike Chen",
    email: "mike@datasoft.com",
    phone: "+1 (555) 345-6789",
    category: "Data Analytics",
    location: "Seattle, WA",
    performance: 85.1,
    status: "Active",
    certifications: ["ISO 9001", "GDPR Compliant"],
    projects: 31,
    successRate: 92.1,
    avgResponseTime: "3.1 days"
  },
  {
    id: 4,
    name: "StartupTech Solutions",
    contact: "Emily Davis",
    email: "emily@startuptech.com",
    phone: "+1 (555) 456-7890",
    category: "Software Development",
    location: "New York, NY",
    performance: 76.8,
    status: "Under Review",
    certifications: ["Agile Certified"],
    projects: 8,
    successRate: 75.0,
    avgResponseTime: "4.2 days"
  }
];

export default function VendorDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedVendors, setSelectedVendors] = useState<number[]>([]);
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<typeof vendors[0] | null>(null);

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || vendor.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || vendor.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-warning";
    return "text-destructive";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "success";
      case "Under Review": return "warning";
      case "Inactive": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vendor Database</h1>
          <p className="text-muted-foreground">Manage your vendor network and partnerships</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={showAddVendor} onOpenChange={setShowAddVendor}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Vendor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Vendor</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Enter company name" />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cloud">Cloud Services</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="data">Data Analytics</SelectItem>
                        <SelectItem value="software">Software Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact">Primary Contact</Label>
                    <Input id="contact" placeholder="Contact person name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="contact@company.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="City, State" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Brief description of vendor capabilities" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddVendor(false)}>Cancel</Button>
                  <Button>Add Vendor</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Cloud Services">Cloud Services</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                <SelectItem value="Software Development">Software Development</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedVendors.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {selectedVendors.length} vendor(s) selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Export Selected</Button>
                <Button variant="outline" size="sm">Merge</Button>
                <Button variant="destructive" size="sm">Delete</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <Card key={vendor.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedVendors.includes(vendor.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedVendors([...selectedVendors, vendor.id]);
                      } else {
                        setSelectedVendors(selectedVendors.filter(id => id !== vendor.id));
                      }
                    }}
                  />
                  <div>
                    <CardTitle className="text-lg">{vendor.name}</CardTitle>
                    <Badge variant={getStatusColor(vendor.status) as any} className="mt-1">
                      {vendor.status}
                    </Badge>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedVendor(vendor)}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{vendor.name} - Details</DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="info" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="info">Info</TabsTrigger>
                        <TabsTrigger value="performance">Performance</TabsTrigger>
                        <TabsTrigger value="history">RFP History</TabsTrigger>
                        <TabsTrigger value="documents">Documents</TabsTrigger>
                      </TabsList>
                      <TabsContent value="info" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Contact Person</Label>
                            <p className="text-sm text-muted-foreground">{vendor.contact}</p>
                          </div>
                          <div>
                            <Label>Category</Label>
                            <p className="text-sm text-muted-foreground">{vendor.category}</p>
                          </div>
                          <div>
                            <Label>Email</Label>
                            <p className="text-sm text-muted-foreground">{vendor.email}</p>
                          </div>
                          <div>
                            <Label>Phone</Label>
                            <p className="text-sm text-muted-foreground">{vendor.phone}</p>
                          </div>
                          <div>
                            <Label>Location</Label>
                            <p className="text-sm text-muted-foreground">{vendor.location}</p>
                          </div>
                          <div>
                            <Label>Projects Completed</Label>
                            <p className="text-sm text-muted-foreground">{vendor.projects}</p>
                          </div>
                        </div>
                        <div>
                          <Label>Certifications</Label>
                          <div className="flex gap-2 mt-2">
                            {vendor.certifications.map((cert, index) => (
                              <Badge key={index} variant="secondary">{cert}</Badge>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="performance" className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <Card>
                            <CardContent className="p-4 text-center">
                              <div className={`text-2xl font-bold ${getPerformanceColor(vendor.performance)}`}>
                                {vendor.performance}%
                              </div>
                              <p className="text-sm text-muted-foreground">Performance Score</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl font-bold text-success">
                                {vendor.successRate}%
                              </div>
                              <p className="text-sm text-muted-foreground">Success Rate</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl font-bold text-primary">
                                {vendor.avgResponseTime}
                              </div>
                              <p className="text-sm text-muted-foreground">Avg Response Time</p>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                      <TabsContent value="history">
                        <p className="text-muted-foreground">RFP participation history will be displayed here.</p>
                      </TabsContent>
                      <TabsContent value="documents">
                        <p className="text-muted-foreground">Vendor documents and certifications will be displayed here.</p>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{vendor.category}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{vendor.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{vendor.contact}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{vendor.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-warning fill-current" />
                    <span className={`text-sm font-medium ${getPerformanceColor(vendor.performance)}`}>
                      {vendor.performance}%
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">{vendor.projects} projects</span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {vendor.certifications.slice(0, 2).map((cert, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">{cert}</Badge>
                  ))}
                  {vendor.certifications.length > 2 && (
                    <Badge variant="secondary" className="text-xs">+{vendor.certifications.length - 2}</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{vendors.length}</div>
            <p className="text-sm text-muted-foreground">Total Vendors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {vendors.filter(v => v.status === "Active").length}
            </div>
            <p className="text-sm text-muted-foreground">Active Vendors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {vendors.filter(v => v.performance >= 90).length}
            </div>
            <p className="text-sm text-muted-foreground">Top Performers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-info">
              {Math.round(vendors.reduce((acc, v) => acc + v.performance, 0) / vendors.length)}%
            </div>
            <p className="text-sm text-muted-foreground">Avg Performance</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}