// ArticleCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Eye, Heart, MessageSquare, Clock } from 'lucide-react';
import { ArticleWithCategory } from 'models/model';

interface ArticleCardProps {
  article: ArticleWithCategory;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <article className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-500 transition-all duration-300 group">
      <Link to={`/article/${article.slug}`} className="block">
        {article.thumbnailImg && (
          <div className="aspect-video relative overflow-hidden">
            <img
              src={article.thumbnailImg}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex gap-2 mb-3">
            <Link 
              to={`/category/${article.category.id}`}
              className={`text-sm px-3 py-1 rounded-full hover:opacity-90 transition-colors`}
              style={{ backgroundColor: article.category.color }}
              onClick={(e) => e.stopPropagation()}
            >
              {article.category.name}
            </Link>
            {article.tags.slice(0, 2).map(tag => (
              <Link
                key={tag.id}
                to={`/tag/${tag.id}`}
                className="text-sm px-3 py-1 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {tag.name}
              </Link>
            ))}
          </div>
          
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
            {article.title}
          </h3>
          
          <p className="text-gray-400 mb-4 line-clamp-3">
            {article.content.replace(/<[^>]*>/g, '').slice(0, 150)}...
          </p>
          
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {article.getFormattedDate()}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {article.readingTime}분
            </span>
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {article.view_cnt.toLocaleString()}
            </span>
            <span className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              {article.like_cnt.toLocaleString()}
            </span>
            <span className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-1" />
              {article.comment_cnt}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};
