import React from 'react';
import log from './log';
import LazyScratchBlocks from './tw-lazy-scratch-blocks';

const LoadScratchBlocksHOC = function (WrappedComponent) {
    class LoadScratchBlocks extends React.Component {
        constructor (props) {
            super(props);
            this.state = {
                loaded: LazyScratchBlocks.isLoaded(),
                error: null
            };
        }
        componentDidMount () {
            if (!this.state.loaded) {
                LazyScratchBlocks.load()
                    .then(() => {
                        this.setState({
                            loaded: true
                        });
                    })
                    .catch(e => {
                        log.error(e);
                        this.setState({
                            error: e
                        });
                    });
            }
        }
        render () {
            if (this.state.error !== null) {
                return <p>{this.state.error}</p>;
            }
            if (!this.state.loaded) {
                return <p>Loading...</p>;
            }
            return (
                <WrappedComponent
                    {...this.props}
                />
            );
        }
    }
    return LoadScratchBlocks;
};

export default LoadScratchBlocksHOC;
