import { useState, useRef } from 'react';
import { Upload, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ImageUploadProps {
  onImageSelect: (imageData: string) => void;
  disabled?: boolean;
}

export const ImageUpload = ({ onImageSelect, disabled }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageSelect(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="p-8 border-2 border-dashed border-stone hover:border-primary transition-all duration-300 hover:shadow-elegant">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      
      {preview ? (
        <div className="space-y-4">
          <img
            src={preview}
            alt="Monument preview"
            className="w-full h-64 object-cover rounded-lg shadow-soft"
          />
          <Button
            onClick={handleUploadClick}
            variant="outline"
            className="w-full"
            disabled={disabled}
          >
            <Upload className="mr-2 h-4 w-4" />
            Choose Different Image
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="p-6 rounded-full bg-gradient-primary">
            <Camera className="h-12 w-12 text-primary-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              Upload Monument Image
            </h3>
            <p className="text-muted-foreground max-w-sm">
              Take a photo or upload an image of any monument to discover its rich history and architectural details
            </p>
          </div>
          <Button
            onClick={handleUploadClick}
            size="lg"
            disabled={disabled}
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <Upload className="mr-2 h-5 w-5" />
            Select Image
          </Button>
        </div>
      )}
    </Card>
  );
};
