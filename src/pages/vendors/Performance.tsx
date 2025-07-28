import { useState } from "react";
import { TrendingUp, TrendingDown, Award, Target, BarChart3, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const performanceData = [
  {
    id: 1,
    name: "TechCorp Solutions",
    overallScore: 95.5,
    trend: "up",
    trendValue: 5.2,
    metrics: {
      quality: 96.0,
      delivery: 94.5,
      communication: 97.0,
      pricing: 89.0
    },
    category: "Cloud Services",
    projects: 24,
    completionRate: 96.2,
    avgResponseTime: "2.3 days",
    ranking: 1
  },
  {
    id: 2,
    name: "CloudTech Inc",
    overallScore: 89.2,
    trend: "up",
    trendValue: 2.1,
    metrics: {
      quality: 88.5,
      delivery: 91.0,
      communication: 85.0,
      pricing: 92.0
    },
    category: "Infrastructure",
    projects: 18,
    completionRate: 88.9,
    avgResponseTime: "1.8 days",
    ranking: 2
  },
  {
    id: 3,
    name: "DataSoft Corporation",
    overallScore: 85.1,
    trend: "down",
    trendValue: -1.3,
    metrics: {
      quality: 87.0,
      delivery: 83.5,
      communication: 86.0,
      pricing: 84.0
    },
    category: "Data Analytics",
    projects: 31,
    completionRate: 92.1,
    avgResponseTime: "3.1 days",
    ranking: 3
  },
  {
    id: 4,
    name: "StartupTech Solutions",
    overallScore: 76.8,
    trend: "up",
    trendValue: 8.4,
    metrics: {
      quality: 78.0,
      delivery: 75.0,
      communication: 80.0,
      pricing: 74.0
    },
    category: "Software Development",
    projects: 8,
    completionRate: 75.0,
    avgResponseTime: "4.2 days",
    ranking: 4
  }
];

const categoryPerformance = [
  { category: "Cloud Services", avgScore: 92.3, vendorCount: 5, growth: 4.2 },
  { category: "Infrastructure", avgScore: 87.8, vendorCount: 8, growth: 1.8 },
  { category: "Data Analytics", avgScore: 84.5, vendorCount: 6, growth: -0.5 },
  { category: "Software Development", avgScore: 79.2, vendorCount: 12, growth: 6.1 }
];

export default function VendorPerformance() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-warning";
    return "text-destructive";
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? <TrendingUp className="h-4 w-4 text-success" /> : <TrendingDown className="h-4 w-4 text-destructive" />;
  };

  const getRankingBadge = (ranking: number) => {
    if (ranking === 1) return <Badge className="bg-yellow-500 text-white">🥇 #1</Badge>;
    if (ranking === 2) return <Badge className="bg-gray-400 text-white">🥈 #2</Badge>;
    if (ranking === 3) return <Badge className="bg-amber-600 text-white">🥉 #3</Badge>;
    return <Badge variant="secondary">#{ranking}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vendor Performance</h1>
          <p className="text-muted-foreground">Analyze and track vendor performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="cloud">Cloud Services</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="data">Data Analytics</SelectItem>
              <SelectItem value="software">Software Development</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-primary">87.4%</span>
            </div>
            <p className="text-sm text-muted-foreground">Average Performance</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-xs text-success">+3.2%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="h-5 w-5 text-success" />
              <span className="text-2xl font-bold text-success">89.1%</span>
            </div>
            <p className="text-sm text-muted-foreground">Avg Completion Rate</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-xs text-success">+1.8%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BarChart3 className="h-5 w-5 text-warning" />
              <span className="text-2xl font-bold text-warning">2.8</span>
            </div>
            <p className="text-sm text-muted-foreground">Avg Response Time (days)</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-success" />
              <span className="text-xs text-success">-0.4 days</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <PieChart className="h-5 w-5 text-info" />
              <span className="text-2xl font-bold text-info">31</span>
            </div>
            <p className="text-sm text-muted-foreground">Active Vendors</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-xs text-success">+5 new</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rankings" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rankings">Top Performers</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
          <TabsTrigger value="trends">Trends Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="rankings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.map((vendor) => (
                  <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getRankingBadge(vendor.ranking)}
                      <div>
                        <h3 className="font-semibold">{vendor.name}</h3>
                        <p className="text-sm text-muted-foreground">{vendor.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-bold ${getScoreColor(vendor.overallScore)}`}>
                          {vendor.overallScore}%
                        </span>
                        {getTrendIcon(vendor.trend)}
                        <span className={`text-sm ${vendor.trend === "up" ? "text-success" : "text-destructive"}`}>
                          {vendor.trend === "up" ? "+" : ""}{vendor.trendValue}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{vendor.projects} projects</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {categoryPerformance.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Average Score</span>
                    <span className={`font-semibold ${getScoreColor(category.avgScore)}`}>
                      {category.avgScore}%
                    </span>
                  </div>
                  <Progress value={category.avgScore} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Vendors:</span>
                      <span className="ml-2 font-medium">{category.vendorCount}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Growth:</span>
                      <span className={`ml-2 font-medium ${category.growth >= 0 ? "text-success" : "text-destructive"}`}>
                        {category.growth >= 0 ? "+" : ""}{category.growth}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {performanceData.map((vendor) => (
                  <div key={vendor.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{vendor.name}</h3>
                      <span className={`text-lg font-bold ${getScoreColor(vendor.overallScore)}`}>
                        {vendor.overallScore}%
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Quality</span>
                          <span className="text-sm font-medium">{vendor.metrics.quality}%</span>
                        </div>
                        <Progress value={vendor.metrics.quality} className="h-1" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Delivery</span>
                          <span className="text-sm font-medium">{vendor.metrics.delivery}%</span>
                        </div>
                        <Progress value={vendor.metrics.delivery} className="h-1" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Communication</span>
                          <span className="text-sm font-medium">{vendor.metrics.communication}%</span>
                        </div>
                        <Progress value={vendor.metrics.communication} className="h-1" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Pricing</span>
                          <span className="text-sm font-medium">{vendor.metrics.pricing}%</span>
                        </div>
                        <Progress value={vendor.metrics.pricing} className="h-1" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Completion Rate:</span>
                        <span className="ml-2 font-medium">{vendor.completionRate}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Response Time:</span>
                        <span className="ml-2 font-medium">{vendor.avgResponseTime}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Projects:</span>
                        <span className="ml-2 font-medium">{vendor.projects}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends & Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Improving Vendors</h4>
                    <div className="space-y-2">
                      {performanceData.filter(v => v.trend === "up").map((vendor) => (
                        <div key={vendor.id} className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                          <span className="font-medium">{vendor.name}</span>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-success" />
                            <span className="text-success font-medium">+{vendor.trendValue}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Needs Attention</h4>
                    <div className="space-y-2">
                      {performanceData.filter(v => v.trend === "down").map((vendor) => (
                        <div key={vendor.id} className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
                          <span className="font-medium">{vendor.name}</span>
                          <div className="flex items-center gap-1">
                            <TrendingDown className="h-4 w-4 text-destructive" />
                            <span className="text-destructive font-medium">{vendor.trendValue}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-3">Performance Improvement Recommendations</h4>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium text-warning">Communication Enhancement</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Several vendors show low communication scores. Consider implementing vendor training programs.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium text-info">Response Time Optimization</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Average response times can be improved by 15% through automated notification systems.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}