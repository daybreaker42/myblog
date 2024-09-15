import React, { useState, useRef, useEffect } from 'react';
import styles from './Filter.module.css';

import { ReactComponent as FilterIcon } from 'assets/icons/filter.svg';

const options = [
    { value: 'option-1', label: '작성일 내림차순' },
    { value: 'option-2', label: '조회수 내림차순' },
    { value: 'option-3', label: '좋아요 내림차순' },
    { value: 'option-4', label: '작성일 오름차순' },
    { value: 'option-5', label: '조회수 오름차순' },
    { value: 'option-6', label: '좋아요 오름차순' },
];

const Filter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('선택하세요');
    const dropdownRef = useRef(null);
    const optionsRef = useRef(null);
    // filter 눌렀을때 dropdown 토글
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    // option 선택시 해당 option 값으로 변경
    const handleOptionClick = async (option) => {
        // TODO - 상태관리로 해당 버튼 눌렀을시 post data re-rendering
        setSelectedOption(option.label);
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
    };

    useEffect(() => {
        // TODO - options 목록 가져오기
        // fetch('https://jsonplaceholder.typicode.com/posts')
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         setPosts(data);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });

        const handleClickOutside = (event) => {
            if (dropdownRef.current && optionsRef.current && !dropdownRef.current.contains(event.target) && !optionsRef.current.contains(event.target)) {
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
        <div className={`clickable ${styles.filter}`}>
            <div ref={dropdownRef} className={styles["selected-option"]} onClick={() => { toggleDropdown() }}>
                <FilterIcon />
                {selectedOption}
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