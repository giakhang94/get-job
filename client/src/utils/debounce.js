const debounce = (onChangefunc) => {
    let timeout;
    return (e) => {
        const form = e.currentTarget.form;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onChangefunc(form);
        }, 800);
    };
};
export default debounce;
