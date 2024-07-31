import classNames from 'classnames/bind';

import { useState } from 'react';

import styles from './FormType.module.scss';
import Button from '~/components/Button';
import { useForm } from '~/store';
import PopperForm from '../PopperForm';
import FormItem from './FormItem';
import Header from './Header';
import { validateField } from '~/validate';

const cx = classNames.bind(styles);
function Register() {
    const { handleShowForm, handleHideForm, register } = useForm();

    const [formUser, setFormUser] = useState({ firstName: '', email: '', password: '', confirmPassword: '' });
    const [showError, setShowError] = useState({ firstName: '', email: '', password: '', confirmPassword: '' });
    const [touched, setTouched] = useState({ firstName: false, email: false, password: false, confirmPassword: false });

    const handleGetInforUser = (e) => {
        const { name, value } = e.target;
        setFormUser((prevState) => ({ ...prevState, [name]: value }));

        // Clear error messages when user types
        if (touched[name]) {
            setShowError((prevErrors) => ({ ...prevErrors, [name]: validateField(name, value, formUser) }));
        }
    };

    const handleBlurOut = (e) => {
        const { name, value } = e.target;

        setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));

        // Set error messages when the field loses focus
        setShowError((prevErrors) => ({ ...prevErrors, [name]: validateField(name, value, formUser) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Final validation before submission
        const ConfirmErrors = {
            firstName: validateField('firstName', formUser.firstName, formUser),
            email: validateField('email', formUser.email, formUser),
            password: validateField('password', formUser.password, formUser),
            confirmPassword: validateField('confirmPassword', formUser.confirmPassword, formUser),
        };

        setShowError(ConfirmErrors);

        const hasNoError = Object.values(ConfirmErrors).every((error) => error === undefined);

        if (hasNoError) {
            register(formUser);
        }
    };

    return (
        <PopperForm onHandleHideForm={handleHideForm}>
            <Header title="Sign Up" des="Let's get started with your account" />

            <form onSubmit={handleSubmit}>
                <FormItem
                    title="First Name"
                    name="firstName"
                    type="text"
                    value={formUser.firstName}
                    placeholder="Type your first name"
                    errorMessage={showError.firstName}
                    onHandleChange={handleGetInforUser}
                    onHandleBlur={handleBlurOut}
                />
                <FormItem
                    title="Email"
                    name="email"
                    type="email"
                    value={formUser.email}
                    placeholder="Type your email"
                    errorMessage={showError.email}
                    onHandleChange={handleGetInforUser}
                    onHandleBlur={handleBlurOut}
                />
                <FormItem
                    title="Password"
                    name="password"
                    type="password"
                    value={formUser.password}
                    placeholder="Type your password"
                    errorMessage={showError.password}
                    onHandleChange={handleGetInforUser}
                    onHandleBlur={handleBlurOut}
                />
                <FormItem
                    title="Confirm the password"
                    name="confirmPassword"
                    type="password"
                    value={formUser.confirmPassword}
                    placeholder="Confirm your password"
                    errorMessage={showError.confirmPassword}
                    onHandleChange={handleGetInforUser}
                    onHandleBlur={handleBlurOut}
                />

                <Button primary className={cx('submit')} onClick={handleSubmit}>
                    Create an Account
                </Button>
            </form>

            <div className={cx('already')}>
                <span>
                    Already have an account?
                    <Button text className={cx('sign-up-btn')} onClick={() => handleShowForm('logIn')}>
                        Sign In
                    </Button>
                </span>
            </div>
        </PopperForm>
    );
}

export default Register;
