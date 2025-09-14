'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
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
import { PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

type ScheduleEvent = {
  id: string;
  title: string;
  time: string;
};

const mockEvents: Record<string, ScheduleEvent[]> = {
  [format(new Date(), 'yyyy-MM-dd')]: [
    { id: '1', title: 'Team Standup', time: '10:00 AM' },
    { id: '2', title: 'Design Review', time: '02:30 PM' },
  ],
};

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState(mockEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const selectedDateStr = date ? format(date, 'yyyy-MM-dd') : '';
  const selectedEvents = events[selectedDateStr] || [];

  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date) return;

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const time = formData.get('time') as string;

    const newEvent: ScheduleEvent = {
      id: new Date().toISOString(),
      title,
      time,
    };

    const dateKey = format(date, 'yyyy-MM-dd');
    const updatedEvents = { ...events };
    if (!updatedEvents[dateKey]) {
      updatedEvents[dateKey] = [];
    }
    updatedEvents[dateKey].push(newEvent);
    updatedEvents[dateKey].sort((a,b) => a.time.localeCompare(b.time));

    setEvents(updatedEvents);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Schedule
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleAddEvent}>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>
                  Add a new appointment or reminder to your schedule for{' '}
                  {date ? format(date, 'PPP') : 'the selected date'}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input id="title" name="title" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Time
                  </Label>
                  <Input id="time" name="time" type="time" required className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Event</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-4"
              classNames={{
                day_selected:
                  'bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90',
              }}
            />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">
              {date ? format(date, 'PPP') : 'Select a date'}
            </CardTitle>
            <CardDescription>
              You have {selectedEvents.length} event(s) scheduled.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72">
              <div className="space-y-4">
                {selectedEvents.length > 0 ? (
                  selectedEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center space-x-4 rounded-md border p-4"
                    >
                      <Badge variant="outline">{event.time}</Badge>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {event.title}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">No events for this day.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
