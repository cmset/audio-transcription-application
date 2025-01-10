import React from 'react';
import { translations } from '../translations';

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = (seconds % 60).toFixed(3);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.padStart(6, '0')}`;
}

export default function SegmentsModal({ segments, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">{translations.segments.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {segments.map((segment, index) => (
              <div 
                key={index}
                className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-48 flex-shrink-0 text-sm text-gray-500 font-mono">
                  {formatTime(segment.start)} - {formatTime(segment.end)}
                </div>
                <div className="flex-1 text-gray-900">
                  {segment.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
