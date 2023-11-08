import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import { FormRow, Logo } from '../components/index';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const registerAction = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
        const resp = await customFetch.post('/user/register', data);
        toast.success(resp.data.message);
        return redirect('/login');
    } catch (error) {
        // console.log(error.response.data.message);
        toast.error(error?.response.data.message);
        return error;
    }
};
const Register = () => {
    const navigation = useNavigation();
    // console.log(navigation);
    const isSubmitting = navigation.state === 'submitting';
    return (
        <Wrapper>
            <Form method="POST" className="form center">
                <Logo />
                <h4>Register</h4>
                <FormRow label="Name" type="text" id="name" name="name" defaultValue="john" required />
                <FormRow label="Last Name" type="text" id="lastName" name="lastName" defaultValue="Smilga" required />
                <FormRow label="Location" type="text" id="location" name="location" defaultValue="USA" required />
                <FormRow label="Email" type="text" id="email" name="email" defaultValue="john@gmail.com" required />
                <FormRow id="password" label="Password" name="password" type="password" required />
                <button type="submit" className="btn btn-block" disabled={isSubmitting}>
                    {isSubmitting ? 'Loading...' : 'Submit'}
                </button>
                <p>
                    Already a member?
                    <Link to="/login" className="member-btn">
                        Login
                    </Link>
                </p>
            </Form>
        </Wrapper>
    );
};
export default Register;
