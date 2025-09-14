'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Users, School, Code } from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    {
      title: 'Total Students',
      value: '1,250',
      icon: <Users className="w-6 h-6 text-muted-foreground" />,
    },
    {
      title: 'Total Faculty',
      value: '75',
      icon: <School className="w-6 h-6 text-muted-foreground" />,
    },
    {
      title: 'Exercises Completed',
      value: '15,302',
      icon: <Code className="w-6 h-6 text-muted-foreground" />,
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Admin Dashboard
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
       <Card>
        <CardHeader>
            <CardTitle className="font-headline">Platform Management</CardTitle>
            <CardDescription>Tools and settings for managing the application.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Admin controls and platform-wide settings will be available here.</p>
        </CardContent>
       </Card>
    </div>
  );
}
