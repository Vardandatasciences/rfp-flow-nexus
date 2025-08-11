import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import RFPWorkflow from "./pages/RFPWorkflow";
import Phase1Creation from "./pages/workflow/Phase1Creation";
import Phase2Approval from "./pages/workflow/Phase2Approval";
import Phase3VendorSelection from "./pages/workflow/Phase3VendorSelection";
import Phase4URLGeneration from "./pages/workflow/Phase4URLGeneration";
import Phase5VendorPortal from "./pages/workflow/Phase5VendorPortal";
import Phase6Evaluation from "./pages/workflow/Phase6Evaluation";
import Phase7Comparison from "./pages/workflow/Phase7Comparison";
import Phase8Consensus from "./pages/workflow/Phase8Consensus";
import Phase9Award from "./pages/workflow/Phase9Award";

// Evaluation Pages
import PendingEvaluations from "./pages/evaluations/Pending";
import CompletedEvaluations from "./pages/evaluations/Completed";
import EvaluationConsensus from "./pages/evaluations/Consensus";
import EvaluationComparisons from "./pages/evaluations/Comparisons";

// Document Pages
import RFPDocuments from "./pages/documents/RFPDocuments";
import Proposals from "./pages/documents/Proposals";

import Templates from "./pages/documents/Templates";

// Communication Pages
import Notifications from "./pages/communications/Notifications";
import EmailTemplates from "./pages/communications/EmailTemplates";
import MessageHistory from "./pages/communications/MessageHistory";
import BulkMessaging from "./pages/communications/BulkMessaging";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/*" element={<Dashboard />} />
            <Route path="workflow" element={<RFPWorkflow />} />
            <Route path="workflow/phase-1" element={<Phase1Creation />} />
            <Route path="workflow/phase-2" element={<Phase2Approval />} />
            <Route path="workflow/phase-3" element={<Phase3VendorSelection />} />
            <Route path="workflow/phase-4" element={<Phase4URLGeneration />} />
            <Route path="workflow/phase-5" element={<Phase5VendorPortal />} />
            <Route path="workflow/phase-6" element={<Phase6Evaluation />} />
            <Route path="workflow/phase-7" element={<Phase7Comparison />} />
            <Route path="workflow/phase-8" element={<Phase8Consensus />} />
            <Route path="workflow/phase-9" element={<Phase9Award />} />
            <Route path="workflow/phase-:phase" element={<RFPWorkflow />} />
            
            {/* Evaluation Routes */}
            <Route path="evaluations" element={<PendingEvaluations />} />
            <Route path="evaluations/pending" element={<PendingEvaluations />} />
            <Route path="evaluations/completed" element={<CompletedEvaluations />} />
            <Route path="evaluations/consensus" element={<EvaluationConsensus />} />
            <Route path="evaluations/comparisons" element={<EvaluationComparisons />} />
            
            {/* Document Routes */}
            <Route path="documents" element={<RFPDocuments />} />
            <Route path="documents/rfp" element={<RFPDocuments />} />
            <Route path="documents/proposals" element={<Proposals />} />
            
            <Route path="documents/templates" element={<Templates />} />
            
            {/* Communication Routes */}
            <Route path="communications" element={<Notifications />} />
            <Route path="communications/notifications" element={<Notifications />} />
            <Route path="communications/templates" element={<EmailTemplates />} />
            <Route path="communications/history" element={<MessageHistory />} />
            <Route path="communications/bulk" element={<BulkMessaging />} />
            <Route path="admin" element={<Dashboard />} />
            <Route path="admin/*" element={<Dashboard />} />
            <Route path="help" element={<Dashboard />} />
            <Route path="help/*" element={<Dashboard />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
