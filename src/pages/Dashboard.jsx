
import Time from '../component/Time';
import GetWords from '../component/Words';
import Header from '../component/Header';
import '../css/Dashboard.css'

function Dashboard() {


    return (
        <div>
            <Header />
            <Time />
            <h1>Dashboard</h1>
            <GetWords />
        </div>
    )

}
export default Dashboard;