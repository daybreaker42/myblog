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

    const handleOptionClick = (option) => {
        setSelectedOption(option.label);
        setIsOpen(false);
        console.log('선택된 값:', option.value);
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
    );
}

export default Filter;