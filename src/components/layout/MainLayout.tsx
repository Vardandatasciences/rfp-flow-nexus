import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BarChart3,
  FileText,
  Building2,
  Target,
  FolderOpen,
  Mail,
  TrendingUp,
  Settings,
  HelpCircle,
  Search,
  Bell,
  User,
  Menu,
  ChevronDown,
  Workflow,
} from "lucide-react";

const navigationSections = [
  {
    title: "Dashboard",
    icon: BarChart3,
    path: "/dashboard",
    items: [
      { title: "Overview", path: "/dashboard" },
      { title: "KPIs", path: "/dashboard/kpis" },
      { title: "My RFPs", path: "/dashboard/my-rfps" },
      { title: "Analytics", path: "/dashboard/analytics" },
      { title: "Reports", path: "/dashboard/reports" },
    ],
  },
  {
    title: "RFP Workflow",
    icon: Workflow,
    path: "/workflow",
    items: [
      { title: "All RFPs", path: "/workflow" },
      { title: "Phase 1: Creation", path: "/workflow/phase-1" },
      { title: "Phase 2: Approvals", path: "/workflow/phase-2" },
      { title: "Phase 3: Vendor Selection", path: "/workflow/phase-3" },
      { title: "Phase 4: Distribution", path: "/workflow/phase-4" },
      { title: "Phase 5: Vendor Portal", path: "/workflow/phase-5" },
      { title: "Phase 6: Evaluation", path: "/workflow/phase-6" },
      { title: "Phase 7: Comparison", path: "/workflow/phase-7" },
      { title: "Phase 8: Consensus", path: "/workflow/phase-8" },
      { title: "Phase 9: Award", path: "/workflow/phase-9" },
    ],
  },
  {
    title: "Evaluations",
    icon: Target,
    path: "/evaluations",
    items: [
      { title: "Pending", path: "/evaluations" },
      { title: "Completed", path: "/evaluations/completed" },
      { title: "Consensus", path: "/evaluations/consensus" },
      { title: "Comparisons", path: "/evaluations/comparisons" },
      { title: "Committee Ranking", path: "/evaluations/committee-ranking" },
    ],
  },
  {
    title: "Documents",
    icon: FolderOpen,
    path: "/documents",
    items: [
      { title: "RFP Documents", path: "/documents" },
      { title: "Proposals", path: "/documents/proposals" },
      
      { title: "Templates", path: "/documents/templates" },
    ],
  },
  {
    title: "Communications",
    icon: Mail,
    path: "/communications",
    items: [
      { title: "Notifications", path: "/communications" },
      { title: "Email Templates", path: "/communications/templates" },
      { title: "Message History", path: "/communications/history" },
      { title: "Bulk Messaging", path: "/communications/bulk" },
    ],
  },
  {
    title: "Administration",
    icon: Settings,
    path: "/admin",
    items: [
      { title: "User Management", path: "/admin" },
      { title: "Roles & Permissions", path: "/admin/roles" },
      { title: "System Config", path: "/admin/config" },
      { title: "Audit Logs", path: "/admin/audit" },
      { title: "Integrations", path: "/admin/integrations" },
    ],
  },
  {
    title: "Help",
    icon: HelpCircle,
    path: "/help",
    items: [
      { title: "Documentation", path: "/help" },
      { title: "Tutorials", path: "/help/tutorials" },
      { title: "Support Center", path: "/help/support" },
      { title: "Changelog", path: "/help/changelog" },
    ],
  },
];

export function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveSection = (sectionPath: string) => {
    return location.pathname.startsWith(sectionPath);
  };

  const isActiveItem = (itemPath: string) => {
    return location.pathname === itemPath;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Mobile Menu */}
            <div className="flex items-center gap-4">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="space-y-4 py-4">
                    {navigationSections.map((section) => (
                      <div key={section.title} className="space-y-2">
                        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                          {section.title}
                        </h3>
                        <div className="space-y-1">
                          {section.items.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActiveItem(item.path)
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-accent hover:text-accent-foreground"
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
              
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  RFP Manager
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationSections.map((section) => (
                <DropdownMenu key={section.title}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`flex items-center gap-2 ${
                        isActiveSection(section.path) ? "bg-accent" : ""
                      }`}
                    >
                      <section.icon className="h-4 w-4" />
                      {section.title}
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {section.items.map((item, index) => (
                      <div key={item.path}>
                        <DropdownMenuItem asChild>
                          <Link
                            to={item.path}
                            className={`w-full ${
                              isActiveItem(item.path) ? "bg-accent" : ""
                            }`}
                          >
                            {item.title}
                          </Link>
                        </DropdownMenuItem>
                        {index === 0 && section.title === "RFP Workflow" && (
                          <DropdownMenuSeparator />
                        )}
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Global Search */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search RFPs, vendors..."
                  className="pl-10 w-64"
                />
              </div>

              {/* Notifications */}
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">John Doe</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>My RFPs</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}