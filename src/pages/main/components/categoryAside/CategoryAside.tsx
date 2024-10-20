import { useState } from 'react';
import styles from './CategoryAside.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { ReactComponent as ArrowRight } from 'assets/icons/arrow_forward.svg';

import { supabase } from 'utils/supabase';
import { useQuery } from '@tanstack/react-query';
import { Category } from 'models/model';
import LoadingBlock from 'components/loading/loading/LoadingBlock';


// const categoriesExample = [
//     {
//         id: 0,
//         name: 'All',
//         count: 100
//     },
//     {
//         id: 1,
//         name: 'category1',
//         count: 5
//     },
//     {
//         id: 2,
//         name: 'category2',
//         count: 3
//     },
//     {
//         id: 3,
//         name: 'category3',
//         count: 2
//     }
// ];

async function getCategoryList() {
    const { data, error } = await supabase
        .from('category')
        .select('*')
        .order('article_cnt', { ascending: false })
        .limit(5);

    if (error) {
        console.error('error', error);
        throw Error(error.message);
    }

    return data.map((category) => new Category(category));
}

/**
 * main page 등에 사용되는 category aside component
 * 화면 왼쪽에 카테고리 목록을 보여주는 컴포넌트
 * 자식 컴포넌트로 CategoryComponent를 사용
 */
const CategoryAside = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['categoryList'],
        queryFn: getCategoryList,
    })

    if(isPending) return <LoadingBlock />;
    if(isError) return <p>Error: {error.message}</p>;

    return (
        <div className={styles["category-aside"]}>
            <Link className='clickable' to='/category'>
                <h2>Category</h2>
                <ArrowRight />
            </Link>
            <ul>
                {data.map((category, index) => (
                    <Link to={`/category/${category.name}`} key={`category-component-${index}`} className={`${styles['category-component']} clickable`}>
                        {category.name} &#40;{category.article_cnt}&#41;
                    </Link>
                ))}
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
// const onClickCategory = (id, categoryName) => {
//     // TODO - 해당 카테고리에 해당하는 글 목록을 보여주도록 구현
//     console.log(`category ${categoryName} is clicked`);
// };


export default CategoryAside;