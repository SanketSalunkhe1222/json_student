import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const JsonProcessor = () => {
    const [filePath, setFilePath] = useState('');
    const [metadata, setMetadata] = useState([]);
    const [formData, setFormData] = useState({});
    const navigate= useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/getData?filePath=${filePath}`, {
                method: 'POST',
            });

            if (!response.ok) {
               alert("filetype not supported.")
            }
            const data = await response.json();
            setMetadata(data.metadata);
        } catch (error) {
            console.error('Error:', error);
            alert("Wrong path entered or filetype not supported.")
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
          const formattedData = {...formData};
          const selectedPrimaryKey = document.querySelector('input[name="primaryKey"]:checked');
          formattedData.primaryKey = selectedPrimaryKey ? selectedPrimaryKey.value : '';

          // Get checked checkboxes values
        // const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        // const checkedValues = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);
        // formattedData.checkedValues = checkedValues;

            // Send the formData to your backend
            const response = await fetch('http://localhost:8080/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Data sent successfully');
            // Redirect to a different page after sending data
            navigate('/sendagain');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleInputChange = (event, columnName) => {
      const { value } = event.target;
      setFormData(prevState => ({
          ...prevState,
          [columnName]: value
      }));
  };
    return (
        <div id="fileHandlerContainer">
            <form id="metadataForm" onSubmit={handleSubmit}>
                <input
                    placeholder='Enter File Path'
                    type="text"
                    id="pathInput"
                    value={filePath}
                    onChange={(e) => setFilePath(e.target.value)}
                    required
                />
                <button type="submit" id="metadataSubmit">Get Metadata</button>
            </form>

            {metadata.length > 0 && (
                <div id="responseContainer">
                
                    <h2>Metadata:</h2>
                    <form id='editFlex' onSubmit={handleFormSubmit}>
                        <table id="metadataTable">
                            <thead>
                                <tr>
                                    <th>Column Name</th>
                                    <th>Data Type</th>
                                    <th>Max length</th>
                                    <th>tableName.columnName</th>
                                    <th>primary key</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metadata.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.columnName}</td>
                                        <td>{data.dataType}</td>
                                        <td>{data.maxColumnLength}</td>
                                        <td> <input type='text' name={data.columnName} 
                                         onChange={(event) => handleInputChange(event, data.columnName)}
                                          required /> </td>
                                         <td> 
                                                <input type='radio' 
                                                name='primaryKey' value={data.columnName} 
                                                required />
                                        </td>
                                        {/* <td>
                                            <input type='checkbox' value={data.columnName} />
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        <h2>Database properties:</h2>
                                        <table id="metadataTable">
                                            <tbody>
                                            <tr>
                                            <td>
                                                <label htmlFor="dbUrl">Database URL:</label>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    id="dbUrl"
                                                    name="dbUrl"
                                                    value={formData.dbUrl || ''}
                                                    onChange={(e) => handleInputChange(e, 'dbUrl')}
                                                    required
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="dbUsername">Database Username:</label>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    id="dbUsername"
                                                    name="dbUsername"
                                                    value={formData.dbUsername || ''}
                                                    onChange={(e) => handleInputChange(e, 'dbUsername')}
                                                    required
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="dbPassword">Database Password:</label>
                                            </td>
                                            <td>
                                                <input
                                                    type="password"
                                                    id="dbPassword"
                                                    name="dbPassword"
                                                    value={formData.dbPassword || ''}
                                                    onChange={(e) => handleInputChange(e, 'dbPassword')}
                                                    required
                                                />
                                            </td>
                                        </tr>
                                            </tbody>
                                        </table>
                            <button className='submit-button' type="submit">Send Data</button>        
                    </form>
                    
                </div>
            )}
        </div>
    );
}

export default JsonProcessor;