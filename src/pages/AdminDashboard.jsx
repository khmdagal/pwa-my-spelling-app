import { useState } from 'react';
import Time from '../component/Time';
import SetAssignment from '../assignments/setAssignments/SetAssignment';
import StudentsRecord from '../assignments/setAssignments/StudentsRecord';
import Assignments from '../assignments/setAssignments/Assignments';
import CreateYear from '../pages/CreateYear';
import CreateYearGroup from '../pages/CreateYearGroup';
import Leaderboard from '../pages/LeaderBoard';

import adminDashboardStyle from '../css/Dashboard.module.css';

function Dashboard() {
    const [activeView, setActiveView] =  useState('setAssignment')

    const displayAssignment =()=>{
        setActiveView('setAssignment')
    }
    const displayStudentsRecord =()=>{
        setActiveView('studentsRecord')
    }
    const displayAssignments =()=>{
        setActiveView('assignments')
    }
    const displayCreateYear =()=>{
        setActiveView('createYear')
    }
    const displayCreateYearGroup =()=>{
        setActiveView('createYearGroup')
    }
    const displayLeaderBoard =()=>{
        setActiveView('leaderBoard')
    }

    const dispayMainContent =()=>{
        if (activeView === 'setAssignment'){
            return <SetAssignment />
        } else if( activeView === 'studentsRecord'){
            return <StudentsRecord />
        } else if( activeView === 'assignments'){
            return <Assignments />
        }else if( activeView === 'createYear'){
            return <CreateYear />
        }else if( activeView === 'createYearGroup'){
            return <CreateYearGroup />
        }else if( activeView === 'leaderBoard'){
            return <Leaderboard />
        }
        return <p>Select an option from the sidebar.</p>;
    }

    

    return (
            <div className={`${adminDashboardStyle.teachersDashboard}`}>
               <header className={`${adminDashboardStyle.dashboardHeader}`}>
                 <h1>Teachers Dashboard</h1>
                 <Time />
               </header>
               <div className={`${adminDashboardStyle.dashboardBody}`}>
                <aside className={`${adminDashboardStyle.sidebar}`}>
                    <button onClick={displayAssignment}>Set Assignment</button>
                    <button onClick={displayStudentsRecord}>Students Acticities</button>
                    <button onClick={displayAssignments}>Assignments</button>
                    <button onClick={displayLeaderBoard}>Leaderboard</button>
                    <button onClick={displayCreateYear}>Create a Year</button>
                    <button onClick={displayCreateYearGroup}>Create a Group</button>
                </aside>
                <main className={`${adminDashboardStyle.mainContent}`}>
                    {dispayMainContent()}
                </main>
               </div>
            </div>
            )

}
export default Dashboard;