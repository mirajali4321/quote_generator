import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Home = () => {
    return (
        <>
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>Sign Up</h3>
                        <Form >
                            <Form.Group className="mb-3 col-lg-6" >
                                <Form.Control type="text" name='name' placeholder="Name" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" >
                                <Form.Control type="text" name='user_name' placeholder="UserName" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" >
                                <Form.Control type="email" name='email' placeholder="Email" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" >
                                <Form.Control type="password" name='password' placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" className='col-lg-6' type="submit">
                                Submit
                            </Button>
                        </Form>
                        <p className='mt-3'>Already Have an Account <span></span> </p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Home
