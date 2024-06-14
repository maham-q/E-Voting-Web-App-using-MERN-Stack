import React from "react"
import { Link } from 'react-router-dom';
import './candidatedashboard.css'
function CandidateDashboard(){
    return(
        <header>
            <h1> Candidate Dashboard</h1>
            <nav>
                <ul >
                    <Link to='./apply' className="can1">Apply for Candidateship</Link>
                    <Link to='./votersList' className="can2">Voters List </Link>
                    <Link to='./totalVotes' className="can3">Total Votes</Link>
                    <Link to='./profile' className="can4">View Profile</Link>
                </ul>
            </nav>
        </header>
    )
}
export default CandidateDashboard;