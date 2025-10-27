import { useState, useEffect } from 'react';
import { allOtherAxiosRequest } from '../api/axios';


function Example({ word_id, existingExamples }) {
    const [example1, setExample1] = useState(existingExamples.example1);
    const [example2, setExample2] = useState(existingExamples.example2);
    const [isVisible, setIsVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('Update');
    const [errorMessage, setErrorMessage] = useState('');


    const handleEditExample = () => {
        setIsVisible(true);
    }

    const handleUpdateExample = async () => {

        try {
            const response = await allOtherAxiosRequest.put(`api/v1/spelling/words/${word_id}/example`, {
                word_id: word_id,
                newExmaples: {
                    "example1": example1,
                    "example2": example2
                }
            });

            if (response.status === 201) {

                setSuccessMessage('Successfully updated ✅')
                setTimeout(() => {

                    setIsVisible(false);
                    setSuccessMessage('Updated')
                }, 2000)

            } else {
                setErrorMessage('Failed to update examples');
            }

        } catch (error) {

            console.error('Error updating example:', error);
        }

    }

    useEffect(() => {
    }, [existingExamples]);

    if (!example1 && !example2) return <p>Loading examples...</p>;


    return (
        <div>
            <p>{example1 || existingExamples.example1} <input value={example1} name='example1' type='text' style={{ display: isVisible ? 'inline' : 'none' }} onChange={(e) => setExample1(e.target.value)} /> </p>
            <p>{example2 || existingExamples.example2} <input value={example2} name='example2' type='text' style={{ display: isVisible ? 'inline' : 'none' }} onChange={(e) => setExample2(e.target.value)} /> </p>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button onClick={() => handleEditExample()}>Edit</button>
            <button onClick={() => handleUpdateExample()} style={{ display: isVisible ? 'inline' : 'none' }}>{successMessage}</button>
        </div>
    );
}

export default Example;


/*


import { useState, useEffect } from 'react';
import { allOtherAxiosRequest } from '../api/axios';

function Example({ word_id, existingExamples }) {
  // Consolidating state into one object
  const [examples, setExamples] = useState({
    example1: existingExamples?.example1 || '',
    example2: existingExamples?.example2 || ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Update');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle changes in example inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExamples((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle edit button click
  const handleEditExample = () => {
    setIsVisible(true);
  };

  // Handle update request
  const handleUpdateExample = async () => {
    try {
      const response = await allOtherAxiosRequest.put(
        `api/v1/spelling/words/${word_id}/example`,
        {
          word_id,
          newExamples: examples
        }
      );

      if (response.status === 201) {
        setSuccessMessage('Successfully updated ✅');
        setTimeout(() => {
          setIsVisible(false);
          setSuccessMessage('Update');
        }, 5000);
      } else {
        throw new Error('Failed to update examples');
      }
    } catch (error) {
      console.error('Error updating example:', error);
      setErrorMessage('Failed to update examples. Please try again later.');
    }
  };

  // Handle initial example setup
  useEffect(() => {
    if (existingExamples) {
      setExamples(existingExamples);
    }
  }, [existingExamples]);

  if (!examples) return <p>Loading examples...</p>;

  return (
    <div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {['example1', 'example2'].map((key) => (
        <p key={key}>
          {examples[key] || existingExamples[key]}
          {isVisible && (
            <input
              value={examples[key]}
              name={key}
              type="text"
              onChange={handleInputChange}
            />
          )}
        </p>
      ))}

      <button onClick={handleEditExample}>Edit</button>
      {isVisible && (
        <button onClick={handleUpdateExample}>
          {successMessage}
        </button>
      )}
    </div>
  );
}

export default Example;

*/