import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React, { useState, useEffect } from 'react';


const Quotes = () => {
    const [quote, setQuote] = useState('');
    const [savedQuotes, setSavedQuotes] = useState([]);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getuser = localStorage.getItem('user_login');
        if (getuser && getuser.length) {
            const userData = JSON.parse(getuser);
            setUser(userData);
            if (userData.quotes) {
                setSavedQuotes(userData.quotes);
            } else {
                setSavedQuotes([]);
            }
        }

    }, []);


    useEffect(() => {
        if (user) {
            const userKey = `user_quotes_${user[0].email}`;
            const userQuotes = localStorage.getItem(userKey);
            if (userQuotes) {
                const parsedQuotes = JSON.parse(userQuotes);
                setSavedQuotes(parsedQuotes.quotes || []);
            } else {
                setSavedQuotes([]);
            }
        }
    }, [user]);

    const handleInputChange = (e) => {
        setQuote(e.target.value);
        setError(false);
    };

    const generateRandomId = () => {
        return Math.floor(Math.random() * 1000000);
    };

    const handleSaveQuote = (e) => {
        e.preventDefault();

        if (user) {

            const trimmedQuote = quote.trim();
            if (trimmedQuote === "") {
                setError(true);
                return;
            }
            const newQuote = {
                id: generateRandomId(),
                quote: quote
            };

            const updatedQuotes = [...savedQuotes, newQuote];
            setSavedQuotes(updatedQuotes);


            const updatedUserData = {
                ...user,
                quotes: updatedQuotes
            };

            const user_quotes_key = localStorage.getItem(`user_quotes_${user[0].email}`);
            if (user_quotes_key) {
                const existingUserData = JSON.parse(user_quotes_key);

                const updatedQuotesWithoutDuplicates = updatedQuotes.filter((quote) => {
                    return !existingUserData.quotes.some((existingQuote) => existingQuote.id === quote.id);
                });

                const mergedUserData = {
                    ...existingUserData,
                    quotes: [...existingUserData.quotes, ...updatedQuotesWithoutDuplicates]
                };
                localStorage.setItem(`user_quotes_${user[0].email}`, JSON.stringify(mergedUserData));
            } else {
                localStorage.setItem(`user_quotes_${user[0].email}`, JSON.stringify(updatedUserData));
            }

            setQuote('');
            document.getElementById('quoteInput').value = '';
        }
    };

    return (
        <>

            <div className='dash_right_data '>
                <div className="centered">
                    <h1>User Quotes</h1>
                    <div className=''>
                        <Form onSubmit={handleSaveQuote} >
                            <h3>Create your own Quotes</h3>
                            <Form.Group className="mb-3 col-lg-10" id="nameContainer">
                                <Form.Control type="text" id='quoteInput' onChange={handleInputChange} placeholder="Enter your quote here" />
                                {error && <div className="error-message">Please enter a quote.</div>}
                            </Form.Group>
                            <Button className='col-lg-3 ms-0 login_btn' type="submit">
                                Add Quotes
                            </Button>
                        </Form>
                    </div>
                    <ul>
                        {savedQuotes.map((savedQuote, index) => (
                            <li key={savedQuote.id} className={`fade-in delay-${index}`}>
                                {savedQuote.quote}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


        </>

    );
};

export default Quotes;











