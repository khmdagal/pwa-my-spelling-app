import { useState } from 'react';
import Time from '../component/Time';
import classes from '../css/TeachersDashboard.module.css';
import SetAssignment from '../assignments/setAssignments/SetAssignment';
import StudentsRecord from '../assignments/setAssignments/StudentsRecord';
import Assignments from '../assignments/setAssignments/Assignments';
import CreateClassYear from '../pages/CreateClassYear';
import Leaderboard from '../pages/LeaderBoard';

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
    const displayCreateClassYear =()=>{
        setActiveView('createClassYear')
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
        }else if( activeView === 'createClassYear'){
            return <CreateClassYear />
        }else if( activeView === 'leaderBoard'){
            return <Leaderboard />
        }
        return <p>Select an option from the sidebar.</p>;
    }

    

    return (
            <div className={`${classes.teachersDashboard}`}>
               <header className={`${classes.dashboardHeader}`}>
                 <h1>Teachers Dashboard</h1>
                 <Time />
               </header>
               <body className={`${classes.dashboardBody}`}>
                <aside className={`${classes.sidebar}`}>
                    <button onClick={displayAssignment}>Set Assignment</button>
                    <button onClick={displayStudentsRecord}>Students Acticities</button>
                    <button onClick={displayAssignments}>Assignments</button>
                    <button onClick={displayLeaderBoard}>Leaderboard</button>
                    <button onClick={displayCreateClassYear}>Add New Class</button>
                </aside>
                <main className={`${classes.mainContent}`}>
                    {dispayMainContent()}
                </main>
               </body>
            </div>
            )

}
export default Dashboard;