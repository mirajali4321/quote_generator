import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import LoginImg from './Login_img'
import { NavLink, useNavigate } from 'react-router-dom'

const SignIn = () => {
    const history = useNavigate()
    const [errors, setErrors] = useState({});
    const [inputvalue, setinputvalue] = useState({
        email: "",
        password: "",
    })
    // get data from input feilds and store it in usestate
    const getdata = (e) => {
        const { value, name } = e.target;
        setinputvalue(() => {
            return {
                ...inputvalue,
                [name]: value,
                value: "",
            }
        })
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ''
        }));
    }
    const addData = (e) => {
        e.preventDefault();
        const getUserArr = localStorage.getItem("Userdata")
        const newErrors = {};
        // Validate the fields and set error messages 
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

            if (getUserArr && getUserArr.length) {
                const userdata = JSON.parse(getUserArr);
                const userLogin = userdata.filter((element, key) => {
                    return element.email === inputvalue.email && element.password === inputvalue.password
                });
                if (userLogin.length === 0) {
                    newErrors.email = 'Invalid username or password.';
                } else {
                    console.log('user login successfully');
                    localStorage.setItem("user_login", JSON.stringify(userLogin))
                    history("/dashboard");
                }
            }
        }
    }
    return (
        <>
            <div >
                <section className='d-flex ' >
                    <div className="left_data " style={{ width: "100%" }}>
                        <h2 className=' mb-4 col-lg-6'>Sign In Form</h2>
                        <Form onSubmit={addData} >
                            <Form.Group className="mb-3 col-lg-10" >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter your email" />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-10" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Create a password" />
                                {errors.password && <span className="error-message">{errors.password}</span>}
                            </Form.Group>
                            <Button className='col-lg-8 ms-0 login_btn' type="submit">
                                Sign In
                            </Button>
                        </Form>
                        <p className='mt-3'>Don't have an account?  <NavLink to="/">Sign Up</NavLink>  .</p>
                    </div>
                    <LoginImg />
                </section>
            </div>
        </>
    )
}
export default SignIn
