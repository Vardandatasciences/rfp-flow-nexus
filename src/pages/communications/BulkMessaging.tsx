import { useState } from "react";
import { Send, Users, Calendar, Settings, Eye, Download, Filter, UserCheck, Mail, MessageSquare, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const recipientGroups = [
  { id: 1, name: "All Active Vendors", count: 45, type: "vendor" },
  { id: 2, name: "Cloud Infrastructure Vendors", count: 12, type: "vendor" },
  { id: 3, name: "Evaluation Team", count: 8, type: "internal" },
  { id: 4, name: "RFP Stakeholders", count: 15, type: "internal" },
  { id: 5, name: "Shortlisted Vendors - RFP-2024-001", count: 6, type: "vendor" }
];

const campaigns = [
  {
    id: 1,
    name: "Q1 Vendor Check-in",
    type: "email",
    status: "sent",
    recipients: 45,
    delivered: 43,
    opened: 38,
    responded: 12,
    sentDate: "2024-01-20",
    subject: "Quarterly Vendor Performance Review"
  },
  {
    id: 2,
    name: "RFP Deadline Reminder",
    type: "email",
    status: "scheduled",
    recipients: 12,
    delivered: 0,
    opened: 0,
    responded: 0,
    sentDate: "2024-01-25",
    subject: "Reminder: RFP Submission Due in 3 Days"
  },
  {
    id: 3,
    name: "Evaluation Team Alert",
    type: "sms",
    status: "sent",
    recipients: 8,
    delivered: 8,
    opened: 8,
    responded: 6,
    sentDate: "2024-01-22",
    subject: "Urgent: Evaluation deadline approaching"
  }
];

export default function BulkMessaging() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const [messageType, setMessageType] = useState<string>("email");
  const [isScheduled, setIsScheduled] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent": return "success";
      case "scheduled": return "warning";
      case "draft": return "secondary";
      case "sending": return "info";
      default: return "secondary";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email": return <Mail className="h-4 w-4" />;
      case "sms": return <MessageSquare className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  const totalRecipients = selectedGroups.reduce((total, groupId) => {
    const group = recipientGroups.find(g => g.id === groupId);
    return total + (group?.count || 0);
  }, 0);

  const toggleGroup = (groupId: number) => {
    setSelectedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Bulk Messaging</h1>
          <p className="text-muted-foreground">Send bulk communications to vendors and internal teams</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Message Settings
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">156</div>
            <p className="text-sm text-muted-foreground">Messages Sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">89.2%</div>
            <p className="text-sm text-muted-foreground">Delivery Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-info">76.5%</div>
            <p className="text-sm text-muted-foreground">Open Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">34.8%</div>
            <p className="text-sm text-muted-foreground">Response Rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="compose" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign History</TabsTrigger>
          <TabsTrigger value="analytics">Delivery Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Compose Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compose Bulk Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="messageType">Message Type</Label>
                      <Select value={messageType} onValueChange={setMessageType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="template">Template</Label>
                      <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="invitation">RFP Invitation</SelectItem>
                          <SelectItem value="reminder">Deadline Reminder</SelectItem>
                          <SelectItem value="confirmation">Proposal Confirmation</SelectItem>
                          <SelectItem value="custom">Custom Message</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {messageType === "email" && (
                    <div>
                      <Label htmlFor="subject">Subject Line</Label>
                      <Input 
                        id="subject" 
                        placeholder="Enter email subject"
                        defaultValue="Important Update from RFP Team"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="message">Message Content</Label>
                    <Textarea 
                      id="message"
                      placeholder="Enter your message content..."
                      className="h-32"
                      defaultValue="Dear {{vendor_name}},

We hope this message finds you well. We wanted to reach out with an important update regarding your participation in our RFP process.

{{custom_content}}

If you have any questions, please don't hesitate to contact us.

Best regards,
The RFP Team"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="schedule" 
                      checked={isScheduled}
                      onCheckedChange={setIsScheduled}
                    />
                    <Label htmlFor="schedule">Schedule for later</Label>
                  </div>

                  {isScheduled && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="scheduleDate">Send Date</Label>
                        <Input type="date" id="scheduleDate" />
                      </div>
                      <div>
                        <Label htmlFor="scheduleTime">Send Time</Label>
                        <Input type="time" id="scheduleTime" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  {isScheduled ? "Schedule Message" : "Send Now"}
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </div>

            {/* Recipient Selection */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Select Recipients
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {recipientGroups.map((group) => (
                      <div 
                        key={group.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedGroups.includes(group.id) 
                            ? 'border-primary bg-primary/5' 
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => toggleGroup(group.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                              selectedGroups.includes(group.id) 
                                ? 'border-primary bg-primary' 
                                : 'border-muted-foreground'
                            }`}>
                              {selectedGroups.includes(group.id) && (
                                <UserCheck className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <span className="font-medium">{group.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={group.type === "internal" ? "secondary" : "outline"}>
                              {group.type}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{group.count}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Recipients:</span>
                      <Badge variant="secondary" className="text-lg">
                        {totalRecipients}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Merge Fields</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      "{{vendor_name}}",
                      "{{contact_person}}",
                      "{{company_name}}",
                      "{{rfp_title}}",
                      "{{deadline}}",
                      "{{custom_content}}"
                    ].map((field) => (
                      <Badge key={field} variant="outline" className="mr-1 mb-1">
                        {field}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Input placeholder="Search campaigns..." />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Delivery Rate</TableHead>
                  <TableHead>Response Rate</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-sm text-muted-foreground">{campaign.subject}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(campaign.type)}
                        <span className="capitalize">{campaign.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(campaign.status) as any}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{campaign.recipients}</TableCell>
                    <TableCell>
                      {campaign.status === "sent" ? (
                        <div className="space-y-1">
                          <div className="text-sm">{((campaign.delivered / campaign.recipients) * 100).toFixed(1)}%</div>
                          <Progress value={(campaign.delivered / campaign.recipients) * 100} className="h-2" />
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {campaign.status === "sent" && campaign.responded > 0 ? (
                        <div className="space-y-1">
                          <div className="text-sm">{((campaign.responded / campaign.delivered) * 100).toFixed(1)}%</div>
                          <Progress value={(campaign.responded / campaign.delivered) * 100} className="h-2" />
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>{campaign.sentDate}</TableCell>
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
                <CardTitle>Delivery Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Email Delivery Rate</span>
                      <span className="font-medium">94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>SMS Delivery Rate</span>
                      <span className="font-medium">98.7%</span>
                    </div>
                    <Progress value={98.7} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Overall Open Rate</span>
                      <span className="font-medium">76.5%</span>
                    </div>
                    <Progress value={76.5} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Average Response Time</span>
                      <span className="font-medium">6.2 hours</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Vendor Response Rate</span>
                      <span className="font-medium">34.8%</span>
                    </div>
                    <Progress value={34.8} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Internal Response Rate</span>
                      <span className="font-medium">87.3%</span>
                    </div>
                    <Progress value={87.3} className="h-2" />
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