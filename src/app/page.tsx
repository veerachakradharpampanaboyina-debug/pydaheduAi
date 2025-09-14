
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, Code, FileText, CheckCircle, ShieldCheck, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {

  const features = [
    {
      title: 'Friendly PYDAH AI Tutor',
      description: 'Get easy-to-understand explanations for any educational topic, from 1st class to post-graduation, with audio in regional languages.',
      icon: <BookOpen className="w-8 h-8 text-green-500" />,
    },
    {
      title: 'Interactive Coding Practice',
      description: 'Sharpen your coding skills with practice exercises generated for any topic, complete with test cases.',
      icon: <Code className="w-8 h-8 text-accent" />,
    },
    {
      title: 'Automated Notes Generation',
      description: 'Instantly create comprehensive, well-structured notes on any subject, including illustrative diagrams.',
      icon: <FileText className="w-8 h-8 text-primary" />,
    },
  ];

  const benefits = [
    'Accelerate your learning curve.',
    'Practice coding with relevant problems.',
    'Save time on note-taking and summarizing.',
    'Access learning tools for students, faculty, and admins.',
  ];

  return (
    <div className="flex-1 bg-gradient-to-b from-background to-secondary/40">
      <main className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight">
            Unlock Your Potential with <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">PYDAH AI</span>
          </h1>
           <p className="mt-2 text-2xl md:text-3xl font-semibold text-muted-foreground">by Pydah College of Engineering</p>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your intelligent partner for education. Master complex topics, practice coding, and generate notes—all in one place.
          </p>
            <Button 
                size="lg" 
                className="mt-8 text-lg bg-primary hover:bg-primary/90 shadow-lg transform hover:scale-105 transition-transform"
                asChild
            >
                 <Link href='/dashboard'>
                    Go to Dashboard <ArrowRight className="ml-2" />
                </Link>
            </Button>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">Powerful Tools for Modern Learners</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, i) => (
                    <Card key={feature.title} className="text-center transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl border-0">
                        <CardHeader>
                            <div className={`mx-auto bg-gradient-to-br from-primary/10 to-primary/20 p-4 rounded-full w-fit`}>
                                {feature.icon}
                            </div>
                            <CardTitle className="font-headline mt-4">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-card border rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="px-8 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Why Choose PYDAH AI?</h2>
                    <ul className="space-y-4">
                        {benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                <span className="text-lg text-muted-foreground">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                     <Button asChild size="lg" variant="outline" className="mt-8 text-lg">
                        <Link href="/#features">
                            Explore Features
                        </Link>
                    </Button>
                </div>
                <div className="px-8 hidden md:block">
                    <Image 
                        src="https://picsum.photos/600/400"
                        alt="A student using the PYDAH AI platform"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
                        data-ai-hint="student learning technology"
                    />
                </div>
            </div>
        </section>
        
        {/* Security & Privacy Section */}
        <section id="security" className="py-16 mt-16">
            <div className="text-center">
                <ShieldCheck className="w-16 h-16 mx-auto text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold font-headline mt-4">Security &amp; Privacy First</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    We are committed to protecting your data and privacy. Our platform is built with robust security measures to ensure a safe learning environment.
                </p>
            </div>
            <div className="mt-12 grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                <div className="bg-card p-6 rounded-lg border">
                    <h3 className="font-headline text-xl font-semibold">Prompt Security</h3>
                    <p className="mt-2 text-muted-foreground">
                        All prompts submitted to our AI are analyzed for potential security risks like code injection. Malicious or unsafe prompts are blocked to protect our systems and our users.
                    </p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                    <h3 className="font-headline text-xl font-semibold">User Privacy</h3>
                    <p className="mt-2 text-muted-foreground">
                        Your data is yours. We do not store your prompts or personal information for model training. All interactions are processed securely and are not tied to your personal identity.
                    </p>
                </div>
            </div>
        </section>
      </main>

       {/* Footer Section */}
       <footer className="py-8 text-center text-muted-foreground border-t mt-16">
          <p>&copy; {new Date().getFullYear()} PYDAH AI by Pydah College of Engineering. All Rights Reserved.</p>
       </footer>
    </div>
  );
}
