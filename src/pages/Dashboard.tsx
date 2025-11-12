import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Upload, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides] = useState(10); // Mock total slides

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/vnd.ms-powerpoint' || 
          file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
        setUploadedFile(file);
        const url = URL.createObjectURL(file);
        setFileUrl(url);
        setCurrentSlide(1);
        toast({
          title: 'File uploaded',
          description: `${file.name} has been uploaded successfully`,
        });
      } else {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a PowerPoint file (.ppt or .pptx)',
          variant: 'destructive',
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
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
          {uploadedFile && fileUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Presentation Viewer</CardTitle>
                <CardDescription>
                  Slide {currentSlide} of {totalSlides}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Presentation Display Area */}
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-border">
                    <div className="text-center p-8">
                      <p className="text-lg font-medium text-foreground mb-2">
                        Slide {currentSlide}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PowerPoint preview requires additional libraries
                      </p>
                      <p className="text-xs text-muted-foreground mt-4">
                        File: {uploadedFile.name}
                      </p>
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentSlide === 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground min-w-[100px] text-center">
                      {currentSlide} / {totalSlides}
                    </span>
                    <Button
                      variant="outline"
                      onClick={handleNext}
                      disabled={currentSlide === totalSlides}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
