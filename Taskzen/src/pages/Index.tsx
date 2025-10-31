import React from 'react';
import { TaskProvider } from '@/contexts/TaskContext';
import { Header } from '@/components/Header';
import { TaskStats } from '@/components/TaskStats';
import { TaskFilters } from '@/components/TaskFilters';
import { TaskList } from '@/components/TaskList';

const Index = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8 max-w-5xl">
          <TaskStats />
          <TaskFilters />
          <TaskList />
        </main>
      </div>
    </TaskProvider>
  );
};

export default Index;
