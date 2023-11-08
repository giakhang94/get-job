import { Form, useNavigation, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import customFetch from '../utils/customFetch';

export const profileAction = async ({ request }) => {
    const formData = await request.formData();
    //validate file
    const file = formData.get('avatar');
    console.log(file);
    if (file.size > 500000) {
        toast.error('Image size too large');
    }
    try {
        const resp = await customFetch.patch('/user/update-user', formData);
        toast.success(resp.data.message || 'Updated!');
    } catch (error) {
        toast.error(error?.response?.data.message);
    }
    return null;
};
const Profile = () => {
    const data = useOutletContext();
    const { user } = data;
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    return (
        <Wrapper>
            <Form method="POST" className="form" encType="miltipart/form-data">
                <h4 className="form-title">Profile</h4>
                <div className="form-center">
                    <div className="avatar">
                        <label htmlFor="avatar" className="form-label">
                            Choose your avatar (img file max 0.5MB)
                        </label>
                        <input type="file" id="avatar" name="avatar" className="form-input" accept="image/*" />
                    </div>
                    <FormRow label="Name" id="name" name="name" type="text" element="input" defaultValue={user.name} />
                    <FormRow
                        label="Last Name"
                        id="lastName"
                        name="lastName"
                        type="text"
                        element="input"
                        defaultValue={user.lastName}
                    />
                    <FormRow
                        label="Email"
                        id="email"
                        name="email"
                        type="text"
                        element="input"
                        defaultValue={user.email}
                    />
                    <FormRow
                        label="Location"
                        id="location"
                        name="location"
                        type="text"
                        element="input"
                        defaultValue={user.location}
                    />
                    <button type="submit" className="btn form-btn btn-block" disabled={isSubmitting}>
                        {isSubmitting ? 'Loading...' : 'Save Changes'}
                    </button>
                </div>
            </Form>
        </Wrapper>
    );
};
export default Profile;
