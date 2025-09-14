'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, FileDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateNotes } from '@/ai/flows/notes-generator';
import type { GenerateNotesOutput } from '@/ai/flows/notes-generator-types';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import Image from 'next/image';

export default function NotesPage() {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<GenerateNotesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateNotes = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!topic) {
        toast({
            title: 'Topic Required',
            description: 'Please enter a topic to generate notes.',
            variant: 'destructive'
        })
      return;
    }
    setIsLoading(true);
    setResult(null);

    try {
      const response = await generateNotes({ topic });
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error Generating Notes',
        description: 'Something went wrong. Please check the console for details.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!result || !result.notes) return;
  
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 10;
    const maxLineWidth = pageWidth - margin * 2;
  
    let y = margin;
    doc.setFontSize(16);
    doc.text(topic, margin, y);
    y += 10;
    doc.setFontSize(12);
  
    const addPageIfNeeded = (requiredHeight: number) => {
      if (y + requiredHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    };
  
    const contentParts = result.notes.split(/(\[IMAGE_\d+\])/g);

    for (const part of contentParts) {
        if (part.trim() === '') continue;

        const imageMatch = part.match(/\[IMAGE_(\d+)\]/);
        if (imageMatch) {
            const imageIndex = parseInt(imageMatch[1], 10) - 1;
            if (result.images && result.images[imageIndex]) {
                try {
                    const image = result.images[imageIndex];
                    const img = new (window as any).Image();
                    img.src = image;
                    await new Promise(resolve => img.onload = resolve);
                    
                    const aspectRatio = img.width / img.height;
                    let imgWidth = maxLineWidth / 2;
                    let imgHeight = imgWidth / aspectRatio;
            
                    addPageIfNeeded(imgHeight);
            
                    doc.addImage(image, 'PNG', margin, y, imgWidth, imgHeight);
                    y += imgHeight + 5;
                } catch (e) {
                    console.error("Error adding image to PDF", e);
                }
            }
        } else {
            const textLines = doc.splitTextToSize(part, maxLineWidth);
            textLines.forEach((line: string) => {
              addPageIfNeeded(7);
              doc.text(line, margin, y);
              y += 7; // Line height
            });
        }
    }
  
    doc.save(`${topic.replace(/\s/g, '_')}_notes.pdf`);
  };

  const renderNotesContent = () => {
    if (!result) return null;

    return result.notes.split(/(\[IMAGE_\d+\])/g).map((part, index) => {
      const imageMatch = part.match(/\[IMAGE_(\d+)\]/);
      if (imageMatch && result.images) {
        const imageIndex = parseInt(imageMatch[1], 10) - 1;
        if (result.images[imageIndex]) {
          return (
            <div key={index} className="relative aspect-video my-4 mx-auto w-full max-w-lg">
              <Image
                src={result.images[imageIndex]}
                alt={`Generated image ${imageIndex + 1}`}
                fill
                style={{objectFit: "contain"}}
                className="rounded-md border"
              />
            </div>
          );
        }
      }
      return <p key={index} className="whitespace-pre-wrap">{part}</p>;
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Notes Generator
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Generate Engineering Notes</CardTitle>
          <CardDescription>
            Enter any engineering topic, and our AI will generate detailed notes with images for you.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleGenerateNotes}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g., 'Quantum Mechanics', 'Neural Networks'"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Notes
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center mt-8">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            <p>Generating notes, this may take a moment...</p>
        </div>
      )}

      {result && (
        <Card className="mt-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-headline">Generated Notes for "{topic}"</CardTitle>
              <Button onClick={handleDownloadPdf} variant="outline" size="sm" disabled={!result.notes}>
                <FileDown className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent>
              <ScrollArea className="h-[60vh] rounded-md border p-4">
                {renderNotesContent()}
              </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}