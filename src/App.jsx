import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import TasksTable from './components/TasksTable';
import { uploadAudio, getTranscriptionStatus } from './api';
import { translations } from './translations';
import { saveTasksToStorage, getTasksFromStorage } from './storage';

export default function App() {
  const [isUploading, setIsUploading] = useState(false);
  const [tasks, setTasks] = useState(() => getTasksFromStorage());

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  useEffect(() => {
    const intervals = {};

    tasks.forEach(task => {
      if (!['COMPLETED', 'FAILED'].includes(task.status) && !intervals[task.task_id]) {
        intervals[task.task_id] = setInterval(async () => {
          try {
            const status = await getTranscriptionStatus(task.task_id);
            setTasks(currentTasks => 
              currentTasks.map(t => 
                t.task_id === task.task_id ? { ...status, createdAt: t.createdAt, filename: t.filename } : t
              )
            );

            if (['COMPLETED', 'FAILED'].includes(status.status)) {
              clearInterval(intervals[task.task_id]);
              delete intervals[task.task_id];
            }
          } catch (error) {
            console.error('Error fetching status:', error);
            clearInterval(intervals[task.task_id]);
            delete intervals[task.task_id];
          }
        }, 2000);
      }
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [tasks]);

  const handleFileSelect = async (file) => {
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await uploadAudio(file);
      const newTask = {
        task_id: response.task_id,
        status: 'PENDING',
        text: null,
        error: null,
        retry_count: 0,
        createdAt: Date.now(),
        filename: file.name
      };
      setTasks(currentTasks => [newTask, ...currentTasks]);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(currentTasks => currentTasks.filter(task => task.task_id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {translations.title}
          </h1>
          <p className="mt-2 text-gray-600">
            {translations.subtitle}
          </p>
        </div>

        <div className="flex justify-center">
          <FileUpload 
            onFileSelect={handleFileSelect}
            isUploading={isUploading}
          />
        </div>

        {isUploading && (
          <div className="mt-4 text-center text-gray-600">
            {translations.uploading}
          </div>
        )}

        <TasksTable 
          tasks={tasks} 
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
}
