import { useState } from "react";
import { Search, Filter, Download, Eye, MessageCircle, Star, Clock, Building2, FileText, BarChart3, Grid, List } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const proposals = [
  {
    id: 1,
    rfpTitle: "Cloud Infrastructure Services",
    vendor: "TechCorp Solutions",
    submittedDate: "2024-01-20",
    status: "Under Review",
    score: 87.5,
    evaluationProgress: 75,
    proposalValue: "$450,000",
    pageCount: 45,
    attachments: 8,
    evaluators: ["Sarah Chen", "Mike Johnson"],
    lastActivity: "2024-01-22",
    highlights: ["AWS Certified", "24/7 Support", "99.9% SLA"]
  },
  {
    id: 2,
    rfpTitle: "Marketing Services RFP",
    vendor: "Creative Digital Agency",
    submittedDate: "2024-01-18",
    status: "Scored",
    score: 92.3,
    evaluationProgress: 100,
    proposalValue: "$125,000",
    pageCount: 32,
    attachments: 12,
    evaluators: ["Emma Davis", "Alex Rodriguez"],
    lastActivity: "2024-01-21",
    highlights: ["Award Winner", "Local Team", "ROI Guarantee"]
  },
  {
    id: 3,
    rfpTitle: "Legal Services RFP",
    vendor: "Corporate Law Partners",
    submittedDate: "2024-01-15",
    status: "Pending Review",
    score: null,
    evaluationProgress: 0,
    proposalValue: "$85,000",
    pageCount: 28,
    attachments: 5,
    evaluators: [],
    lastActivity: "2024-01-15",
    highlights: ["20+ Years", "Specialized Practice", "Fixed Fee"]
  },
  {
    id: 4,
    rfpTitle: "Cloud Infrastructure Services",
    vendor: "DataFlow Systems",
    submittedDate: "2024-01-19",
    status: "Under Review",
    score: 78.2,
    evaluationProgress: 50,
    proposalValue: "$520,000",
    pageCount: 52,
    attachments: 15,
    evaluators: ["Sarah Chen"],
    lastActivity: "2024-01-20",
    highlights: ["ISO Certified", "Disaster Recovery", "Migration Support"]
  }
];

export default function Proposals() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedRFP, setSelectedRFP] = useState<string>("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scored": return "success";
      case "Under Review": return "warning";
      case "Pending Review": return "destructive";
      default: return "secondary";
    }
  };

  const getScoreColor = (score: number | null) => {
    if (score === null) return "text-muted-foreground";
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-info";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const filteredProposals = selectedRFP === "all" 
    ? proposals 
    : proposals.filter(p => p.rfpTitle === selectedRFP);

  const uniqueRFPs = [...new Set(proposals.map(p => p.rfpTitle))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Vendor Proposals</h1>
          <p className="text-muted-foreground">Review and evaluate vendor proposal submissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">16</div>
            <p className="text-sm text-muted-foreground">Total Proposals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">8</div>
            <p className="text-sm text-muted-foreground">Under Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">6</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-info">85.4</div>
            <p className="text-sm text-muted-foreground">Avg Score</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search proposals, vendors..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Select value={selectedRFP} onValueChange={setSelectedRFP}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by RFP" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All RFPs</SelectItem>
              {uniqueRFPs.map((rfp) => (
                <SelectItem key={rfp} value={rfp}>{rfp}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="review">Under Review</SelectItem>
              <SelectItem value="scored">Scored</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProposals.map((proposal) => (
            <Card key={proposal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{proposal.vendor}</h3>
                    <p className="text-sm text-muted-foreground">{proposal.rfpTitle}</p>
                  </div>
                  <Badge variant={getStatusColor(proposal.status) as any}>
                    {proposal.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Submitted:</span>
                    <p className="font-medium">{proposal.submittedDate}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Value:</span>
                    <p className="font-medium">{proposal.proposalValue}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Pages:</span>
                    <p className="font-medium">{proposal.pageCount}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Attachments:</span>
                    <p className="font-medium">{proposal.attachments}</p>
                  </div>
                </div>

                {proposal.score !== null && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Current Score</span>
                      <span className={`text-lg font-bold ${getScoreColor(proposal.score)}`}>
                        {proposal.score}
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Evaluation Progress</span>
                    <span>{proposal.evaluationProgress}%</span>
                  </div>
                  <Progress value={proposal.evaluationProgress} className="h-2" />
                </div>

                {proposal.evaluators.length > 0 && (
                  <div>
                    <span className="text-sm text-muted-foreground">Evaluators:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {proposal.evaluators.map((evaluator) => (
                        <Badge key={evaluator} variant="outline" className="text-xs">
                          {evaluator}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-sm text-muted-foreground">Highlights:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proposal.highlights.map((highlight) => (
                      <Badge key={highlight} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Evaluate
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>RFP</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProposals.map((proposal) => (
                <TableRow key={proposal.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{proposal.vendor}</div>
                      <div className="text-sm text-muted-foreground">
                        {proposal.pageCount} pages • {proposal.attachments} files
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{proposal.rfpTitle}</TableCell>
                  <TableCell>{proposal.submittedDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(proposal.status) as any}>
                      {proposal.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {proposal.score !== null ? (
                      <span className={`font-bold ${getScoreColor(proposal.score)}`}>
                        {proposal.score}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16">
                        <Progress value={proposal.evaluationProgress} className="h-2" />
                      </div>
                      <span className="text-sm">{proposal.evaluationProgress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{proposal.proposalValue}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}