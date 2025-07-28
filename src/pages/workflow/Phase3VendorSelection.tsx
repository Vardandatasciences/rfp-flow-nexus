import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Upload, 
  Filter, 
  Star, 
  MapPin, 
  Award,
  Building2,
  Mail,
  Phone,
  Globe,
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Phase3VendorSelection = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");

  const vendors = [
    {
      id: "tech-corp",
      name: "TechCorp Solutions",
      email: "contact@techcorp.com",
      phone: "+1 (555) 123-4567",
      website: "www.techcorp.com",
      location: "San Francisco, CA",
      matchScore: 95.5,
      rating: 4.8,
      capabilities: ["AWS Certified", "Cloud Expert", "DevOps", "Security"],
      certifications: ["ISO 27001", "SOC 2", "AWS Advanced"],
      employees: "500-1000",
      experience: "8 years",
      category: "Enterprise"
    },
    {
      id: "cloudtech",
      name: "CloudTech Inc",
      email: "hello@cloudtech.com",
      phone: "+1 (555) 987-6543",
      website: "www.cloudtech.com",
      location: "Austin, TX",
      matchScore: 89.2,
      rating: 4.6,
      capabilities: ["Azure Expert", "Cloud Migration", "Analytics", "AI/ML"],
      certifications: ["Microsoft Gold", "Azure Expert", "PCI DSS"],
      employees: "200-500",
      experience: "6 years",
      category: "Mid-Market"
    },
    {
      id: "startup-tech",
      name: "StartupTech Solutions",
      email: "team@startuptech.com",
      phone: "+1 (555) 456-7890",
      website: "www.startuptech.com",
      location: "Seattle, WA",
      matchScore: 76.8,
      rating: 4.3,
      capabilities: ["Kubernetes", "Microservices", "React", "Node.js"],
      certifications: ["CISA", "CISSP"],
      employees: "50-200",
      experience: "3 years",
      category: "Startup"
    },
    {
      id: "datasoft",
      name: "DataSoft Corporation",
      email: "info@datasoft.com",
      phone: "+1 (555) 321-0987",
      website: "www.datasoft.com",
      location: "Boston, MA",
      matchScore: 85.1,
      rating: 4.7,
      capabilities: ["Data Analytics", "Machine Learning", "Python", "R"],
      certifications: ["IBM Data Science", "Google Cloud"],
      employees: "1000+",
      experience: "12 years",
      category: "Enterprise"
    }
  ];

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-warning";
    return "text-muted-foreground";
  };

  const getMatchBadgeColor = (score: number) => {
    if (score >= 90) return "status-badge awarded";
    if (score >= 80) return "status-badge evaluation";
    return "status-badge draft";
  };

  const handleVendorSelect = (vendorId: string) => {
    setSelectedVendors(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const handleBulkSelect = () => {
    if (selectedVendors.length === vendors.length) {
      setSelectedVendors([]);
      toast({ title: "All vendors deselected" });
    } else {
      setSelectedVendors(vendors.map(v => v.id));
      toast({ title: "All vendors selected" });
    }
  };

  const handleGenerateURLs = () => {
    if (selectedVendors.length === 0) {
      toast({ 
        title: "No vendors selected", 
        description: "Please select at least one vendor to proceed.",
        variant: "destructive"
      });
      return;
    }
    toast({ 
      title: "URLs Generated", 
      description: `Generated invitation URLs for ${selectedVendors.length} vendors.` 
    });
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.capabilities.some(cap => cap.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "high-match") return matchesSearch && vendor.matchScore >= 90;
    if (activeFilter === "certified") return matchesSearch && vendor.certifications.length > 2;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Phase 3: Vendor Selection</h1>
          <p className="text-muted-foreground">
            Select qualified vendors based on capability matching and requirements.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="status-badge active">
            Phase 3 of 10
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="phase-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Vendor Search & Filtering
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search vendors by name, capabilities, or certifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                onClick={() => setActiveFilter("all")}
                size="sm"
              >
                All Vendors
              </Button>
              <Button
                variant={activeFilter === "high-match" ? "default" : "outline"}
                onClick={() => setActiveFilter("high-match")}
                size="sm"
              >
                High Match (90%+)
              </Button>
              <Button
                variant={activeFilter === "certified" ? "default" : "outline"}
                onClick={() => setActiveFilter("certified")}
                size="sm"
              >
                Highly Certified
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <Card className="phase-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleBulkSelect}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                {selectedVendors.length === vendors.length ? "Deselect All" : "Select All"}
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Bulk Upload CSV
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Export List
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              {selectedVendors.length} of {filteredVendors.length} vendors selected
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVendors.map((vendor) => (
          <Card 
            key={vendor.id} 
            className={`vendor-card hover-lift transition-all ${
              selectedVendors.includes(vendor.id) ? 'ring-2 ring-primary' : ''
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedVendors.includes(vendor.id)}
                    onCheckedChange={() => handleVendorSelect(vendor.id)}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-semibold text-lg">{vendor.name}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {vendor.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current text-warning" />
                        {vendor.rating}/5
                      </div>
                    </div>
                  </div>
                </div>
                <Badge className={getMatchBadgeColor(vendor.matchScore)}>
                  {vendor.matchScore}% match
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span className="truncate">{vendor.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span>{vendor.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-3 w-3 text-muted-foreground" />
                  <span className="truncate">{vendor.website}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-3 w-3 text-muted-foreground" />
                  <span>{vendor.experience} experience</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Capabilities</h4>
                <div className="flex flex-wrap gap-1">
                  {vendor.capabilities.map((capability) => (
                    <Badge key={capability} variant="secondary" className="text-xs">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Certifications</h4>
                <div className="flex flex-wrap gap-1">
                  {vendor.certifications.map((cert) => (
                    <Badge key={cert} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div>
                  <span className="text-xs text-muted-foreground">Company Size</span>
                  <p className="text-sm font-medium">{vendor.employees}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Category</span>
                  <p className="text-sm font-medium">{vendor.category}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selection Summary */}
      {selectedVendors.length > 0 && (
        <Card className="phase-card bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-semibold text-lg">Selection Summary</h3>
                <p className="text-muted-foreground">
                  {selectedVendors.length} vendors selected for invitation
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {vendors
                    .filter(v => selectedVendors.includes(v.id))
                    .map(vendor => (
                      <Badge key={vendor.id} className="status-badge active">
                        {vendor.name}
                      </Badge>
                    ))
                  }
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link to="/workflow/phase-2">
                    Previous
                  </Link>
                </Button>
                <Button 
                  className="gradient-primary" 
                  onClick={handleGenerateURLs}
                  asChild
                >
                  <Link to="/workflow/phase-4">
                    Generate URLs & Send Invitations
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Phase3VendorSelection;