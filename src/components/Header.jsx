import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import logo from '../img/ijew58rzbaalpuueu3dy-removebg-preview.png';
import styles from '../styles.module.css';

const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark" className={styles.navbar} >
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top "
                    />{' '}
                    QuoteWizard
                </Navbar.Brand>
            </Navbar>


        </>
    )
}

export default Header
