import { useState, useRef, useEffect } from 'react';
import styles from './Filter.module.css';

import { FilterOption } from 'models/interface';
import { ReactComponent as FilterIcon } from 'assets/icons/filter.svg';


const Filter = ({ options, selectedFilter, setSelectedFilter }: { 
    options: FilterOption[], 
    selectedFilter: FilterOption,
    setSelectedFilter: React.Dispatch<React.SetStateAction<FilterOption>> 
}) => {    
    const [isOpen, setIsOpen] = useState(false);
    // const [selectedOption, setSelectedOption] = useState('선택하세요');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLUListElement>(null);

    // filter 눌렀을때 dropdown 토글
    function toggleDropdown(): void {
        setIsOpen(!isOpen);
    }
    // option 선택시 해당 option 값으로 변경
    async function handleOptionClick(option: FilterOption): Promise<void> {
        // TODO - 상태관리로 해당 버튼 눌렀을시 post data re-rendering
        // setSelectedOption(option.label);
        setSelectedFilter(option);
        setIsOpen(false);
        try {
            // TODO - 백엔드 구현 후 다시 작성
            // post 요청
            // const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         title: option.label,
            //         body: 'bar',
            //         userId: 1,
            //     }),
            //     headers: {
            //         'Content-type': 'application/json; charset=UTF-8',
            //     },
            // });
            // const data = await response.json();
            // console.log(data);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && optionsRef.current && !dropdownRef.current.contains(event.target as Node) && !optionsRef.current.contains(event.target as Node)) {
                console.log('click outside');

                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`clickable ${styles['filter']}`}>
            <div ref={dropdownRef} className={styles["selected-option"]} onClick={() => { toggleDropdown() }}>
                <FilterIcon />
                {selectedFilter ? selectedFilter.label : '선택하세요'}
            </div>
            {isOpen ? (
                <ul className={styles.options} ref={optionsRef}>
                    {options.map((option) => (
                        <li key={`option-${option.value}`} onClick={() => handleOptionClick(option)} >
                            {option.label}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}

export default Filter;