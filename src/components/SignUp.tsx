import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBContainer, MDBInput, MDBRow, MDBSpinner } from 'mdb-react-ui-kit';
import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUp } from '../services/Api';

function SignUp() {

    const navigate = useNavigate();

    const [error, setError] = useState("");

    const onError = (msg: string) => {
        setError(msg);
    }

    const [signup, onLoad, isSuccess] = useSignUp(onError);

    useEffect(() => {
        if (isSuccess) {
            navigate("/");
        }
    }, [isSuccess]);

    const onRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let name = formData.get("name")?.valueOf() as string;
        let email = formData.get("email")?.valueOf() as string;
        let pass = formData.get("pass")?.valueOf() as string;
        setError("");
        if (name && email && pass && !isSuccess && !onLoad)
            signup(name, email, pass);
    }

    return (
        <MDBContainer className='h-100' fluid>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol className='col-12'>

                    <form onSubmit={onRegister} autoComplete="off" >
                        <MDBCard className='bg-dark text-white mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                            <MDBCardBody className='py-5 px-sm-5 d-flex flex-column align-items-center mx-auto w-100'>

                                <h2 className="fw-bold mb-2 text-uppercase">Cadastre-se</h2>
                                <p className="text-white-50 mb-3">Informe seus dados!</p>

                                <MDBInput wrapperClass='mb-4 w-100' label='Nome' name='name' type='text' size="lg" contrast readOnly={onLoad} />
                                <MDBInput wrapperClass='mb-4 w-100' label='Email' name='email' type='email' size="lg" contrast readOnly={onLoad} />
                                <MDBInput wrapperClass='mb-4 w-100' label='Senha' name='pass' type='password' size="lg" contrast readOnly={onLoad} />

                                <MDBBtn type="submit" outline className='mx-2 px-5 mb-4' color='light' size='lg' disabled={onLoad} >
                                    {
                                        onLoad
                                            ? <MDBSpinner size='lg' role='status' tag='span' />
                                            : "Cadastrar"
                                    }
                                </MDBBtn>

                                <p className="small fw-bold mt-2 pt-1 mb-0">Já tem uma conta?
                                    <Link to='/' className="link-danger" >Faça login</Link>
                                </p>

                                <MDBCardText className='small fw-bold  text-danger' >
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

export default SignUp;