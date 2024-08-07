import { useEffect } from 'react';
import './CategoryAside.css';

/**
 * main page 등에 사용되는 category aside component
 * 화면 왼쪽에 카테고리 목록을 보여주는 컴포넌트
 * 자식 컴포넌트로 CategoryComponent를 사용
 */
function CategoryAside({ categories }) {

    // server로부터 받아온 category 목록을 이용하여 category component를 생성 - TODO
    useEffect(() => {
        // fetch categories
        // const categories = await fetchCategories();
    }, []);
    const categoriesExample = [
        {
            id: 0,
            name: 'All'
        },
        {
            id: 1,
            name: 'category1',
            count: 5
        },
        {
            id: 2,
            name: 'category2',
            count: 3
        },
        {
            id: 3,
            name: 'category3',
            count: 2
        }
    ];
    const categoryComponents = categoriesExample.map((category, index) => {
        return <CategoryComponent key={`category-${index}`} categoryComponentInstance={category} />
    });

    return (
        <div className="category-aside">
            <span className="category-aside-title">Category</span>
            {categoryComponents}
        </div>
    )
}

function CategoryComponent({ categoryComponentInstance }) {
    const onClickCategory = (categoryName) => {
        // TODO - 해당 카테고리에 해당하는 글 목록을 보여주도록 구현
        console.log(`category ${categoryName} is clicked`);
    }

    return (
        <div className='category-component' onClick={() => { onClickCategory(categoryComponentInstance.name) }}>
            <span>
                {categoryComponentInstance.name}
                {categoryComponentInstance.count !== undefined && `(${categoryComponentInstance.count})`}
            </span>
        </div>
    );
}

export default CategoryAside;