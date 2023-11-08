import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';

export const loaderAllJobs = async ({ request }) => {
    // console.log('request.url', request.url);
    // const tao = [...new URL(request.url).searchParams.entries()];
    // console.log('tao', tao);
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
    // console.log(params);
    try {
        const { data } = await customFetch.get('/jobs', { params });
        return { data, params };
    } catch (error) {
        toast.error(error?.response.data.message);
        return null;
    }
};

const AllJobsContext = createContext();

const AllJob = () => {
    const { data, params } = useLoaderData();
    const { jobs, totalJobs, numOfPage, currentPage } = data;
    return (
        <AllJobsContext.Provider value={{ jobs, params, totalJobs, numOfPage, currentPage }}>
            <SearchContainer />
            <JobsContainer />
        </AllJobsContext.Provider>
    );
};

export const useAllJobsContext = () => {
    return useContext(AllJobsContext);
};
export default AllJob;
