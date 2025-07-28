import { useState } from "react";
import { Bell, Settings, Search, Filter, Mail, MessageSquare, AlertCircle, CheckCircle, Clock, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const notifications = [
  {
    id: 1,
    type: "proposal_received",
    title: "New Proposal Received",
    message: "TechCorp Solutions submitted their proposal for Cloud Infrastructure RFP",
    timestamp: "2024-01-22 14:30",
    read: false,
    priority: "high",
    channel: "email",
    rfpId: "RFP-2024-001",
    vendor: "TechCorp Solutions"
  },
  {
    id: 2,
    type: "evaluation_due",
    title: "Evaluation Due Tomorrow",
    message: "Marketing Services RFP evaluation deadline is approaching",
    timestamp: "2024-01-22 09:15",
    read: false,
    priority: "urgent",
    channel: "in-app",
    rfpId: "RFP-2024-003",
    vendor: null
  },
  {
    id: 3,
    type: "approval_required",
    title: "Approval Required",
    message: "Legal Services RFP requires your approval to proceed",
    timestamp: "2024-01-21 16:45",
    read: true,
    priority: "medium",
    channel: "email",
    rfpId: "RFP-2024-005",
    vendor: null
  },
  {
    id: 4,
    type: "vendor_question",
    title: "Vendor Question",
    message: "DataFlow Systems has a question about technical requirements",
    timestamp: "2024-01-21 11:20",
    read: true,
    priority: "medium",
    channel: "in-app",
    rfpId: "RFP-2024-001",
    vendor: "DataFlow Systems"
  },
  {
    id: 5,
    type: "deadline_reminder",
    title: "Submission Deadline Reminder",
    message: "Software Development RFP submissions due in 3 days",
    timestamp: "2024-01-20 08:00",
    read: true,
    priority: "low",
    channel: "email",
    rfpId: "RFP-2024-002",
    vendor: null
  }
];

const notificationSettings = [
  {
    category: "RFP Updates",
    settings: [
      { name: "New RFP Created", email: true, inApp: true, sms: false },
      { name: "RFP Status Changes", email: true, inApp: true, sms: false },
      { name: "Deadline Reminders", email: true, inApp: true, sms: true }
    ]
  },
  {
    category: "Vendor Activity",
    settings: [
      { name: "New Proposals", email: true, inApp: true, sms: false },
      { name: "Vendor Questions", email: true, inApp: true, sms: false },
      { name: "Proposal Updates", email: false, inApp: true, sms: false }
    ]
  },
  {
    category: "Evaluations",
    settings: [
      { name: "Evaluation Assignments", email: true, inApp: true, sms: false },
      { name: "Evaluation Due", email: true, inApp: true, sms: true },
      { name: "Consensus Required", email: true, inApp: true, sms: false }
    ]
  }
];

export default function Notifications() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "proposal_received": return <Mail className="h-4 w-4" />;
      case "evaluation_due": return <Clock className="h-4 w-4" />;
      case "approval_required": return <AlertCircle className="h-4 w-4" />;
      case "vendor_question": return <MessageSquare className="h-4 w-4" />;
      case "deadline_reminder": return <Bell className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive";
      case "high": return "warning";
      case "medium": return "info";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (selectedType !== "all" && notification.type !== selectedType) return false;
    if (selectedPriority !== "all" && notification.priority !== selectedPriority) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Manage your notification preferences and history</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline">
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{unreadCount}</div>
            <p className="text-sm text-muted-foreground">Unread</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {notifications.filter(n => n.priority === "urgent").length}
            </div>
            <p className="text-sm text-muted-foreground">Urgent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {notifications.filter(n => n.type === "proposal_received").length}
            </div>
            <p className="text-sm text-muted-foreground">New Proposals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-info">
              {notifications.filter(n => n.type === "evaluation_due").length}
            </div>
            <p className="text-sm text-muted-foreground">Due Soon</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications">Notification Feed</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search notifications..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="proposal_received">Proposals</SelectItem>
                  <SelectItem value="evaluation_due">Evaluations</SelectItem>
                  <SelectItem value="approval_required">Approvals</SelectItem>
                  <SelectItem value="vendor_question">Questions</SelectItem>
                  <SelectItem value="deadline_reminder">Reminders</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card key={notification.id} className={`hover:shadow-lg transition-shadow ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${!notification.read ? 'bg-primary/10' : 'bg-muted'}`}>
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityColor(notification.priority) as any}>
                            {notification.priority}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{notification.timestamp}</span>
                          {notification.rfpId && (
                            <Badge variant="outline">{notification.rfpId}</Badge>
                          )}
                          {notification.vendor && (
                            <span>{notification.vendor}</span>
                          )}
                          <Badge variant="outline">{notification.channel}</Badge>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {notificationSettings.map((category) => (
                <div key={category.category} className="space-y-4">
                  <h3 className="font-medium text-lg">{category.category}</h3>
                  <div className="space-y-3">
                    {category.settings.map((setting) => (
                      <div key={setting.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <Label className="text-sm font-medium">{setting.name}</Label>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center space-x-2">
                            <Switch id={`${setting.name}-email`} checked={setting.email} />
                            <Label htmlFor={`${setting.name}-email`} className="text-sm">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id={`${setting.name}-app`} checked={setting.inApp} />
                            <Label htmlFor={`${setting.name}-app`} className="text-sm">In-App</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id={`${setting.name}-sms`} checked={setting.sms} />
                            <Label htmlFor={`${setting.name}-sms`} className="text-sm">SMS</Label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}