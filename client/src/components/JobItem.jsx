import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form, redirect } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './jobInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

day.extend(advancedFormat);

// eslint-disable-next-line react/prop-types
const JobItem = ({ _id, jobLocation, company, jobStatus, jobType, position, createdAt }) => {
    const date = day(createdAt).format('MM DD, YYYY');

    return (
        <Wrapper>
            <header>
                <div className="main-icon">{company.charAt(0)}</div>
                <div className="info">
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className="content">
                <div className="content-center">
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div className={`status ${jobStatus}`}>{jobStatus}</div>
                </div>
                <footer className="actions">
                    <Link className="btn edit-btn" to={`../edit-job/${_id}`}>
                        Edit
                    </Link>
                    <Form method="POST" action={`../delete-job/${_id}`}>
                        <button type="submit" className="btn delete-btn">
                            Delete
                        </button>
                    </Form>
                </footer>
            </div>
        </Wrapper>
    );
};
export default JobItem;
