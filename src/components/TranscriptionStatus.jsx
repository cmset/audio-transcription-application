import React from 'react';

export default function TranscriptionStatus({ status }) {
  if (!status) return null;

  const getStatusColor = () => {
    switch (status.status) {
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

  return (
    <div className="mt-6 w-full max-w-md">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Task Status</h3>
          <span className={`font-medium ${getStatusColor()}`}>{status.status}</span>
        </div>
        
        {status.text && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Transcription:</h4>
            <p className="text-gray-700">{status.text}</p>
          </div>
        )}
        
        {status.error && (
          <div className="mt-4 text-red-600">
            <h4 className="text-sm font-medium mb-2">Error:</h4>
            <p>{status.error}</p>
          </div>
        )}
        
        {status.retry_count !== null && (
          <div className="mt-4 text-sm text-gray-500">
            Retry attempts: {status.retry_count}
          </div>
        )}
      </div>
    </div>
  );
}
