import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { InfoIcon, TrendingUp, Clock, Award, Target, DollarSign, FileText } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Mock data for demonstration
const summaryKPIs = [
  { title: "Total RFPs Created", value: "156", icon: FileText, tooltip: "Total volume created to date" },
  { title: "Active RFPs", value: "23", icon: TrendingUp, tooltip: "Currently open or under review" },
  { title: "Awarded RFPs", value: "118", icon: Award, tooltip: "Successfully completed RFPs" },
  { title: "Avg RFP Cycle Days", value: "45", icon: Clock, tooltip: "Avg duration from creation to awarding" },
  { title: "Avg Quality Score", value: "8.2", icon: Target, tooltip: "Overall weighted quality score of evaluations" },
  { title: "Cost Savings %", value: "12.5%", icon: DollarSign, tooltip: "Savings achieved through negotiation" },
];

// Chart data
const rfpCreationData = [
  { month: "Jan", rfps: 12 },
  { month: "Feb", rfps: 15 },
  { month: "Mar", rfps: 18 },
  { month: "Apr", rfps: 14 },
  { month: "May", rfps: 22 },
  { month: "Jun", rfps: 19 },
];

const approvalTimeData = [
  { days: "0-5", count: 8 },
  { days: "6-10", count: 15 },
  { days: "11-15", count: 22 },
  { days: "16-20", count: 18 },
  { days: "21+", count: 12 },
];

const vendorResponseData = [
  { category: "IT Services", responses: 85, quality: 7.2 },
  { category: "Consulting", responses: 72, quality: 8.1 },
  { category: "Hardware", responses: 93, quality: 6.8 },
  { category: "Software", responses: 67, quality: 8.5 },
];

const evaluationWorkloadData = [
  { reviewer: "Alice Johnson", workload: 12 },
  { reviewer: "Bob Smith", workload: 8 },
  { reviewer: "Carol Davis", workload: 15 },
  { reviewer: "David Wilson", workload: 10 },
];

const costSavingsData = [
  { category: "IT Services", savings: 15.2 },
  { category: "Consulting", savings: 8.7 },
  { category: "Hardware", savings: 22.1 },
  { category: "Software", savings: 11.3 },
];

const processStatusData = [
  { name: "Draft", value: 15, color: "#94a3b8" },
  { name: "Review", value: 23, color: "#3b82f6" },
  { name: "Evaluation", value: 18, color: "#f59e0b" },
  { name: "Awarded", value: 44, color: "#10b981" },
];

export default function KPIs() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">RFP Performance Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor RFP performance, track bottlenecks, and measure cost savings
          </p>
        </div>

        {/* Summary KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {summaryKPIs.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={index} className="relative">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{kpi.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <div className="text-2xl font-bold">{kpi.value}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Separator />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* RFP Creation Rate */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>RFP Creation Rate</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Monthly RFP creation trend</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  rfps: {
                    label: "RFPs Created",
                    color: "hsl(var(--primary))",
                  },
                }}
                className="h-[200px]"
              >
                <LineChart data={rfpCreationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="rfps" 
                    stroke="var(--color-rfps)" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* RFP Approval Time */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>RFP Approval Time Distribution</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Time taken for RFPs to be approved</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Count",
                    color: "hsl(var(--primary))",
                  },
                }}
                className="h-[200px]"
              >
                <BarChart data={approvalTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="days" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Vendor Response Rate */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Vendor Response vs Quality</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Vendor engagement across RFPs</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  responses: {
                    label: "Response Rate",
                    color: "hsl(var(--primary))",
                  },
                }}
                className="h-[200px]"
              >
                <ScatterChart data={vendorResponseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="responses" name="Response Rate" />
                  <YAxis dataKey="quality" name="Quality Score" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Scatter dataKey="quality" fill="var(--color-responses)" />
                </ScatterChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Reviewer Workload */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Reviewer Workload Distribution</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Distribution of workload across reviewers</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  workload: {
                    label: "Active RFPs",
                    color: "hsl(var(--primary))",
                  },
                }}
                className="h-[200px]"
              >
                <BarChart data={evaluationWorkloadData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="reviewer" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="workload" fill="var(--color-workload)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Cost Savings Analysis */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Cost Savings by Category</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Breakdown of cost savings achieved</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  savings: {
                    label: "Savings %",
                    color: "hsl(var(--primary))",
                  },
                }}
                className="h-[200px]"
              >
                <AreaChart data={costSavingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="savings" 
                    stroke="var(--color-savings)" 
                    fill="var(--color-savings)" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* RFP Status Distribution */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>RFP Status Distribution</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Snapshot of where each RFP stands</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Count",
                    color: "hsl(var(--primary))",
                  },
                }}
                className="h-[200px]"
              >
                <PieChart>
                  <Pie
                    data={processStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                  >
                    {processStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

        </div>
      </div>
    </TooltipProvider>
  );
}