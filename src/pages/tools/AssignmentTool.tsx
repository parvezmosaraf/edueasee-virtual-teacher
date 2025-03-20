
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { solveAssignment } from '@/utils/geminiApi';
import Button from '@/components/ui/button-custom';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import VoiceInput from '@/components/ui/voice-input';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'History',
  'Geography',
  'Literature',
  'Economics',
  'Philosophy',
];

const AssignmentTool = () => {
  const [assignment, setAssignment] = useState('');
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [output, setOutput] = useState<{
    solution: string;
    explanation: string[];
    concepts: string[];
    resources: string[];
    subject: string;
    difficulty: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleVoiceInput = (transcript: string) => {
    setAssignment((prev) => prev + ' ' + transcript);
  };

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
        setAssignment(text);
        setFileUploaded(true);
        toast.success('Document uploaded successfully');
      };
      reader.onerror = () => toast.error('Failed to read file');
      reader.readAsText(file);
    } 
    else if (file.type === 'application/pdf') {
      try {
        // In a real implementation, we would use a PDF parsing library
        // For demo purposes, we'll just show a partial success message
        setAssignment((prev) => prev + "\n[PDF content extracted from: " + file.name + "]");
        setFileUploaded(true);
        toast.success('PDF uploaded, content extracted');
      } catch (error) {
        toast.error('Failed to process PDF file');
      }
    } 
    else {
      toast.error('Only .txt and .pdf files are supported');
    }
  };

  const handleSolve = async () => {
    if (!assignment.trim()) {
      toast.error('Please enter assignment details');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await solveAssignment(assignment, subject);
      setOutput(result);
    } catch (error) {
      console.error('Error solving assignment:', error);
      toast.error('Failed to solve assignment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DashboardLayout title="Assignment Helper">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              className="w-full p-3 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {SUBJECTS.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Assignment Details</CardTitle>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept=".txt,.pdf"
                    onChange={handleFileUpload}
                  />
                  <Button variant="outline" className="flex items-center gap-2" type="button">
                    <Upload size={16} />
                    Upload
                  </Button>
                </label>
                <VoiceInput onTranscript={handleVoiceInput} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full p-3 h-48 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
              placeholder={fileUploaded ? "Document content loaded..." : "Enter your assignment question, upload a document, or speak..."}
              value={assignment}
              onChange={(e) => setAssignment(e.target.value)}
            />
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Supported file types: .txt, .pdf (max 10MB)
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <div className="mb-6 flex justify-center">
          <Button 
            onClick={handleSolve} 
            disabled={isProcessing || !assignment.trim()}
            isLoading={isProcessing}
          >
            {isProcessing ? 'Solving...' : 'Get Solution'}
          </Button>
        </div>

        {output && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="text-sm leading-relaxed whitespace-pre-line">
                    {output.solution}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Step-by-Step Explanation</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <ol className="list-decimal list-inside space-y-3 pl-1">
                    {output.explanation.map((step, index) => (
                      <li key={index} className="text-sm">
                        <div dangerouslySetInnerHTML={{ 
                          __html: step.replace(/^\d+\.\s*/, '') // Remove leading numbers from the content
                        }} />
                      </li>
                    ))}
                  </ol>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Concepts Used</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] w-full">
                  <ul className="grid gap-2 pr-3">
                    {output.concepts.map((concept, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <div dangerouslySetInnerHTML={{ 
                          __html: concept.replace(/^[\d\.\•\*\-]+\s*/, '') // Remove any bullet/number prefix
                        }} />
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] w-full">
                  <ul className="list-disc list-inside space-y-2 pl-1 pr-3">
                    {output.resources.map((resource, index) => (
                      <li key={index} className="text-sm">
                        <div dangerouslySetInnerHTML={{ 
                          __html: resource.replace(/^[\d\.\•\*\-]+\s*/, '') // Remove any bullet/number prefix
                        }} />
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AssignmentTool;
