import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { useLoaderData, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify';
import { StateItem } from '../components';

export const StatsLoader = async () => {
    try {
        const { data } = await customFetch.get('/user/admin/app-stats');
        return data;
    } catch (error) {
        toast.error(error.response.data.message);
        return redirect('/dashboard');
    }
};
const Admin = () => {
    const { users, jobs } = useLoaderData();
    console.log(`users: ${users}, jobs: ${jobs}`);
    return (
        <Wrapper>
            <StateItem
                title="current users"
                count={users}
                color="#e9b949"
                backgroundColor="#fcefc7"
                icon={<FaSuitcaseRolling />}
            />
            <StateItem
                title="total jobs"
                count={jobs}
                color="#647acb"
                backgroundColor="#e0e8f9"
                icon={<FaCalendarCheck />}
            />
        </Wrapper>
    );
};
export default Admin;
