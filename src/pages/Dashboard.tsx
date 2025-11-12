import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Upload, ChevronLeft, ChevronRight, LogOut, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { init } from 'pptx-preview';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const pptxViewerRef = useRef<any>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
  };

  useEffect(() => {
    // Initialize pptx-preview when component mounts
    if (viewerRef.current && !pptxViewerRef.current) {
      pptxViewerRef.current = init(viewerRef.current, {
        width: viewerRef.current.clientWidth || 800,
        height: viewerRef.current.clientHeight || 450,
      });
    }
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/vnd.openxmlformats-officedocument.presentationml.presentation' &&
        file.type !== 'application/vnd.ms-powerpoint') {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PowerPoint file (.ppt or .pptx)',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setUploadedFile(file);

    try {
      // Read file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // Initialize viewer if not already done
      if (viewerRef.current && !pptxViewerRef.current) {
        pptxViewerRef.current = init(viewerRef.current, {
          width: viewerRef.current.clientWidth || 800,
          height: viewerRef.current.clientHeight || 450,
        });
      }

      // Preview the PPTX file
      if (pptxViewerRef.current) {
        await pptxViewerRef.current.preview(arrayBuffer);
        toast({
          title: 'File loaded',
          description: `${file.name} is ready to view`,
        });
      }
    } catch (error) {
      console.error('Error loading PPTX:', error);
      toast({
        title: 'Error loading file',
        description: 'Failed to load the PowerPoint file. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Presentation</CardTitle>
              <CardDescription>Upload a PowerPoint file to view and navigate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  id="file-upload"
                  accept=".ppt,.pptx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="file-upload">
                  <Button asChild>
                    <span className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload PPT
                    </span>
                  </Button>
                </label>
                {uploadedFile && (
                  <span className="text-sm text-muted-foreground">
                    {uploadedFile.name}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Viewer Section */}
          {uploadedFile && (
            <Card>
              <CardHeader>
                <CardTitle>Presentation Viewer</CardTitle>
                <CardDescription>
                  {uploadedFile.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-border">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Loading presentation...</p>
                    </div>
                  </div>
                ) : (
                  <div 
                    ref={viewerRef}
                    className="w-full aspect-video bg-muted rounded-lg border-2 border-border overflow-hidden"
                    style={{ minHeight: '450px' }}
                  />
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
