'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

const studentData = [
    { name: 'Alice Johnson', course: 'Advanced Algorithms', progress: 75, lastActivity: '2 hours ago' },
    { name: 'Bob Williams', course: 'Machine Learning', progress: 50, lastActivity: '1 day ago' },
    { name: 'Charlie Brown', course: 'Data Structures', progress: 90, lastActivity: '30 minutes ago' },
    { name: 'Diana Miller', course: 'Advanced Algorithms', progress: 30, lastActivity: '3 days ago' },
]

export default function FacultyDashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Faculty Dashboard
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Student Progress</CardTitle>
          <CardDescription>
            Track the coding practice and skill development of your students.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Last Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentData.map((student) => (
                <TableRow key={student.name}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                        <Progress value={student.progress} className="w-[60%]" />
                        <span>{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.lastActivity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
