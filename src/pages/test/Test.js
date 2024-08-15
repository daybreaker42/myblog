import React, { useEffect, useRef } from 'react';
import { supabase } from 'utils/supabase';
import { Helmet } from "react-helmet-async";
import config from '../../config';

// components
import Nav from 'components/nav/Nav';

import './Test.css';

/**
 * Test component
 * 
 * @returns {JSX.Element}
 */
const Test = () => {
    const [tests, setTests] = React.useState([]);
    useEffect(() => {
        async function getTodos() {
            let { data: tests, error } = await supabase
                .from('test')
                .select('*');
            console.log(tests);
            if (tests.length > 1) {
                setTests(tests);
            }
        }

        getTodos();
        console.log(config);
    }, []);

    return (
        <>
            <Helmet>
                <title>Test page | {`${config.appName}`}</title>
                <meta name='description' content='Test page' />
            </Helmet>
            <header >
                <Nav />
            </header>
            <main>
                <h1>Test</h1>
                <h2>data list - ({tests.length})</h2>
                <ul className='test-table'>
                    {tests.filter(test => test.isPinned).map(test => (
                        <li key={test.id} className='table-row'>
                            <h3>{test.title}</h3>
                            <p>{test.content}</p>
                        </li>
                    ))}
                </ul>
                <ul className='test-table'>
                    {tests.filter(test => !test.isPinned).map(test => (
                        <li key={test.id} className='table-row'>
                            <h3>{test.title}</h3>
                            <p>{test.content}</p>
                        </li>
                    ))}
                </ul>

                <Form />
            </main>
        </>
    );
}
function Form() {
    const form = useRef(null);
    const handleSubmit = (event) => {
        event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.
        if (!event.target[0].value || !event.target[1].value) {
            return;
        }

        // console.log('form submitted');
        console.log(`title: ${event.target[0].value}`);
        console.log(`content: ${event.target[1].value}`);

        // data 삭제
        form.current.reset();
    };

    return (
        <section className='test-form'>
            <form ref={form} onSubmit={handleSubmit}>
                <input type='text' placeholder='title' />
                <textarea placeholder='content'></textarea>
                <button type='submit'>submit</button>
            </form>
        </section>
    );
}

export default Test;