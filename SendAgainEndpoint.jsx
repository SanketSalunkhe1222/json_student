import React, { useState } from 'react';
import '../App.css';

const SendAgainEndpoint = () => {
    const [filePath, setFilePath] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send POST request to /sendagain API endpoint with filePath
            const response = await fetch(`http://localhost:8080/sendagain?filePath=${filePath}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response);
            if (!response.ok) {
                console.log("if block");
                setIsSuccess(true);
                setResponseMessage("Metadata is not available."
            + " Please Generate Metadata first."); // Set an error message
                // throw new Error('Network response was not ok');
            }else{
                console.log('Data sent successfully');
                setIsSuccess(true);
                setResponseMessage("Data sent successfully"); // Set the response message received from the server
            }
            console.log('End of try');
        } catch (e) {
            setResponseMessage("Metadata is not available."
            + " Please Generate Metadata first."); // Set an error message
            console.error('Error occurred');
        }
    };

    const handleInputChange = (event) => {
        setFilePath(event.target.value);
    };

    return (
        <div id='fileHandlerContainer'>
            <form id="metadataForm" onSubmit={handleSubmit}>
                <input
                    placeholder='Enter File Path'
                    id="pathInput"
                    type="text"
                    value={filePath}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" id='metadataSubmit' >Send Data Again</button>
            </form>
            {isSuccess && <div className="success-message">{responseMessage}</div>}
        </div>
    );
}

export default SendAgainEndpoint;