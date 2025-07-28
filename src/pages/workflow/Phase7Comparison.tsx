import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  BarChart3, 
  TrendingUp, 
  Filter, 
  Eye, 
  Star,
  ArrowRight,
  Download,
  CheckCircle2,
  Trophy,
  DollarSign,
  Users,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Phase7Comparison = () => {
  const { toast } = useToast();
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("totalScore");
  const [filterMinScore, setFilterMinScore] = useState("");

  const vendorEvaluations = [
    {
      id: "tech-corp",
      name: "TechCorp Solutions",
      contact: "john.smith@techcorp.com",
      totalScore: 88.5,
      technicalScore: 85.5,
      implementationScore: 92.0,
      pricingScore: 75.0,
      timelineScore: 95.0,
      proposedValue: 485000,
      evaluatorVariance: 2.1,
      evaluator1Score: 87.4,
      evaluator2Score: 89.6,
      status: "evaluated",
      submissionDate: "2025-01-25",
      strengths: ["Strong technical team", "Proven track record", "Excellent project management"],
      concerns: ["Pricing slightly high", "Limited local presence"]
    },
    {
      id: "cloudtech",
      name: "CloudTech Inc",
      contact: "hello@cloudtech.com",
      totalScore: 92.3,
      technicalScore: 94.0,
      implementationScore: 89.5,
      pricingScore: 88.0,
      timelineScore: 91.0,
      proposedValue: 425000,
      evaluatorVariance: 1.5,
      evaluator1Score: 91.5,
      evaluator2Score: 93.1,
      status: "evaluated",
      submissionDate: "2025-01-23",
      strengths: ["Innovative approach", "Competitive pricing", "Strong Azure expertise"],
      concerns: ["Smaller team size", "Less experience with similar scale"]
    },
    {
      id: "startup-tech",
      name: "StartupTech Solutions",
      contact: "team@startuptech.com",
      totalScore: 76.8,
      technicalScore: 72.0,
      implementationScore: 78.5,
      pricingScore: 82.0,
      timelineScore: 74.0,
      proposedValue: 350000,
      evaluatorVariance: 3.2,
      evaluator1Score: 75.2,
      evaluator2Score: 78.4,
      status: "evaluated",
      submissionDate: "2025-01-24",
      strengths: ["Very competitive pricing", "Agile methodology", "Modern tech stack"],
      concerns: ["Limited experience", "Resource availability questions"]
    },
    {
      id: "datasoft",
      name: "DataSoft Corporation",
      contact: "info@datasoft.com",
      totalScore: 85.1,
      technicalScore: 88.0,
      implementationScore: 85.5,
      pricingScore: 79.0,
      timelineScore: 87.0,
      proposedValue: 520000,
      evaluatorVariance: 1.8,
      evaluator1Score: 84.2,
      evaluator2Score: 86.0,
      status: "evaluated",
      submissionDate: "2025-01-22",
      strengths: ["Enterprise experience", "Solid methodology", "Good team credentials"],
      concerns: ["Higher cost", "Longer timeline"]
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-warning";
    if (score >= 70) return "text-info";
    return "text-muted-foreground";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "status-badge awarded";
    if (score >= 80) return "status-badge evaluation";
    if (score >= 70) return "status-badge active";
    return "status-badge draft";
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 1: return <Star className="h-4 w-4 text-gray-400" />;
      case 2: return <Star className="h-4 w-4 text-orange-600" />;
      default: return null;
    }
  };

  const handleVendorSelect = (vendorId: string) => {
    setSelectedVendors(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const handleShortlist = () => {
    if (selectedVendors.length === 0) {
      toast({ 
        title: "No vendors selected", 
        description: "Please select vendors to add to shortlist.",
        variant: "destructive"
      });
      return;
    }
    toast({ 
      title: "Vendors shortlisted", 
      description: `${selectedVendors.length} vendors added to shortlist.` 
    });
  };

  const sortedVendors = [...vendorEvaluations].sort((a, b) => {
    switch (sortBy) {
      case "totalScore": return b.totalScore - a.totalScore;
      case "proposedValue": return a.proposedValue - b.proposedValue;
      case "variance": return a.evaluatorVariance - b.evaluatorVariance;
      default: return b.totalScore - a.totalScore;
    }
  });

  const filteredVendors = sortedVendors.filter(vendor => 
    !filterMinScore || vendor.totalScore >= parseFloat(filterMinScore)
  );

  const averageScore = Math.round(vendorEvaluations.reduce((sum, v) => sum + v.totalScore, 0) / vendorEvaluations.length * 10) / 10;
  const topScore = Math.max(...vendorEvaluations.map(v => v.totalScore));
  const lowestValue = Math.min(...vendorEvaluations.map(v => v.proposedValue));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Phase 7: Comparison & Analysis</h1>
          <p className="text-muted-foreground">
            Compare vendor responses and analyze evaluation results.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="status-badge active">
            Phase 7 of 10
          </Badge>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Responses</p>
                <p className="text-2xl font-bold">{vendorEvaluations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Trophy className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Highest Score</p>
                <p className="text-2xl font-bold">{topScore}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <BarChart3 className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">{averageScore}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-info/10">
                <DollarSign className="h-4 w-4 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Best Value</p>
                <p className="text-2xl font-bold">${(lowestValue / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="comparison" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="comparison">Vendor Comparison</TabsTrigger>
          <TabsTrigger value="analytics">Score Analytics</TabsTrigger>
          <TabsTrigger value="shortlist">Shortlist Management</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-6">
          {/* Filters and Controls */}
          <Card className="phase-card">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Filter by minimum score..."
                      value={filterMinScore}
                      onChange={(e) => setFilterMinScore(e.target.value)}
                      type="number"
                      className="max-w-48"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded px-3 py-1 text-sm"
                  >
                    <option value="totalScore">Total Score</option>
                    <option value="proposedValue">Proposed Value</option>
                    <option value="variance">Evaluator Variance</option>
                  </select>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShortlist}>
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Shortlist Selected
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle>Vendor Comparison Table</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Rank</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Total Score</TableHead>
                    <TableHead>Technical</TableHead>
                    <TableHead>Implementation</TableHead>
                    <TableHead>Pricing</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Proposed Value</TableHead>
                    <TableHead>Variance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVendors.map((vendor, index) => (
                    <TableRow 
                      key={vendor.id}
                      className={selectedVendors.includes(vendor.id) ? 'bg-primary/5' : ''}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getRankIcon(index)}
                          <span className="font-medium">#{index + 1}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{vendor.name}</p>
                          <p className="text-sm text-muted-foreground">{vendor.contact}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getScoreBadge(vendor.totalScore)}>
                          {vendor.totalScore}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={getScoreColor(vendor.technicalScore)}>
                          {vendor.technicalScore}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={getScoreColor(vendor.implementationScore)}>
                          {vendor.implementationScore}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={getScoreColor(vendor.pricingScore)}>
                          {vendor.pricingScore}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={getScoreColor(vendor.timelineScore)}>
                          {vendor.timelineScore}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          ${vendor.proposedValue.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={vendor.evaluatorVariance > 3 ? 'text-warning' : 'text-success'}>
                          ±{vendor.evaluatorVariance}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            checked={selectedVendors.includes(vendor.id)}
                            onChange={() => handleVendorSelect(vendor.id)}
                            className="mr-2"
                          />
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/workflow/phase-6`}>
                              <Eye className="h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Score Distribution Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="phase-card">
              <CardHeader>
                <CardTitle>Score Distribution by Criteria</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Technical Competence", values: vendorEvaluations.map(v => v.technicalScore) },
                  { name: "Implementation", values: vendorEvaluations.map(v => v.implementationScore) },
                  { name: "Pricing", values: vendorEvaluations.map(v => v.pricingScore) },
                  { name: "Timeline", values: vendorEvaluations.map(v => v.timelineScore) }
                ].map((criteria) => {
                  const avg = Math.round(criteria.values.reduce((sum, v) => sum + v, 0) / criteria.values.length * 10) / 10;
                  const max = Math.max(...criteria.values);
                  const min = Math.min(...criteria.values);
                  
                  return (
                    <div key={criteria.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{criteria.name}</span>
                        <span className="text-muted-foreground">Avg: {avg}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span>Min: {min}</span>
                        <div className="flex-1 bg-muted rounded-full h-2 relative">
                          <div 
                            className="bg-primary rounded-full h-2" 
                            style={{ width: `${(avg / 100) * 100}%` }}
                          />
                        </div>
                        <span>Max: {max}</span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="phase-card">
              <CardHeader>
                <CardTitle>Value vs Score Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendorEvaluations.map((vendor) => {
                    const valueScore = (600000 - vendor.proposedValue) / 600000 * 100; // Higher score for lower cost
                    const efficiency = (vendor.totalScore / (vendor.proposedValue / 1000)).toFixed(2);
                    
                    return (
                      <div key={vendor.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{vendor.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Score: {vendor.totalScore} | Value: ${vendor.proposedValue.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Efficiency: {efficiency}</p>
                          <p className="text-sm text-muted-foreground">Points per $1K</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Evaluator Variance Analysis */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle>Evaluator Consensus Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Evaluator 1 Score</TableHead>
                    <TableHead>Evaluator 2 Score</TableHead>
                    <TableHead>Variance</TableHead>
                    <TableHead>Consensus Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendorEvaluations.map((vendor) => {
                    const consensusLevel = vendor.evaluatorVariance <= 2 ? "High" : vendor.evaluatorVariance <= 3 ? "Medium" : "Low";
                    const consensusColor = vendor.evaluatorVariance <= 2 ? "text-success" : vendor.evaluatorVariance <= 3 ? "text-warning" : "text-destructive";
                    
                    return (
                      <TableRow key={vendor.id}>
                        <TableCell className="font-medium">{vendor.name}</TableCell>
                        <TableCell>{vendor.evaluator1Score}</TableCell>
                        <TableCell>{vendor.evaluator2Score}</TableCell>
                        <TableCell>±{vendor.evaluatorVariance}</TableCell>
                        <TableCell>
                          <span className={consensusColor}>{consensusLevel}</span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shortlist" className="space-y-6">
          {/* Shortlist Management */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle>Finalists Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Select the top vendors to proceed to the final consensus phase.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vendorEvaluations
                  .sort((a, b) => b.totalScore - a.totalScore)
                  .slice(0, 3)
                  .map((vendor, index) => (
                    <Card key={vendor.id} className="border-2 border-primary/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getRankIcon(index)}
                            <h3 className="font-semibold">{vendor.name}</h3>
                          </div>
                          <Badge className={getScoreBadge(vendor.totalScore)}>
                            {vendor.totalScore}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Proposed Value:</span>
                            <span className="font-medium">${vendor.proposedValue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Evaluator Consensus:</span>
                            <span className={vendor.evaluatorVariance <= 2 ? 'text-success' : 'text-warning'}>
                              {vendor.evaluatorVariance <= 2 ? 'High' : 'Medium'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-3 space-y-1">
                          <p className="text-xs font-medium text-success">Strengths:</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {vendor.strengths.slice(0, 2).map((strength, i) => (
                              <li key={i}>• {strength}</li>
                            ))}
                          </ul>
                        </div>
                        
                        {vendor.concerns.length > 0 && (
                          <div className="mt-2 space-y-1">
                            <p className="text-xs font-medium text-warning">Concerns:</p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {vendor.concerns.slice(0, 1).map((concern, i) => (
                                <li key={i}>• {concern}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <Card className="phase-card">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link to="/workflow/phase-6">
                Previous: Evaluation
              </Link>
            </Button>
            <Button className="gradient-primary" asChild>
              <Link to="/workflow/phase-8">
                Continue to Final Consensus
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Phase7Comparison;