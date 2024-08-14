import { useForm } from '../hooks';
import { Register } from '~/layouts/components/PopperForm/FormType';
import { SignIn } from '~/layouts/components/PopperForm/FormType';

function FormType() {
    const { showForm, formType } = useForm();
    if (!showForm) return null;
    return formType === 'register' ? <Register /> : <SignIn />;
}

export default FormType;
