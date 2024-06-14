import React from "react"
import { Link } from 'react-router-dom';
import './adminDasboard.css'
function AdminDashboard(){
    return(
        <header>
            <h1> Admin Dashboard</h1>
            <nav>
                <ul >
                    <Link to='./startElection' className="can2">Start Election </Link>
                    {/* <Link to='./candidateReview' className="can3">Review Applications</Link> */}
                    {/* <Link to='./viewResults' className="can4">Publish Results</Link> */}
                </ul>
            </nav>
        </header>
    )
}
export default AdminDashboard;