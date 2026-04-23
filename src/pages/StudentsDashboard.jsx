import { useState } from "react";
import MyAssignment from "../assignments/myAssignments/MyAssignments";
import PracticeMyAssignments from "../assignments/myAssignments/PracticeMyAssignments";
import Leaderboard from "./LeaderBoard";



import studentDashboardStyle from '../css/Dashboard.module.css'

function StudentsDashboard() {
    const [activeView, setActiveView] =  useState('myAssignment')

    const displayAssignment =()=>{
        setActiveView('myAssignment')
    }
    const displayPracticePage =()=>{
        setActiveView('practicePage')
    }

    const displayLeaderBoard =()=>{
        setActiveView('leaderBoard')
    }

    const dispayMainContent =()=>{
        if (activeView === 'myAssignment'){
            return <MyAssignment />
        } else if( activeView === 'practicePage'){
            return <PracticeMyAssignments />
        } else if( activeView === 'leaderBoard'){
            return <Leaderboard />
        }
        return <p>Select an option from the sidebar.</p>;
    }



    return (
        <div className={`${studentDashboardStyle.studentDashboard}`}>
           <header className={`${studentDashboardStyle.dashboardHeader}`}>
             <h1>Student Dashboard</h1>
           </header>
           <div className={`${studentDashboardStyle.dashboardBody}`}>
            <aside className={`${studentDashboardStyle.sidebar}`}>
                <button onClick={displayAssignment}>My Assignment</button>
                <button onClick={displayPracticePage}>Practice Page</button>
                <button onClick={displayLeaderBoard}>LeaderBoard</button>
            </aside>
            <main className={`${studentDashboardStyle.mainContent}`}>
                {dispayMainContent()}
            </main>
           </div>
        </div>
    )

}

export default StudentsDashboard;