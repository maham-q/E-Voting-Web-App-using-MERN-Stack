import React from "react"
import { Link } from 'react-router-dom';
import './voterDashboard.css'
function VoterDashboard(){
    return(
        <header>
            <h1>Voter Dashboard</h1>
            <nav>
                <ul >
                    <Link to='./casting' className="vot1">Cast Vote</Link>
                </ul>
            </nav>
        </header>
    )
}
export default VoterDashboard;