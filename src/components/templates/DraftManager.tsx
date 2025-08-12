import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Clock, 
  Trash2, 
  Play, 
  Save,
  AlertCircle 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Draft {
  id: string;
  type: 'rfp' | 'template';
  name: string;
  lastSaved: Date;
  progress: number;
  data: any;
}

interface DraftManagerProps {
  onRestoreDraft: (draft: Draft) => void;
  onDeleteDraft: (draftId: string) => void;
}

export default function DraftManager({ onRestoreDraft, onDeleteDraft }: DraftManagerProps) {
  const { toast } = useToast();
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = () => {
    const allDrafts: Draft[] = [];
    
    // Load from localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('rfp_draft_') || key?.startsWith('template_draft_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          const type = key.startsWith('rfp_draft_') ? 'rfp' : 'template';
          const id = key.replace(/^(rfp|template)_draft_/, '');
          
          // Calculate progress based on filled fields
          let progress = 0;
          if (type === 'rfp') {
            const fields = ['title', 'description', 'type', 'category'];
            const filledFields = fields.filter(field => data[field]?.trim()).length;
            progress = Math.round((filledFields / fields.length) * 100);
          } else {
            const hasName = data.name?.trim();
            const hasFields = data.fields?.length > 0;
            const hasCriteria = data.evaluationCriteria?.length > 0;
            progress = Math.round(((+hasName + +hasFields + +hasCriteria) / 3) * 100);
          }

          allDrafts.push({
            id,
            type,
            name: data.name || data.title || `Untitled ${type === 'rfp' ? 'RFP' : 'Template'}`,
            lastSaved: new Date(data.lastSaved || Date.now()),
            progress,
            data
          });
        } catch (error) {
          console.error('Error loading draft:', error);
        }
      }
    }

    // Sort by last saved date
    allDrafts.sort((a, b) => b.lastSaved.getTime() - a.lastSaved.getTime());
    setDrafts(allDrafts);
  };

  const handleRestoreDraft = (draft: Draft) => {
    onRestoreDraft(draft);
    toast({
      title: "Draft Restored",
      description: `Your ${draft.type === 'rfp' ? 'RFP' : 'template'} draft has been restored.`,
    });
  };

  const handleDeleteDraft = (draft: Draft) => {
    const key = `${draft.type}_draft_${draft.id}`;
    localStorage.removeItem(key);
    onDeleteDraft(draft.id);
    loadDrafts();
    
    toast({
      title: "Draft Deleted",
      description: `The ${draft.type === 'rfp' ? 'RFP' : 'template'} draft has been deleted.`,
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (drafts.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No Drafts Found</h3>
          <p className="text-muted-foreground">
            Your drafts will appear here as you work on RFPs and templates.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="h-5 w-5 text-warning" />
        <span className="text-sm text-muted-foreground">
          {drafts.length} draft{drafts.length !== 1 ? 's' : ''} available for recovery
        </span>
      </div>

      {drafts.map((draft) => (
        <Card key={`${draft.type}_${draft.id}`} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={draft.type === 'rfp' ? 'default' : 'secondary'}>
                  {draft.type === 'rfp' ? 'RFP' : 'Template'}
                </Badge>
                <h3 className="font-medium">{draft.name}</h3>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {formatTimeAgo(draft.lastSaved)}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{draft.progress}%</span>
              </div>
              <Progress value={draft.progress} className="h-2" />
            </div>

            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={() => handleRestoreDraft(draft)}
              >
                <Play className="h-4 w-4 mr-2" />
                Continue Working
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteDraft(draft)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              Last saved: {draft.lastSaved.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}