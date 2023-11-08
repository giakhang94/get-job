import JobItem from './JobItem';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAllJobsContext } from '../pages/AllJob';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
    const { jobs, currentPage, numOfPage, totalJobs, deleteJob } = useAllJobsContext();

    // console.log('jobs container', jobs);
    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <h5>
                {totalJobs} job{jobs.length > 1 && 's'}
            </h5>
            <div className="jobs">
                {jobs.map((job) => (
                    <JobItem key={job._id + 'tao'} {...job} deleteJob={deleteJob} />
                ))}
            </div>
            {numOfPage > 1 && (
                <PageBtnContainer currentPage={currentPage} numOfPage={numOfPage} totalJobs={totalJobs} />
            )}
        </Wrapper>
    );
};
export default JobsContainer;
