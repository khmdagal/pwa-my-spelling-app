import Time from '../component/Time';

import '../css/Dashboard.module.css';
import SetAssignment from '../assignments/setAssignments/SetAssignment';

function Dashboard() {
    return (
        <div>
            <Time />
            <h1>Dashboard</h1>
            <SetAssignment />
        </div>
    )

}
export default Dashboard;