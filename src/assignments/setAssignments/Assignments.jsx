import { useState, useEffect } from 'react'
import { allOtherAxiosRequest } from '../../api/axios'
import TableData from '../../component/TableData';

const user = localStorage.getItem('user')




function Assignments() {
    const [assignmentsData, setAssignmentsData] = useState([])
    const school_id = JSON.parse(user)?.school_id
    useEffect(() => {
        const getAllAssignmentsData = async () => {
            const response = await allOtherAxiosRequest.get(`/api/v1/spelling/words/weeklypractice/all/${school_id}`);
            if (response.status === 200) {
                setAssignmentsData(response.data.assignments)
            } else {
                setAssignmentsData([])
            }
        }
        getAllAssignmentsData()
    }, [])

    return (
        <div >
            <TableData formData={assignmentsData} />
        </div>
    )
}

export default Assignments