import React from 'react';
import { translations } from '../translations';

export default function TranscriptionModal({ text, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">{translations.modal.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="whitespace-pre-wrap break-words select-all">
              {text}
            </p>
          </div>
        </div>

        <div className="p-4 border-t">
          <p className="text-sm text-gray-500">{translations.modal.selectText}</p>
        </div>
      </div>
    </div>
  );
}
