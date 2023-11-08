//this file use the useActionData hook (from react router DOM)
//and show the errors in this Login component instead of using toastify

import { Link, redirect, useNavigation, Form, useActionData } from 'react-router-dom';
import { FormRow, Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
// import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

//action function
export const LoginActon = async ({ request }) => {
    const dataLogin = Object.fromEntries(await request.formData());
    const actionData = {};
    try {
        const { data } = await customFetch.post('/user/login', dataLogin);
        // toast.success(data.message);
        actionData.message = data.message;
        redirect('/dashboard');
        return actionData;
    } catch (error) {
        // toast.error(error?.response.data.message);
        actionData.message = error?.response.data.message;
        return actionData;
    }
};

const Login = () => {
    const navigation = useNavigation();
    const actionData = useActionData();
    const isSubmitting = navigation.state === 'submitting';
    return (
        <Wrapper>
            <Form method="POST" className="form">
                <Logo />
                <h4>Login</h4>
                {actionData && (
                    <span
                        style={{
                            textAlign: 'center',
                            margin: '10px auto',
                            padding: '12px 5px',
                            color: 'red',
                            display: 'block',
                            backgroundColor: 'rgba(201, 41, 129, 0.548)',
                            borderRadius: '5px',
                        }}
                    >
                        {actionData?.message}
                    </span>
                )}
                <FormRow label="Email" type="text" defaultValue="john@gmail.com" id="email" name="email" required />
                <FormRow label="Password" type="password" id="password" name="password" required />
                <button type="submit" className="btn btn-block" disabled={isSubmitting}>
                    {isSubmitting ? 'Loading...' : 'Login'}
                </button>
                <button type="button" className="btn btn-block">
                    Explore The App
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
