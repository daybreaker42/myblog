// import { useQuery } from 'react-query';
const getArticlesByCategory = (category) => {
    return fetch(`http://localhost:3001/articles?category=${category}`)
        .then(res => res.json())
        .then(data => data);
}
const createComment = async (articleId, content) => {
    const response = await fetch(`http://localhost:3001/articles/${articleId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
    });
    if (!response.ok) {
        throw new Error('Failed to create comment');
    }
}

export { getArticlesByCategory, createComment };