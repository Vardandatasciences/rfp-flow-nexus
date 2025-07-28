import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  Crown, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  ArrowRight,
  Star,
  Trophy,
  Target,
  Calendar,
  GripVertical
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Phase8Consensus = () => {
  const { toast } = useToast();
  const [finalRanking, setFinalRanking] = useState([
    "cloudtech", "tech-corp", "datasoft"
  ]);
  const [consensusNotes, setConsensusNotes] = useState("");

  const committeeMembers = [
    {
      id: "john-doe",
      name: "John Doe",
      role: "CTO",
      status: "completed",
      ranking: ["cloudtech", "tech-corp", "datasoft"],
      weight: 40,
      submissionDate: "2025-01-28"
    },
    {
      id: "jane-smith",
      name: "Jane Smith", 
      role: "Procurement Director",
      status: "completed",
      ranking: ["tech-corp", "cloudtech", "datasoft"],
      weight: 30,
      submissionDate: "2025-01-27"
    },
    {
      id: "mike-johnson",
      name: "Mike Johnson",
      role: "IT Director",
      status: "pending",
      ranking: [],
      weight: 20,
      submissionDate: null
    },
    {
      id: "sarah-wilson",
      name: "Sarah Wilson",
      role: "Finance Manager",
      status: "completed",
      ranking: ["cloudtech", "datasoft", "tech-corp"],
      weight: 10,
      submissionDate: "2025-01-28"
    }
  ];

  const vendors = [
    {
      id: "cloudtech",
      name: "CloudTech Inc",
      totalScore: 92.3,
      proposedValue: 425000,
      strengths: "Innovative approach, competitive pricing, strong Azure expertise",
      concerns: "Smaller team size, less experience with similar scale"
    },
    {
      id: "tech-corp", 
      name: "TechCorp Solutions",
      totalScore: 88.5,
      proposedValue: 485000,
      strengths: "Strong technical team, proven track record, excellent project management",
      concerns: "Pricing slightly high, limited local presence"
    },
    {
      id: "datasoft",
      name: "DataSoft Corporation", 
      totalScore: 85.1,
      proposedValue: 520000,
      strengths: "Enterprise experience, solid methodology, good team credentials",
      concerns: "Higher cost, longer timeline"
    }
  ];

  const getVendorById = (id: string) => vendors.find(v => v.id === id);

  const calculateWeightedRanking = () => {
    const vendorScores: Record<string, number> = {};
    
    committeeMembers
      .filter(member => member.status === "completed" && member.ranking.length > 0)
      .forEach(member => {
        member.ranking.forEach((vendorId, index) => {
          const points = (vendors.length - index) * member.weight;
          vendorScores[vendorId] = (vendorScores[vendorId] || 0) + points;
        });
      });

    return Object.entries(vendorScores)
      .sort(([,a], [,b]) => b - a)
      .map(([vendorId]) => vendorId);
  };

  const weightedRanking = calculateWeightedRanking();
  const completedMembers = committeeMembers.filter(m => m.status === "completed").length;
  const totalMembers = committeeMembers.length;
  const progressPercentage = Math.round((completedMembers / totalMembers) * 100);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "status-badge awarded";
      case "pending": return "status-badge draft";
      case "in-progress": return "status-badge active";
      default: return "status-badge draft";
    }
  };

  const getRankPosition = (vendorId: string, ranking: string[]) => {
    return ranking.indexOf(vendorId) + 1;
  };

  const handleFinalizeProcedure = () => {
    if (progressPercentage < 100) {
      toast({ 
        title: "Consensus incomplete", 
        description: "Please wait for all committee members to complete their rankings.",
        variant: "destructive"
      });
      return;
    }
    
    toast({ 
      title: "Consensus finalized", 
      description: "Final ranking has been determined and recorded." 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Phase 8: Final Consensus & Ranking</h1>
          <p className="text-muted-foreground">
            Committee-based evaluation and final vendor ranking decisions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="status-badge active">
            Phase 8 of 10
          </Badge>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="phase-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Consensus Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Committee Completion</span>
            <Badge className={progressPercentage === 100 ? "status-badge awarded" : "status-badge active"}>
              {completedMembers}/{totalMembers} members
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-success" />
              {completedMembers} completed
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-warning" />
              {totalMembers - completedMembers} pending
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              Deadline: February 5, 2025
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Committee Members Status */}
      <Card className="phase-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Committee Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {committeeMembers.map((member) => (
              <Card key={member.id} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        Weight: {member.weight}%
                      </p>
                    </div>
                  </div>
                  
                  {member.status === "completed" && member.ranking.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-xs font-medium">Ranking submitted:</p>
                      <div className="space-y-1">
                        {member.ranking.map((vendorId, index) => {
                          const vendor = getVendorById(vendorId);
                          return (
                            <div key={vendorId} className="flex items-center gap-2 text-sm">
                              <span className="w-4 h-4 bg-muted rounded-full flex items-center justify-center text-xs">
                                {index + 1}
                              </span>
                              <span>{vendor?.name}</span>
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Submitted: {member.submissionDate}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Ranking pending</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Individual Rankings Matrix */}
      <Card className="phase-card">
        <CardHeader>
          <CardTitle>Individual Rankings Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Committee Member</th>
                  <th className="text-left p-3">Weight</th>
                  {vendors.map(vendor => (
                    <th key={vendor.id} className="text-center p-3 min-w-32">
                      {vendor.name}
                    </th>
                  ))}
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {committeeMembers.map((member) => (
                  <tr key={member.id} className="border-b">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{member.weight}%</Badge>
                    </td>
                    {vendors.map(vendor => (
                      <td key={vendor.id} className="p-3 text-center">
                        {member.status === "completed" && member.ranking.length > 0 ? (
                          <div className="flex items-center justify-center">
                            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">
                              {getRankPosition(vendor.id, member.ranking)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    ))}
                    <td className="p-3">
                      <Badge className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Weighted Consensus Results */}
      <Card className="phase-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Weighted Consensus Ranking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {progressPercentage === 100 ? (
            <div className="space-y-4">
              {weightedRanking.map((vendorId, index) => {
                const vendor = getVendorById(vendorId);
                if (!vendor) return null;
                
                return (
                  <Card key={vendorId} className={`border-2 ${index === 0 ? 'border-success' : 'border-border'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {index === 0 && <Trophy className="h-5 w-5 text-yellow-500" />}
                            {index === 1 && <Star className="h-5 w-5 text-gray-400" />}
                            {index === 2 && <Star className="h-5 w-5 text-orange-600" />}
                            <span className="text-2xl font-bold">#{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{vendor.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Score: {vendor.totalScore} | Value: ${vendor.proposedValue.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {index === 0 && (
                          <Badge className="status-badge awarded">
                            Recommended Winner
                          </Badge>
                        )}
                      </div>
                      
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-success mb-1">Strengths:</p>
                          <p className="text-muted-foreground">{vendor.strengths}</p>
                        </div>
                        <div>
                          <p className="font-medium text-warning mb-1">Considerations:</p>
                          <p className="text-muted-foreground">{vendor.concerns}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Awaiting Committee Input</h3>
              <p className="text-muted-foreground">
                Final consensus ranking will be available once all committee members complete their evaluations.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Decision Rationale */}
      <Card className="phase-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Decision Rationale
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Final Decision Notes & Justification
            </label>
            <Textarea
              value={consensusNotes}
              onChange={(e) => setConsensusNotes(e.target.value)}
              placeholder="Document the rationale behind the final ranking decision, key factors considered, and any additional notes for the award process..."
              className="min-h-32"
            />
          </div>
          
          {progressPercentage === 100 && (
            <div className="bg-muted/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Consensus Summary:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Committee reached consensus on vendor ranking</li>
                <li>• All {totalMembers} members completed their evaluations</li>
                <li>• Weighted scoring applied based on role responsibilities</li>
                <li>• Final recommendation ready for award process</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="phase-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/workflow/phase-7">
                Previous: Comparison & Analysis
              </Link>
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                disabled={progressPercentage < 100}
                onClick={handleFinalizeProcedure}
              >
                Finalize Ranking
              </Button>
              <Button 
                className="gradient-primary" 
                disabled={progressPercentage < 100}
                asChild
              >
                <Link to="/workflow/phase-9">
                  Proceed to Award Process
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Phase8Consensus;