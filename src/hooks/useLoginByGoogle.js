import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useForm } from '~/store';

function useLoginByGoogle() {
    const { handleLogin } = useForm();

    const logIn = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${response.access_token}` },
                });

                const user = {
                    name: res.data.name,
                    avatar: res.data.picture,
                    email: res.data.email,
                };
                handleLogin(user);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        },
    });
    return logIn;
}

export default useLoginByGoogle;
