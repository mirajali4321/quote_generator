import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import LoginImg from './Login_img'
import { NavLink, useNavigate } from 'react-router-dom'
import '../styles.css'

const Home = () => {
    const [errors, setErrors] = useState({});
    const [inputvalue, setinputvalue] = useState({
        name: '',
        user_name: '',
        email: '',
        password: '',
    })
    const history = useNavigate();
    // get data from input feilds and store it in usestate
    const getdata = (e) => {
        const { value, name } = e.target;
        setinputvalue(() => {
            return {
                ...inputvalue,
                [name]: value,
                value: '',
            }
        })
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ''
        }));
    }
    const addData = (e) => {
        e.preventDefault();
        const newErrors = {};
        // Validate the fields and set error messages 
        if (inputvalue.name === '') {
            newErrors.name = 'Name field is required';
        }
        if (inputvalue.user_name === '') {
            newErrors.user_name = 'Username field is required';
        }
        else if (!/^[a-zA-Z0-9]+$/.test(inputvalue.user_name)) {
            newErrors.user_name = 'Username must contain only letters and numbers';
        }
        if (inputvalue.email === '') {
            newErrors.email = 'Email field is required';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputvalue.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (inputvalue.password === '') {
            newErrors.password = 'Password field is required';
        }
        else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(inputvalue.password)) {
            newErrors.password = 'Password must contain at least 8 characters, including a letter and a number';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            history('/dashboard');
            const existingData = JSON.parse(localStorage.getItem('Userdata')) || [];
            const newUser = {
                name: inputvalue.name,
                user_name: inputvalue.user_name,
                email: inputvalue.email,
                password: inputvalue.password
            };
            // Add the new user to the existing data array
            const newData = [...existingData, newUser];
            // Store the updated user data array in localStorage
            localStorage.setItem('Userdata', JSON.stringify(newData));
            setinputvalue({
                name: '',
                user_name: '',
                email: '',
                password: ''
            });
        }
    }
    return (
        <>
            <div >
                <section className='d-flex ' >
                    <div className='left_data '>
                        <h3 className='text-center col-lg-6'>Sign Up Form</h3>
                        <Form onSubmit={addData} >
                            <Form.Group className='mb-3 col-lg-10' id='nameContainer'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' name='name' id='name' onChange={getdata} placeholder='Enter your name' />
                                {errors.name && <span className='error-message'>{errors.name}</span>}                            </Form.Group>
                            <Form.Group className='mb-3 col-lg-10' >
                                <Form.Label>Username</Form.Label>
                                <Form.Control type='text' name='user_name' onChange={getdata} placeholder='Enter your username' />
                                {errors.user_name && <span className='error-message'>{errors.user_name}</span>}                            </Form.Group>
                            <Form.Group className='mb-3 col-lg-10' >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type='email' name='email' onChange={getdata} placeholder='Enter your email' />
                                {errors.email && <span className='error-message'>{errors.email}</span>}
                            </Form.Group>
                            <Form.Group className='mb-3 col-lg-10' >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' name='password' onChange={getdata} placeholder='Create a password' />
                                {errors.password && <span className='error-message'>{errors.password}</span>}
                            </Form.Group>
                            <Button className='col-lg-8 ms-0 login_btn' type='submit'>
                                Create account
                            </Button>
                        </Form>
                        <p className='mt-3'>Already Have an Account. <span><NavLink to='/login'>Sign In</NavLink></span> </p>
                    </div>
                    <LoginImg />
                </section>
            </div>
        </>
    )
}
export default Home
