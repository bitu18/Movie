import { useEffect, useState } from 'react';
import Context from './Context';

function FormProvider({ children }) {
    const [showMobileOptions, setShowMobileOptions] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('register');

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Save the logIn or Register to local storage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            setIsAuthenticated(true);
            setCurrentUser(storedUser);
        }
    }, []);

    const handleShowForm = (type) => {
        setShowForm(true);
        setFormType(type);
        document.body.style.overflow = 'hidden';
    };
    const handleHideForm = () => {
        setShowForm(false);
    };

    const handleShowSideBar = () => {
        setShowMobileOptions(true);
        document.body.style.overflow = 'hidden';
    };
    const handleHideSideBar = () => {
        setShowMobileOptions(false);
    };

    const register = (userData) => {
        // Get all users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(userData);

        // Save the updated list of users to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Save the current user
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setIsAuthenticated(true);
        setCurrentUser(userData);
        handleHideForm();
        window.location.reload();
    };

    const logIn = (credential, setErrorMessage) => {
        // Get all users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const storedUser = users.find(
            (user) => user.email === credential.email && user.password === credential.password,
        );

        if (storedUser) {
            localStorage.setItem('currentUser', JSON.stringify(storedUser));
            setIsAuthenticated(true);
            setCurrentUser(storedUser);
            handleHideForm();
            window.location.reload(); // Reload after setting the user data
        } else {
            setErrorMessage({ email: '', password: 'The password is not correct' });
        }
    };

    const logOut = () => {
        localStorage.removeItem('currentUser');
        setIsAuthenticated(false);
        setCurrentUser(null);
        window.location.reload();
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
                register,
                logIn,
                logOut,
                isAuthenticated,
                currentUser,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export default FormProvider;
