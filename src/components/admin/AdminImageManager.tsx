// src/components/admin/AdminImageManager.tsx
import React, { useState, useRef } from 'react';
import { uploadToCloudinary } from 'utils/cloudinary';

interface AdminImageManagerProps {
  isVisible: boolean;
  onClose: () => void;
  onOpen: () => void;
  onImageUpload?: (imageUrl: string) => void;
}

interface UploadingImage {
  id: string;
  file: File;
  preview: string;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
}

export default function AdminImageManager({
  isVisible,
  onClose,
  onOpen,
  onImageUpload
}: AdminImageManagerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<UploadingImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    await handleFiles(files);
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      await handleFiles(files);
    }
  };

  const handlePaste = async (e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    const files: File[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) files.push(file);
      }
    }

    if (files.length > 0) {
      await handleFiles(files);
    }
  };

  React.useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  const handleFiles = async (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    const newImages: UploadingImage[] = imageFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      status: 'uploading'
    }));

    setImages(prev => [...prev, ...newImages]);

    for (const image of newImages) {
      try {
        const imageUrl = await uploadToCloudinary(image.file);
        
        setImages(prev => prev.map(img => 
          img.id === image.id 
            ? { ...img, status: 'completed', url: imageUrl }
            : img
        ));

        onImageUpload?.(imageUrl);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        setImages(prev => prev.map(img => 
          img.id === image.id 
            ? { ...img, status: 'error' }
            : img
        ));
      }
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={onOpen}
        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#111111] border border-gray-800 rounded-lg hover:border-amber-500"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        이미지 업로드
      </button>
    );
  }

  return (
    <div className="bg-[#111111] border border-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">이미지 관리자</h3>
        <button onClick={onClose}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* 드래그 앤 드롭 영역 */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          ${isDragging ? 'border-amber-500 bg-amber-500/10' : 'border-gray-700'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className="text-sm text-gray-400">
          이미지를 드래그하거나 클릭하여 업로드<br/>
          <span className="text-xs">또는 Ctrl+V로 붙여넣기</span>
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileInput}
        />
      </div>

      {/* 업로드된 이미지 목록 */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {images.map((image) => (
            <div key={image.id} className="relative aspect-square group">
              <img
                src={image.preview}
                alt="업로드된 이미지"
                className="w-full h-full object-cover rounded"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {image.status === 'uploading' && (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-amber-500 border-t-transparent"/>
                )}
                {image.status === 'completed' && image.url && (
                  <button
                    onClick={() => onImageUpload?.(image.url!)}
                    className="text-sm text-white hover:text-amber-500"
                  >
                    에디터에 삽입
                  </button>
                )}
                {image.status === 'error' && (
                  <span className="text-sm text-red-500">업로드 실패</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}