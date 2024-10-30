// // Pagination.tsx
import React, { useState } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

// export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
//     // 보여줄 페이지 범위 계산
//     const getPageNumbers = () => {
//       const delta = 2; // 현재 페이지 앞뒤로 보여줄 페이지 수
//       const range = [];
//       const rangeWithDots = [];
      
//       for (
//         let i = Math.max(2, currentPage - delta);
//         i <= Math.min(totalPages - 1, currentPage + delta);
//         i++
//       ) {
//         range.push(i);
//       }
  
//       if (currentPage - delta > 2) {
//         rangeWithDots.push(1, '...');
//       } else {
//         rangeWithDots.push(1);
//       }
  
//       rangeWithDots.push(...range);
  
//       if (currentPage + delta < totalPages - 1) {
//         rangeWithDots.push('...', totalPages);
//       } else if (totalPages > 1) {
//         rangeWithDots.push(totalPages);
//       }
  
//       return rangeWithDots;
//     };
  
//     return (
//       <nav className="flex justify-center mt-8">
//         <ul className="flex items-center gap-2">
//           <li>
//             <button
//               onClick={() => onPageChange(Math.max(1, currentPage - 1))}
//               disabled={currentPage === 1}
//               className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               이전
//             </button>
//           </li>
          
//           {getPageNumbers().map((page, index) => (
//             <li key={index}>
//               {typeof page === 'number' ? (
//                 <button
//                   onClick={() => onPageChange(page)}
//                   className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
//                     currentPage === page
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ) : (
//                 <span className="w-10 h-10 flex items-center justify-center text-gray-400">
//                   {page}
//                 </span>
//               )}
//             </li>
//           ))}
          
//           <li>
//             <button
//               onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
//               disabled={currentPage === totalPages}
//               className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               다음
//             </button>
//           </li>
//         </ul>
//       </nav>
//     );
//   };

// import React, { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange } : PaginationProps) => {
  // 샘플 데이터
  const data = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`
  }));

  // 페이지네이션 상태
//   const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // 현재 페이지의 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
  // 전체 페이지 수 계산
//   const totalPages = Math.ceil(data.length / itemsPerPage);
  
  // 페이지 번호 배열 생성 (최대 5개 표시)
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* 아이템 목록 */}
      <div className="mb-4">
        {currentItems.map(item => (
          <div key={item.id} className="p-2 mb-2 border rounded">
            {item.title}
          </div>
        ))}
      </div>
      
      {/* 페이지네이션 컨트롤 */}
      <div className="flex justify-center items-center space-x-2">
        {/* 이전 페이지 버튼 */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          &lt;
        </button>
        
        {/* 페이지 번호 */}
        {getPageNumbers().map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 border rounded
              ${currentPage === number ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
          >
            {number}
          </button>
        ))}
        
        {/* 다음 페이지 버튼 */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
      
      {/* 페이지 정보 표시 */}
      <div className="text-center mt-2 text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;