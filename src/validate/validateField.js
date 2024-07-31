export const validateField = (name, value, formUser, formType) => {
    switch (name) {
        case 'firstName':
            if (typeof value === 'string') {
                return value.trim() ? undefined : 'Please enter this field';
            }
            break;
        case 'email':
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Please enter a valid email address';
        case 'password':
            return value.length >= 6 ? undefined : 'Please enter at least 6 characters';
        case 'confirmPassword':
            return formUser.password === value ? undefined : 'Re-entered password does not match';
        default:
            break;
    }
};
