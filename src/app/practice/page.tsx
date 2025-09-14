'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, Terminal, CheckCircle, XCircle, ShieldAlert } from 'lucide-react';
import {
  generateCodingExercise,
} from '@/ai/flows/code-practice-tool';
import type { CodePracticeToolOutput } from '@/ai/flows/code-practice-tool-types';
import {
  executeCode,
} from '@/ai/flows/code-execution';
import type { CodeExecutionOutput } from '@/ai/flows/code-execution-types';
import { checkSecurity } from '@/ai/flows/security-checker';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function PracticePage() {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [exerciseResult, setExerciseResult] = useState<CodePracticeToolOutput | null>(null);
  const [executionResult, setExecutionResult] = useState<CodeExecutionOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleGenerateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!topic) {
      toast({
        title: 'Topic Required',
        description: 'Please enter a topic to generate an exercise.',
        variant: 'destructive',
      });
      return;
    }
    setIsGenerating(true);
    setExerciseResult(null);
    setExecutionResult(null);
    setCode('');
    try {
      // Step 1: Security Check
      const securityResult = await checkSecurity({ prompt: topic });
      if (securityResult.isVulnerable) {
        toast({
            title: 'Potential Security Risk Detected',
            description: `Reason: ${securityResult.reason}. Redirecting to homepage.`,
            variant: 'destructive',
        });
        setTimeout(() => router.push('/'), 3000);
        return;
      }
      
      // Step 2: Generate Exercise
      const res = await generateCodingExercise({ topic });
      setExerciseResult(res);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error Generating Exercise',
        description:
          'Something went wrong. Please check the console for details.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExecuteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!code || !exerciseResult?.testCases) {
        toast({
            title: 'Code Required',
            description: 'Please write some code to execute.',
            variant: 'destructive'
        });
        return;
    }
    setIsExecuting(true);
    setExecutionResult(null);
    try {
        const res = await executeCode({
            code,
            testCases: exerciseResult.testCases,
            language,
        });
        setExecutionResult(res);
    } catch(error) {
        console.error(error);
        toast({
            title: 'Error Executing Code',
            description: 'Something went wrong. Please check the console for details.',
            variant: 'destructive'
        });
    } finally {
        setIsExecuting(false);
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Coding Practice
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Generate a Coding Exercise</CardTitle>
          <CardDescription>
            Enter a topic, and we'll generate a practice problem with test cases
            for you. Our security AI will check your prompt first.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleGenerateSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g., 'Array manipulation', 'Binary search'"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={isGenerating}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isGenerating}>
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Exercise
            </Button>
          </CardFooter>
        </form>
      </Card>

      {exerciseResult && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="font-headline">Solve The Challenge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle className="font-headline">Problem Statement</AlertTitle>
              <AlertDescription>
                <p className="whitespace-pre-wrap">{exerciseResult.exercise}</p>
              </AlertDescription>
            </Alert>
            
            {exerciseResult.testCases.length > 0 && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="test-cases">
                  <AccordionTrigger>View Test Cases</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-5">
                      {exerciseResult.testCases.map((testCase, index) => (
                        <li key={index} className="font-mono text-sm">
                          <code>{testCase}</code>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            <form onSubmit={handleExecuteSubmit} className="space-y-4">
               <div className="grid gap-2">
                 <Label htmlFor="language">Language</Label>
                 <Select value={language} onValueChange={setLanguage}>
                   <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="Select Language" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="python">Python</SelectItem>
                     <SelectItem value="javascript">JavaScript</SelectItem>
                     <SelectItem value="typescript">TypeScript</SelectItem>
                     <SelectItem value="java">Java</SelectItem>
                     <SelectItem value="c++">C++</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="code-editor">Your Code</Label>
                 <Textarea
                   id="code-editor"
                   placeholder={`Write your ${language} code here...`}
                   value={code}
                   onChange={(e) => setCode(e.target.value)}
                   className="font-mono h-64"
                   disabled={isExecuting}
                 />
               </div>
               <Button type="submit" disabled={isExecuting}>
                 {isExecuting ? (
                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                 ) : (
                   <Terminal className="mr-2 h-4 w-4" />
                 )}
                 Run Code
               </Button>
             </form>

          </CardContent>
        </Card>
      )}

      {executionResult && (
         <Card className="mt-4">
           <CardHeader>
             <CardTitle className="font-headline">Execution Results</CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
            {executionResult.error && (
                <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Execution Error</AlertTitle>
                    <AlertDescription>
                        <p className="whitespace-pre-wrap font-mono">{executionResult.error}</p>
                    </AlertDescription>
                </Alert>
            )}
             {executionResult.results?.map((result, index) => (
               <Alert key={index} variant={result.passed ? 'default' : 'destructive'}>
                 {result.passed ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                 <AlertTitle className="font-headline flex items-center justify-between">
                   <span>Test Case #{index + 1}</span>
                   <span className={`text-sm font-semibold ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                     {result.passed ? 'Passed' : 'Failed'}
                   </span>
                 </AlertTitle>
                 <AlertDescription>
                   <div className="font-mono text-xs space-y-2">
                       <p><strong>Input:</strong> {result.testCase}</p>
                       <p><strong>Output:</strong> <span className="whitespace-pre-wrap">{result.output}</span></p>
                       {!result.passed && result.expected && (
                           <p><strong>Expected:</strong> {result.expected}</p>
                       )}
                   </div>
                 </AlertDescription>
               </Alert>
             ))}
           </CardContent>
         </Card>
      )}

    </div>
  );
}
