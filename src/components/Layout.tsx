import { MDBBtn, MDBCollapse, MDBContainer, MDBIcon, MDBNavbar, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav, MDBNavbarToggler } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

function Layout() {
    const location = useLocation();
    const [showBasic, setShowBasic] = useState(false);

    return (
        <>
            <MDBNavbar expand='lg' dark bgColor='dark' >
                <MDBContainer fluid>
                    <MDBNavbarToggler
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowBasic(!showBasic)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar show={showBasic} className='' >
                        <MDBNavbarNav className=''>

                            <MDBNavbarItem>
                                <Link to='/home' className={"btn link-light".concat(location.pathname === "/home" ? " disabled" : "")} >Home</Link>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <Link to='/activities' className={"btn link-light".concat(location.pathname === "/activities" ? " disabled" : "")} >Atividades</Link>
                            </MDBNavbarItem>

                        </MDBNavbarNav>
                    </MDBCollapse>

                    {!showBasic
                        ? 
                            <Link to='/' className="btn link-danger" >
                                <i className="fas fa-sign-out-alt"></i>
                            </Link>
                        :
                        ""
                    }
                </MDBContainer>
            </MDBNavbar>
            <MDBContainer className='mt-2' fluid>
                <Outlet />
            </MDBContainer>
        </>
    );
}

export default Layout;