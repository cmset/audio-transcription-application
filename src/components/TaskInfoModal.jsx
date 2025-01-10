import React from 'react';
import { translations } from '../translations';

export default function TaskInfoModal({ taskId, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">{translations.taskInfo.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">{translations.taskInfo.id}</p>
            <p className="mt-1 font-mono text-sm break-all select-all">
              {taskId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
