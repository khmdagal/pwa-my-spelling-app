import { useState, useEffect } from 'react'
import { allOtherAxiosRequest } from '../../api/axios'
import TableData from '../../component/TableData'

function Assignments() {
    const [assignmentsData, setAssignmentsData] = useState([])

  

    useEffect(() => {
  const getAllAssignmentsData = async () => {
        const response = await allOtherAxiosRequest.get('/api/v1/spelling/words/weeklypractice/all')
        setAssignmentsData(response.data.assignments)

    }
    getAllAssignmentsData()
     
    }, [])

    return (
        <div >
            <TableData formData={assignmentsData}/>
        </div>
    )
}

export default Assignments