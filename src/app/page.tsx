'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, Code, FileText, CheckCircle, ShieldCheck, BookOpen, User, GraduationCap, Building2, Mail, Github, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'; // Added Link import

// Import local images from the src/app/images directory
import pydahCollegeImage from '@/app/images/college-photo.jpg';
import developerImage from '@/app/images/developer.jpg';
import aiPlatformImage from '@/app/images/ai-platform.png';


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
      icon: <Code className="w-8 h-8 text-blue-500" />,
    },
    {
      title: 'Automated Notes Generation',
      description: 'Instantly create comprehensive, well-structured notes on any subject, including illustrative diagrams.',
      icon: <FileText className="w-8 h-8 text-purple-500" />,
    },
  ];

  const benefits = [
    'Accelerate your learning curve.',
    'Practice coding with relevant problems.',
    'Save time on note-taking and summarizing.',
    'Access learning tools for students, faculty, and admins.',
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <main className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <section className="text-center py-16 relative">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-600 text-transparent bg-clip-text">
            Unlock Your Potential with <span className="block mt-2">PYDAH AI</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-semibold text-muted-foreground">by Pydah College of Engineering</p>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your intelligent partner for education. Master complex topics, practice coding, and generate notes—all in one place.
          </p>
          <Link href="/dashboard" passHref> {/* Wrapped Button in Link */}
            <Button
              size="lg"
              className="mt-10 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300 group"
            >
              Go to Dashboard <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>

        {/* College Overview Section */}
        <section className="py-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-lg opacity-30"></div>
                <Image
                  src={pydahCollegeImage}
                  alt="A professional photograph of the Pydah College of Engineering building"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-2xl relative z-10"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl mb-6">
                <Building2 className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200">About Pydah College</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-4">
                Pydah College of Engineering is a premier institution committed to excellence in technical education.
                Established with a vision to create future leaders in technology, we provide state-of-the-art facilities
                and a nurturing learning environment.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center">
                  <GraduationCap className="w-6 h-6 text-green-500 mr-2" />
                  <span className="text-muted-foreground">15+ Years of Excellence</span>
                </div>
                <div className="flex items-center">
                  <User className="w-6 h-6 text-blue-500 mr-2" />
                  <span className="text-muted-foreground">5000+ Students</span>
                </div>
                <div className="flex items-center">
                  <Code className="w-6 h-6 text-purple-500 mr-2" />
                  <span className="text-muted-foreground">10+ Tech Programs</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="w-6 h-6 text-red-500 mr-2" />
                  <span className="text-muted-foreground">NAAC Accredited</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 relative">
          <div className="absolute -z-10 -inset-8 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl opacity-50"></div>
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 text-transparent bg-clip-text">
            Powerful Tools for Modern Learners
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <Card key={feature.title} className="text-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-full opacity-30"></div>
                <CardHeader className="relative z-10">
                  <div className={`mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-4 rounded-2xl w-fit shadow-inner`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="font-headline mt-6 text-gray-800 dark:text-gray-200">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Developer Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl mb-6">
              <User className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Meet the Developer</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              PYDAH AI was developed by a talented student from Pydah College of Engineering
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
            <div className="md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-30"></div>
                <Image
                  src={developerImage}
                  alt="Portrait of Pampanaboyina Veera Chakradhar, the developer"
                  width={256} // w-64 is 256px
                  height={256} // h-64 is 256px
                  className="rounded-full shadow-2xl relative z-10 object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Pampanaboyina Veera Chakradhar</h3>
              <div className="flex items-center mt-2 mb-4">
                <GraduationCap className="w-5 h-5 text-blue-500 mr-2" />
                <p className="text-lg text-blue-600 dark:text-blue-400">B.Tech 2nd Year, Computer Science & Engineering</p>
              </div>
              <p className="text-muted-foreground mb-6">
                A passionate developer with expertise in AI, web development, and educational technology.
                Veera Chakradhar created PYDAH AI to enhance the learning experience for students across all disciplines.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-800 dark:text-blue-200">Python</div>
                <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full text-green-800 dark:text-green-200">AI/ML</div>
                <div className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full text-purple-800 dark:text-purple-200">Next.js</div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full text-yellow-800 dark:text-yellow-200">JavaScript</div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-3xl shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 dark:bg-blue-800 rounded-full -translate-y-32 translate-x-32 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 dark:bg-purple-800 rounded-full translate-y-32 -translate-x-32 opacity-20"></div>

          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div className="px-8 md:px-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 text-transparent bg-clip-text">
                Why Choose PYDAH AI?
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start group">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-lg text-muted-foreground group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="mt-8 text-lg border-2 group">
                Explore Features
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="px-8 hidden md:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                <Image
                  src={aiPlatformImage}
                  alt="A user interface screenshot of the PYDAH AI platform"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-2xl relative z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Security & Privacy Section */}
        <section id="security" className="py-16 mt-16 relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent rounded-3xl"></div>
          <div className="text-center">
            <div className="inline-flex p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
              <ShieldCheck className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline mt-6 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 text-transparent bg-clip-text">
              Security & Privacy First
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              We are committed to protecting your data and privacy. Our platform is built with robust security measures to ensure a safe learning environment.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-slate-900/80 p-8 rounded-2xl border border-blue-100 dark:border-blue-800 shadow-lg backdrop-blur-sm">
              <h3 className="font-headline text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Prompt Security</h3>
              <p className="text-muted-foreground">
                All prompts submitted to our AI are analyzed for potential security risks like code injection. Malicious or unsafe prompts are blocked to protect our systems and our users.
              </p>
            </div>
            <div className="bg-white/80 dark:bg-slate-900/80 p-8 rounded-2xl border border-blue-100 dark:border-blue-800 shadow-lg backdrop-blur-sm">
              <h3 className="font-headline text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">User Privacy</h3>
              <p className="text-muted-foreground">
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
