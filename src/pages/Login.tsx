import { Formik, Form as FForm, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";
import { loginCheck } from "../store/services/Auth.service";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import logo from '../asset/logo/logo.png';


function Login() {

    const dispatch = useAppDispatch();
    const validateForm = Yup.object().shape({
        email: Yup.string().required("Please enter login email address").email("Enter your email address"),
        password: Yup.string().required("Enter your login password.").min(8, "Minimum 8 character password required")
    })

    const profile = useAppSelector((state) => state.profile)
    const userData = profile.userStatus
    let navigate = useNavigate();

    const loginForm = async (values: any) => {
       let login_data = await dispatch(loginCheck(values))
       if (login_data.payload!=null ) {
        navigate('/dashboard')
       }else{
        Swal.fire({
            title: "Login Failed",
            html: "Enter wrong credential",
            icon: 'error'
          })
       }
    }




    return (<>
        <Container className="mt-5" >
            <Row className="justify-content-center">
                <Col xl={6} >
                    <Card>
                        {/* <Card.Header><h4> Login </h4></Card.Header> */}
                        <Card.Body className="login-card" >
                            <div className="text-center mt-4 name">
                                Todo Login
                            </div>
                            <Formik initialValues={{ email: '', password: '' }} onSubmit={loginForm} validationSchema={validateForm}  >
                                <FForm>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Email</Form.Label>
                                        <Field name="email" className="form-control" type="text" placeholder="Email" />
                                        <ErrorMessage component="span" className="text-danger" name="email" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Field name="password" type="password" className="form-control" placeholder="Password" />
                                        <ErrorMessage component="span" className="text-danger" name="password" />
                                    </Form.Group>
                                    <div className="d-grid gap-2 mb-3">
                                        <Button variant="secondary" disabled={profile.loading} type="submit" > Login </Button>
                                    </div>
                                </FForm>
                            </Formik>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>);
}

export default Login;