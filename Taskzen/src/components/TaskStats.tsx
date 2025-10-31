import React from 'react';
import { useTasks } from '@/contexts/TaskContext';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Clock, AlertCircle, ListTodo } from 'lucide-react';

export const TaskStats: React.FC = () => {
  const { stats } = useTasks();

  const statCards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: ListTodo,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    },
    {
      label: 'Urgent',
      value: stats.urgent,
      icon: AlertCircle,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map(({ label, value, icon: Icon, color, bgColor }) => (
        <Card key={label} className="p-4 animate-scale-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
            <div className={`${bgColor} p-3 rounded-full`}>
              <Icon className={`h-6 w-6 ${color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
