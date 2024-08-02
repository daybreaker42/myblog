import CategoryComponent from "./CategoryComponent";
import './CategoryAside.css';

/**
 * main page 등에 사용되는 category aside component
 * 화면 왼쪽에 카테고리 목록을 보여주는 컴포넌트
 * 자식 컴포넌트로 CategoryComponent를 사용
 */
function CategoryAside() {
    const categoryExample = {
        title: 'category1',
        count: 10
    };
    const categoryExample1 = {
        title: 'category1'
    };

    // server로부터 받아온 category 목록을 이용하여 category component를 생성
    // const categories = await fetchCategories();
    // const categoryComponents = categories.map(category => {
    //     return <CategoryComponent categoryComponentInstance={category} />
    // });

    return (
        <div className="category-aside">
            <span className="category-aside-title">Category</span>
            <CategoryComponent categoryComponentInstance={categoryExample} />
            <CategoryComponent categoryComponentInstance={categoryExample} />
            <CategoryComponent categoryComponentInstance={categoryExample1} />
        </div>
    )
}

export default CategoryAside;