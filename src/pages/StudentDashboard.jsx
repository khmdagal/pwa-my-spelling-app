import React from "react";
import Header from "../component/Header";
import MyAssignment from "../assignments/myAssignments/MyAssignments";

function StudentDashboard() {
    return (
        <div>
            <h1>Student Dashboard</h1>
            <Header />
            <MyAssignment />
        </div>
    )

}

export default StudentDashboard;