import { useEffect, useState } from 'react';
import Context from './Context';

function FormProvider({ children }) {
    const [showMobileOptions, setShowMobileOptions] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('register');

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfor, setUserInfor] = useState({});

    const [isMarked, setIsMarked] = useState(false);
    const [watchlist, setWatchlist] = useState(() => {
        return JSON.parse(localStorage.getItem('watchList')) || [];
    });

    // Save the logIn or Register to local storage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            setIsAuthenticated(true);
            setUserInfor(storedUser);
        }
    }, []);

    // Ensure watchlist is loaded on page load
    useEffect(() => {
        if (isAuthenticated) {
            const storedWatchlist = JSON.parse(localStorage.getItem('watchList')) || [];
            setWatchlist(storedWatchlist);
        } else {
            setWatchlist([]);
        }
    }, [isAuthenticated]);

    // Update localStorage whenever watchlist changes
    useEffect(() => {
        if (watchlist) {
            localStorage.setItem('watchList', JSON.stringify(watchlist));
        }
    }, [watchlist]); // Run whenever watchlist state changes

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
        setUserInfor(user);
        handleHideForm();
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setIsAuthenticated(false);
        setUserInfor(null);
    };

    // Handle Watchlist functions
    const handleAddWatchlist = (movie) => {
        if (!isAuthenticated) {
            handleShowForm('signIn');
        } else {
            setWatchlist((prevWatchlist) => {
                const alreadyMarked = prevWatchlist.some((item) => item.id === movie.id);
                if (!alreadyMarked) {
                    const updateWatchlist = [...prevWatchlist, movie];
                    return updateWatchlist;
                }
                return prevWatchlist;
            });
        }
    };

    const handleRemoveWatchlist = (movie) => {
        setWatchlist((prevWatchlist) => {
            const updateWatchlist = prevWatchlist.filter((item) => item.id !== movie.id);
            return updateWatchlist;
        });
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
                watchlist,
                setWatchlist,
                handleAddWatchlist,
                handleRemoveWatchlist,
                isMarked,
                setIsMarked,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export default FormProvider;
