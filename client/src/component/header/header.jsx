import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/NavDropdown';
import {Link, useLocation, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import styles from './header.module.css';
import { useEffect } from 'react';
import { BiLogOut } from 'react-icons/bi';

const Header = ({handleLogout, handleSignin, user}) => {

    const navigate = useNavigate();
    
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    const searchRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        const pathname = 
        location.pathname.includes('/courses')
        && location.search.includes('?search')
        ? location.pathname: "/courses";
        navigate(`${pathname}?search=${searchRef.current.value}`)
    };


    
    useEffect(() => {
        searchRef.current.value = search? search: "";
    }, [location])


    const handleClick = (e) => {

        if(e.target.id != "logOut") {
            navigate(`/courses/account/profile`);
            return;
        }

        handleLogout();
        
    }

    return (
        <Navbar className={styles.navbar} expand="xl">
            <Container fluid className={"mx-lg-5 "+styles.container}>
                <Navbar.Brand as="span" className="mx-0">
                    <Link to="/" className={styles.brand} >Student Founder</Link>
                </Navbar.Brand>
                    <Form 
                        onSubmit={onSubmit}
                        className="d-flex w-50 me-1"
                    >
                        <Form.Control
                            ref={searchRef}
                            type="search"
                            placeholder="Search Your Course"
                            className="me-2"
                            aria-label="Search"
                            size="lg"
                        />
                        <Button variant="outline-success" className="px-2" onClick={onSubmit}>
                            <BsSearch className="pb-1" style={{fontSize: "1.5em"}} />
                        </Button>
                    </Form>
                    {
                        user &&
                        <Dropdown title="Account" id="ScrollingDropdown" align="end">
                        <Dropdown.Item id="profile" onClick={handleClick}>My Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item id="logOut" onClick={handleClick}>Sign Out</Dropdown.Item>
                        </Dropdown>
                    }
                    {
                        !user &&
                        <button className={styles.signButton} onClick={handleSignin}>Sign In</button>

                    }
            </Container>
        </Navbar>
    );
}

export default Header;