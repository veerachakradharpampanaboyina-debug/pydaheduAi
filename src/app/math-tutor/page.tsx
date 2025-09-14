
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
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, Calculator, Printer } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { solveMathProblem } from '@/ai/flows/math-tutor';
import type { MathTutorOutput } from '@/ai/flows/math-tutor-types';
import { Textarea } from '@/components/ui/textarea';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function MathTutorPage() {
  const [problem, setProblem] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<MathTutorOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!problem) {
      toast({
        title: 'Problem is required',
        description: 'Please provide a math problem to solve.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const response = await solveMathProblem({
        problem,
      });

      if (response.error && !response.solution) {
        toast({
            title: 'An Error Occurred',
            description: response.error,
            variant: 'destructive',
        });
      } else if (!response.solution) {
         toast({
            title: 'Solution Not Generated',
            description: "I'm sorry, I was unable to generate a solution for this problem. Please try a different one.",
            variant: 'destructive',
        });
      } else {
        setResult(response);
      }

    } catch (error) {
      console.error(error);
      toast({
        title: 'Error Generating Solution',
        description:
          'Something went wrong. Please check the console for details.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    document.body.classList.add('printing-solution');
    window.print();
    document.body.classList.remove('printing-solution');
  };

  const renderSolution = (solution: string) => {
    const parts = solution.split(/(\[TABLE\][\s\S]*?\[\/TABLE\])/g);

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
                  {header.map((head, i) => <TableHead key={i}><Latex>{head}</Latex></TableHead>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                {body.map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => <TableCell key={j}><Latex>{cell}</Latex></TableCell>)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      }
      return <Latex key={index}>{part}</Latex>
    });
  }

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Pydah Math Tutor
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Solve a Math Problem</CardTitle>
          <CardDescription>
            Enter any math problem, and our AI tutor will provide a step-by-step solution.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="problem">Your Math Problem</Label>
                <Textarea
                  id="problem"
                  placeholder="e.g., 'Solve for x in 2x + 5 = 15', 'What is the derivative of x^2?'"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  disabled={isGenerating}
                  className="h-24"
                />
              </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isGenerating}>
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Solve Problem
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      {isGenerating && (
        <div className="flex justify-center items-center mt-8 text-center">
            <div>
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">
                    Your Math Tutor is working on the solution...
                </p>
            </div>
        </div>
      )}

      {result && result.solution && (
        <Card className="mt-4" id="solution-print-area">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Calculator />
                        <span>Solution for "{problem}"</span>
                    </CardTitle>
                    <Button onClick={handlePrint} variant="outline" size="sm" className="print:hidden">
                        <Printer className="mr-2 h-4 w-4" />
                        <span>Print</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[40vh] rounded-md border p-4 print:h-auto print:border-none print:p-0 print:overflow-visible">
                    <div className="whitespace-pre-wrap leading-relaxed">
                        {renderSolution(result.solution)}
                    </div>
                </ScrollArea>
                 {result.error && (
                     <p className='text-sm text-amber-600 mt-4 print:hidden'>{result.error}</p>
                 )}
            </CardContent>
        </Card>
      )}
    </div>
  );
}
