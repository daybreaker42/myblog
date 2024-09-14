import { useState, useEffect } from 'react';
import styles from './CategoryAside.module.css';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowRight } from 'assets/icons/arrow_forward.svg';

const categoriesExample = [
    {
        id: 0,
        name: 'All',
        count: 100
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
/**
 * main page 등에 사용되는 category aside component
 * 화면 왼쪽에 카테고리 목록을 보여주는 컴포넌트
 * 자식 컴포넌트로 CategoryComponent를 사용
 */
const CategoryAside = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const navigate = useNavigate();

    // server로부터 받아온 category 목록을 이용하여 category component를 생성 - TODO
    useEffect(() => {
        // fetch categories
        // const categories = await fetchCategories();
    }, []);

    const categoryComponents = categoriesExample.map((category, index) => {
        return (
            <li key={`category-component-${index}`}
                className={`${styles['category-component']} ${selectedCategory === category.id ? styles['selected'] : ''} clickable`}
                onClick={() => {
                    setSelectedCategory(category.id);
                    if (category.id === 0) {
                        navigate('/');
                    } else {
                        navigate(`/category?name=${category.name}`);
                    }
                    onClickCategory(category.id, category.name);
                }}>
                <span>{category.name} {category.count !== undefined && `(${category.count})`}
                </span>
            </li>
        );
    });

    return (
        <div className={styles["category-aside"]}>
            <section className='clickable' onClick={
                // category page로 redirect
                () => {
                    navigate('/category');
                }
            }>
                <h2>Category</h2><ArrowRight />
            </section>
            <ul>
                {categoryComponents}
            </ul>
        </div>
    )
}
/**
 * 카테고리 클릭 시 실행되는 함수
 * @param {number} id - category id
 * @param {string} categoryName - category name
 * @returns {void}
 */
const onClickCategory = (id, categoryName) => {
    // TODO - 해당 카테고리에 해당하는 글 목록을 보여주도록 구현
    console.log(`category ${categoryName} is clicked`);
};


export default CategoryAside;