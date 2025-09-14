'use client';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BookOpen,
  Code,
  FileText,
  Presentation,
  Calculator,
} from 'lucide-react';

export default function DashboardPage() {
  const features = [
    {
      title: 'PYDAH AI Tutor',
      description: 'Get explanations for any educational topic.',
      href: '/tutor',
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      title: 'Coding Practice',
      description: 'Generate exercises to hone your skills.',
      href: '/practice',
      icon: <Code className="w-6 h-6" />,
    },
    {
      title: 'Notes Generator',
      description: 'Create detailed notes on any subject.',
      href: '/notes',
      icon: <FileText className="w-6 h-6" />,
    },
    {
      title: 'PPT Generator',
      description: 'Generate a PowerPoint on any topic.',
      href: '/ppt-generator',
      icon: <Presentation className="w-6 h-6" />,
    },
    {
      title: 'Pydah Math Tutor',
      description: 'Solve math problems step-by-step.',
      href: '/math-tutor',
      icon: <Calculator className="w-6 h-6" />,
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Student Dashboard
        </h1>
      </div>
      <div className="space-y-4">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="font-headline">Welcome to PYDAH AI!</CardTitle>
            <CardDescription>
              Your intelligent partner for productivity and learning. Here's a quick
              overview of what you can do.
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {feature.title}
                </CardTitle>
                <div className="text-muted-foreground">{feature.icon}</div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link href={feature.href}>
                    Go to {feature.title.split(' ')[0]}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
