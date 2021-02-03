import React from 'react';
import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './ErrorBoundary.styles';

class ErrorBoundary extends React.Component {
    constructor() {
        super()


        this.state = { 
            hasErrored: false
        }
    }


    static getDerivedStateFromError(error) {
        return { hasErrored: true }
    }

    render() {
        if (this.state.hasErrored) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl={require(`../../assets/burnedtoast.png`)} />
                    <ErrorImageText> Something went wrong </ErrorImageText>
                </ErrorImageOverlay>
            )
        }

        return this.props.children;
    }
};

export default ErrorBoundary;