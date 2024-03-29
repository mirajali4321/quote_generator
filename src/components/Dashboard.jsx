import React, { useEffect, useState } from 'react';
import Quotes from './Quotes';
import { useNavigate } from 'react-router-dom'
import fetch_api from '../Api/fetch_api';

const Dashboard = () => {
    const [magicQuote, setMagicQuote] = useState('');
    const [logindata, setlogindata] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        fetchMagicQuote();
        const getuser = localStorage.getItem('user_login');
        if (getuser && getuser.length) {
            const userData = JSON.parse(getuser);
            setlogindata(userData);
        }
    }, []);

    // Fetch Api
    const fetchMagicQuote = async () => {
        try {
            const randomQuote = await fetch_api();
            setMagicQuote(randomQuote);
        } catch (error) {
            console.error('Error fetching magic quote:', error);
        }
    };

    return (
        <>
            {
                logindata.length === 0 ? history('/login') :
                    <>
                        <section className='d-flex main'>
                            <div className='dash_left_data '>
                                <div className='App'>
                                    <h1>Magic Quote Generator</h1>
                                    <hr />
                                    {magicQuote && (
                                        <div className='quote-container'>
                                            <h4>❝  {magicQuote.text} ❞</h4>
                                            <p>- {magicQuote.author}</p>
                                        </div>
                                    )}
                                    <button className='magic_button' onClick={fetchMagicQuote}>Generate Magic Quote</button>
                                </div>
                            </div>
                            <Quotes />
                        </section>
                    </>
            }
        </>
    )
}
export default Dashboard

