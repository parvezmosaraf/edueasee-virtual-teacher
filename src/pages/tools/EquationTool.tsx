
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { solveEquation, solveEquationFromImage } from '@/utils/geminiApi';
import Button from '@/components/ui/button-custom';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Camera, AlertCircle, ImageIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';

const EquationTool = () => {
  const [equation, setEquation] = useState('');
  const [solution, setSolution] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size and type
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are supported');
      return;
    }

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
      toast.success('Image uploaded successfully');
    };
    reader.onerror = () => toast.error('Failed to read image');
    reader.readAsDataURL(file);
  };

  const handleSolve = async () => {
    if (!equation.trim() && !imageFile) {
      toast.error('Please enter an equation or upload an image');
      return;
    }

    setIsProcessing(true);
    try {
      let result;
      
      if (imageFile) {
        result = await solveEquationFromImage(imageFile);
      } else {
        result = await solveEquation(equation);
      }
      
      setSolution(result);
    } catch (error) {
      console.error('Error solving equation:', error);
      toast.error('Failed to solve equation. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  return (
    <DashboardLayout title="Equation Solver">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Equation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                Type your equation or upload an image
              </label>
              <Input
                type="text"
                className="w-full p-3"
                placeholder="Enter the equation to solve (e.g., 2x + 5 = 15)"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                disabled={!!imagePreview}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {imagePreview ? 'Image uploaded' : 'Or upload an image of your equation'}
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <Button variant="outline" className="flex items-center gap-2" type="button">
                  <ImageIcon size={16} />
                  Upload Image
                </Button>
              </label>
            </div>

            {imagePreview && (
              <div className="relative w-full mt-2">
                <div className="relative rounded-md border border-border overflow-hidden">
                  <img 
                    src={imagePreview} 
                    alt="Equation preview" 
                    className="max-h-64 mx-auto"
                  />
                  <button
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1 rounded-full"
                    title="Remove image"
                  >
                    <span>×</span>
                  </button>
                </div>
                <p className="text-sm text-center mt-2 text-muted-foreground">
                  Image of equation to solve
                </p>
              </div>
            )}

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                For images, make sure the equation is clear and well-lit for best results.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <div className="mb-6 flex justify-center">
          <Button 
            onClick={handleSolve} 
            disabled={isProcessing || (!equation.trim() && !imageFile)}
            isLoading={isProcessing}
          >
            {isProcessing ? 'Solving...' : 'Solve Equation'}
          </Button>
        </div>

        {solution && (
          <Card>
            <CardHeader>
              <CardTitle>Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-md border border-border bg-muted/30">
                <p className="whitespace-pre-line">{solution}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EquationTool;
