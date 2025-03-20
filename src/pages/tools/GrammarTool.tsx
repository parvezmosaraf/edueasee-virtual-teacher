import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { correctGrammar } from '@/utils/geminiApi';
import Button from '@/components/ui/button-custom';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import VoiceInput from '@/components/ui/voice-input';

const GrammarTool = () => {
  const [inputText, setInputText] = useState('');
  const [output, setOutput] = useState<{
    correctedText: string;
    corrections: string[];
    errorCount: number;
    suggestionCount: number;
    readabilityImprovement: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVoiceInput = (transcript: string) => {
    setInputText((prev) => prev + ' ' + transcript);
  };

  const handleCorrectGrammar = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to correct');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await correctGrammar(inputText);
      setOutput(result);
    } catch (error) {
      console.error('Error correcting grammar:', error);
      toast.error('Failed to correct grammar. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DashboardLayout title="Grammar Correction">
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
              placeholder="Enter or speak the text you want to check for grammar..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </CardContent>
        </Card>

        <div className="mb-6 flex justify-center">
          <Button 
            onClick={handleCorrectGrammar} 
            disabled={isProcessing || !inputText.trim()}
            isLoading={isProcessing}
          >
            {isProcessing ? 'Correcting...' : 'Correct Grammar'}
          </Button>
        </div>

        {output && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Corrected Text</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <Badge variant="outline">
                    Errors Found: {output.errorCount}
                  </Badge>
                  <Badge variant="outline">
                    Suggestions: {output.suggestionCount}
                  </Badge>
                  <Badge variant="outline">
                    Improvement: {output.readabilityImprovement}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {output.correctedText}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Corrections Made</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2">
                  {output.corrections.map((correction, index) => (
                    <li key={index} className="text-sm bg-muted/50 p-2 rounded">
                      {correction}
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

export default GrammarTool;
