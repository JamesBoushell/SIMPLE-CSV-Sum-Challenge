import React, { Fragment } from 'react'

interface Props {
    fileType: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadForm = (props: Props) => {
    return (
        <Fragment>
            
            <input type="file" className="btn btn-dark mt-5" accept={props.fileType} onChange={props.handleChange}/><br />
            <label className="mt-1">Calculate sum of all values by uploading a .csv file above</label>
        </Fragment>
    )
}

export default UploadForm
