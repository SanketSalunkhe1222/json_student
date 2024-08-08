import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file

function Comp() {
  const [filePath, setFilePath] = useState('');
  const[tableName,setTableName]=useState('');
  const [response, setResponse] = useState('');
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);

  const handleChange = (event) => {
    setFilePath(event.target.value);
  };

  const handleChangeTable = (event) => {
    setTableName(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8080/getData?filePath=${filePath}`);
      console.log(res.data);
      setResponse(JSON.stringify(res.data));
      setFormData(res.data);
      setShowForm(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFormChange = (event, key) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
    // console.log(formData);
  };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const res = await axios.post(`http://localhost:8080/send`,formData);
  //     console.log(res.data);
  //   } catch (error) {
  //     console.error('Error posting data:', error);
  //   }
  // };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(formData);
        const response = await fetch(`http://localhost:8080/send?tableName=${tableName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Assuming formData is JSON
            },
            body: JSON.stringify(formData) // Assuming formData is defined elsewhere
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response;
        console.log(data);
    } catch (error) {
        console.error('Error posting data:', error);
    }
};

  return (
    <div className="comp-container">
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          File Path:
          <input type="text" value={filePath} onChange={handleChange} required />
        </label>
        <div className="submit-button">
          <button type="submit">Get Data</button>
        </div>
      </form>
      {showForm && (
        <div className="response-section">
          <h2>Response:</h2>
          <pre>{response}</pre>
          <form onSubmit={handleFormSubmit}>
            <label className="form-label">Table Name:</label>
            <input type='text' value={tableName} name='tableName' 
            onChange={handleChangeTable} placeholder='tableName' required/>

            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label className="form-label">
                  {key}:
                  <input
                    type="text"
                    placeholder='Column Name'
                    onChange={(event) => handleFormChange(event, key)}
                  />
                </label>
              </div>
            ))}
            <div className="submit-button">
              <button type="submit">Send Data</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Comp;
