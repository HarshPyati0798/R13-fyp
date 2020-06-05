import React, { Component } from 'react';
import './../styles/ContentStyles.css'
import UploadVideo from './UploadVideo';
import CircularProgress from '@material-ui/core/CircularProgress'

class Content extends Component {
    render() {
        const {isProgressVisible,retrieveVideo,processVideo} = this.props
        return (
            <div className="tryIt">
                <p className="pclass">TRY IT NOW</p>
                <div className="uploadvideocontainer">
                    <UploadVideo title="Upload Video 1" uploadVideo={() => retrieveVideo("file1")} />
                    <UploadVideo title="Upload Video 2" uploadVideo={() => retrieveVideo("file2")} />
                </div>
                {isProgressVisible?<div className="progressContainer">
                    <CircularProgress color='primary' className="progressStyle" />
                </div>:null}
                <button className="process" onClick={processVideo}>PROCESS</button>
            </div>
        );
    }
}

export default Content;