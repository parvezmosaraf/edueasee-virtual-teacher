import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { rewriteText } from '@/utils/geminiApi';
import Button from '@/components/ui/button-custom';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import VoiceInput from '@/components/ui/voice-input';

const RewriteTool = () => {
  const [inputText, setInputText] = useState('');
  const [output, setOutput] = useState<{
    rewrittenText: string;
    improvements: string[];
    readabilityScore: string;
    wordCount: number;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVoiceInput = (transcript: string) => {
    setInputText((prev) => prev + ' ' + transcript);
  };

  const handleRewrite = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to rewrite');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await rewriteText(inputText);
      setOutput(result);
    } catch (error) {
      console.error('Error rewriting text:', error);
      toast.error('Failed to rewrite text. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DashboardLayout title="Article Rewrite">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Original Text</CardTitle>
              <VoiceInput onTranscript={handleVoiceInput} />
            </div>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full p-3 h-48 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
              placeholder="Enter or speak the text you want to rewrite..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </CardContent>
        </Card>

        <div className="mb-6 flex justify-center">
          <Button 
            onClick={handleRewrite} 
            disabled={isProcessing || !inputText.trim()}
            isLoading={isProcessing}
          >
            {isProcessing ? 'Rewriting...' : 'Rewrite Text'}
          </Button>
        </div>

        {output && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rewritten Text</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <Badge variant="outline">
                    Readability: {output.readabilityScore}
                  </Badge>
                  <Badge variant="outline">
                    Word Count: {output.wordCount}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {output.rewrittenText}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Improvements Made</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2">
                  {output.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {improvement}
                    </li>
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

export default RewriteTool;
