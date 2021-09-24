import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Auth(props) {

    const {onCloseModal, setTitleModal} = props;
    const [showlogin, setShowLogin] = useState(true);

    const showLoginForm = () => {
        setTitleModal("Inicia sesión");
        setShowLogin(true);
    };

    const showRegisterForm = () => {
        setTitleModal("Crear nuevo usuario");
        setShowLogin(false);
    };
    
    return (
        showlogin ? (
        <LoginForm showRegisterForm={showRegisterForm} onCloseModal={onCloseModal}/> )
        : (
        <RegisterForm showLoginForm={showLoginForm} />
    ));
}
