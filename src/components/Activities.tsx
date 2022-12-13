import { MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBCardHeader, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router-dom';
import { Api } from '../services/Api';
import { Activities as ActivitiesType, User } from '../Types/ApiTypes';
import ActivityUsers from './ActivityUsers';
import AddActivity from './AddActivity';
import AddUserToActivity from './AddUserToActivity';

const date = (d: string) => {
    if (d.slice(0, 4) === "0001") return "Não Finalizada";
    return new Date(d).toLocaleString();
}

function Activities() {
    const activities = useLoaderData() as ActivitiesType[];
    const revalidator = useRevalidator();

    const [isModalUsersOpen, setModalUsersOpen] = useState(false);
    const [modalActivityUsers, setModalActivityUsers] = useState<User[]>([]);
    const openModalUsers = (id: number) => {
        Api.getActivityUsers(id).then((value: User[]) => {
            setModalActivityUsers(value);
            setModalUsersOpen(true);
        });
    }

    const [isModalAddUsersOpen, setModalAddUsersOpen] = useState(false);
    const [activityId, setActivityId] = useState(0);
    const openModalAddUser = (id: number) => {
        setModalAddUsersOpen(true);
        setActivityId(id);
    }

    const [isModalAddActivityOpen, setModalAddActivityOpen] = useState(false);
    const openModalAddAtividade = () => {
        setModalAddActivityOpen(true);
    }

    useEffect(() => {
        if (!isModalAddActivityOpen) {
            revalidator.revalidate();
        }
    }, [isModalAddActivityOpen]);

    const deleteActivity = (id: number) => {
        Api.deleteActivity(id).then(() => {
            revalidator.revalidate();
        });
    }

    const setActivityAsClosed = (id: number) => {
        Api.setActivityStatus(id, 1).then(() => {
            revalidator.revalidate();
        });
    }

    return (
        <>
            <ActivityUsers
                setShow={setModalUsersOpen}
                isOpen={isModalUsersOpen}
                close={() => setModalUsersOpen(false)}
                users={modalActivityUsers}
            />

            <AddUserToActivity
                setShow={setModalAddUsersOpen}
                isOpen={isModalAddUsersOpen}
                close={() => setModalAddUsersOpen(false)}
                activityId={activityId}
            />

            <AddActivity
                setShow={setModalAddActivityOpen}
                isOpen={isModalAddActivityOpen}
                close={() => setModalAddActivityOpen(false)}
            />

            <MDBBtn onClick={openModalAddAtividade} color='dark' size='sm'>
                <i className="fas fa-user-friends"></i> Adicionar atividade
            </MDBBtn>

            <MDBRow className='my-2'>
                {
                    Array.isArray(activities) ?
                        activities.map<JSX.Element>((value, index) => {
                            return (
                                <MDBCol sm='6' className='mb-4' key={value.id}>
                                    <MDBCard background='light' border={value.status === 0 ? 'primary' : value.status === 1 ? 'success' : 'danger'} className='text-center'>
                                        <MDBCardHeader>
                                            <MDBCardTitle className='fw-bold my-2'>
                                                {value.name}
                                            </MDBCardTitle>
                                        </MDBCardHeader>
                                        <MDBCardBody>
                                            <MDBCardText className='text-muted mb-0'>
                                                {value.description}
                                            </MDBCardText>


                                            <div>
                                                <MDBBtn onClick={() => openModalUsers(value.id)} color='link' size='sm'>
                                                    <MDBIcon fas icon="user-friends" />
                                                </MDBBtn>

                                                <MDBBtn onClick={() => openModalAddUser(value.id)} color='link' size='sm'>
                                                    <MDBIcon fas icon="user-plus" />
                                                </MDBBtn>

                                                <MDBBtn onClick={() => deleteActivity(value.id)} color='link' size='sm'>
                                                    <MDBIcon color='danger' fas icon="times" />
                                                </MDBBtn>

                                                <MDBBtn onClick={() => setActivityAsClosed(value.id)} color='link' size='sm'>
                                                    <MDBIcon color='success' fas icon="check" />
                                                </MDBBtn>
                                            </div>
                                            
                                        </MDBCardBody>
                                        <MDBCardFooter>
                                            <p className='fw-bold my-2'>{date(value.createdAt)} - {date(value.closedAt)}</p>
                                        </MDBCardFooter>
                                    </MDBCard>
                                </MDBCol>
                            )
                        })
                        : ""
                }
            </MDBRow>
        </>
    );
}

export default Activities;