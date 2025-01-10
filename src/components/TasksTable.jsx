import React, { useState } from 'react';
import { translations } from '../translations';
import TranscriptionModal from './TranscriptionModal';
import TaskInfoModal from './TaskInfoModal';
import SegmentsModal from './SegmentsModal';
import ConfirmDialog from './ConfirmDialog';

export default function TasksTable({ tasks, onDeleteTask }) {
  const [selectedText, setSelectedText] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedSegments, setSelectedSegments] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  if (!tasks.length) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600';
      case 'FAILED':
        return 'text-red-600';
      case 'PROCESSING':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const canDelete = (status) => ['COMPLETED', 'FAILED'].includes(status);

  const handleDelete = (taskId) => {
    setTaskToDelete(taskId);
  };

  const confirmDelete = () => {
    onDeleteTask(taskToDelete);
    setTaskToDelete(null);
  };

  return (
    <>
      <div className="mt-8 w-full overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {translations.tableHeaders.filename}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {translations.tableHeaders.status}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {translations.tableHeaders.date}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {translations.tableHeaders.retries}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {translations.tableHeaders.error}
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                {translations.tableHeaders.actions}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.task_id}>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="max-w-xs truncate">
                    {task.filename}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`${getStatusColor(task.status)} font-medium`}>
                    {translations.status[task.status]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(task.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.retry_count ?? '-'}
                </td>
                <td className="px-6 py-4 text-sm text-red-500">
                  <div className="max-w-xs truncate">
                    {task.error || '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setSelectedTaskId(task.task_id)}
                      className="text-gray-600 hover:text-gray-800 p-1 rounded-full hover:bg-gray-50 transition-colors"
                      title={translations.viewInfo}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    {task.status === 'COMPLETED' && task.text && (
                      <button
                        onClick={() => setSelectedText(task.text)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
                        title={translations.viewText}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    )}
                    {task.status === 'COMPLETED' && task.segments && (
                      <button
                        onClick={() => setSelectedSegments(task.segments)}
                        className="text-purple-600 hover:text-purple-800 p-1 rounded-full hover:bg-purple-50 transition-colors"
                        title={translations.segments.viewSegments}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                      </button>
                    )}
                    {canDelete(task.status) && (
                      <button
                        onClick={() => handleDelete(task.task_id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                        title={translations.deleteTask}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedText && (
        <TranscriptionModal
          text={selectedText}
          onClose={() => setSelectedText(null)}
        />
      )}

      {selectedTaskId && (
        <TaskInfoModal
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}

      {selectedSegments && (
        <SegmentsModal
          segments={selectedSegments}
          onClose={() => setSelectedSegments(null)}
        />
      )}

      {taskToDelete && (
        <ConfirmDialog
          onConfirm={confirmDelete}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </>
  );
}
