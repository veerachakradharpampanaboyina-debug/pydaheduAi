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
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Faculty = {
  id: string;
  name: string;
  email: string;
  department: string;
};

const initialFaculty: Faculty[] = [
  { id: '1', name: 'Dr. Alan Turing', email: 'alan.turing@example.com', department: 'Computer Science' },
  { id: '2', name: 'Dr. Marie Curie', email: 'marie.curie@example.com', department: 'Physics' },
  { id: '3', name: 'Dr. Ada Lovelace', email: 'ada.lovelace@example.com', department: 'Mathematics' },
];

export default function FacultyManagementPage() {
  const [faculty, setFaculty] = useState<Faculty[]>(initialFaculty);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddFaculty = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newFaculty: Faculty = {
      id: (faculty.length + 1).toString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      department: formData.get('department') as string,
    };
    setFaculty([...faculty, newFaculty]);
    setIsDialogOpen(false);
    e.currentTarget.reset();
  };

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Faculty Management
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Faculty
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleAddFaculty}>
              <DialogHeader>
                <DialogTitle>Add New Faculty</DialogTitle>
                <DialogDescription>
                  Enter the details of the new faculty member.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" name="name" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input id="email" name="email" type="email" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">Department</Label>
                  <Input id="department" name="department" required className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Faculty</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Faculty List</CardTitle>
          <CardDescription>
            A list of all faculty members on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faculty.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon" ><Edit className="h-4 w-4" /></Button>
                    <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
