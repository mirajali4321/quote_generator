import React, { useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import logo from '../img/ijew58rzbaalpuueu3dy-removebg-preview.png';
import { useNavigate, useLocation } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles.css';

const Header = () => {
    const history = useNavigate();
    const location = useLocation();
    const [logindata, setlogindata] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [savedQuotes, setSavedQuotes] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const getuser = localStorage.getItem('user_login');
        if (getuser && getuser.length) {
            const userData = JSON.parse(getuser);
            setlogindata(userData);
        }
    }, [])
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (logindata) {
            const getlistdata = localStorage.getItem(`user_quotes_${logindata[0].email}`);
            if (getlistdata) {
                const parsedData = JSON.parse(getlistdata);
                if (Array.isArray(parsedData.quotes)) {
                    const filteredQuotes = parsedData.quotes.filter(
                        (quote) => quote.quote.toLowerCase() === searchQuery.toLowerCase()
                    );
                    console.log(filteredQuotes); // Display the filtered quotes in the console
                    setSavedQuotes(filteredQuotes);
                }
            }
            document.getElementById('search').value = '';
            handleShow();
        }
    };
    const handlelogout = () => {
        localStorage.removeItem('user_login');
        history('/login');
    }
    const isLoginPage = location.pathname === '/login';
    const isSignupPage = location.pathname === '/';
    return (
        <>
            <Navbar  className='navbar bg-dark' >
                <Navbar.Brand className='text-white' >
                    <img
                        alt=''
                        src={logo}
                        className='d-inline-block align-top custom-navbar'
                    />{' '}
                    QuoteWizard
                </Navbar.Brand>
                {logindata && !isLoginPage && !isSignupPage && (
                    <>
                        <form className='search_form' onSubmit={handleSearchSubmit} s>
                            <div className='search_bar'>
                                <input type='text' id='search' placeholder='Search' onChange={handleSearchInputChange} />
                                <button type='submit' className='icon'><span ><FaSearch /></span></button>
                            </div>
                        </form>

                        <button className='logout_btn' onClick={handlelogout}>
                            Logout
                        </button>
                    </>
                )}
            </Navbar>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Your Inspirational Quote is </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {searchQuery === '' ? (
                        <div className='error-message'>Please enter a search query</div>
                    ) : savedQuotes.length === 0 ? (
                        <div className='error-message'>No matching quotes found</div>
                    ) : (
                        savedQuotes.map((quote) => (
                            <div key={quote.id}>{quote.quote}</div>
                        ))
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Header
