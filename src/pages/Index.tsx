import { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { MonumentDetails } from '@/components/MonumentDetails';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Landmark, Building2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [monumentData, setMonumentData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleImageSelect = (imageData: string) => {
    setSelectedImage(imageData);
    setMonumentData(null);
  };

  const analyzeMonument = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select an image first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('identify-monument', {
        body: { image: selectedImage },
      });

      if (error) {
        console.error('Error identifying monument:', error);
        toast({
          title: "Identification Failed",
          description: error.message || "Failed to identify the monument. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setMonumentData(data);
      toast({
        title: "Monument Identified!",
        description: "Historical information has been retrieved successfully.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setSelectedImage(null);
    setMonumentData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-6 shadow-elegant">
          <Landmark className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
          Monument<span className="text-bronze">Lens</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Discover the rich history and architectural significance of monuments worldwide through advanced AI-powered image recognition
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Upload Section */}
          <ImageUpload 
            onImageSelect={handleImageSelect} 
            disabled={isAnalyzing}
          />

          {/* Action Button */}
          {selectedImage && !monumentData && (
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={analyzeMonument}
                disabled={isAnalyzing}
                className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6 shadow-elegant"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Monument...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Identify Monument
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Results */}
          {monumentData && (
            <div className="space-y-6">
              <MonumentDetails data={monumentData} />
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={reset}
                  className="shadow-soft"
                >
                  Analyze Another Monument
                </Button>
              </div>
            </div>
          )}

          {/* Features */}
          {!monumentData && !selectedImage && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="text-center p-6 space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bronze/10">
                  <Sparkles className="h-6 w-6 text-bronze" />
                </div>
                <h3 className="font-semibold text-foreground">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced vision AI identifies monuments with high accuracy
                </p>
              </div>
              <div className="text-center p-6 space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bronze/10">
                  <Building2 className="h-6 w-6 text-bronze" />
                </div>
                <h3 className="font-semibold text-foreground">Rich Details</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive historical and architectural information
                </p>
              </div>
              <div className="text-center p-6 space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bronze/10">
                  <Landmark className="h-6 w-6 text-bronze" />
                </div>
                <h3 className="font-semibold text-foreground">Global Coverage</h3>
                <p className="text-sm text-muted-foreground">
                  Monuments from around the world, ancient to modern
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground border-t">
        <p>Powered by AI • Preserving Historical Knowledge</p>
      </footer>
    </div>
  );
};

export default Index;
