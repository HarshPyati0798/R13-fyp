import React from 'react';
import './../styles/ReportSectionStyles.css';

const ReportSection = ({fileSize}) => (
    <div className="reportSection">
        <h3>Your report is ready</h3>
        <p>Click below to download the differences as frames<br/>which are marked with boxes around them<br/>and the description of the differences in a text file.</p>
        <button>DOWNLOAD REPORT</button>
        <p>Download file size: {fileSize}</p>
    </div>
);

export default ReportSection;