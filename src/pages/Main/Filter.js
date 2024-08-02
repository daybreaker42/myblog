import React, { useState, useRef, useEffect } from 'react';
import './Filter.css';

function Filter() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('선택하세요');
    const dropdownRef = useRef(null);

    const options = [
        { value: 'option1', label: '옵션 1' },
        { value: 'option2', label: '옵션 2' },
        { value: 'option3', label: '옵션 3' },
    ];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = async (option) => {
        // TODO - 상태관리로 해당 버튼 눌렀을시 post data re-rendering
        setSelectedOption(option.label);
        setIsOpen(false);
        // console.log('선택된 값:', option.value);
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
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='filter'>
            <div className='sortbox'>
                <span>sort:</span>
                <div className="custom-dropdown" ref={dropdownRef}>
                    <div className="selected-option" onClick={toggleDropdown}>
                        {selectedOption}
                    </div>
                    {isOpen && (
                        <ul className="options">
                            {options.map((option) => (
                                <li
                                    key={option.value}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

        </div>
    );
}

export default Filter;