import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { redirect } from 'react-router-dom';
const deleteJobAction = async ({ params }) => {
    try {
        const { data } = await customFetch.delete(`/jobs/${params.jobId}`);
        toast.info(data.message);
    } catch (error) {
        toast.error(error?.response.data.message);
    }
    return redirect('/dashboard/all-jobs');
};
export default deleteJobAction;
