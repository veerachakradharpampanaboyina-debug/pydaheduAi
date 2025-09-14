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
import { Loader2, Sparkles, FileDown, Image as ImageIcon } from 'lucide-react';
import {
  generatePresentationContent,
  generatePresentationWithImages,
} from '@/ai/flows/ppt-generator';
import type {
  PptContentOutput,
  GeneratePptOutput,
  Slide,
} from '@/ai/flows/ppt-generator-types';
import { useToast } from '@/hooks/use-toast';
import PptxGenJS from 'pptxgenjs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PptGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [textContent, setTextContent] = useState<PptContentOutput | null>(null);
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const { toast } = useToast();

  const handleGenerateContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!topic) {
      toast({
        title: 'Topic Required',
        description: 'Please enter a topic to generate a presentation.',
        variant: 'destructive',
      });
      return;
    }
    setIsGeneratingText(true);
    setTextContent(null);

    try {
      const response = await generatePresentationContent({ topic });
      setTextContent(response);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error Generating Content',
        description:
          'Something went wrong. Please check the console for details.',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingText(false);
    }
  };

  const handleGenerateImagesAndDownload = async () => {
    if (!textContent) return;

    setIsGeneratingImages(true);

    try {
      const response = await generatePresentationWithImages(textContent);
      handleDownloadPptx(response);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error Generating Images',
        description:
          'Something went wrong. Please check the console for details.',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingImages(false);
    }
  };

  const handleDownloadPptx = (data: GeneratePptOutput) => {
    if (!data) return;

    const pptx = new PptxGenJS();
    pptx.title = data.title;

    // Title Slide
    let titleSlide = pptx.addSlide();
    titleSlide.addText(data.title, {
      x: 1,
      y: 2.5,
      w: 8,
      h: 1,
      align: 'center',
      fontSize: 36,
      bold: true,
    });

    // Content Slides
    data.slides.forEach((slideData, index) => {
      if (index === 0 && slideData.title === data.title) return; // Skip if it's a duplicate title slide

      const slide = pptx.addSlide();
      const image = data.images?.[index];

      if (image) {
        // Two-column layout: content on left, image on right
        slide.addText(slideData.title, {
          x: 0.5,
          y: 0.25,
          w: 4.5,
          h: 0.75,
          fontSize: 24,
          bold: true,
        });
        slide.addText(slideData.content.join('\n'), {
          x: 0.5,
          y: 1.25,
          w: 4.5,
          h: 4,
          bullet: true,
          fontSize: 16,
        });
        slide.addImage({
          data: image,
          x: 5.25,
          y: 1.0,
          w: 4.25,
          h: 3.5,
        });
      } else {
        // Full-width layout
        slide.addText(slideData.title, {
          x: 0.5,
          y: 0.25,
          w: 9,
          h: 0.75,
          fontSize: 24,
          bold: true,
        });
        slide.addText(slideData.content.join('\n'), {
          x: 0.5,
          y: 1.25,
          w: 9,
          h: 4,
          bullet: true,
          fontSize: 18,
        });
      }

      slide.addNotes(slideData.speakerNotes);
    });

    pptx.writeFile({ fileName: `${data.title.replace(/\s/g, '_')}.pptx` });
  };

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Presentation Generator
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">
            Step 1: Generate Presentation Content
          </CardTitle>
          <CardDescription>
            Enter a topic, and our AI will generate the text content for your presentation.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleGenerateContent}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g., 'The Future of Renewable Energy'"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={isGeneratingText || isGeneratingImages}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isGeneratingText || isGeneratingImages}>
              {isGeneratingText ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Content
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isGeneratingText && (
        <div className="flex justify-center items-center mt-8">
          <Loader2 className="mr-2 h-8 w-8 animate-spin" />
          <p>Generating text content...</p>
        </div>
      )}

      {textContent && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="font-headline">
              Step 2: Review Content & Generate PPT
            </CardTitle>
            <CardDescription>
              Review the generated slide content below. When ready, generate the
              images and download the final PowerPoint file.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertTitle className='font-headline'>Presentation Title</AlertTitle>
              <AlertDescription>{textContent.title}</AlertDescription>
            </Alert>
            <ScrollArea className="h-[50vh] rounded-md border p-4 mt-4">
              <div className="space-y-4">
                {textContent.slides.map((slide: Slide, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-bold text-lg">Slide {index + 1}: {slide.title}</h3>
                    <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
                      {slide.content.map((point, pIndex) => (
                        <li key={pIndex}>{point}</li>
                      ))}
                    </ul>
                     <p className='text-xs mt-2 text-muted-foreground italic'>Image Prompt: {slide.imagePrompt || 'None'}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleGenerateImagesAndDownload}
              disabled={isGeneratingImages}
            >
              {isGeneratingImages ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ImageIcon className="mr-2 h-4 w-4" />
              )}
              Generate Images & Download PPT
            </Button>
          </CardFooter>
        </Card>
      )}

      {isGeneratingImages && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className='bg-background p-6 rounded-lg shadow-xl flex items-center gap-4'>
                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                <p className='text-lg'>Generating images and building your presentation... <br/>This may take a few minutes. Please wait.</p>
            </div>
        </div>
      )}
    </div>
  );
}
