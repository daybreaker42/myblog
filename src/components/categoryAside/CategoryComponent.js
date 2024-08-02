import './CategoryComponent.css';
function CategoryComponent({ categoryComponentInstance }) {
    return (
        <div className='category-component'>
            <span>
                {categoryComponentInstance.title}
                {categoryComponentInstance.count !== undefined && `: (${categoryComponentInstance.count})`}
            </span>
        </div>
    );
}

export default CategoryComponent;