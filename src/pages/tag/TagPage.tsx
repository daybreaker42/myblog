// TagPage.tsx
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tag } from 'models/model';
import { supabase } from 'utils/supabase';

export const TagPage = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('article_cnt', { ascending: false });

      if (!error && data) {
        setTags(data.map(tag => new Tag(tag)));
      }
      setIsLoading(false);
    };

    fetchTags();
  }, []);

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTagSize = (articleCount: number) => {
    if (articleCount >= 50) return 'text-2xl';
    if (articleCount >= 30) return 'text-xl';
    if (articleCount >= 10) return 'text-lg';
    return 'text-base';
  };

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">태그</h1>
          <p className="text-gray-400 mb-8">
            관심있는 태그를 찾아보세요
          </p>
          
          <div className="flex-1 relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="태그 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-3 text-gray-100 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
        </header>

        <div className="bg-gray-800 rounded-lg p-8">
          <div className="flex flex-wrap gap-4">
            {filteredTags.map(tag => (
              <Link
                key={tag.id}
                to={`/tag/${tag.id}`}
                className={`${getTagSize(tag.article_cnt)} text-gray-400 hover:text-white transition-colors`}
              >
                #{tag.name}
                <span className="text-sm ml-1 text-gray-500">
                  ({tag.article_cnt})
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

