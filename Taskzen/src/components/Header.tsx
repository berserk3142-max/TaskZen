import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TaskDialog } from './TaskDialog';
import { Moon, Sun, Plus } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export const Header: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <p className="text-sm text-muted-foreground">Organize your work efficiently</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">New Task</span>
            </Button>
          </div>
        </div>
      </div>

      <TaskDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </header>
  );
};
