// import { useQuery } from 'react-query';
const getArticlesByCategory = (category) => {
    return fetch(`http://localhost:3001/articles?category=${category}`)
        .then(res => res.json())
        .then(data => data);
}

export { getArticlesByCategory };