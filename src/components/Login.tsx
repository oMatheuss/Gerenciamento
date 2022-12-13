import React, { FormEvent, useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBSpinner,
    MDBCardText,
}
from 'mdb-react-ui-kit';
import { useLogin } from '../services/Api';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const onError = (msg: string) => {
        setError(msg);
    }

    const [login, onLoad, isLogged] = useLogin(onError);

    const onLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let email = formData.get("email")?.valueOf() as string;
        let pass = formData.get("pass")?.valueOf() as string;
        setError("");
        if (email && pass && !isLogged && !onLoad)
            login(email, pass);
    }

    useEffect(() => {
        if (isLogged) {
            navigate("/home");
        }
    }, [isLogged, navigate]);

    return (
        <MDBContainer className='h-100' fluid>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol className='col-12'>

                    <form onSubmit={onLogin} autoComplete="off" >
                        <MDBCard className='bg-dark text-white mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                            <MDBCardBody className='py-5 px-sm-5 d-flex flex-column align-items-center mx-auto w-100'>

                                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                <p className="text-white-50 mb-3">Entre com email e senha!</p>

                                <MDBInput wrapperClass='mb-4 w-100' label='Email' name='email' type='email' size="lg" contrast readOnly={onLoad} />
                                <MDBInput wrapperClass='mb-4 w-100' label='Senha' name='pass' type='password' size="lg" contrast readOnly={onLoad} />



                                <MDBBtn type="submit" outline className='mx-2 px-5 mb-4' color='light' size='lg' disabled={onLoad} >
                                    {
                                        onLoad
                                            ? <MDBSpinner size='lg' role='status' tag='span' />
                                            : "Login"
                                    }
                                </MDBBtn>

                                <p className="small fw-bold mt-2 pt-1 mb-0">Não tem uma conta?
                                    <Link to='/signup' className="link-danger" >Registre-se</Link>
                                </p>

                                <MDBCardText className='small fw-bold text-danger' >
                                    {error}
                                </MDBCardText>

                            </MDBCardBody>
                        </MDBCard>
                    </form>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}

export default Login;