import React from 'react';
import { Task, Priority, useTasks } from '@/contexts/TaskContext';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, GripVertical, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  isDragging?: boolean;
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  urgent: { label: 'Urgent', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800' },
  high: { label: 'High', className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800' },
  medium: { label: 'Medium', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
  low: { label: 'Low', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800' },
};

export const TaskCard = React.memo(({ task, onEdit, isDragging }: TaskCardProps) => {
  const { toggleTaskStatus, deleteTask } = useTasks();

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status === 'pending';

  return (
    <Card className={cn(
      "group p-4 transition-all hover:shadow-md",
      task.status === 'completed' && "opacity-60",
      isDragging && "shadow-lg rotate-2",
      "animate-slide-up"
    )}>
      <div className="flex items-start gap-3">
        <div className="cursor-grab active:cursor-grabbing pt-1">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
        
        <Checkbox
          checked={task.status === 'completed'}
          onCheckedChange={() => toggleTaskStatus(task.id)}
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={cn(
              "font-semibold text-base leading-tight",
              task.status === 'completed' && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit(task)}
                className="h-8 w-8"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => deleteTask(task.id)}
                className="h-8 w-8 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {task.description}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={priorityConfig[task.priority].className}>
              {priorityConfig[task.priority].label}
            </Badge>
            
            {task.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
            
            {task.dueDate && (
              <div className={cn(
                "flex items-center gap-1 text-xs",
                isOverdue ? "text-destructive font-medium" : "text-muted-foreground"
              )}>
                <Calendar className="h-3 w-3" />
                <span>{format(new Date(task.dueDate), 'MMM dd')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
});

TaskCard.displayName = 'TaskCard';
