import React from 'react';
import './../styles/VideoInfoInResultsStyles.css';

const VideoInfoInResults = ({ videoNum, videoSource, videoType, videoName, videoLength, numFrames}) => (
    <div className="root" style={{marginTop:"30px"}}>
        <p className="allTextContent" style={{fontSize: "24px"}}>Video {videoNum}</p>
        <div  className="container">
            <div style={{display:"flex"}}>
                <video width="200" height="150" controls className="videocontainer">
                    <source src={videoSource} type={videoType} />
                </video>
                <div style={{marginLeft:"20px",position:"relative",top:"-15px"}}>
                    <p className="allTextContent">Video name: {videoName}</p>
                    <p className="allTextContent">Video length {videoLength}</p>
                    <p className="allTextContent">Frames {numFrames}</p>
                </div>
            </div>
        </div>
    </div>
);


export default VideoInfoInResults;