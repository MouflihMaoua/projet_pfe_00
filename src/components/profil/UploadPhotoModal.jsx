import { useState, useRef } from 'react';
import { UploadCloud, X } from 'lucide-react';

export default function UploadPhotoModal({ 
  onUploadSuccess, 
  acceptedFileTypes = ['image/jpeg', 'image/png', 'image/webp'], 
  maxFileSize = 5 * 1024 * 1024 
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;
    
    if (!acceptedFileTypes.includes(file.type)) {
      alert('Type de fichier non supporté');
      return;
    }
    
    if (file.size > maxFileSize) {
      alert('Fichier trop volumineux');
      return;
    }
    
    // Simuler l'upload
    setUploading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          onUploadSuccess(file);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging 
          ? 'border-blue-500 bg-blue-50' 
          : uploading 
            ? 'border-gray-300 bg-gray-50' 
            : 'border-gray-300 hover:border-gray-400'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFileTypes.join(',')}
        onChange={handleFileInput}
        className="hidden"
      />
      
      <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      
      {!uploading ? (
        <>
          <p className="text-gray-600 mb-2">
            Glissez-déposez un fichier ici ou{' '}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              parcourez
            </button>
          </p>
          <p className="text-sm text-gray-500">
            Formats acceptés: {acceptedFileTypes.map(type => type.split('/')[1]).join(', ')}
          </p>
          <p className="text-sm text-gray-500">
            Taille maximale: {Math.round(maxFileSize / 1024 / 1024)}MB
          </p>
        </>
      ) : (
        <div>
          <p className="text-gray-600 mb-2">Upload en cours...</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{progress}%</p>
        </div>
      )}
    </div>
  );
}
