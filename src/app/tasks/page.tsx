'use client';

import { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

type Task = {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Todo' | 'In Progress' | 'Done';
  dueDate: string;
};

const initialTasks: Task[] = [
  { id: '1', title: 'Implement dashboard UI', priority: 'High', status: 'In Progress', dueDate: '2024-08-15' },
  { id: '2', title: 'Develop schedule management feature', priority: 'High', status: 'Todo', dueDate: '2024-08-20' },
  { id: '3', title: 'Fix login page bug', priority: 'Medium', status: 'Done', dueDate: '2024-08-01' },
  { id: '4', title: 'Write documentation for API', priority: 'Low', status: 'Todo', dueDate: '2024-09-01' },
];

const priorityVariant: Record<Task['priority'], 'destructive' | 'secondary' | 'outline'> = {
  High: 'destructive',
  Medium: 'secondary',
  Low: 'outline',
};

const statusVariant: Record<Task['status'], 'default' | 'secondary' | 'outline'> = {
  'In Progress': 'default',
  Todo: 'secondary',
  Done: 'outline',
};


export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // TODO: Implement a dialog to add new tasks. For now, this is a display-only page.

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Tasks
        </h1>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Task List</CardTitle>
          <CardDescription>
            Here are all the tasks assigned to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[task.status]}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={priorityVariant[task.priority]}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}