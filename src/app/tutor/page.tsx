
'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, BookOpen } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { generateTutorResponse } from '@/ai/flows/education-tutor';
import type { AdityaTutorOutput } from '@/ai/flows/education-tutor-types';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const languages = [
  { value: 'en-IN', label: 'English (India)', voiceName: 'en-IN-Standard-A' },
  { value: 'hi-IN', label: 'Hindi', voiceName: 'hi-IN-Standard-A' },
  { value: 'bn-IN', label: 'Bengali', voiceName: 'bn-IN-Standard-A' },
  { value: 'te-IN', label: 'Telugu', voiceName: 'te-IN-Standard-A' },
  { value: 'mr-IN', label: 'Marathi', voiceName: 'mr-IN-Standard-A' },
  { value: 'ta-IN', label: 'Tamil', voiceName: 'ta-IN-Standard-B' },
  { value: 'gu-IN', label: 'Gujarati', voiceName: 'gu-IN-Standard-A' },
  { value: 'kn-IN', label: 'Kannada', voiceName: 'kn-IN-Standard-A' },
  { value: 'ml-IN', label: 'Malayalam', voiceName: 'ml-IN-Standard-A' },
  { value: 'pa-IN', label: 'Punjabi', voiceName: 'pa-IN-Standard-A' },
];

export default function TutorPage() {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState(languages[0].value);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<AdityaTutorOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!topic || !language) {
      toast({
        title: 'All fields are required',
        description: 'Please provide a topic and language.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const selectedLanguage = languages.find((l) => l.value === language);
      if (!selectedLanguage) {
        throw new Error('Invalid language selected');
      }

      const response = await generateTutorResponse({
        topic,
        language: selectedLanguage.label,
      });

      if (response.error && !response.explanation) {
        toast({
            title: 'An Error Occurred',
            description: response.error,
            variant: 'destructive',
        });
      } else if (!response.explanation) {
         toast({
            title: 'Explanation Not Generated',
            description: "I'm sorry, I was unable to generate an explanation for this topic. Please try a different one.",
            variant: 'destructive',
        });
      } else {
        setResult(response);
      }

    } catch (error) {
      console.error(error);
      toast({
        title: 'Error Generating Response',
        description:
          'Something went wrong. Please check the console for details.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderExplanation = (explanation: string) => {
    const parts = explanation.split(/(\[TABLE\][\s\S]*?\[\/TABLE\])/g);
  
    return parts.map((part, index) => {
      if (part.startsWith('[TABLE]')) {
        const tableContent = part.replace('[TABLE]', '').replace('[/TABLE]', '').trim();
        const rows = tableContent.split('\n').map(row => row.split('|').map(cell => cell.trim()));
        
        if (rows.length === 0) return null;
  
        const header = rows[0];
        const body = rows.slice(1);
  
        return (
          <div key={index} className="my-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {header.map((head, i) => <TableHead key={i}>{head}</TableHead>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                {body.map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => <TableCell key={j}>{cell}</TableCell>)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      }
      return <p key={index} className="whitespace-pre-wrap leading-relaxed">{part}</p>;
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          PYDAH AI Tutor
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Get an Explanation</CardTitle>
          <CardDescription>
            Enter any educational topic, and our AI tutor will explain it to you
            in a simple, friendly manner.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="topic">Your Question</Label>
                <Textarea
                  id="topic"
                  placeholder="e.g., 'Explain Photosynthesis', 'What are the key differences between Python and Java?'"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={isGenerating}
                  className="h-24"
                />
              </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={language}
                onValueChange={setLanguage}
                disabled={isGenerating}
              >
                <SelectTrigger id="language" className="w-full sm:w-[280px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isGenerating}>
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Explain Topic
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      {isGenerating && (
        <div className="flex justify-center items-center mt-8 text-center">
            <div>
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">
                    Your PYDAH AI tutor is preparing your explanation...
                </p>
            </div>
        </div>
      )}

      {result && result.explanation && (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <BookOpen />
                    <span>Explanation for "{topic}"</span>
                </CardTitle>
                <CardDescription>Language: {languages.find(l => l.value === language)?.label}</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[40vh] rounded-md border p-4">
                    <div>{renderExplanation(result.explanation)}</div>
                </ScrollArea>
                 {result.error && (
                     <p className='text-sm text-amber-600 mt-4'>{result.error}</p>
                 )}
            </CardContent>
        </Card>
      )}
    </div>
  );
}
