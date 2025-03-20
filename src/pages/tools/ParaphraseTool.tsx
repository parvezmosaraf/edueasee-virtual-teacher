import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { paraphraseText } from '@/utils/geminiApi';
import Button from '@/components/ui/button-custom';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import VoiceInput from '@/components/ui/voice-input';

const ParaphraseTool = () => {
  const [inputText, setInputText] = useState('');
  const [output, setOutput] = useState<{
    paraphrasedText: string;
    changes: string[];
    originalLength: number;
    newLength: number;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVoiceInput = (transcript: string) => {
    setInputText((prev) => prev + ' ' + transcript);
  };

  const handleParaphrase = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to paraphrase');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await paraphraseText(inputText);
      setOutput(result);
    } catch (error) {
      console.error('Error paraphrasing text:', error);
      toast.error('Failed to paraphrase text. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DashboardLayout title="Paraphrasing Tool">
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
              placeholder="Enter or speak the text you want to paraphrase..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </CardContent>
        </Card>

        <div className="mb-6 flex justify-center">
          <Button 
            onClick={handleParaphrase} 
            disabled={isProcessing || !inputText.trim()}
            isLoading={isProcessing}
          >
            {isProcessing ? 'Paraphrasing...' : 'Paraphrase Text'}
          </Button>
        </div>

        {output && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paraphrased Text</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <Badge variant="outline">
                    Original Length: {output.originalLength} words
                  </Badge>
                  <Badge variant="outline">
                    New Length: {output.newLength} words
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {output.paraphrasedText}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes Made</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2">
                  {output.changes.map((change, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      {change}
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

export default ParaphraseTool;
