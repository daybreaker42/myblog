import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import './SearchBar.css';

function SearchBar() {
    const search = (e) => {
        console.log(`searching for ${e.target.value}`);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            search(e);
        }
    }

    return (
        <div className='searchBarComponent'>
            <div className='searchBar'>
                <input className='searchInput' type='text' placeholder='type here...' onKeyDown={handleKeyDown} />
                <button><SearchIcon /></button>
            </div>
        </div >
    );
}



export default SearchBar;