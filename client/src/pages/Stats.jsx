import { useLoaderData } from 'react-router-dom';
import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';

export const statsLoader = async () => {
    try {
        const resp = await customFetch.get('jobs/stats');
        return resp.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const Stats = () => {
    const { defaultStats, monthlyApplications } = useLoaderData();
    return (
        <>
            <StatsContainer defaultStats={defaultStats} monthlyApplications={monthlyApplications} />
            {monthlyApplications?.length >= 1 && <ChartsContainer data={monthlyApplications} />}
        </>
    );
};
export default Stats;
