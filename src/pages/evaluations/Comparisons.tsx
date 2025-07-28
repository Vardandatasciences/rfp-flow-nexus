import { useState } from "react";
import { ArrowUpDown, Filter, Download, Eye, BarChart3, Zap, DollarSign, Star, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

const vendorComparisons = [
  {
    id: 1,
    rfpTitle: "Enterprise Cloud Migration",
    rfpId: "RFP-2025-001",
    vendors: [
      {
        name: "TechCorp Solutions",
        finalScore: 89.5,
        proposedValue: "$485,000",
        criteria: {
          technical: 92,
          security: 88,
          scalability: 90,
          support: 87,
          pricing: 89
        },
        strengths: ["AWS Expertise", "24/7 Support", "Proven Track Record"],
        weaknesses: ["Higher Cost", "Limited Local Presence"],
        recommendation: "Highly Recommended"
      },
      {
        name: "CloudTech Inc",
        finalScore: 86.2,
        proposedValue: "$425,000",
        criteria: {
          technical: 85,
          security: 90,
          scalability: 88,
          support: 82,
          pricing: 91
        },
        strengths: ["Competitive Pricing", "Strong Security", "Local Team"],
        weaknesses: ["Less Experience", "Limited Scalability"],
        recommendation: "Recommended"
      },
      {
        name: "StartupTech Solutions",
        finalScore: 76.8,
        proposedValue: "$375,000",
        criteria: {
          technical: 78,
          security: 75,
          scalability: 76,
          support: 79,
          pricing: 88
        },
        strengths: ["Lowest Cost", "Agile Approach", "Innovation"],
        weaknesses: ["Limited Experience", "Small Team", "No 24/7 Support"],
        recommendation: "Conditional"
      }
    ],
    category: "Cloud Services",
    evaluationDate: "2025-01-20",
    status: "Active"
  }
];

const criteriaWeights = {
  technical: 35,
  security: 25,
  scalability: 20,
  support: 10,
  pricing: 10
};

export default function VendorComparisons() {
  const [selectedRfp, setSelectedRfp] = useState(vendorComparisons[0]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("finalScore");
  const [viewMode, setViewMode] = useState("table");

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-warning";
    return "text-destructive";
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "Highly Recommended": return "success";
      case "Recommended": return "success";
      case "Conditional": return "warning";
      case "Not Recommended": return "destructive";
      default: return "secondary";
    }
  };

  const calculateWeightedScore = (criteria: any) => {
    return Object.keys(criteriaWeights).reduce((acc, key) => {
      return acc + (criteria[key] * criteriaWeights[key as keyof typeof criteriaWeights] / 100);
    }, 0);
  };

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseInt(value.replace(/[$,]/g, '')));
  };

  const getBestPerformingVendor = (criteria: string) => {
    const scores = selectedRfp.vendors.map(v => v.criteria[criteria as keyof typeof v.criteria]);
    const maxScore = Math.max(...scores);
    return selectedRfp.vendors.find(v => v.criteria[criteria as keyof typeof v.criteria] === maxScore)?.name;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vendor Comparisons</h1>
          <p className="text-muted-foreground">Compare and analyze vendor proposals side-by-side</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics View
          </Button>
        </div>
      </div>

      {/* RFP Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{selectedRfp.rfpTitle}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedRfp.rfpId} • {selectedRfp.vendors.length} vendors • {selectedRfp.category}
              </p>
            </div>
            <div className="flex gap-2">
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="table">Table View</SelectItem>
                  <SelectItem value="cards">Card View</SelectItem>
                  <SelectItem value="chart">Chart View</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="finalScore">Final Score</SelectItem>
                  <SelectItem value="proposedValue">Proposed Value</SelectItem>
                  <SelectItem value="technical">Technical Score</SelectItem>
                  <SelectItem value="recommendation">Recommendation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="comparison">Side-by-Side</TabsTrigger>
          <TabsTrigger value="criteria">Criteria Analysis</TabsTrigger>
          <TabsTrigger value="value">Value Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-4">
          {viewMode === "table" && (
            <Card>
              <CardHeader>
                <CardTitle>Vendor Comparison Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Criteria</th>
                        {selectedRfp.vendors.map((vendor, index) => (
                          <th key={index} className="text-center p-3 font-medium">
                            <div>
                              <div className="font-semibold">{vendor.name}</div>
                              <div className="text-sm text-muted-foreground">{vendor.proposedValue}</div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Final Score</td>
                        {selectedRfp.vendors.map((vendor, index) => (
                          <td key={index} className="text-center p-3">
                            <div className={`text-lg font-bold ${getScoreColor(vendor.finalScore)}`}>
                              {vendor.finalScore}%
                            </div>
                          </td>
                        ))}
                      </tr>
                      {Object.keys(criteriaWeights).map((criteria) => (
                        <tr key={criteria} className="border-b">
                          <td className="p-3 font-medium capitalize">
                            {criteria} ({criteriaWeights[criteria as keyof typeof criteriaWeights]}%)
                          </td>
                          {selectedRfp.vendors.map((vendor, index) => {
                            const score = vendor.criteria[criteria as keyof typeof vendor.criteria];
                            const isBest = getBestPerformingVendor(criteria) === vendor.name;
                            return (
                              <td key={index} className="text-center p-3">
                                <div className="flex items-center justify-center gap-2">
                                  <span className={`font-bold ${getScoreColor(score)}`}>
                                    {score}%
                                  </span>
                                  {isBest && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                                </div>
                                <Progress value={score} className="mt-1 h-1" />
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                      <tr className="border-b">
                        <td className="p-3 font-medium">Recommendation</td>
                        {selectedRfp.vendors.map((vendor, index) => (
                          <td key={index} className="text-center p-3">
                            <Badge variant={getRecommendationColor(vendor.recommendation) as any}>
                              {vendor.recommendation}
                            </Badge>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {viewMode === "cards" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedRfp.vendors.map((vendor, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{vendor.name}</CardTitle>
                      <Badge variant={getRecommendationColor(vendor.recommendation) as any}>
                        {vendor.recommendation}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-2xl font-bold ${getScoreColor(vendor.finalScore)}`}>
                        {vendor.finalScore}%
                      </span>
                      <span className="text-lg font-semibold text-primary">
                        {vendor.proposedValue}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.keys(criteriaWeights).map((criteria) => (
                        <div key={criteria} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{criteria}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {vendor.criteria[criteria as keyof typeof vendor.criteria]}%
                            </span>
                            <div className="w-16">
                              <Progress 
                                value={vendor.criteria[criteria as keyof typeof vendor.criteria]} 
                                className="h-1" 
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-3 border-t">
                        <h5 className="font-medium text-sm text-success mb-1">Strengths</h5>
                        <div className="flex gap-1 flex-wrap">
                          {vendor.strengths.slice(0, 2).map((strength, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm text-destructive mb-1">Weaknesses</h5>
                        <div className="flex gap-1 flex-wrap">
                          {vendor.weaknesses.slice(0, 2).map((weakness, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {weakness}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="criteria" className="space-y-4">
          <div className="grid gap-4">
            {Object.keys(criteriaWeights).map((criteria) => (
              <Card key={criteria}>
                <CardHeader>
                  <CardTitle className="capitalize flex items-center gap-2">
                    {criteria === 'technical' && <Zap className="h-5 w-5" />}
                    {criteria === 'pricing' && <DollarSign className="h-5 w-5" />}
                    {criteria}
                    <Badge variant="outline" className="ml-2">
                      {criteriaWeights[criteria as keyof typeof criteriaWeights]}% Weight
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedRfp.vendors
                      .sort((a, b) => b.criteria[criteria as keyof typeof b.criteria] - a.criteria[criteria as keyof typeof a.criteria])
                      .map((vendor, index) => {
                        const score = vendor.criteria[criteria as keyof typeof vendor.criteria];
                        const isFirst = index === 0;
                        return (
                          <div key={vendor.name} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              {isFirst && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                              <span className="font-medium">{vendor.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-32">
                                <Progress value={score} className="h-2" />
                              </div>
                              <span className={`font-bold w-12 text-right ${getScoreColor(score)}`}>
                                {score}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="value" className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Value vs Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedRfp.vendors.map((vendor, index) => {
                    const value = parseInt(vendor.proposedValue.replace(/[$,]/g, ''));
                    const scorePerDollar = (vendor.finalScore / value * 100000).toFixed(2);
                    return (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{vendor.name}</h4>
                          <Badge variant="outline">Score/Value Ratio</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Score:</span>
                            <p className={`font-bold ${getScoreColor(vendor.finalScore)}`}>
                              {vendor.finalScore}%
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Value:</span>
                            <p className="font-bold text-primary">{vendor.proposedValue}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Ratio:</span>
                            <p className="font-bold">{scorePerDollar}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedRfp.vendors
                    .sort((a, b) => parseInt(a.proposedValue.replace(/[$,]/g, '')) - parseInt(b.proposedValue.replace(/[$,]/g, '')))
                    .map((vendor, index) => {
                      const value = parseInt(vendor.proposedValue.replace(/[$,]/g, ''));
                      const lowestValue = Math.min(...selectedRfp.vendors.map(v => parseInt(v.proposedValue.replace(/[$,]/g, ''))));
                      const premium = ((value - lowestValue) / lowestValue * 100).toFixed(1);
                      const isLowest = value === lowestValue;
                      
                      return (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            {isLowest && <DollarSign className="h-4 w-4 text-success" />}
                            <span className="font-medium">{vendor.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary">{vendor.proposedValue}</div>
                            {!isLowest && (
                              <div className="text-sm text-muted-foreground">+{premium}% premium</div>
                            )}
                            {isLowest && (
                              <div className="text-sm text-success">Lowest bid</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid gap-4">
            {selectedRfp.vendors.map((vendor, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{vendor.name}</CardTitle>
                    <Badge variant={getRecommendationColor(vendor.recommendation) as any}>
                      {vendor.recommendation}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-success mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {vendor.strengths.map((strength, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <div className="w-2 h-2 bg-success rounded-full"></div>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-destructive mb-3 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Areas of Concern
                      </h4>
                      <ul className="space-y-2">
                        {vendor.weaknesses.map((weakness, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <div className="w-2 h-2 bg-destructive rounded-full"></div>
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`text-lg font-bold ${getScoreColor(vendor.finalScore)}`}>
                          {vendor.finalScore}% Score
                        </span>
                        <span className="text-lg font-semibold text-primary">
                          {vendor.proposedValue}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">Select for Award</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}