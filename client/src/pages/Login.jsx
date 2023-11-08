import { Link, redirect, useNavigation, Form, useNavigate } from 'react-router-dom';
import { FormRow, Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

//action function
export const LoginActon = async ({ request }) => {
    const dataLogin = Object.fromEntries(await request.formData());
    try {
        const { data } = await customFetch.post('/user/login', dataLogin);
        toast.success(data.message);
        return redirect('/dashboard');
    } catch (error) {
        toast.error(error?.response.data.message);
        return null;
    }
};

const Login = () => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const navigator = useNavigate();
    const loginTestUser = async () => {
        try {
            await customFetch.post('user/login', { email: 'songoku@gmail.com', password: '123456' });
            toast.success('Halo, welcome to my web app');
            navigator('/dashboard');
        } catch (error) {
            toast.error('There is an error, please try it again');
        }
    };
    return (
        <Wrapper>
            <Form method="POST" className="form">
                <Logo />
                <h4>Login</h4>
                <FormRow label="Email" type="text" defaultValue="john@gmail.com" id="email" name="email" required />
                <FormRow label="Password" type="password" id="password" name="password" required />
                <button type="submit" className="btn btn-block" disabled={isSubmitting}>
                    {isSubmitting ? 'Loading...' : 'Login'}
                </button>
                <button type="button" className="btn btn-block" onClick={loginTestUser}>
                    Explore The App (test user)
                </button>
                <p>
                    Don&#39;t have an account?
                    <Link to="/register" className="member-btn">
                        Register
                    </Link>
                </p>
            </Form>
        </Wrapper>
    );
};
export default Login;
