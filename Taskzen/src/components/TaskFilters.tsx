import React from 'react';
import { useTasks } from '@/contexts/TaskContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const TaskFilters: React.FC = () => {
  const {
    setFilterStatus,
    setFilterPriority,
    setFilterTag,
    setSearchQuery,
    filterStatus,
    filterPriority,
    filterTag,
    searchQuery,
    allTags,
  } = useTasks();

  const statusFilters = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ];

  const priorityFilters = [
    { value: 'all', label: 'All' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        {searchQuery && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setSearchQuery('')}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium mb-2">Status</p>
          <div className="flex flex-wrap gap-2">
            {statusFilters.map(({ value, label }) => (
              <Button
                key={value}
                size="sm"
                variant={filterStatus === value ? 'default' : 'outline'}
                onClick={() => setFilterStatus(value as any)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Priority</p>
          <div className="flex flex-wrap gap-2">
            {priorityFilters.map(({ value, label }) => (
              <Button
                key={value}
                size="sm"
                variant={filterPriority === value ? 'default' : 'outline'}
                onClick={() => setFilterPriority(value as any)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {allTags.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={filterTag === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterTag('all')}
              >
                All
              </Button>
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={filterTag === tag ? 'default' : 'secondary'}
                  className="cursor-pointer"
                  onClick={() => setFilterTag(tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
