import { useState } from "react";
import { CheckCircle, Download, Eye, Star, Calendar, User, BarChart3, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const completedEvaluations = [
  {
    id: 1,
    rfpTitle: "Enterprise Cloud Migration",
    rfpId: "RFP-2024-089",
    vendor: "TechCorp Solutions",
    evaluator1: "Sarah Johnson",
    evaluator2: "Mike Chen",
    completedDate: "2024-12-15",
    submittedDate: "2024-11-30",
    finalScore: 89.5,
    category: "Cloud Services",
    evaluation1Score: 91.0,
    evaluation2Score: 88.0,
    consensus: true,
    variance: 3.0,
    duration: "3 days",
    quality: "Excellent",
    recommendation: "Recommended"
  },
  {
    id: 2,
    rfpTitle: "Mobile Banking Application",
    rfpId: "RFP-2024-076",
    vendor: "AppDev Solutions",
    evaluator1: "Emily Davis",
    evaluator2: "John Smith",
    completedDate: "2024-12-10",
    submittedDate: "2024-11-25",
    finalScore: 82.3,
    category: "Software Development",
    evaluation1Score: 84.5,
    evaluation2Score: 80.1,
    consensus: true,
    variance: 4.4,
    duration: "5 days",
    quality: "Good",
    recommendation: "Conditional"
  },
  {
    id: 3,
    rfpTitle: "Data Analytics Platform",
    rfpId: "RFP-2024-063",
    vendor: "DataSoft Corporation",
    evaluator1: "Alex Thompson",
    evaluator2: "Lisa Wang",
    completedDate: "2024-12-05",
    submittedDate: "2024-11-20",
    finalScore: 76.8,
    category: "Data Analytics",
    evaluation1Score: 79.2,
    evaluation2Score: 74.4,
    consensus: false,
    variance: 4.8,
    duration: "4 days",
    quality: "Fair",
    recommendation: "Not Recommended"
  },
  {
    id: 4,
    rfpTitle: "Cybersecurity Assessment",
    rfpId: "RFP-2024-058",
    vendor: "SecureNet Technologies",
    evaluator1: "Maria Rodriguez",
    evaluator2: "David Kim",
    completedDate: "2024-11-28",
    submittedDate: "2024-11-15",
    finalScore: 94.2,
    category: "Security Services",
    evaluation1Score: 95.1,
    evaluation2Score: 93.3,
    consensus: true,
    variance: 1.8,
    duration: "2 days",
    quality: "Outstanding",
    recommendation: "Highly Recommended"
  }
];

const evaluatorPerformance = [
  { name: "Sarah Johnson", completedEvaluations: 23, avgScore: 86.4, avgTime: "3.2 days", consistency: 92.1 },
  { name: "Mike Chen", completedEvaluations: 19, avgScore: 84.7, avgTime: "2.8 days", consistency: 88.5 },
  { name: "Emily Davis", completedEvaluations: 21, avgScore: 87.1, avgTime: "3.8 days", consistency: 90.3 },
  { name: "John Smith", completedEvaluations: 18, avgScore: 83.9, avgTime: "4.1 days", consistency: 85.7 }
];

export default function CompletedEvaluations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState("3months");
  const [selectedQuality, setSelectedQuality] = useState("all");

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-warning";
    return "text-destructive";
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "Outstanding": return "success";
      case "Excellent": return "success";
      case "Good": return "warning";
      case "Fair": return "destructive";
      default: return "secondary";
    }
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

  const filteredEvaluations = completedEvaluations.filter(evaluation => {
    const matchesSearch = evaluation.rfpTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluation.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluation.rfpId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || evaluation.category === selectedCategory;
    const matchesQuality = selectedQuality === "all" || evaluation.quality === selectedQuality;
    return matchesSearch && matchesCategory && matchesQuality;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Completed Evaluations</h1>
          <p className="text-muted-foreground">Review and analyze completed vendor evaluations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{completedEvaluations.length}</div>
            <p className="text-sm text-muted-foreground">Total Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {Math.round(completedEvaluations.reduce((acc, e) => acc + e.finalScore, 0) / completedEvaluations.length)}%
            </div>
            <p className="text-sm text-muted-foreground">Avg Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {completedEvaluations.filter(e => e.consensus).length}
            </div>
            <p className="text-sm text-muted-foreground">Consensus Reached</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-info">
              3.6 days
            </div>
            <p className="text-sm text-muted-foreground">Avg Duration</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="evaluations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="evaluations">Evaluation Archive</TabsTrigger>
          <TabsTrigger value="analytics">Quality Analytics</TabsTrigger>
          <TabsTrigger value="performance">Evaluator Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="evaluations" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Input
                    placeholder="Search completed evaluations..."
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
                    <SelectItem value="Cloud Services">Cloud Services</SelectItem>
                    <SelectItem value="Software Development">Software Development</SelectItem>
                    <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                    <SelectItem value="Security Services">Security Services</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">Last Month</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="12months">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Quality Levels</SelectItem>
                    <SelectItem value="Outstanding">Outstanding</SelectItem>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Evaluations List */}
          <div className="space-y-4">
            {filteredEvaluations.map((evaluation) => (
              <Card key={evaluation.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{evaluation.rfpTitle}</CardTitle>
                        <Badge variant="outline">{evaluation.rfpId}</Badge>
                        <CheckCircle className="h-5 w-5 text-success" />
                      </div>
                      <p className="text-muted-foreground">Vendor: {evaluation.vendor}</p>
                      <p className="text-sm text-muted-foreground">Category: {evaluation.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getQualityColor(evaluation.quality) as any}>
                        {evaluation.quality}
                      </Badge>
                      <Badge variant={getRecommendationColor(evaluation.recommendation) as any}>
                        {evaluation.recommendation}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Scores */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className={`text-xl font-bold ${getScoreColor(evaluation.finalScore)}`}>
                          {evaluation.finalScore}%
                        </div>
                        <p className="text-xs text-muted-foreground">Final Score</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-medium">{evaluation.evaluation1Score}%</div>
                        <p className="text-xs text-muted-foreground">Evaluator 1</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-medium">{evaluation.evaluation2Score}%</div>
                        <p className="text-xs text-muted-foreground">Evaluator 2</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-medium">{evaluation.variance}%</div>
                        <p className="text-xs text-muted-foreground">Variance</p>
                      </div>
                    </div>

                    {/* Consensus Indicator */}
                    <div className="flex items-center justify-center">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                        evaluation.consensus ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                      }`}>
                        {evaluation.consensus ? 
                          <CheckCircle className="h-4 w-4" /> : 
                          <Star className="h-4 w-4" />
                        }
                        <span className="text-sm font-medium">
                          {evaluation.consensus ? 'Consensus Reached' : 'Consensus Pending'}
                        </span>
                      </div>
                    </div>

                    {/* Evaluators */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-sm">Primary Evaluator</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{evaluation.evaluator1}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-medium">{evaluation.evaluation1Score}%</span>
                          <Progress value={evaluation.evaluation1Score} className="h-1 flex-1" />
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-sm">Secondary Evaluator</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{evaluation.evaluator2}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-medium">{evaluation.evaluation2Score}%</span>
                          <Progress value={evaluation.evaluation2Score} className="h-1 flex-1" />
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Submitted:</span>
                        <p className="font-medium">{evaluation.submittedDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Completed:</span>
                        <p className="font-medium">{evaluation.completedDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-medium">{evaluation.duration}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">View Proposal</Button>
                        <Button variant="outline" size="sm">View Comments</Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">90-100% (Excellent)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full">
                        <div className="w-1/4 h-full bg-success rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">80-89% (Good)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full">
                        <div className="w-1/2 h-full bg-warning rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">50%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">70-79% (Fair)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full">
                        <div className="w-1/4 h-full bg-destructive rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="font-medium">Avg Score</span>
                    </div>
                    <span className="text-success font-bold">+2.3%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="font-medium">Consensus Rate</span>
                    </div>
                    <span className="text-success font-bold">+5.1%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-warning" />
                      <span className="font-medium">Avg Duration</span>
                    </div>
                    <span className="text-warning font-bold">-0.5 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evaluator Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evaluatorPerformance.map((evaluator, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{evaluator.name}</h4>
                      <Badge variant="outline">{evaluator.completedEvaluations} evaluations</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Avg Score</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`font-bold ${getScoreColor(evaluator.avgScore)}`}>
                            {evaluator.avgScore}%
                          </span>
                          <Progress value={evaluator.avgScore} className="h-1 flex-1" />
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Avg Time</span>
                        <p className="font-medium mt-1">{evaluator.avgTime}</p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Consistency</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-medium">{evaluator.consistency}%</span>
                          <Progress value={evaluator.consistency} className="h-1 flex-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}