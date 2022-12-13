import { MDBBtn, MDBCardText, MDBInput, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBSpinner, MDBTextArea } from 'mdb-react-ui-kit';
import { FormEvent, useEffect, useState } from 'react';
import { useEndpoint } from '../services/Api';

interface AddActivityProps {
    isOpen: boolean,
    close: () => void,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
}

function AddActivity(props: AddActivityProps) {

    const [error, setError] = useState("");

    const onError = (msg: string) => {
        setError(msg);
    }
    const [call, , onLoad, isSuccess] = useEndpoint(onError);

    const onAdd = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        if (!formData.get("name") || !formData.get("description")) return;
        setError("");
        call("/api/Activity", "POST", {
            name: formData.get("name"),
            description: formData.get("description"),
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
                        <MDBModalTitle>Adicionar Atividade</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={props.close}></MDBBtn>
                    </MDBModalHeader>

                    <MDBModalBody>
                        <MDBInput wrapperClass='w-100 mb-3' label='Título' name='name' type='text' size="lg" readonly={onLoad} />

                        <MDBTextArea minLength={10} wrapperClass='w-100' size='lg' name='description' cols={3} readonly={onLoad} >
                        </MDBTextArea>
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

export default AddActivity;