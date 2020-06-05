import React from 'react';
import './../styles/UploadVideoStyles.css';
import upload from './../icons/upload.png';
const UploadVideo = ({title,uploadVideo}) => (
    <div className="uploadvideobox" onClick={uploadVideo}>
        <img src={upload} className="uploadicon" />
        <h4 className="title">{title}</h4>
    </div>
);

export default UploadVideo;