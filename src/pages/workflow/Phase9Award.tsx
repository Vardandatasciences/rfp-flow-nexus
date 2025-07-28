import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Send, 
  CheckCircle2, 
  XCircle,
  Clock,
  Mail,
  FileText,
  ArrowRight,
  Award,
  Building2,
  Calendar,
  DollarSign,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Phase9Award = () => {
  const { toast } = useToast();
  const [winnerNotified, setWinnerNotified] = useState(false);
  const [unsuccessfulNotified, setUnsuccessfulNotified] = useState(false);
  const [awardMessage, setAwardMessage] = useState("");
  const [rejectionMessage, setRejectionMessage] = useState("");

  const awardDecision = {
    winner: {
      id: "cloudtech",
      name: "CloudTech Inc",
      contact: "hello@cloudtech.com",
      phone: "+1 (555) 987-6543",
      finalScore: 92.3,
      proposedValue: 425000,
      projectManager: "Sarah Johnson",
      acceptanceDeadline: "2025-02-10",
      status: "notified",
      responseStatus: "pending"
    },
    unsuccessful: [
      {
        id: "tech-corp",
        name: "TechCorp Solutions", 
        contact: "john.smith@techcorp.com",
        finalScore: 88.5,
        rank: 2,
        status: "notified",
        notificationSent: "2025-01-30"
      },
      {
        id: "datasoft",
        name: "DataSoft Corporation",
        contact: "info@datasoft.com", 
        finalScore: 85.1,
        rank: 3,
        status: "pending",
        notificationSent: null
      }
    ]
  };

  const awardPackageDocuments = [
    { name: "Award Notification Letter", status: "generated", required: true },
    { name: "Contract Template", status: "generated", required: true },
    { name: "Statement of Work", status: "generated", required: true },
    { name: "Project Timeline", status: "pending", required: true },
    { name: "Payment Schedule", status: "generated", required: false },
    { name: "Vendor Onboarding Guide", status: "generated", required: false }
  ];

  const handleSendWinnerNotification = () => {
    setWinnerNotified(true);
    toast({ 
      title: "Winner notification sent", 
      description: "Award notification has been sent to CloudTech Inc." 
    });
  };

  const handleSendUnsuccessfulNotifications = () => {
    setUnsuccessfulNotified(true);
    toast({ 
      title: "Notifications sent", 
      description: "Thank you messages sent to unsuccessful vendors." 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "status-badge awarded";
      case "notified": return "status-badge active";
      case "pending": return "status-badge draft";
      case "declined": return "status-badge danger";
      default: return "status-badge draft";
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "generated": return "status-badge awarded";
      case "pending": return "status-badge draft";
      case "in-progress": return "status-badge active";
      default: return "status-badge draft";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Phase 9: Award Process</h1>
          <p className="text-muted-foreground">
            Manage winner notification and vendor acceptance process.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="status-badge active">
            Phase 9 of 10
          </Badge>
        </div>
      </div>

      {/* Award Summary */}
      <Card className="phase-card bg-success/5 border-success/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-success" />
            Award Decision Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">#1</div>
              <div className="text-sm text-muted-foreground">Final Rank</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{awardDecision.winner.finalScore}</div>
              <div className="text-sm text-muted-foreground">Final Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">${(awardDecision.winner.proposedValue / 1000).toFixed(0)}K</div>
              <div className="text-sm text-muted-foreground">Contract Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">10 days</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
          </div>
          
          <div className="bg-background p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Selected Vendor: {awardDecision.winner.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p><strong>Contact:</strong> {awardDecision.winner.contact}</p>
                <p><strong>Phone:</strong> {awardDecision.winner.phone}</p>
                <p><strong>Project Manager:</strong> {awardDecision.winner.projectManager}</p>
              </div>
              <div className="space-y-2">
                <p><strong>Acceptance Deadline:</strong> {awardDecision.winner.acceptanceDeadline}</p>
                <p><strong>Contract Value:</strong> ${awardDecision.winner.proposedValue.toLocaleString()}</p>
                <p><strong>Status:</strong> 
                  <Badge className={getStatusColor(awardDecision.winner.responseStatus)}>
                    {awardDecision.winner.responseStatus}
                  </Badge>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="winner" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="winner">Winner Notification</TabsTrigger>
          <TabsTrigger value="unsuccessful">Unsuccessful Vendors</TabsTrigger>
          <TabsTrigger value="documents">Award Package</TabsTrigger>
          <TabsTrigger value="tracking">Acceptance Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="winner" className="space-y-6">
          {/* Winner Notification */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Winner Notification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-success/10 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Trophy className="h-6 w-6 text-success" />
                  <div>
                    <h3 className="font-semibold text-lg">{awardDecision.winner.name}</h3>
                    <p className="text-muted-foreground">Recommended for Award</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium">{awardDecision.winner.contact}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone:</span>
                    <p className="font-medium">{awardDecision.winner.phone}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Deadline:</span>
                    <p className="font-medium">{awardDecision.winner.acceptanceDeadline}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Award Notification Message</label>
                <Textarea
                  value={awardMessage}
                  onChange={(e) => setAwardMessage(e.target.value)}
                  placeholder="Customize the award notification message..."
                  className="min-h-32"
                />
                <div className="bg-muted/20 p-3 rounded text-sm">
                  <p className="font-medium mb-2">Default message template includes:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Congratulations and award confirmation</li>
                    <li>• Contract value and project timeline</li>
                    <li>• Acceptance deadline and next steps</li>
                    <li>• Required documentation list</li>
                    <li>• Contact information for questions</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  {winnerNotified ? (
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 className="h-4 w-4" />
                      Notification sent successfully
                    </div>
                  ) : (
                    "Notification ready to send"
                  )}
                </div>
                <Button 
                  onClick={handleSendWinnerNotification}
                  disabled={winnerNotified}
                  className="gradient-primary"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {winnerNotified ? "Notification Sent" : "Send Award Notification"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unsuccessful" className="space-y-6">
          {/* Unsuccessful Vendor Notifications */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Unsuccessful Vendor Communications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {awardDecision.unsuccessful.map((vendor) => (
                  <div key={vendor.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{vendor.name}</h3>
                        <p className="text-sm text-muted-foreground">{vendor.contact}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(vendor.status)}>
                          {vendor.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Rank #{vendor.rank}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Final Score:</span>
                        <p className="font-medium">{vendor.finalScore}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Notification:</span>
                        <p className="font-medium">
                          {vendor.notificationSent ? vendor.notificationSent : "Pending"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span>
                        <p className="font-medium capitalize">{vendor.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Thank You Message Template</label>
                <Textarea
                  value={rejectionMessage}
                  onChange={(e) => setRejectionMessage(e.target.value)}
                  placeholder="Customize the thank you message for unsuccessful vendors..."
                  className="min-h-24"
                />
                <div className="bg-muted/20 p-3 rounded text-sm">
                  <p className="font-medium mb-2">Default template includes:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Appreciation for their participation</li>
                    <li>• Information about the selection process</li>
                    <li>• Encouragement for future opportunities</li>
                    <li>• Feedback availability (if applicable)</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  {unsuccessfulNotified ? (
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 className="h-4 w-4" />
                      Thank you messages sent
                    </div>
                  ) : (
                    `${awardDecision.unsuccessful.length} vendors to notify`
                  )}
                </div>
                <Button 
                  onClick={handleSendUnsuccessfulNotifications}
                  disabled={unsuccessfulNotified}
                  variant="outline"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {unsuccessfulNotified ? "Messages Sent" : "Send Thank You Messages"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          {/* Award Package Documents */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Award Package Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {awardPackageDocuments.map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">
                          {doc.name}
                          {doc.required && <span className="text-destructive ml-1">*</span>}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {doc.status === "generated" ? "Ready" : "In progress"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getDocumentStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                      {doc.status === "generated" && (
                        <Button variant="ghost" size="sm">
                          <FileText className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-muted/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Package Contents Overview:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium mb-1">Legal Documents:</h5>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Award notification letter</li>
                      <li>• Contract template</li>
                      <li>• Statement of work</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Project Materials:</h5>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Project timeline</li>
                      <li>• Payment schedule</li>
                      <li>• Onboarding guide</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Complete Package
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          {/* Acceptance Tracking */}
          <Card className="phase-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Acceptance Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border">
                  <CardContent className="p-4 text-center">
                    <Calendar className="h-8 w-8 mx-auto text-warning mb-2" />
                    <p className="font-semibold">Response Deadline</p>
                    <p className="text-sm text-muted-foreground">{awardDecision.winner.acceptanceDeadline}</p>
                    <p className="text-xs text-warning mt-1">10 days remaining</p>
                  </CardContent>
                </Card>
                
                <Card className="border">
                  <CardContent className="p-4 text-center">
                    <Mail className="h-8 w-8 mx-auto text-info mb-2" />
                    <p className="font-semibold">Notification Status</p>
                    <p className="text-sm text-muted-foreground">Sent on Jan 30, 2025</p>
                    <p className="text-xs text-success mt-1">Delivered & opened</p>
                  </CardContent>
                </Card>
                
                <Card className="border">
                  <CardContent className="p-4 text-center">
                    <CheckCircle2 className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="font-semibold">Response Status</p>
                    <p className="text-sm text-muted-foreground">Awaiting response</p>
                    <p className="text-xs text-muted-foreground mt-1">No response yet</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Vendor Response Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex-col">
                    <CheckCircle2 className="h-6 w-6 text-success mb-2" />
                    <span className="font-medium">Mark as Accepted</span>
                    <span className="text-xs text-muted-foreground">Vendor accepted the award</span>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex-col">
                    <XCircle className="h-6 w-6 text-destructive mb-2" />
                    <span className="font-medium">Mark as Declined</span>
                    <span className="text-xs text-muted-foreground">Vendor declined the award</span>
                  </Button>
                </div>
              </div>

              <div className="bg-muted/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Next Steps:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Monitor vendor response to award notification</li>
                  <li>• Follow up if no response received within 7 days</li>
                  <li>• Upon acceptance, initiate contract execution process</li>
                  <li>• If declined, proceed with second-ranked vendor</li>
                  <li>• Begin vendor onboarding process upon contract signing</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <Card className="phase-card">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link to="/workflow/phase-8">
                Previous: Final Consensus
              </Link>
            </Button>
            <Button className="gradient-primary" asChild>
              <Link to="/workflow/phase-10">
                Continue to Vendor Onboarding
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Phase9Award;