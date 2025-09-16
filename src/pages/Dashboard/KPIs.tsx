import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { InfoIcon, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Data matching the reference images
const summaryKPIs = [
  { 
    title: "Total RFPs Created", 
    value: "1,247", 
    change: "+12% vs last month",
    trend: "up",
    tooltip: "Total volume created to date" 
  },
  { 
    title: "Active RFPs", 
    value: "89", 
    change: "→ 2% vs last month",
    trend: "neutral",
    tooltip: "Currently open or under review" 
  },
  { 
    title: "Awarded RFPs", 
    value: "1,158", 
    change: "+8% vs last month",
    trend: "up",
    tooltip: "Successfully completed RFPs" 
  },
  { 
    title: "Avg RFP Cycle Days", 
    value: "23.4", 
    subtext: "days",
    change: "-2.1 days",
    trend: "down",
    tooltip: "Avg duration from creation to awarding" 
  },
  { 
    title: "Avg Quality Score", 
    value: "8.7", 
    subtext: "out of 10",
    change: "+0.3 points",
    trend: "up",
    tooltip: "Overall weighted quality score of evaluations" 
  },
  { 
    title: "Cost Savings %", 
    value: "14.2%", 
    change: "+1.8% vs target",
    trend: "up",
    tooltip: "Savings achieved through negotiation" 
  },
];

// Chart data matching reference images
const rfpCreationData = [
  { month: "Jan", value: 8 },
  { month: "Feb", value: 12 },
  { month: "Mar", value: 15 },
  { month: "Apr", value: 18 },
  { month: "May", value: 25 },
  { month: "Jun", value: 20 },
];

const approvalTimeData = [
  { month: "Jan", value: 15 },
  { month: "Feb", value: 18 },
  { month: "Mar", value: 12 },
  { month: "Apr", value: 22 },
  { month: "May", value: 19 },
  { month: "Jun", value: 16 },
];

const firstTimeApprovalRate = 78; // Gauge chart value

const approvalStageData = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 16 },
  { month: "Mar", value: 14 },
  { month: "Apr", value: 20 },
  { month: "May", value: 18 },
  { month: "Jun", value: 15 },
];

const ganttData = [
  { phase: "Planning", duration: 25 },
  { phase: "Publishing", duration: 35 },
  { phase: "Response", duration: 45 },
  { phase: "Evaluation", duration: 60 },
  { phase: "Award", duration: 80 },
];

const vendorResponseData = [
  { x: 65, y: 7.2 },
  { x: 78, y: 8.1 },
  { x: 82, y: 6.8 },
  { x: 71, y: 8.5 },
  { x: 88, y: 7.8 },
  { x: 75, y: 7.9 },
  { x: 69, y: 8.3 },
];

const newVsExistingData = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 16 },
  { month: "Mar", value: 14 },
  { month: "Apr", value: 20 },
  { month: "May", value: 18 },
  { month: "Jun", value: 15 },
];

const categoryPerformanceData = [
  { x: 75, y: 8.2 },
  { x: 68, y: 7.5 },
  { x: 82, y: 8.8 },
  { x: 71, y: 7.9 },
  { x: 79, y: 8.4 },
  { x: 73, y: 7.7 },
  { x: 85, y: 8.6 },
];

const awardAcceptanceData = [
  { name: "Accepted", value: 45, color: "#3b82f6" },
  { name: "Declined", value: 15, color: "#f59e0b" },
  { name: "Pending", value: 25, color: "#10b981" },
  { name: "Expired", value: 15, color: "#8b5cf6" },
];

const reviewerWorkloadData = [
  { month: "Jan", value: 8 },
  { month: "Feb", value: 12 },
  { month: "Mar", value: 10 },
  { month: "Apr", value: 15 },
  { month: "May", value: 11 },
  { month: "Jun", value: 9 },
];

const completionTimeData = [
  { month: "Jan", value: 6 },
  { month: "Feb", value: 8 },
  { month: "Mar", value: 7 },
  { month: "Apr", value: 9 },
  { month: "May", value: 12 },
  { month: "Jun", value: 8 },
];

const scoreDistributionData = [
  { criteria: "C1", value: 8.2 },
  { criteria: "C2", value: 8.8 },
  { criteria: "C3", value: 9.1 },
  { criteria: "C4", value: 8.6 },
  { criteria: "C5", value: 7.9 },
];

const budgetVarianceData = [
  { category: "Under Budget", percentage: 65, color: "#10b981" },
  { category: "On Budget", percentage: 25, color: "#3b82f6" },
  { category: "Over Budget", percentage: 10, color: "#ef4444" },
];

const processFlowData = [
  { stage: "Created", percentage: 100 },
  { stage: "Published", percentage: 95 },
  { stage: "Responses", percentage: 78 },
  { stage: "Evaluated", percentage: 72 },
  { stage: "Awarded", percentage: 68 },
];

const GaugeChart = ({ value, max = 100 }: { value: number; max?: number }) => {
  const percentage = (value / max) * 100;
  const strokeDasharray = `${percentage * 2.51} 251`;
  
  return (
    <div className="flex items-center justify-center h-32">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{value}%</span>
        </div>
      </div>
    </div>
  );
};

const BoxPlot = ({ data }: { data: { criteria: string; min: number; q1: number; median: number; q3: number; max: number }[] }) => {
  return (
    <div className="space-y-4 p-4">
      <div className="text-sm text-muted-foreground text-center mb-4">Box Plot Analysis</div>
      {data.map((item, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="w-20 text-sm text-muted-foreground text-right">{item.criteria}</div>
          <div className="flex-1 relative h-2 bg-gray-200 rounded">
            <div 
              className="absolute h-2 bg-blue-500 rounded"
              style={{
                left: `${(item.q1 / 10) * 100}%`,
                width: `${((item.q3 - item.q1) / 10) * 100}%`
              }}
            />
            <div 
              className="absolute w-0.5 h-4 bg-green-500 -top-1"
              style={{ left: `${(item.median / 10) * 100}%` }}
            />
            <div 
              className="absolute w-0.5 h-2 bg-blue-700"
              style={{ left: `${(item.min / 10) * 100}%` }}
            />
            <div 
              className="absolute w-0.5 h-2 bg-blue-700"
              style={{ left: `${(item.max / 10) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const Heatmap = () => {
  const data = [
    [0.8, 0.6, 0.7, 0.5, 0.4],
    [0.6, 0.9, 0.8, 0.7, 0.5],
    [0.7, 0.8, 0.9, 0.6, 0.8],
    [0.5, 0.7, 0.6, 0.8, 0.9],
    [0.4, 0.5, 0.8, 0.9, 0.7],
  ];

  return (
    <div className="p-4">
      <div className="text-sm text-muted-foreground text-center mb-4">Evaluator Heatmap</div>
      <div className="grid grid-cols-5 gap-1">
        {data.flat().map((value, index) => (
          <div
            key={index}
            className="w-8 h-8 rounded flex items-center justify-center text-xs font-medium text-white"
            style={{ backgroundColor: `hsl(214, ${Math.round(value * 100)}%, 60%)` }}
          >
            {value.toFixed(1)}
          </div>
        ))}
      </div>
    </div>
  );
};

const CorrelationMatrix = () => {
  const matrix = [
    { label: "Tech", values: [1, 0.6, 0.3, 0.6] },
    { label: "Cost", values: [0.7, 1, 0.5, 0.5] },
    { label: "Exp", values: [0.4, 0.5, 1, 0.6] },
    { label: "Qual", values: [0.5, 0.3, 0.3, 1] },
  ];

  return (
    <div className="p-4">
      <div className="text-sm text-muted-foreground text-center mb-4">Correlation Matrix</div>
      <div className="grid grid-cols-5 gap-1">
        <div></div>
        {["Tech", "Cost", "Exp", "Qual"].map(label => (
          <div key={label} className="text-xs text-center font-medium p-1">{label}</div>
        ))}
        {matrix.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="text-xs font-medium p-1">{row.label}</div>
            {row.values.map((value, colIndex) => (
              <div
                key={colIndex}
                className="w-8 h-8 rounded flex items-center justify-center text-xs font-medium text-white"
                style={{ backgroundColor: `hsl(214, ${Math.round(value * 100)}%, 60%)` }}
              >
                {value}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ProgressBar = ({ label, percentage, color }: { label: string; percentage: number; color: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="h-2 rounded-full" 
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
    </div>
  </div>
);

export default function KPIs() {
  const evaluatorConsistencyData = [
    { criteria: "Technical", min: 3, q1: 6, median: 7.5, q3: 9, max: 10 },
    { criteria: "Commercial", min: 4, q1: 6.5, median: 8, q3: 9.2, max: 10 },
    { criteria: "Experience", min: 3.5, q1: 6.8, median: 8.2, q3: 9.5, max: 10 },
    { criteria: "Quality", min: 4, q1: 7, median: 8.5, q3: 9.3, max: 10 },
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">RFP KPI Dashboard</h1>
            <p className="text-gray-600 mt-2">Monitor performance, track bottlenecks, and measure cost savings</p>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: 9/16/2025
          </div>
        </div>

        {/* Performance Overview Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Performance Overview</h2>
          
          {/* Summary KPI Cards - 2 rows of 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {summaryKPIs.map((kpi, index) => (
              <Card key={index} className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {kpi.title}
                  </CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{kpi.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="flex items-baseline space-x-2">
                      <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                      {kpi.subtext && <span className="text-sm text-gray-500">{kpi.subtext}</span>}
                    </div>
                    <div className={`flex items-center space-x-1 text-xs ${
                      kpi.trend === 'up' ? 'text-green-600' : 
                      kpi.trend === 'down' ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {kpi.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                      {kpi.trend === 'down' && <TrendingUp className="h-3 w-3 transform rotate-180" />}
                      <span>{kpi.change}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* RFP Lifecycle Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">RFP Lifecycle</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* RFP Creation Rate */}
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">RFP Creation Rate</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
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
                    value: {
                      label: "RFPs",
                      color: "#3b82f6",
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
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* RFP Approval Time */}
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">RFP Approval Time</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
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
                    value: {
                      label: "Approvals",
                      color: "#3b82f6",
                    },
                  }}
                  className="h-[200px]"
                >
                  <BarChart data={approvalTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* First-Time Approval Rate */}
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">First-Time Approval Rate</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>How often RFPs are approved in first submission</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                <GaugeChart value={firstTimeApprovalRate} />
              </CardContent>
            </Card>

            {/* Approval Stage Performance */}
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Approval Stage Performance</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Breakdown of delay at each approval step</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Performance",
                      color: "#3b82f6",
                    },
                  }}
                  className="h-[200px]"
                >
                  <BarChart data={approvalStageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* End-to-End RFP Cycle Time */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">End-to-End RFP Cycle Time</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Track the lifecycle from start to finish</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground text-center">Gantt Chart Visualization</div>
              {ganttData.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-20 text-sm text-muted-foreground text-right">{item.phase}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full"
                      style={{ width: `${item.duration}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vendor Metrics Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Vendor Metrics</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vendor Response Rate */}
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Vendor Response Rate</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
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
                    x: {
                      label: "Response Rate",
                      color: "#10b981",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ScatterChart data={vendorResponseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" />
                    <YAxis dataKey="y" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Scatter dataKey="y" fill="#10b981" />
                  </ScatterChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* New vs Existing Vendors */}
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">New vs Existing Vendors</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Compare participation across vendor types</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Vendors",
                      color: "#3b82f6",
                    },
                  }}
                  className="h-[200px]"
                >
                  <BarChart data={newVsExistingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Category Performance */}
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Category Performance</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Track which vendor categories perform best</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    x: {
                      label: "Performance",
                      color: "#10b981",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ScatterChart data={categoryPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" />
                    <YAxis dataKey="y" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Scatter dataKey="y" fill="#10b981" />
                  </ScatterChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Award Acceptance Rate */}
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Award Acceptance Rate</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Vendors accepting the awarded contracts</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Rate",
                      color: "#3b82f6",
                    },
                  }}
                  className="h-[200px]"
                >
                  <PieChart>
                    <Pie
                      data={awardAcceptanceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      dataKey="value"
                    >
                      {awardAcceptanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Vendor Conversion Funnel */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Vendor Conversion Funnel</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Onboarding rate of previously unmatched vendors</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground text-center">Conversion Pipeline</div>
              <div className="flex justify-between items-center">
                {processFlowData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="text-xs text-muted-foreground mb-1">{item.stage}</div>
                    <div className="text-sm font-medium">{item.percentage}%</div>
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="flex h-2 rounded-full overflow-hidden">
                  {processFlowData.map((item, index) => (
                    <div
                      key={index}
                      className="h-full bg-gradient-to-r from-green-400 to-green-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Evaluation Metrics Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Evaluation Metrics</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Reviewer Workload */}
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Reviewer Workload</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
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
                    value: {
                      label: "Workload",
                      color: "#3b82f6",
                    },
                  }}
                  className="h-[200px]"
                >
                  <BarChart data={reviewerWorkloadData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Evaluator Consistency */}
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Evaluator Consistency</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Detect bias or inconsistency in scoring</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                <BoxPlot data={evaluatorConsistencyData} />
              </CardContent>
            </Card>

            {/* Completion Time */}
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Completion Time</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Time each evaluator takes to finish</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Time",
                      color: "#3b82f6",
                    },
                  }}
                  className="h-[200px]"
                >
                  <LineChart data={completionTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Score Distribution */}
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Score Distribution</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Spread of scores per evaluation criterion</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground text-center">Criteria Distribution</div>
                  <ChartContainer
                    config={{
                      value: {
                        label: "Score",
                        color: "#3b82f6",
                      },
                    }}
                    className="h-[150px]"
                  >
                    <BarChart data={scoreDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="criteria" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Consensus Quality and Criteria Effectiveness */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Consensus Quality</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Agreement levels among evaluators</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <Heatmap />
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Criteria Effectiveness</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Impact of criteria weights on final score</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <CorrelationMatrix />
            </CardContent>
          </Card>
        </div>

        {/* Financial & Process Efficiency Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Financial & Process Efficiency</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget Variance */}
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Budget Variance</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Alignment of proposed vs estimated budgets</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground text-center">Budget Analysis</div>
                  {budgetVarianceData.map((item, index) => (
                    <ProgressBar 
                      key={index}
                      label={item.category}
                      percentage={item.percentage}
                      color={item.color}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price Spread */}
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Price Spread</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Price variation by vendor category</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground text-center">Category Distribution</div>
                  <div className="space-y-3">
                    {["IT", "Cons", "Mktg", "Legal", "Ops"].map((category, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-12 text-sm text-muted-foreground text-right">{category}</div>
                        <div className="flex-1 relative">
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-8 bg-green-500 rounded" />
                            <div className="w-2 h-12 bg-green-400 rounded" />
                            <div className="w-2 h-10 bg-green-500 rounded" />
                            <div className="w-2 h-8 bg-green-400 rounded" />
                            <div className="w-2 h-6 bg-green-300 rounded" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* RFP Process Flow */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">RFP Process Flow</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Flow from creation to awarding</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground text-center">Process Funnel</div>
              <div className="space-y-3">
                {processFlowData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-20 text-sm text-muted-foreground text-right">{item.stage}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-500 h-3 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="text-sm font-medium text-gray-700">{item.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}