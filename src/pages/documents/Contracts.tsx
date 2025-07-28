import { useState } from "react";
import { Search, Plus, FileCheck, Clock, AlertTriangle, Calendar, Building2, DollarSign, Download, Eye, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const contracts = [
  {
    id: 1,
    title: "Cloud Infrastructure Services Agreement",
    vendor: "TechCorp Solutions",
    status: "Active",
    value: "$450,000",
    startDate: "2024-02-01",
    endDate: "2025-01-31",
    signedDate: "2024-01-25",
    renewalDate: "2024-11-01",
    daysToRenewal: 285,
    type: "Service Agreement",
    terms: "12 months",
    autoRenewal: true,
    milestones: {
      completed: 2,
      total: 5
    },
    complianceScore: 95,
    lastReview: "2024-01-20"
  },
  {
    id: 2,
    title: "Marketing Services Contract",
    vendor: "Creative Digital Agency",
    status: "Pending Signature",
    value: "$125,000",
    startDate: "2024-02-15",
    endDate: "2024-08-15",
    signedDate: null,
    renewalDate: null,
    daysToRenewal: null,
    type: "Professional Services",
    terms: "6 months",
    autoRenewal: false,
    milestones: {
      completed: 0,
      total: 3
    },
    complianceScore: null,
    lastReview: "2024-01-22"
  },
  {
    id: 3,
    title: "Legal Services Retainer",
    vendor: "Corporate Law Partners",
    status: "Under Review",
    value: "$85,000",
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    signedDate: null,
    renewalDate: "2024-12-01",
    daysToRenewal: 315,
    type: "Retainer Agreement",
    terms: "12 months",
    autoRenewal: true,
    milestones: {
      completed: 0,
      total: 4
    },
    complianceScore: null,
    lastReview: "2024-01-18"
  },
  {
    id: 4,
    title: "Software Development Agreement",
    vendor: "DevCorp Technologies",
    status: "Active",
    value: "$750,000",
    startDate: "2023-06-01",
    endDate: "2024-05-31",
    signedDate: "2023-05-20",
    renewalDate: "2024-03-01",
    daysToRenewal: 45,
    type: "Development Contract",
    terms: "12 months",
    autoRenewal: false,
    milestones: {
      completed: 8,
      total: 10
    },
    complianceScore: 88,
    lastReview: "2024-01-15"
  }
];

const upcomingRenewals = contracts
  .filter(c => c.daysToRenewal !== null && c.daysToRenewal <= 90)
  .sort((a, b) => (a.daysToRenewal || 0) - (b.daysToRenewal || 0));

export default function Contracts() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "success";
      case "Pending Signature": return "warning";
      case "Under Review": return "info";
      case "Expired": return "destructive";
      case "Terminated": return "secondary";
      default: return "secondary";
    }
  };

  const getRenewalUrgency = (days: number | null) => {
    if (days === null) return "none";
    if (days <= 30) return "urgent";
    if (days <= 60) return "warning";
    if (days <= 90) return "info";
    return "none";
  };

  const getRenewalColor = (urgency: string) => {
    switch (urgency) {
      case "urgent": return "text-destructive";
      case "warning": return "text-warning";
      case "info": return "text-info";
      default: return "text-muted-foreground";
    }
  };

  const filteredContracts = selectedStatus === "all" 
    ? contracts 
    : contracts.filter(c => c.status === selectedStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Contract Management</h1>
          <p className="text-muted-foreground">Manage contracts, renewals, and compliance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Contract
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-sm text-muted-foreground">Active Contracts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">$2.4M</div>
            <p className="text-sm text-muted-foreground">Total Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">3</div>
            <p className="text-sm text-muted-foreground">Renewal Due</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-info">91%</div>
            <p className="text-sm text-muted-foreground">Compliance Score</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Upcoming Renewals Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Renewals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingRenewals.map((contract) => (
                <div key={contract.id} className="p-3 border rounded-lg space-y-2">
                  <h4 className="font-medium text-sm">{contract.vendor}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Renewal in</span>
                    <span className={`text-xs font-medium ${getRenewalColor(getRenewalUrgency(contract.daysToRenewal))}`}>
                      {contract.daysToRenewal} days
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      Review
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      Renew
                    </Button>
                  </div>
                </div>
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
              <Input placeholder="Search contracts, vendors..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending Signature">Pending</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contracts Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead>Renewal</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{contract.vendor}</div>
                        <div className="text-sm text-muted-foreground">{contract.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {contract.startDate} - {contract.endDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(contract.status) as any}>
                        {contract.status}
                      </Badge>
                      {contract.autoRenewal && (
                        <Badge variant="outline" className="ml-1 text-xs">
                          Auto-Renew
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{contract.value}</div>
                      <div className="text-xs text-muted-foreground">{contract.type}</div>
                    </TableCell>
                    <TableCell>{contract.terms}</TableCell>
                    <TableCell>
                      {contract.daysToRenewal !== null ? (
                        <div>
                          <div className={`font-medium ${getRenewalColor(getRenewalUrgency(contract.daysToRenewal))}`}>
                            {contract.daysToRenewal} days
                          </div>
                          <div className="text-xs text-muted-foreground">{contract.renewalDate}</div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">
                          Milestones: {contract.milestones.completed}/{contract.milestones.total}
                        </div>
                        <Progress 
                          value={(contract.milestones.completed / contract.milestones.total) * 100} 
                          className="h-2" 
                        />
                        {contract.complianceScore && (
                          <div className="text-xs text-muted-foreground">
                            Compliance: {contract.complianceScore}%
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
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
        </div>
      </div>
    </div>
  );
}