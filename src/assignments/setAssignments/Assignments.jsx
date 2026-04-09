import { useState, useEffect, useMemo } from 'react'
import { allOtherAxiosRequest } from '../../api/axios'
import TableData from '../../component/TableData';


function Assignments() {
    const [assignmentsData, setAssignmentsData] = useState([]);
    const user = localStorage.getItem('user');

    const school_id = useMemo(() => {
        if (user) {
            const parsedUser = JSON.parse(user);
            return parsedUser.school_id;
        }
        return null;
    }, [user]);

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
    }, [school_id])

    return (
        <div >
            <TableData formData={assignmentsData} />
        </div>
    )
}

export default Assignments