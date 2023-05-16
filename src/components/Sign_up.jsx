import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import LoginImg from './Login_img'
import '../styles.css'



const Home = () => {
    return (
        <>
            <div >
                <section className='d-flex ' >
                    <div className="left_data " style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>Sign Up</h3>
                        <Form >
                            <Form.Group className="mb-3 col-lg-8" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name='name' placeholder="Enter your name" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-8" >
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name='user_name' placeholder="Enter your username" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-8" >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name='email' placeholder="Enter your email" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-8" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name='password' placeholder="Create a password" />
                            </Form.Group>
                            <Button  className='col-lg-8 login_btn' type="submit">
                                Create account
                            </Button>
                        </Form>
                        <p className='mt-3'>Already Have an Account <span></span> </p>
                    </div>
                    <LoginImg />
                </section>
            </div>
        </>
    )
}

export default Home
