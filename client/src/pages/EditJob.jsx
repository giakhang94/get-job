import { FormRow, SelectInput } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData } from 'react-router-dom';
import { JOB_STAUTS, JOB_TYPE } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const EditJobLoader = async (data) => {
    const { jobId } = data.params;
    try {
        const resp = await customFetch.get(`/jobs/${jobId}`);
        return resp.data.job;
    } catch (error) {
        toast.error(error.response.data.message);
        return null;
    }
};

export const EditJobAction = async (data) => {
    // console.log('log data from action edit job', data);
    const { jobId } = data.params;
    const formData = await data.request.formData();
    const dataUpdateJob = Object.fromEntries(formData);
    try {
        const resp = await customFetch.patch(`/jobs/${jobId}`, dataUpdateJob);
        toast.success(resp.data.message);
        return redirect('../all-jobs');
    } catch (error) {
        toast.error(error.response.data.message);
        return error;
    }
};

const EditJob = () => {
    const job = useLoaderData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    return (
        <Wrapper>
            <Form method="POST" className="form">
                <h4 className="form-title">Edit Job</h4>
                <div className="form-center">
                    <FormRow
                        label="Position"
                        name="position"
                        id="position"
                        element="input"
                        type="text"
                        defaultValue={job?.position}
                    />
                    <FormRow
                        label="Company"
                        name="company"
                        id="company"
                        element="input"
                        type="text"
                        defaultValue={job?.company}
                    />
                    <FormRow
                        label="location"
                        name="jobLocation"
                        id="jobLocation"
                        element="input"
                        type="text"
                        defaultValue={job?.jobLocation}
                    />
                    <SelectInput
                        label="Job Status"
                        name="jobStatus"
                        id="jobStatus"
                        defaultValue={job?.jobStatus}
                        ENUM={JOB_STAUTS}
                    />
                    <SelectInput
                        label="Job Type"
                        name="jobType"
                        id="jobType"
                        defaultValue={job?.jobType}
                        ENUM={JOB_TYPE}
                    />
                    <button
                        type="submit"
                        className="btn form-btn btn-block"
                        disabled={isSubmitting}
                        defaultValue={JOB_TYPE.FULL_TIME}
                    >
                        {isSubmitting ? 'Loading...' : 'Submit'}
                    </button>
                </div>
            </Form>
        </Wrapper>
    );
};
export default EditJob;
