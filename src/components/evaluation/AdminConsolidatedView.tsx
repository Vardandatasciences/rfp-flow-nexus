import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Search, Filter, Award, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  department: string;
}

interface VendorRanking {
  vendorId: string;
  memberId: string;
  rank: number;
  comments: string;
}

interface ConsolidatedVendor {
  id: string;
  name: string;
  logo: string;
  overallScore: number;
  finalRank: number;
  averageRank: number;
  memberRankings: { [memberId: string]: { rank: number; comments: string } };
  totalVotes: number;
}

const AdminConsolidatedView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<string>('all');
  const [selectedRank, setSelectedRank] = useState<string>('all');

  const committeeMembers: CommitteeMember[] = [
    { id: '1', name: 'Sarah Johnson', role: 'Technical Lead', department: 'IT' },
    { id: '2', name: 'Michael Chen', role: 'Procurement Manager', department: 'Finance' },
    { id: '3', name: 'Emily Rodriguez', role: 'Security Officer', department: 'Security' },
    { id: '4', name: 'David Kim', role: 'Business Analyst', department: 'Operations' },
    { id: '5', name: 'Jennifer Wilson', role: 'Legal Counsel', department: 'Legal' }
  ];

  const consolidatedData: ConsolidatedVendor[] = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      logo: '/placeholder.svg',
      overallScore: 89,
      finalRank: 1,
      averageRank: 1.4,
      memberRankings: {
        '1': { rank: 1, comments: 'Excellent technical architecture and proven track record.' },
        '2': { rank: 2, comments: 'Competitive pricing with good value proposition.' },
        '3': { rank: 1, comments: 'Strong security features and compliance capabilities.' },
        '4': { rank: 1, comments: 'Best fit for our business requirements and scalability needs.' },
        '5': { rank: 2, comments: 'Solid contract terms with reasonable risk allocation.' }
      },
      totalVotes: 5
    },
    {
      id: '2',
      name: 'DataFlow Systems',
      logo: '/placeholder.svg',
      overallScore: 85,
      finalRank: 2,
      averageRank: 2.2,
      memberRankings: {
        '1': { rank: 2, comments: 'Good technical solution but integration complexity concerns.' },
        '2': { rank: 1, comments: 'Most cost-effective solution with excellent ROI.' },
        '3': { rank: 3, comments: 'Adequate security but needs additional compliance work.' },
        '4': { rank: 2, comments: 'Strong performance capabilities with good customization options.' },
        '5': { rank: 3, comments: 'Contract terms are acceptable but could be improved.' }
      },
      totalVotes: 5
    },
    {
      id: '3',
      name: 'SecureNet Technologies',
      logo: '/placeholder.svg',
      overallScore: 82,
      finalRank: 3,
      averageRank: 2.8,
      memberRankings: {
        '1': { rank: 3, comments: 'Security-focused but limited technical flexibility.' },
        '2': { rank: 4, comments: 'Higher cost but justified by security features.' },
        '3': { rank: 2, comments: 'Outstanding security and compliance capabilities.' },
        '4': { rank: 3, comments: 'Good for compliance but limited business agility.' },
        '5': { rank: 2, comments: 'Excellent liability protection and risk management.' }
      },
      totalVotes: 5
    },
    {
      id: '4',
      name: 'InnovateLab Inc',
      logo: '/placeholder.svg',
      overallScore: 78,
      finalRank: 4,
      averageRank: 3.6,
      memberRankings: {
        '1': { rank: 4, comments: 'Modern approach but concerns about enterprise scalability.' },
        '2': { rank: 3, comments: 'Reasonable pricing but higher implementation costs.' },
        '3': { rank: 4, comments: 'Limited security track record for enterprise deployments.' },
        '4': { rank: 4, comments: 'Great UX but may not meet all business requirements.' },
        '5': { rank: 3, comments: 'Standard contract terms but limited liability coverage.' }
      },
      totalVotes: 5
    }
  ];

  const filteredData = consolidatedData.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(vendor.memberRankings).some(ranking => 
        ranking.comments.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesMember = selectedMember === 'all' || vendor.memberRankings[selectedMember];
    const matchesRank = selectedRank === 'all' || vendor.finalRank.toString() === selectedRank;
    
    return matchesSearch && matchesMember && matchesRank;
  });

  const exportResults = () => {
    toast.success('Results exported successfully!');
    console.log('Exporting results:', consolidatedData);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Award className="h-4 w-4 text-yellow-500" />;
      case 2: return <TrendingUp className="h-4 w-4 text-gray-400" />;
      case 3: return <BarChart3 className="h-4 w-4 text-orange-500" />;
      default: return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    switch (rank) {
      case 1: return 'default';
      case 2: return 'secondary';
      case 3: return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Consolidated Rankings</h1>
          <p className="text-muted-foreground mt-2">
            Review and analyze committee member rankings for all vendors
          </p>
        </div>
        <Button onClick={exportResults} className="gap-2">
          <Download className="h-4 w-4" />
          Export Results
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{committeeMembers.length}</div>
                <div className="text-sm text-muted-foreground">Committee Members</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{consolidatedData.length}</div>
                <div className="text-sm text-muted-foreground">Vendors Evaluated</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">{consolidatedData[0]?.name}</div>
                <div className="text-sm text-muted-foreground">Top Ranked Vendor</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">{consolidatedData[0]?.averageRank.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">Avg. Top Rank</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors or comments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                {committeeMembers.map(member => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedRank} onValueChange={setSelectedRank}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by rank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ranks</SelectItem>
                <SelectItem value="1">Rank 1</SelectItem>
                <SelectItem value="2">Rank 2</SelectItem>
                <SelectItem value="3">Rank 3</SelectItem>
                <SelectItem value="4">Rank 4</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="consolidated" className="space-y-4">
        <TabsList>
          <TabsTrigger value="consolidated">Consolidated View</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Rankings</TabsTrigger>
          <TabsTrigger value="comments">Comments Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="consolidated">
          <Card>
            <CardHeader>
              <CardTitle>Final Vendor Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Final Rank</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Average Rank</TableHead>
                    <TableHead>Overall Score</TableHead>
                    <TableHead>Committee Consensus</TableHead>
                    <TableHead>Individual Rankings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getRankIcon(vendor.finalRank)}
                          <Badge variant={getRankBadgeVariant(vendor.finalRank)}>
                            #{vendor.finalRank}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={vendor.logo} alt={vendor.name} />
                            <AvatarFallback>{vendor.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{vendor.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-lg font-semibold">{vendor.averageRank.toFixed(1)}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-sm">
                          {vendor.overallScore}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {vendor.totalVotes}/{committeeMembers.length} members ranked
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {Object.entries(vendor.memberRankings).map(([memberId, ranking]) => (
                            <Badge key={memberId} variant="outline" className="text-xs">
                              {ranking.rank}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Member Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    {committeeMembers.map(member => (
                      <TableHead key={member.id} className="text-center">
                        <div>{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                      </TableHead>
                    ))}
                    <TableHead className="text-center">Avg. Rank</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={vendor.logo} alt={vendor.name} />
                            <AvatarFallback>{vendor.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{vendor.name}</span>
                        </div>
                      </TableCell>
                      {committeeMembers.map(member => (
                        <TableCell key={member.id} className="text-center">
                          {vendor.memberRankings[member.id] ? (
                            <Badge variant={getRankBadgeVariant(vendor.memberRankings[member.id].rank)}>
                              #{vendor.memberRankings[member.id].rank}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                      ))}
                      <TableCell className="text-center">
                        <span className="text-lg font-semibold">{vendor.averageRank.toFixed(1)}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comments">
          <div className="space-y-4">
            {filteredData.map((vendor) => (
              <Card key={vendor.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={vendor.logo} alt={vendor.name} />
                      <AvatarFallback>{vendor.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    {vendor.name}
                    <Badge variant={getRankBadgeVariant(vendor.finalRank)}>
                      Final Rank #{vendor.finalRank}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(vendor.memberRankings).map(([memberId, ranking]) => {
                      const member = committeeMembers.find(m => m.id === memberId);
                      return (
                        <div key={memberId} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-medium">{member?.name}</div>
                              <div className="text-sm text-muted-foreground">{member?.role}</div>
                            </div>
                            <Badge variant={getRankBadgeVariant(ranking.rank)}>
                              Rank #{ranking.rank}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{ranking.comments}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminConsolidatedView;