import { useState, useEffect } from 'react';
import { allOtherAxiosRequest } from '../api/axios';
import  classes from '../css/Examples.module.css'

function Example({ word_id, existingExamples }) {
    const [example1, setExample1] = useState('');
    const [example2, setExample2] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    // Sync props → state
    useEffect(() => {
        if (existingExamples) {
            setExample1(existingExamples.example1 || '');
            setExample2(existingExamples.example2 || '');
        }
    }, [existingExamples]);

    const handleUpdateExample = async () => {
        setLoading(true);
        setStatus('');

        try {
            const response = await allOtherAxiosRequest.put(
                `api/v1/spelling/words/${word_id}/example`,
                {
                    word_id,
                    newExamples: {
                        example1,
                        example2
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                setStatus('Updated ✅');
                setIsEditing(false);
            } else {
                setStatus('Failed to update');
            }
        } catch (error) {
            console.error('Error updating example:', error);
            setStatus('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (!existingExamples) return <p>Loading examples...</p>;

    return (
        <div className={classes.exampleContainer}>
            <label>Example 1 ⤵️</label>
            {isEditing ? (
                <input
                    value={example1}
                    onChange={(e) => setExample1(e.target.value)}
                />
            ) : (
                <p>{example1}</p>
            )}

            <label>Example 2 ⤵️</label>
            {isEditing ? (
                <input
                    value={example2}
                    onChange={(e) => setExample2(e.target.value)}
                />
            ) : (
                <p>{example2}</p>
            )}

            {status && (
                <p style={{ color: status.includes('✅') ? 'green' : 'red' }}>
                    {status}
                </p>
            )}

            {!isEditing ? (
                <button onClick={() => setIsEditing(true)}>Edit</button>
            ) : (
                <button onClick={handleUpdateExample} disabled={loading}>
                    {loading ? 'Updating...' : 'Save'}
                </button>
            )}
        </div>
    );
}

export default Example;