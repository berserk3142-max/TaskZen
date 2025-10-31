import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useTasks } from '@/contexts/TaskContext';
import { TaskCard } from './TaskCard';
import { TaskDialog } from './TaskDialog';
import { Task } from '@/contexts/TaskContext';
import { ListTodo } from 'lucide-react';

export const TaskList: React.FC = () => {
  const { filteredTasks, reorderTasks } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-secondary p-6 mb-4">
          <ListTodo className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
        <p className="text-muted-foreground max-w-sm">
          Create your first task to get started with organizing your work
        </p>
      </div>
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard
                        task={task}
                        onEdit={setEditingTask}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {editingTask && (
        <TaskDialog
          task={editingTask}
          open={!!editingTask}
          onOpenChange={(open) => !open && setEditingTask(null)}
        />
      )}
    </>
  );
};
