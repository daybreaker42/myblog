import './CategoryAside.css';

/**
 * main page 등에 사용되는 category aside component
 * 화면 왼쪽에 카테고리 목록을 보여주는 컴포넌트
 * 자식 컴포넌트로 CategoryComponent를 사용
 */
function CategoryAside() {

    // server로부터 받아온 category 목록을 이용하여 category component를 생성 - TODO
    // const categories = await fetchCategories();
    const categories = [
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
    const categoryComponents = categories.map(category => {
        return <CategoryComponent categoryComponentInstance={category} />
    });

    return (
        <div className="category-aside">
            <span className="category-aside-title">Category</span>
            {categoryComponents}
        </div>
    )
}

function CategoryComponent({ categoryComponentInstance }) {
    return (
        <div className='category-component'>
            <span>
                {categoryComponentInstance.name}
                {categoryComponentInstance.count !== undefined && `: (${categoryComponentInstance.count})`}
            </span>
        </div>
    );
}

export default CategoryAside;