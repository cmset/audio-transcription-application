import React, { useRef, useState } from 'react';
import { translations } from '../translations';

export default function FileUpload({ onFileSelect, isUploading }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
      fileInputRef.current.value = '';
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only set dragging to false if we're leaving the dropzone
    if (e.currentTarget === dropZoneRef.current) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('audio/')) {
        onFileSelect(file);
      } else {
        alert(translations.fileError.audioOnly);
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <div
        ref={dropZoneRef}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-500'
          }
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="audio/*"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        
        <div className="space-y-4">
          <svg 
            className={`w-12 h-12 mx-auto ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" 
            />
          </svg>

          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              {translations.dropzone.dragText}
            </p>
            <p className="text-xs text-gray-400">
              {translations.dropzone.orText}
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {translations.dropzone.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
