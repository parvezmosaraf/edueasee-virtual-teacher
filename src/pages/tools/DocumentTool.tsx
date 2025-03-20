import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { analyzeDocument } from '@/utils/geminiApi';
import Button from '@/components/ui/button-custom';
import { Upload, FileType, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DocumentTool = () => {
  const [documentText, setDocumentText] = useState('');
  const [analysis, setAnalysis] = useState<{
    summary: string;
    keyPoints: string[];
    topics: string[];
    suggestions: string[];
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    // Handle different file types
    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setDocumentText(text);
        setFileUploaded(true);
        toast.success('Document uploaded successfully');
      };
      reader.onerror = () => toast.error('Failed to read file');
      reader.readAsText(file);
    } 
    else if (file.type === 'application/pdf') {
      try {
        // In a real implementation, we would use a PDF parsing library
        // For demo purposes, we'll just show a success message
        setDocumentText('PDF content would be extracted here in production');
        setFileUploaded(true);
        toast.success('PDF uploaded successfully');
      } catch (error) {
        toast.error('Failed to process PDF file');
      }
    } 
    else {
      toast.error('Only .txt and .pdf files are supported');
    }
  };

  const handleAnalyze = async () => {
    if (!documentText.trim()) {
      toast.error('Please enter document text or upload a document');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await analyzeDocument(documentText);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing document:', error);
      toast.error('Failed to analyze document. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DashboardLayout title="Document Analysis">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileType className="h-5 w-5" />
                Document Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Upload Document</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload a document or paste text directly
                  </p>
                </div>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept=".txt,.pdf"
                    onChange={handleFileUpload}
                  />
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload size={16} />
                    Upload
                  </Button>
                </label>
              </div>
              
              <textarea
                className="w-full p-3 h-48 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                placeholder={fileUploaded ? "Document text loaded..." : "Enter document text or upload a document..."}
                value={documentText}
                onChange={(e) => setDocumentText(e.target.value)}
              />
              
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Supported file types: .txt, .pdf (max 10MB)
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 flex justify-center">
          <Button 
            onClick={handleAnalyze} 
            disabled={isProcessing || !documentText.trim()}
            isLoading={isProcessing}
          >
            {isProcessing ? 'Analyzing...' : 'Analyze Document'}
          </Button>
        </div>

        {analysis && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{analysis.summary}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Points</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {analysis.keyPoints.map((point, index) => (
                    <li key={index} className="text-sm">{point}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Main Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysis.topics.map((topic, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm">{suggestion}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DocumentTool;
