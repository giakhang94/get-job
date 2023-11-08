import { FormRow, SelectInput } from '../components';
import { toast } from 'react-toastify';
import { JOB_STAUTS, JOB_TYPE } from '../../../utils/constants';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { Form, useNavigation, redirect } from 'react-router-dom';
import SubmitBtn from '../components/SubmitBtn';

export const AddJobAction = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        const resp = await customFetch.post('jobs', data);
        toast.success(resp.data.message);
        return redirect('all-jobs');
    } catch (error) {
        toast.error(error.response.data.message);
        return error;
    }
};

const AddJob = () => {
    const { user } = useOutletContext();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Wrapper>
            <Form method="POST" className="form">
                <h4 className="form-title">add job</h4>
                <div className="form-center">
                    <FormRow label="Position" name="position" id="position" element="input" type="text" />
                    <FormRow label="Company" name="company" id="company" element="input" type="text" />
                    <FormRow
                        label="location"
                        name="jobLocation"
                        id="jobLocation"
                        element="input"
                        type="text"
                        defaultValue={user?.location}
                    />
                    <SelectInput
                        label="Job Status"
                        name="jobStatus"
                        id="jobStatus"
                        defaultValue={JOB_STAUTS.PENDING}
                        ENUM={JOB_STAUTS}
                    />
                    <SelectInput
                        label="Job Type"
                        name="jobType"
                        id="jobType"
                        defaultValue={JOB_TYPE.PENDING}
                        ENUM={JOB_TYPE}
                    />
                    <SubmitBtn isSubmitting={isSubmitting} defaultValue={JOB_TYPE.FULL_TIME}>
                        {isSubmitting ? 'Loading...' : 'Submit'}
                    </SubmitBtn>
                </div>
            </Form>
        </Wrapper>
    );
};
export default AddJob;
