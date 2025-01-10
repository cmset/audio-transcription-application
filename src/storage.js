import { TWO_DAYS_MS } from './constants';

const STORAGE_KEY = 'transcription_tasks';

export const saveTasksToStorage = (tasks) => {
  const tasksWithTimestamp = tasks.map(task => ({
    ...task,
    createdAt: task.createdAt || Date.now() // Keep existing timestamp or create new one
  }));
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksWithTimestamp));
};

export const getTasksFromStorage = () => {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (!storedTasks) return [];

    const tasks = JSON.parse(storedTasks);
    const now = Date.now();
    
    // Filter out tasks older than 2 days
    const validTasks = tasks.filter(task => {
      const age = now - task.createdAt;
      return age < TWO_DAYS_MS;
    });

    // If we filtered out some tasks, update storage
    if (validTasks.length !== tasks.length) {
      saveTasksToStorage(validTasks);
    }

    return validTasks;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};
