import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { User } from '../Types/ApiTypes';

interface ActivityUsersProps {
    isOpen: boolean,
    close: () => void,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    users: User[]
}

function ActivityUsers(props: ActivityUsersProps) {
    return (
        <MDBModal show={props.isOpen} setShow={props.setShow} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Usuários da Atividade</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={props.close}></MDBBtn>
                    </MDBModalHeader>

                    <MDBModalBody>
                        <MDBTable align='middle' bgcolor='whitesmoke' responsive className='rounded' >
                            <MDBTableHead>
                                <tr>
                                    <th scope='col'>Nome</th>
                                    <th scope='col'>Email</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                    Array.isArray(props.users) ?
                                        props.users.map<JSX.Element>((value, index) => {
                                            return (
                                                <tr key={value.id}>
                                                    <td>
                                                        <p className='fw-bold mb-1'>{value.name}</p>
                                                    </td>
                                                    <td>
                                                        <p className='text-muted mb-0'>{value.email}</p>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        : ""
                                }
                            </MDBTableBody>
                        </MDBTable>
                    </MDBModalBody>

                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={props.close}>
                            Close
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default ActivityUsers;