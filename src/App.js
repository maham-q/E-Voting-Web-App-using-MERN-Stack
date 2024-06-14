import ApplyCandidate from "./pages/ApplyCandidate.js";
import LoginForm from "./pages/LoginForm.js";
import RegisterForm from "./pages/RegisterForm.js";
import Dashboard from "./pages/Dashboard.js";
import CastVotePage from "./pages/CastVotePage.js";
import CandidateReview from "./pages/CandidateReview.js";
import CandidateProfile from "./pages/CandidateProfile.js";
import StartElection from "./pages/StartElection.js";
import Results from "./pages/PublishResults.js";
import ViewVotes from "./pages/ViewVotes.js";
import ViewVoters from "./pages/ViewVoters.js";
import AdminDashboard from "./pages/AdminDashboard.js"
import CandidateDashboard from "./pages/CandidateDashboard.js"
import VoterDashboard from "./pages/VoterDashboard.js";
import AdminRegister from "./pages/AdminRegister.js";
import AdminLogin from "./pages/AdminLogin.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
    
        <Route path="/login" element={<LoginForm/>}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>

        <Route path="/adminRegister" element={<AdminRegister />}></Route>
        <Route path="/adminLogin" element={<AdminLogin />}></Route>
        <Route path="/adminDashboard" element={<AdminDashboard />}></Route>
        <Route path="/adminDashboard/startElection" element={<StartElection />}></Route>
        <Route path="/adminDashboard/review" element={<CandidateReview />}></Route>
        <Route path="/adminDashboard/viewResults" element={<Results />}></Route>

        <Route path="/dashboard/candidateDashboard" element={<CandidateDashboard />}></Route>
        <Route path="/dashboard/candidateDashboard/apply" element={<ApplyCandidate />}></Route>
        <Route path="/dashboard/candidateDashboard/profile" element={<CandidateProfile />}></Route>
        <Route path="/dashboard/candidateDashboard/totalvotes" element={<ViewVotes />}></Route>
        <Route path="/dashboard/candidateDashboard/voterslist" element={<ViewVoters />}></Route>
        <Route path="/dashboard/candidateDashboard/:id" element={<CandidateProfile />} />

        <Route path="/dashboard/voterDashboard" element={<VoterDashboard />}></Route>
        <Route path="/dashboard/voterDashboard/casting" element={<CastVotePage />}></Route>


        
      </Routes>
    </Router>
  );
}

export default App;





