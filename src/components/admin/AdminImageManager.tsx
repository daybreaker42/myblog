// src/components/admin/AdminImageManager.tsx
import React from 'react';
import { Upload, X, Copy, Trash } from 'lucide-react';
import type { UploadImage } from 'types/type';

interface AdminImageManagerProps {
  isVisible: boolean;
  onClose: () => void;
  onOpen: () => void;
  images?: UploadImage[];
  onUpload?: (files: FileList) => void;
  onCopy?: (url: string) => void;
  onDelete?: (id: string) => void;
}

export default function AdminImageManager({
  isVisible = true,
  onClose,
  onOpen,
  images = [],
  onUpload,
  onCopy,
  onDelete
}: AdminImageManagerProps) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && onUpload) {
      onUpload(files);
    }
  };

  if (!isVisible) return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium">이미지 관리</h2>
          <span className="text-xs text-gray-400">
            업로드된 이미지 {images.length}개
          </span>
        </div>
        <button 
          className="text-xs text-amber-500 hover:text-amber-400"
          onClick={onOpen}
        >
          펼치기
        </button>
      </div>
    </div>
  );

  // 모바일에서만 완전히 숨김
  if (!isVisible && window.innerWidth < 640) return null;
  
  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium">이미지 관리</h2>
          <span className="text-xs text-gray-400">
            업로드된 이미지 {images.length}개
          </span>
        </div>
        <button 
          className="text-xs text-amber-500 hover:text-amber-400"
          onClick={onClose}
        >
          접기
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Upload Area */}
        <div 
          className="bg-[#111111] border-2 border-dashed border-gray-800 rounded-lg p-6 hover:border-amber-500/50 transition-colors"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <Upload className="w-8 h-8 text-gray-400" />
            <div className="space-y-1">
              <p className="text-sm text-gray-400">이미지를 드래그하여 업로드</p>
              <p className="text-xs text-gray-500">또는</p>
              <label className="px-4 py-1.5 bg-[#1a1a1a] text-sm border border-gray-800 rounded-lg hover:border-amber-500 transition-colors cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={(e) => e.target.files && onUpload?.(e.target.files)}
                />
                파일 선택
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              클립보드에서 붙여넣기도 가능합니다 (Ctrl/Cmd + V)
            </p>
          </div>
        </div>

        {/* Image Grid */}
        <div className="bg-[#111111] border border-gray-800 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-2">
            {images.map((image) => (
              <div key={image.id} className="group relative aspect-square">
                <img
                  src={image.url}
                  alt={`Uploaded ${image.id}`}
                  className="w-full h-full object-cover rounded-lg border border-gray-800"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                  <button 
                    className="p-1 text-gray-200 hover:text-amber-500 transition-colors"
                    onClick={() => onCopy?.(image.url)}
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button 
                    className="p-1 text-gray-200 hover:text-red-500 transition-colors"
                    onClick={() => onDelete?.(image.id)}
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}