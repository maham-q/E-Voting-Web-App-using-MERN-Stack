import React from "react"
import { Link } from 'react-router-dom';
import './Dashboard.css'
import axios from "axios";

function Dashboard() {
    return (
        <div className="dashboard-container">
            <header>
                <h1> Voting System</h1>
                <nav>
                    <h2>Home Page</h2>
                    <ul>
                        <Link to='./candidateDashboard' className="can">Continue as a Candidate</Link>
                        <Link to='./voterDashboard' className="can">Continue as a Voter</Link>
                        
                    </ul>
                </nav>
                {/* <button className="logout" onClick={logout}>Logout</button> */}
                <img src={process.env.PUBLIC_URL + "/vote.jpg"} alt="voting " />
            </header>
        </div>
    );
}
export default Dashboard;