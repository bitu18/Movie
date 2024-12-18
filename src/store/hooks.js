import { useContext } from 'react';
import Context from './Context';

export const useForm = () => {
    const {
        showForm,
        formType,
        handleShowForm,
        handleHideForm,
        register,
        logIn,
        logOut,
        isAuthenticated,
        userInfor,
        setUserInfor,
        handleLogin,
        handleLogout,
    } = useContext(Context);
    return {
        showForm,
        formType,
        handleShowForm,
        handleHideForm,
        register,
        logIn,
        logOut,
        isAuthenticated,
        userInfor,
        setUserInfor,
        handleLogin,
        handleLogout,
    };
};

export const useOptions = () => {
    const { showMobileOptions, handleShowSideBar, handleHideSideBar } = useContext(Context);

    return { showMobileOptions, handleShowSideBar, handleHideSideBar };
};

export const useWatchlist = () => {
    const { watchlist, setWatchlist, handleAddWatchlist, handleRemoveWatchlist, isMarked, setIsMarked } =
        useContext(Context);
    return { watchlist, setWatchlist, handleAddWatchlist, handleRemoveWatchlist, isMarked, setIsMarked };
};
