import { useState } from "react";
import { Search, Filter, Download, Mail, MessageSquare, Phone, Calendar, User, Building2, Eye, Archive } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const messageHistory = [
  {
    id: 1,
    type: "email",
    direction: "outbound",
    subject: "RFP Invitation - Cloud Infrastructure Services",
    sender: "Sarah Chen",
    recipient: "alex@techcorp.com",
    recipientName: "Alex Johnson",
    company: "TechCorp Solutions",
    timestamp: "2024-01-22 14:30",
    status: "delivered",
    rfpId: "RFP-2024-001",
    threadId: "thread-001",
    messageCount: 5,
    lastActivity: "2024-01-22 16:45",
    tags: ["invitation", "cloud", "infrastructure"]
  },
  {
    id: 2,
    type: "email",
    direction: "inbound",
    subject: "RE: Technical Requirements Clarification",
    sender: "maria@securenet.com",
    recipient: "sarah.chen@company.com",
    recipientName: "Maria Rodriguez",
    company: "SecureNet Technologies",
    timestamp: "2024-01-22 11:20",
    status: "read",
    rfpId: "RFP-2024-001",
    threadId: "thread-002",
    messageCount: 3,
    lastActivity: "2024-01-22 11:20",
    tags: ["question", "technical", "clarification"]
  },
  {
    id: 3,
    type: "sms",
    direction: "outbound",
    subject: "Evaluation deadline reminder",
    sender: "System",
    recipient: "+1-555-0123",
    recipientName: "Mike Johnson",
    company: "Internal",
    timestamp: "2024-01-22 09:00",
    status: "delivered",
    rfpId: "RFP-2024-003",
    threadId: null,
    messageCount: 1,
    lastActivity: "2024-01-22 09:00",
    tags: ["reminder", "internal", "evaluation"]
  },
  {
    id: 4,
    type: "email",
    direction: "outbound",
    subject: "Proposal Received Confirmation",
    sender: "System",
    recipient: "david@dataflow.com",
    recipientName: "David Kim",
    company: "DataFlow Analytics",
    timestamp: "2024-01-21 18:15",
    status: "opened",
    rfpId: "RFP-2024-001",
    threadId: "thread-003",
    messageCount: 2,
    lastActivity: "2024-01-22 08:30",
    tags: ["confirmation", "proposal", "automated"]
  },
  {
    id: 5,
    type: "phone",
    direction: "inbound",
    subject: "Follow-up call regarding proposal questions",
    sender: "emma@creativeagency.com",
    recipient: "Sarah Chen",
    recipientName: "Emma Davis",
    company: "Creative Digital Agency",
    timestamp: "2024-01-21 15:30",
    status: "completed",
    rfpId: "RFP-2024-003",
    threadId: null,
    messageCount: 1,
    lastActivity: "2024-01-21 15:30",
    tags: ["follow-up", "phone", "questions"]
  }
];

const communicationStats = {
  totalMessages: 234,
  emailsSent: 180,
  emailsReceived: 45,
  smsSent: 8,
  phoneCalls: 12,
  averageResponseTime: "4.2 hours",
  responseRate: "87.5%"
};

export default function MessageHistory() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedDirection, setSelectedDirection] = useState<string>("all");
  const [selectedRFP, setSelectedRFP] = useState<string>("all");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email": return <Mail className="h-4 w-4" />;
      case "sms": return <MessageSquare className="h-4 w-4" />;
      case "phone": return <Phone className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "success";
      case "opened": return "info";
      case "read": return "success";
      case "completed": return "success";
      case "failed": return "destructive";
      case "pending": return "warning";
      default: return "secondary";
    }
  };

  const getDirectionColor = (direction: string) => {
    return direction === "inbound" ? "info" : "secondary";
  };

  const filteredMessages = messageHistory.filter(message => {
    if (selectedType !== "all" && message.type !== selectedType) return false;
    if (selectedDirection !== "all" && message.direction !== selectedDirection) return false;
    if (selectedRFP !== "all" && message.rfpId !== selectedRFP) return false;
    return true;
  });

  const uniqueRFPs = [...new Set(messageHistory.map(m => m.rfpId))].filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Message History</h1>
          <p className="text-muted-foreground">Complete communication audit trail for RFP processes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export History
          </Button>
          <Button variant="outline">
            <Archive className="h-4 w-4 mr-2" />
            Archive Old Messages
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{communicationStats.totalMessages}</div>
            <p className="text-sm text-muted-foreground">Total Messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{communicationStats.emailsSent}</div>
            <p className="text-sm text-muted-foreground">Emails Sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-info">{communicationStats.averageResponseTime}</div>
            <p className="text-sm text-muted-foreground">Avg Response Time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">{communicationStats.responseRate}</div>
            <p className="text-sm text-muted-foreground">Response Rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="threads">Message Threads</TabsTrigger>
          <TabsTrigger value="analytics">Communication Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages, contacts..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDirection} onValueChange={setSelectedDirection}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="inbound">Inbound</SelectItem>
                  <SelectItem value="outbound">Outbound</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedRFP} onValueChange={setSelectedRFP}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="RFP" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All RFPs</SelectItem>
                  {uniqueRFPs.map((rfp) => (
                    <SelectItem key={rfp} value={rfp}>{rfp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message Timeline */}
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <Card key={message.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-muted">
                      {getTypeIcon(message.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{message.subject}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <span>{message.direction === "inbound" ? "From" : "To"}:</span>
                            <span className="font-medium">
                              {message.direction === "inbound" ? message.sender : message.recipientName}
                            </span>
                            <span>•</span>
                            <span>{message.company}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getDirectionColor(message.direction) as any}>
                            {message.direction}
                          </Badge>
                          <Badge variant={getStatusColor(message.status) as any}>
                            {message.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{message.timestamp}</span>
                          </div>
                          {message.rfpId && (
                            <Badge variant="outline">{message.rfpId}</Badge>
                          )}
                          {message.threadId && (
                            <span>Thread: {message.messageCount} messages</span>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {message.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="threads" className="space-y-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Thread</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Messages</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>RFP</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messageHistory
                  .filter(m => m.threadId)
                  .reduce((threads: any[], message) => {
                    const existingThread = threads.find(t => t.threadId === message.threadId);
                    if (!existingThread) {
                      threads.push({
                        threadId: message.threadId,
                        subject: message.subject,
                        participants: [message.recipientName, message.sender],
                        messageCount: message.messageCount,
                        lastActivity: message.lastActivity,
                        rfpId: message.rfpId,
                        status: "active"
                      });
                    }
                    return threads;
                  }, [])
                  .map((thread) => (
                    <TableRow key={thread.threadId}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{thread.subject}</div>
                          <div className="text-sm text-muted-foreground">{thread.threadId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {thread.participants.map((participant: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {participant}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{thread.messageCount}</TableCell>
                      <TableCell>{thread.lastActivity}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{thread.rfpId}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{thread.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
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
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Communication Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Emails</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }} />
                      </div>
                      <span className="text-sm font-medium">225</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>SMS</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: "25%" }} />
                      </div>
                      <span className="text-sm font-medium">8</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Phone Calls</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-info h-2 rounded-full" style={{ width: "15%" }} />
                      </div>
                      <span className="text-sm font-medium">12</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Average Response Time</span>
                      <span className="text-sm font-medium">4.2 hours</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: "75%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Response Rate</span>
                      <span className="text-sm font-medium">87.5%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-info h-2 rounded-full" style={{ width: "87%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Email Open Rate</span>
                      <span className="text-sm font-medium">92.3%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-warning h-2 rounded-full" style={{ width: "92%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}