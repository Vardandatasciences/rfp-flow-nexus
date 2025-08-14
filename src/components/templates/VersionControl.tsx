import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  History, 
  Download, 
  Eye, 
  RotateCcw, 
  FileText, 
  Clock, 
  User, 
  GitBranch,
  Tag,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TemplateVersion {
  id: string;
  version: string;
  title: string;
  description: string;
  author: string;
  createdDate: string;
  status: 'published' | 'draft' | 'archived';
  changes: string[];
  size: string;
  downloads: number;
  isActive: boolean;
}

interface Draft {
  id: string;
  type: 'template' | 'submission';
  name: string;
  lastSaved: string;
  progress: number;
  author: string;
  changes: number;
}

interface VersionControlProps {
  templateId: string;
  onRestoreVersion: (version: TemplateVersion) => void;
  onRestoreDraft: (draft: Draft) => void;
  onDeleteDraft: (draftId: string) => void;
}

const templateVersions: TemplateVersion[] = [
  {
    id: '1',
    version: '3.2',
    title: 'Cloud Infrastructure RFP Template',
    description: 'Added new security compliance fields and updated evaluation criteria',
    author: 'Sarah Chen',
    createdDate: '2024-01-20',
    status: 'published',
    changes: [
      'Added GDPR compliance fields',
      'Updated security assessment criteria',
      'Modified pricing table structure',
      'Enhanced file upload validation'
    ],
    size: '1.2 MB',
    downloads: 45,
    isActive: true
  },
  {
    id: '2',
    version: '3.1',
    title: 'Cloud Infrastructure RFP Template',
    description: 'Performance improvements and bug fixes',
    author: 'Mike Johnson',
    createdDate: '2024-01-15',
    status: 'archived',
    changes: [
      'Fixed dropdown validation',
      'Improved responsive layout',
      'Updated vendor qualification criteria'
    ],
    size: '1.1 MB',
    downloads: 32,
    isActive: false
  },
  {
    id: '3',
    version: '3.0',
    title: 'Cloud Infrastructure RFP Template',
    description: 'Major revision with new template structure',
    author: 'Alex Rodriguez',
    createdDate: '2024-01-10',
    status: 'archived',
    changes: [
      'Complete template restructure',
      'New evaluation framework',
      'Added timeline components',
      'Enhanced document management'
    ],
    size: '1.0 MB',
    downloads: 28,
    isActive: false
  }
];

const drafts: Draft[] = [
  {
    id: '1',
    type: 'template',
    name: 'Marketing Services RFP Template',
    lastSaved: '2024-01-22T10:30:00Z',
    progress: 75,
    author: 'Emma Davis',
    changes: 12
  },
  {
    id: '2',
    type: 'submission',
    name: 'Cloud Infrastructure Proposal - TechCorp',
    lastSaved: '2024-01-22T09:15:00Z',
    progress: 45,
    author: 'Vendor Portal User',
    changes: 8
  },
  {
    id: '3',
    type: 'template',
    name: 'Professional Services Template (Draft)',
    lastSaved: '2024-01-21T16:45:00Z',
    progress: 30,
    author: 'David Kim',
    changes: 5
  }
];

export default function VersionControl({ 
  templateId, 
  onRestoreVersion, 
  onRestoreDraft, 
  onDeleteDraft 
}: VersionControlProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'versions' | 'drafts'>('versions');
  const [selectedVersion, setSelectedVersion] = useState<TemplateVersion | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'warning';
      case 'archived':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'draft':
        return <Clock className="h-4 w-4" />;
      case 'archived':
        return <FileText className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const handleRestoreVersion = (version: TemplateVersion) => {
    onRestoreVersion(version);
    toast({
      title: "Version Restored",
      description: `Successfully restored to version ${version.version}`,
    });
  };

  const handleRestoreDraft = (draft: Draft) => {
    onRestoreDraft(draft);
    toast({
      title: "Draft Restored",
      description: `Restored ${draft.name} from ${formatTimeAgo(draft.lastSaved)}`,
    });
  };

  const handleDeleteDraft = (draftId: string) => {
    onDeleteDraft(draftId);
    toast({
      title: "Draft Deleted",
      description: "Draft has been permanently deleted",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Version Control</h2>
          <p className="text-muted-foreground">Manage template versions and drafts</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'versions' ? 'default' : 'outline'}
            onClick={() => setActiveTab('versions')}
          >
            <History className="h-4 w-4 mr-2" />
            Version History
          </Button>
          <Button
            variant={activeTab === 'drafts' ? 'default' : 'outline'}
            onClick={() => setActiveTab('drafts')}
          >
            <FileText className="h-4 w-4 mr-2" />
            Drafts
          </Button>
        </div>
      </div>

      {activeTab === 'versions' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Version List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  Template Versions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {templateVersions.map((version, index) => (
                      <div key={version.id}>
                        <div 
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedVersion?.id === version.id 
                              ? 'border-primary bg-primary/5' 
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => setSelectedVersion(version)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="font-mono">
                                  v{version.version}
                                </Badge>
                                <Badge variant={getStatusColor(version.status) as any}>
                                  {getStatusIcon(version.status)}
                                  <span className="ml-1">{version.status}</span>
                                </Badge>
                                {version.isActive && (
                                  <Badge variant="default">
                                    <Tag className="h-3 w-3 mr-1" />
                                    Current
                                  </Badge>
                                )}
                              </div>
                              <h4 className="font-semibold">{version.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {version.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {version.author}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {version.createdDate}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Download className="h-3 w-3" />
                                  {version.downloads} downloads
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                        {index < templateVersions.length - 1 && (
                          <Separator className="my-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Version Details */}
          <div className="lg:col-span-1">
            {selectedVersion ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Version {selectedVersion.version}</span>
                    <Badge variant={getStatusColor(selectedVersion.status) as any}>
                      {selectedVersion.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Changes</h4>
                    <ul className="space-y-1 text-sm">
                      {selectedVersion.changes.map((change, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Author:</span>
                      <span>{selectedVersion.author}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{selectedVersion.createdDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span>{selectedVersion.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Downloads:</span>
                      <span>{selectedVersion.downloads}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        // Preview version logic
                        toast({
                          title: "Preview Mode",
                          description: `Previewing version ${selectedVersion.version}`,
                        });
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Version
                    </Button>
                    <Button 
                      className="w-full"
                      onClick={() => handleRestoreVersion(selectedVersion)}
                      disabled={selectedVersion.isActive}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      {selectedVersion.isActive ? 'Current Version' : 'Restore Version'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <History className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Select a Version</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a version from the list to view details and options
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {activeTab === 'drafts' && (
        <Card>
          <CardHeader>
            <CardTitle>Draft Management</CardTitle>
          </CardHeader>
          <CardContent>
            {drafts.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">No Drafts Found</h3>
                <p className="text-muted-foreground">
                  Your auto-saved drafts will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {drafts.map((draft) => (
                  <Card key={draft.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {draft.type === 'template' ? 'Template' : 'Submission'}
                            </Badge>
                            <h4 className="font-semibold">{draft.name}</h4>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Saved {formatTimeAgo(draft.lastSaved)}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {draft.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {draft.changes} changes
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span>{draft.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all" 
                                style={{ width: `${draft.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRestoreDraft(draft)}
                          >
                            Continue Working
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteDraft(draft.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}