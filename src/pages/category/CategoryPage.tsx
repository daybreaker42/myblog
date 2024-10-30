
// CategoryPage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { ArticleCard } from 'components/article_card/ArticleCard';
import { CategoryWithArticles, Article, ArticleWithCategory } from 'models/model';
import { supabase } from 'utils/supabase';

export const CategoryPage = () => {
  const [categories, setCategories] = useState<CategoryWithArticles[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select(`
            *,
            articles:articles(
              ${Article.getArticleDefaultColumns()}
            )
          `)
          .order('created_at', { foreignTable: 'articles', ascending: false })
          .limit(10, { foreignTable: 'articles' });

        if (error) throw error;

        const categoriesWithArticles = data.map(category => new CategoryWithArticles(category));
        setCategories(categoriesWithArticles);
      } catch (error) {
        setError(error instanceof Error ? error.message : '카테고리를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">카테고리</h1>
          <p className="text-gray-400 mb-8">
            관심있는 주제의 글을 찾아보세요
          </p>
          
          <div className="flex-1 relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="카테고리 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-3 text-gray-100 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
        </header>

        <div className="space-y-12">
          {filteredCategories.map(category => (
            <section key={category.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  {category.thumbnail_img && (
                    <img
                      src={category.thumbnail_img}
                      alt={category.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: category.color }}>
                      {category.name}
                    </h2>
                    <p className="text-gray-400">
                      게시물 {category.parseArticleCnt()}개
                    </p>
                  </div>
                </div>
                <Link
                  to={`/category/${category.id}`}
                  className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  더 보기
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.articles.slice(0, 4).map(article => (
                  <ArticleCard key={article.id} article={new ArticleWithCategory(article)} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};