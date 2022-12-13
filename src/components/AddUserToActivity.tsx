import { MDBBtn, MDBCardText, MDBInput, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBSpinner } from 'mdb-react-ui-kit';
import { FormEvent, useEffect, useState } from 'react';
import { useEndpoint } from '../services/Api';

interface AddUserToActivityProps {
    isOpen: boolean,
    close: () => void,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    activityId: number
}

function AddUserToActivity(props: AddUserToActivityProps) {

    const [error, setError] = useState("");

    const onError = (msg: string) => {
        setError(msg);
    }
    const [call, , onLoad, isSuccess] = useEndpoint(onError);

    const onAdd = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        if (!formData.get("email")) return;
        setError("");
        call("/api/Activity/User", "POST", {
            email: formData.get("email"),
            activityId: props.activityId,
        });
    }

    useEffect(() => {
        if (isSuccess) {
            props.close();
        }
    }, [isSuccess, props]);

    return (
        <MDBModal onSubmit={onAdd} tag='form' show={props.isOpen} setShow={props.setShow} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Adicionar Usuário na Atividade</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={props.close}></MDBBtn>
                    </MDBModalHeader>

                    <MDBModalBody>
                        <MDBInput wrapperClass='w-100' label='Email' name='email' type='email' size="lg" readonly={onLoad} />
                    </MDBModalBody>

                    <MDBModalFooter>

                        <MDBCardText className='small fw-bold text-danger' >
                            {error}
                        </MDBCardText>

                        <MDBBtn color='success' type='submit' disabled={onLoad}>
                            {
                                onLoad
                                    ? <MDBSpinner size='sm' role='status' tag='span' />
                                    : "Adicionar"
                            }
                        </MDBBtn>

                        <MDBBtn color='secondary' onClick={props.close}>
                            Close
                        </MDBBtn>

                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default AddUserToActivity;