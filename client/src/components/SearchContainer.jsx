import Wrapper from '../assets/wrappers/DashboardFormPage';
import FormRow from './FormRow';
import { Form, Link, useSubmit } from 'react-router-dom';

import SelectInput from './SelectInput';
import { JOB_SORT_BY, JOB_STAUTS, JOB_TYPE } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJob';
import debounce from '../utils/debounce';
const SearchContainer = () => {
    console.log('re-render');
    const { params } = useAllJobsContext();
    const submit = useSubmit();
    const newJobStatus = { ...JOB_STAUTS };
    newJobStatus.all = 'all';
    const newJobType = { ...JOB_TYPE };
    newJobType.all = 'all';

    return (
        <Wrapper>
            <Form className="form">
                <h5 className="form-title">Search Jobs</h5>
                <div className="form-center">
                    <FormRow
                        type="text"
                        elemnt="input"
                        label="Search"
                        id="search"
                        name="search"
                        onChange={debounce((form) => {
                            submit(form);
                        })}
                        defaultValue={params.search || ''}
                    />
                    <SelectInput
                        ENUM={newJobStatus}
                        label="Job Status"
                        id="jobStatus"
                        name="jobStatus"
                        defaultValue={params.jobStatus || 'all'}
                        onChange={(e) => {
                            submit(e.currentTarget.form);
                        }}
                    />
                    <SelectInput
                        ENUM={newJobType}
                        label="Job Type"
                        id="jobType"
                        name="jobType"
                        defaultValue={params.jobType || 'all'}
                        onChange={(e) => {
                            submit(e.currentTarget.form);
                        }}
                    />
                    <SelectInput
                        ENUM={JOB_SORT_BY}
                        label="Sort"
                        id="sort"
                        name="sort"
                        defaultValue="newest"
                        onChange={(e) => {
                            submit(e.currentTarget.form);
                        }}
                    />
                    <Link
                        to="/dashboard/all-jobs"
                        className="btn btn-block form-btn"
                        onClick={() => {
                            document.querySelector('#search').value = '';
                            document.querySelector('#sort').value = 'newest';
                            document.querySelector('#jobStatus').value = 'all';
                            document.querySelector('#jobType').value = 'all';
                        }}
                    >
                        Clear filter
                    </Link>
                    {/* <SubmitBtn isSubmitting={isSubmitting}>Submit</SubmitBtn> */}
                </div>
            </Form>
        </Wrapper>
    );
};
export default SearchContainer;
