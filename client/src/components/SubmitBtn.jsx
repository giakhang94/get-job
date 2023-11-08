const SubmitBtn = ({ isSubmitting, defaultValue }) => {
    return (
        <button type="submit" className="btn form-btn btn-block" disabled={isSubmitting} defaultValue={defaultValue}>
            {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
    );
};
export default SubmitBtn;
