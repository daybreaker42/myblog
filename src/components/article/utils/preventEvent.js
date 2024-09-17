const preventEvent = (event) => {
    event.preventDefault();
    event.stopPropagation();
};

export default preventEvent;