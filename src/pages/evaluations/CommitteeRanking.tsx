import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Users, Shield } from 'lucide-react';
import CommitteeMemberRanking from '@/components/evaluation/CommitteeMemberRanking';
import AdminConsolidatedView from '@/components/evaluation/AdminConsolidatedView';

const CommitteeRanking: React.FC = () => {
  const [userRole] = useState<'member' | 'admin'>('member'); // This would come from auth context

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {userRole === 'admin' ? (
          <AdminConsolidatedView />
        ) : (
          <CommitteeMemberRanking />
        )}
      </div>
    </div>
  );
};

export default CommitteeRanking;