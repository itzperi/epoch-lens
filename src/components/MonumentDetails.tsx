import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, User, Calendar, Building2, Star } from 'lucide-react';

interface MonumentData {
  name: string;
  location?: string;
  builder?: string;
  year?: string;
  style?: string;
  significance?: string;
  features?: string[];
  description?: string;
  confidence?: 'high' | 'medium' | 'low';
}

interface MonumentDetailsProps {
  data: MonumentData;
}

export const MonumentDetails = ({ data }: MonumentDetailsProps) => {
  const confidenceColor = {
    high: 'bg-green-500',
    medium: 'bg-yellow-500',
    low: 'bg-orange-500',
  };

  return (
    <Card className="p-8 shadow-elegant animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h2 className="text-3xl font-bold text-foreground">{data.name}</h2>
            {data.confidence && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <div className={`h-2 w-2 rounded-full ${confidenceColor[data.confidence]}`} />
                {data.confidence} confidence
              </Badge>
            )}
          </div>
          
          {data.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{data.location}</span>
            </div>
          )}
        </div>

        {/* Key Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.builder && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <User className="h-5 w-5 text-bronze mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Builder</p>
                <p className="text-foreground font-medium">{data.builder}</p>
              </div>
            </div>
          )}

          {data.year && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <Calendar className="h-5 w-5 text-bronze mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Year Built</p>
                <p className="text-foreground font-medium">{data.year}</p>
              </div>
            </div>
          )}

          {data.style && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <Building2 className="h-5 w-5 text-bronze mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Architectural Style</p>
                <p className="text-foreground font-medium">{data.style}</p>
              </div>
            </div>
          )}

          {data.significance && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <Star className="h-5 w-5 text-bronze mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Significance</p>
                <p className="text-foreground font-medium">{data.significance}</p>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        {data.features && data.features.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Key Features</h3>
            <div className="flex flex-wrap gap-2">
              {data.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {data.description && (
          <div className="space-y-3 pt-4 border-t">
            <h3 className="text-lg font-semibold text-foreground">Detailed Information</h3>
            <p className="text-muted-foreground leading-relaxed">{data.description}</p>
          </div>
        )}
      </div>
    </Card>
  );
};
