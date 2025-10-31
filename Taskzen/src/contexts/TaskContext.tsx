import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from '@/hooks/use-toast';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  tags: string[];
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
  order: number;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'order'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
  undoDelete: () => void;
  filteredTasks: Task[];
  setFilterStatus: (status: 'all' | TaskStatus) => void;
  setFilterPriority: (priority: 'all' | Priority) => void;
  setFilterTag: (tag: string) => void;
  setSearchQuery: (query: string) => void;
  filterStatus: 'all' | TaskStatus;
  filterPriority: 'all' | Priority;
  filterTag: string;
  searchQuery: string;
  allTags: string[];
  stats: {
    total: number;
    completed: number;
    pending: number;
    urgent: number;
  };
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [deletedTask, setDeletedTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | TaskStatus>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | Priority>('all');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt' | 'order'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      order: tasks.length,
    };
    setTasks([...tasks, newTask]);
    toast({
      title: "Task added",
      description: "Your task has been created successfully.",
    });
  }, [tasks, setTasks]);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  }, [tasks, setTasks]);

  const deleteTask = useCallback((id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    if (taskToDelete) {
      setDeletedTask(taskToDelete);
      setTasks(tasks.filter(task => task.id !== id));
      toast({
        title: "Task deleted",
        description: "You can undo this action.",
        action: (
          <button
            onClick={() => undoDelete()}
            className="text-primary hover:underline"
          >
            Undo
          </button>
        ),
      });
    }
  }, [tasks, setTasks]);

  const undoDelete = useCallback(() => {
    if (deletedTask) {
      setTasks([...tasks, deletedTask]);
      setDeletedTask(null);
      toast({
        title: "Task restored",
        description: "Your task has been recovered.",
      });
    }
  }, [deletedTask, tasks, setTasks]);

  const toggleTaskStatus = useCallback((id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newStatus: TaskStatus = task.status === 'completed' ? 'pending' : 'completed';
        return {
          ...task,
          status: newStatus,
          completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined,
        };
      }
      return task;
    }));
  }, [tasks, setTasks]);

  const reorderTasks = useCallback((startIndex: number, endIndex: number) => {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    const reorderedTasks = result.map((task, index) => ({
      ...task,
      order: index,
    }));
    
    setTasks(reorderedTasks);
  }, [tasks, setTasks]);

  const filteredTasks = React.useMemo(() => {
    return tasks
      .filter(task => {
        // Status filter
        if (filterStatus !== 'all' && task.status !== filterStatus) return false;
        
        // Priority filter
        if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
        
        // Tag filter
        if (filterTag !== 'all' && !task.tags.includes(filterTag)) return false;
        
        // Search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return (
            task.title.toLowerCase().includes(query) ||
            task.description?.toLowerCase().includes(query) ||
            task.tags.some(tag => tag.toLowerCase().includes(query))
          );
        }
        
        return true;
      })
      .sort((a, b) => a.order - b.order);
  }, [tasks, filterStatus, filterPriority, filterTag, searchQuery]);

  const allTags = React.useMemo(() => {
    const tagSet = new Set<string>();
    tasks.forEach(task => {
      task.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [tasks]);

  const stats = React.useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    urgent: tasks.filter(t => t.priority === 'urgent' && t.status === 'pending').length,
  }), [tasks]);

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskStatus,
      reorderTasks,
      undoDelete,
      filteredTasks,
      setFilterStatus,
      setFilterPriority,
      setFilterTag,
      setSearchQuery,
      filterStatus,
      filterPriority,
      filterTag,
      searchQuery,
      allTags,
      stats,
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};
