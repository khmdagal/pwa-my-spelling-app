import React from "react";

function PracticeMyAssignment({ assignment }) {
    
    return (
        <div>
            <h3>Words Practice Page</h3>
            <div className="selectedWordsContainer">

                {assignment.words?.map(word => {
                    return (<div className="words" name="words" >{word}</div>)
                })}
            </div>
        </div>
    )
}

export default PracticeMyAssignment