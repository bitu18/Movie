import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './FormType.module.scss';
import PopperForm from '../PopperForm';
import Header from './Header';
import FormItem from './FormItem';
import { validateField } from '~/validate';
import Button from '~/components/Button';
import { useForm } from '~/store';

const cx = classNames.bind(styles);
function SignIn() {
    const { handleShowForm, handleHideForm, logIn } = useForm();

    const [formUser, setFormUser] = useState({ email: '', password: '' });
    const [showError, setShowError] = useState({ email: '', password: '' });
    const [touched, setTouched] = useState({ email: false, password: false });

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
            email: validateField('email', formUser.email, formUser),
            password: validateField('password', formUser.password, formUser),
        };
        setShowError(ConfirmErrors);

        // Check if there is no error before submitting the form
        const hasNoError = Object.values(ConfirmErrors).every((error) => error === undefined);

        if (e.key === 'enter' || e.type === 'click') {
            if (hasNoError) {
                logIn(formUser, setShowError);
            }
        }
    };
    return (
        <PopperForm onHandleHideForm={handleHideForm}>
            <Header title="Sign In" des="Welcome Back!" />

            <form onSubmit={handleSubmit}>
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

                <Button primary className={cx('submit')} onClick={handleSubmit}>
                    Sign In
                </Button>
            </form>

            <div className={cx('already')}>
                <span>
                    Don't have an account?
                    <Button text className={cx('sign-up-btn')} onClick={() => handleShowForm('register')}>
                        Register
                    </Button>
                </span>
            </div>
        </PopperForm>
    );
}

export default SignIn;
