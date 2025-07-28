import { useState } from "react";
import { Search, Plus, Upload, Download, Eye, Edit, Trash2, File, Folder, Calendar, User, Star, Filter, Grid, List, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const rfpDocuments = [
  {
    id: 1,
    title: "Cloud Infrastructure RFP 2024",
    type: "RFP",
    version: "3.2",
    status: "Published",
    lastModified: "2024-01-22",
    author: "Sarah Chen",
    size: "2.4 MB",
    downloads: 47,
    responses: 12,
    folder: "Technology RFPs"
  },
  {
    id: 2,
    title: "Marketing Services RFP",
    type: "RFP",
    version: "1.5",
    status: "Draft",
    lastModified: "2024-01-20",
    author: "Mike Johnson",
    size: "1.8 MB",
    downloads: 8,
    responses: 0,
    folder: "Marketing RFPs"
  },
  {
    id: 3,
    title: "Software Development Template",
    type: "Template",
    version: "2.1",
    status: "Active",
    lastModified: "2024-01-18",
    author: "Alex Rodriguez",
    size: "950 KB",
    downloads: 156,
    responses: null,
    folder: "Templates"
  },
  {
    id: 4,
    title: "Legal Services RFP 2024",
    type: "RFP",
    version: "1.0",
    status: "In Review",
    lastModified: "2024-01-15",
    author: "Emma Davis",
    size: "3.1 MB",
    downloads: 23,
    responses: 8,
    folder: "Professional Services"
  }
];

const folders = [
  { name: "Technology RFPs", count: 12, color: "bg-blue-500" },
  { name: "Marketing RFPs", count: 8, color: "bg-green-500" },
  { name: "Professional Services", count: 15, color: "bg-purple-500" },
  { name: "Templates", count: 25, color: "bg-orange-500" },
  { name: "Archive", count: 43, color: "bg-gray-500" }
];

export default function RFPDocuments() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "success";
      case "Draft": return "warning";
      case "In Review": return "info";
      case "Active": return "success";
      default: return "secondary";
    }
  };

  const filteredDocuments = selectedFolder 
    ? rfpDocuments.filter(doc => doc.folder === selectedFolder)
    : rfpDocuments;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">RFP Documents</h1>
          <p className="text-muted-foreground">Manage RFP documents, templates, and versions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Document
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">24</div>
            <p className="text-sm text-muted-foreground">Total Documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">12</div>
            <p className="text-sm text-muted-foreground">Published RFPs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">6</div>
            <p className="text-sm text-muted-foreground">In Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-info">234</div>
            <p className="text-sm text-muted-foreground">Total Downloads</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Folders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={selectedFolder === null ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedFolder(null)}
              >
                <Folder className="h-4 w-4 mr-2" />
                All Documents
              </Button>
              {folders.map((folder) => (
                <Button
                  key={folder.name}
                  variant={selectedFolder === folder.name ? "secondary" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => setSelectedFolder(folder.name)}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${folder.color}`} />
                    {folder.name}
                  </div>
                  <Badge variant="outline">{folder.count}</Badge>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="rfp">RFP</SelectItem>
                  <SelectItem value="template">Template</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <File className="h-5 w-5 text-primary" />
                        <Badge variant={getStatusColor(doc.status) as any}>
                          {doc.status}
                        </Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{doc.title}</h3>
                      <p className="text-sm text-muted-foreground">Version {doc.version}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Author:</span>
                        <p className="font-medium">{doc.author}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Size:</span>
                        <p className="font-medium">{doc.size}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Downloads:</span>
                        <p className="font-medium">{doc.downloads}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Modified:</span>
                        <p className="font-medium">{doc.lastModified}</p>
                      </div>
                    </div>
                    {doc.responses !== null && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Responses: {doc.responses}</span>
                          <span>Expected: 15</span>
                        </div>
                        <Progress value={(doc.responses / 15) * 100} className="h-2" />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Modified</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{doc.title}</div>
                          <div className="text-sm text-muted-foreground">Version {doc.version}</div>
                        </div>
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(doc.status) as any}>
                          {doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{doc.author}</TableCell>
                      <TableCell>{doc.lastModified}</TableCell>
                      <TableCell>{doc.downloads}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}