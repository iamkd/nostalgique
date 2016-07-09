import React from 'react';

class Loader extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Loader';
    }
    render() {
        return <div className="loader">loading...</div>;
    }
}

export default Loader;
