import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContent';


const bodyStyle = {
    backgroundColor: "rgb(247, 247, 247)",
    padding: "5%",
    borderRadius: "10px",
    boxShadow: "rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px",
}

const warning = {
    margin: "0% 2% 0% 2%",
    fontSize: "90%",
    color: "rgb(220, 63, 63)"
}

const success = {
    margin: "0% 2% 0% 2%",
    fontSize: "90%",
    color: "#198754"
}

function generateRandomCode(n) {
    let str = ''
    for (let i = 0; i < n; i++) {
      str += Math.floor(Math.random() * 10)
    }
    return str
}


const Login = ({onSignUp, onLogin, dataService}) => {
    const {user} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        user && navigate("/");
    }, [user]);

    const passwordRef = useRef();
    const [signup, setSignup] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    // const [text, setText] = useState('');
    // const [isAlert, setIsAlert] = useState(false);

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordCheckError, setPasswordCheckError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);

    const [sentCode, setSentCode] = useState(false);
    const [checkCode, setCheckCode] = useState('');
    const [checkCodeError, setCheckCodeError] = useState(false);


    const usernameForm = /^[a-zA-z0-9]{4,}$/;;
    const passwordForm = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const emailForm = /@student.ubc.ca$/;
    
    //TODO: `이거 체크안해주는데?? 이거 알아보고 고치기
    const nameForm = /^[a-zA-z0-9]{4,12}$/;



    const onSubmit = (event) => {
        event.preventDefault();
        if (signup) {
            username && password && checkPassword && name && email && checkCodeError &&
            onSignUp(username, password, name, email)//.catch(setError);
        } else {
            username && password &&
            onLogin(username, password)//.catch(setError);
        }
    };

    // const setError = (error) => {
    //     setText(error.toString());
    //     setIsAlert(true);
    // };

    const onChange = (event) => {
        const {
        target: { name, value, checked },
        } = event;
        switch (name) {
        case 'username':
            setUsername(value);
            setUsernameError(usernameForm.test(value));
            return 
        case 'password':
            setPassword(value);
            setPasswordError(passwordForm.test(value));
            return 
        case 'checkPassword':
            setCheckPassword(value);
            setPasswordCheckError(passwordRef.current.value === value)
            return 
        case 'name':
            setName(value);
            setNameError(nameForm.test(value));
            return 
        case 'email':
            setEmail(value);
            setEmailError(emailForm.test(value));
            return 
        case 'signup':
            return setSignup(checked);
        case 'checkCode':
            setCheckCode(value);
            setCheckCodeError(value == code);
        default:
        }
    };

    const [code, setCode] = useState();
    const [verified, setVerified] = useState(false);

    const handleSencCode = () => {
        if(!emailError) return;

        if(sentCode) {
            setCheckCode('');
            setCheckCodeError(false);
        }

        const codeNum = generateRandomCode(4);
        console.log(codeNum);   //This code is only for tesing while developing. when deploy, this should be commented. 
        setCode(codeNum);
        
        dataService
        .getIfCodeSent(email, codeNum)
        .then(() => setSentCode(true));
    }

    return (
        <div style={bodyStyle}>
            <Form className='auth-form' onSubmit={onSubmit}>
                <Stack gap="2">
                    <Form.Control
                    name='username'
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={onChange}
                    className='form-input'
                    required
                    />
                    {signup && !usernameError  && username && <p style={warning}>Please enter at least 4 digits using a combination of only uppercase and lowercase letters or numbers</p>}
                    <Form.Control
                    ref={passwordRef}
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    className='form-input'
                    onChange={onChange}
                    />
                    {signup && !passwordError  && password && <p style={warning}>Please enter at least 8 digits using a combination of numbers + English letters + special characters!</p>}
                    {signup && (
                    <Form.Control
                    name='checkPassword'
                    type='password'
                    placeholder='Password Check'
                    value={checkPassword}
                    className='form-input'
                    onChange={onChange}
                    />
                    )}
                    {signup && !passwordCheckError && checkPassword && <p style={warning}>Passwords do not match!</p>}
                    {signup && (
                    <Form.Control
                        name='name'
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={onChange}
                        className='form-input'
                        required
                    />
                    )}
                    {signup && !nameError && name && <p style={warning}>Please enter 4 to 12 digits using a combination of only uppercase and lowercase letters or numbers</p>}
                    {signup && (
                    <div className="d-flex">
                        <Form.Control
                        name='email'
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={onChange}
                        className='form-input'
                        required
                    />
                    <Button className='form-btn auth-form-btn ms-2' onClick={handleSencCode} variant={emailError?"primary":"secondary"}>
                        {!sentCode?"Send Code":"Resend"}
                        </Button>
                    </div>
                    )}
                    {signup && !emailError && (<p style={warning}>Email must end with @student.ubc.ca</p>)}
                    {
                        code && (
                            <Form.Control
                            name='checkCode'
                            type='text'
                            placeholder='Verification Code'
                            value={checkCode}
                            onChange={onChange}
                            className='form-input'
                            required
                            />
                        )
                    }
                    {signup && sentCode && checkCode!="" && !checkCodeError && (<p style={warning}>Code doesn't match</p>)}
                    {signup && sentCode && checkCodeError && (<p style={success}>Code matched!</p>)}
                </Stack>
                <div className='form-signup'>
                <input
                    name='signup'
                    id='signup'
                    type='checkbox'
                    onChange={onChange}
                    checked={signup}
                />
                <label className="my-3 ms-1" htmlFor='signup'> Create a new account?</label>
                </div>
                <Button className='form-btn auth-form-btn w-100' type='submit'>
                {signup ? 'Sign Up' : 'Sign In'}
                </Button>
            </Form>
        </div>
    )
}

export default Login;