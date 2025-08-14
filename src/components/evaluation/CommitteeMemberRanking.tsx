import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Save, Eye, Star, TrendingUp, Award } from 'lucide-react';
import { toast } from 'sonner';

interface Vendor {
  id: string;
  name: string;
  logo: string;
  overallScore: number;
  technicalScore: number;
  commercialScore: number;
  highlights: string[];
  proposalSummary: string;
  strengths: string[];
  concerns: string[];
}

interface VendorRanking extends Vendor {
  rank: number;
  comments: string;
}

const CommitteeMemberRanking: React.FC = () => {
  const [vendors, setVendors] = useState<VendorRanking[]>([
    {
      id: '1',
      name: 'TechCorp Solutions',
      logo: '/placeholder.svg',
      overallScore: 89,
      technicalScore: 92,
      commercialScore: 86,
      highlights: ['AI-powered analytics', '24/7 support', 'ISO 27001 certified'],
      proposalSummary: 'Comprehensive cloud-based solution with advanced AI capabilities and robust security features.',
      strengths: ['Strong technical architecture', 'Proven track record', 'Competitive pricing'],
      concerns: ['Limited local presence', 'Complex integration process'],
      rank: 1,
      comments: ''
    },
    {
      id: '2',
      name: 'DataFlow Systems',
      logo: '/placeholder.svg',
      overallScore: 85,
      technicalScore: 88,
      commercialScore: 82,
      highlights: ['Real-time processing', 'Scalable architecture', 'Custom dashboards'],
      proposalSummary: 'Innovative data processing platform with exceptional scalability and customization options.',
      strengths: ['Excellent performance', 'Flexible customization', 'Strong development team'],
      concerns: ['Higher implementation cost', 'Newer market player'],
      rank: 2,
      comments: ''
    },
    {
      id: '3',
      name: 'SecureNet Technologies',
      logo: '/placeholder.svg',
      overallScore: 82,
      technicalScore: 85,
      commercialScore: 79,
      highlights: ['Advanced security', 'Compliance ready', 'Global infrastructure'],
      proposalSummary: 'Security-first approach with comprehensive compliance features and global deployment capabilities.',
      strengths: ['Top-tier security', 'Compliance expertise', 'Global reach'],
      concerns: ['Limited customization', 'Higher ongoing costs'],
      rank: 3,
      comments: ''
    },
    {
      id: '4',
      name: 'InnovateLab Inc',
      logo: '/placeholder.svg',
      overallScore: 78,
      technicalScore: 80,
      commercialScore: 76,
      highlights: ['Cutting-edge UI/UX', 'Mobile-first design', 'Agile methodology'],
      proposalSummary: 'Modern, user-centric solution with emphasis on design and user experience.',
      strengths: ['Exceptional UX', 'Modern technology stack', 'Agile approach'],
      concerns: ['Smaller company size', 'Limited enterprise experience'],
      rank: 4,
      comments: ''
    }
  ]);

  const [selectedVendor, setSelectedVendor] = useState<VendorRanking | null>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(vendors);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update ranks based on new order
    const updatedItems = items.map((item, index) => ({
      ...item,
      rank: index + 1
    }));

    setVendors(updatedItems);
  };

  const updateComments = (vendorId: string, comments: string) => {
    setVendors(prev => prev.map(vendor => 
      vendor.id === vendorId ? { ...vendor, comments } : vendor
    ));
  };

  const saveRanking = () => {
    toast.success('Ranking saved successfully!');
    console.log('Saved ranking:', vendors);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Award className="h-5 w-5 text-yellow-500" />;
      case 2: return <Star className="h-5 w-5 text-gray-400" />;
      case 3: return <TrendingUp className="h-5 w-5 text-orange-500" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vendor Ranking</h1>
          <p className="text-muted-foreground mt-2">
            Drag and drop vendors to rank them according to your preference. Add comments to explain your reasoning.
          </p>
        </div>
        <Button onClick={saveRanking} className="gap-2">
          <Save className="h-4 w-4" />
          Save My Ranking
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="vendors">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {vendors.map((vendor, index) => (
                    <Draggable key={vendor.id} draggableId={vendor.id} index={index}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`transition-all duration-200 ${
                            snapshot.isDragging ? 'shadow-lg scale-105' : 'hover:shadow-md'
                          }`}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="flex flex-col items-center gap-2">
                                {getRankIcon(vendor.rank)}
                                <Badge variant={vendor.rank <= 3 ? 'default' : 'secondary'}>
                                  Rank {vendor.rank}
                                </Badge>
                              </div>
                              
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={vendor.logo} alt={vendor.name} />
                                <AvatarFallback>{vendor.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              
                              <div className="flex-1 space-y-3">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-xl font-semibold">{vendor.name}</h3>
                                  <div className="flex items-center gap-4">
                                    <div className="text-right">
                                      <div className={`text-2xl font-bold ${getScoreColor(vendor.overallScore)}`}>
                                        {vendor.overallScore}
                                      </div>
                                      <div className="text-sm text-muted-foreground">Overall Score</div>
                                    </div>
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" className="gap-2">
                                          <Eye className="h-4 w-4" />
                                          View Details
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="max-w-2xl">
                                        <DialogHeader>
                                          <DialogTitle className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                              <AvatarImage src={vendor.logo} alt={vendor.name} />
                                              <AvatarFallback>{vendor.name.substring(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            {vendor.name} - Proposal Summary
                                          </DialogTitle>
                                        </DialogHeader>
                                        <ScrollArea className="max-h-96">
                                          <div className="space-y-4">
                                            <div>
                                              <h4 className="font-semibold mb-2">Proposal Summary</h4>
                                              <p className="text-muted-foreground">{vendor.proposalSummary}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                              <div>
                                                <h4 className="font-semibold mb-2 text-green-600">Strengths</h4>
                                                <ul className="space-y-1">
                                                  {vendor.strengths.map((strength, idx) => (
                                                    <li key={idx} className="text-sm">• {strength}</li>
                                                  ))}
                                                </ul>
                                              </div>
                                              <div>
                                                <h4 className="font-semibold mb-2 text-orange-600">Concerns</h4>
                                                <ul className="space-y-1">
                                                  {vendor.concerns.map((concern, idx) => (
                                                    <li key={idx} className="text-sm">• {concern}</li>
                                                  ))}
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        </ScrollArea>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <div className="text-sm text-muted-foreground">Technical Score</div>
                                    <div className={`font-semibold ${getScoreColor(vendor.technicalScore)}`}>
                                      {vendor.technicalScore}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-muted-foreground">Commercial Score</div>
                                    <div className={`font-semibold ${getScoreColor(vendor.commercialScore)}`}>
                                      {vendor.commercialScore}
                                    </div>
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="text-sm text-muted-foreground mb-2">Key Highlights</div>
                                  <div className="flex flex-wrap gap-2">
                                    {vendor.highlights.map((highlight, idx) => (
                                      <Badge key={idx} variant="outline">{highlight}</Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ranking Comments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {vendors.map((vendor) => (
                <div key={vendor.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={vendor.rank <= 3 ? 'default' : 'secondary'}>
                      #{vendor.rank}
                    </Badge>
                    <span className="font-medium text-sm">{vendor.name}</span>
                  </div>
                  <Textarea
                    placeholder={`Why do you rank ${vendor.name} at position ${vendor.rank}?`}
                    value={vendor.comments}
                    onChange={(e) => updateComments(vendor.id, e.target.value)}
                    className="min-h-20 text-sm"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CommitteeMemberRanking;