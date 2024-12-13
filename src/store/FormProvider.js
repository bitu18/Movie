import { useEffect, useState } from 'react';
import Context from './Context';

function FormProvider({ children }) {
    const [showMobileOptions, setShowMobileOptions] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('register');

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfor, setUserInfor] = useState({});

    // Save the logIn or Register to local storage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            setIsAuthenticated(true);
            setUserInfor(storedUser);
        }
    }, []);

    const handleShowForm = (type) => {
        setShowForm(true);
        setFormType(type);
        document.body.style.overflow = 'hidden';
    };
    const handleHideForm = () => {
        setShowForm(false);
        document.body.style.overflow = 'unset';
    };

    const handleShowSideBar = () => {
        setShowMobileOptions(true);
        document.body.style.overflow = 'hidden';
    };
    const handleHideSideBar = () => {
        setShowMobileOptions(false);
        document.body.style.overflow = 'unset';
    };

    const handleLogin = (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setIsAuthenticated(true);
        // window.location.reload();
        setUserInfor(user);
        handleHideForm();
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setIsAuthenticated(false);
        // window.location.reload();
        setUserInfor(null);
    };

    return (
        <Context.Provider
            value={{
                showForm,
                formType,
                handleShowForm,
                handleHideForm,
                showMobileOptions,
                handleShowSideBar,
                handleHideSideBar,
                isAuthenticated,
                userInfor,
                setUserInfor,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export default FormProvider;
