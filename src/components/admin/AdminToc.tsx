// src/components/admin/AdminToc.tsx
import React from 'react';
import type { TocItem } from 'types/type';

interface AdminTocProps {
  className?: string;
  items?: TocItem[];
  activeId?: string;
  onItemClick?: (id: string) => void;
}

export default function AdminToc({
  className = '',
  items = [],
  activeId,
  onItemClick
}: AdminTocProps) {
  if (!items.length) {
    return (
      <div className={`bg-[#111111] border border-gray-800 rounded-lg sticky top-24 ${className}`}>
        <div className="border-b border-gray-800 px-4 py-3">
          <h2 className="font-medium">목차</h2>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-400">
            제목(#, ##, ###)을 추가하면<br />목차가 자동으로 생성됩니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-[#111111] border border-gray-800 rounded-lg sticky top-24 ${className}`}>
      <div className="border-b border-gray-800 px-4 py-3">
        <h2 className="font-medium">목차</h2>
      </div>
      <div className="p-4">
        <ul className="space-y-2 text-sm">
          {items.map((item) => {
            // 들여쓰기 계산 (heading 레벨에 따라)
            const indentClass = item.level > 1 ? `pl-${(item.level - 1) * 4}` : '';
            
            return (
              <li
                key={item.id}
                className={indentClass}
              >
                <button
                  onClick={() => onItemClick?.(item.id)}
                  className={`
                    text-left w-full hover:text-amber-500 transition-colors
                    ${item.id === activeId ? 'text-amber-500' : 'text-gray-400'}
                    ${item.level === 1 ? 'font-medium' : 'font-normal'}
                  `}
                >
                  {item.level === 1 ? '• ' : '- '}
                  {item.text}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}