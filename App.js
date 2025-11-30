import { useState } from "react";
import "./index.css";

export default function App() {
  const [page, setPage] = useState("login");
  const [info, setInfo] = useState({});
  const [classInfo, setClassInfo] = useState({});
  const [remember, setRemember] = useState(false);

  // Sample teacher & quiz data
  const teachers = {
    1: "Mrs. Anitha Sharma",
    2: "Mr. Rajesh Kumar",
    3: "Ms. Priya Singh",
    4: "Mr. Suresh Reddy",
    5: "Mrs. Kavya Nair",
    6: "Mr. Manoj Das",
    7: "Ms. Deepa Joshi",
    8: "Mr. Rohit Sharma",
    9: "Mrs. Sunita Rao",
    10: "Mr. Ajay Verma",
  };

  const quizData = {
    1: 7,
    2: 8,
    3: 9,
    4: 6,
    5: 8,
    6: 7,
    7: 9,
    8: 8,
    9: 10,
    10: 7,
  };

  function login() {
    if (!info.username || !info.password) {
      alert("Enter username & password");
      return;
    }
    setPage("info");
  }

  function saveInfoData() {
    if (!info.name || !info.email || !info.phone || !info.roll) {
      alert("Fill all details");
      return;
    }

    if (!info.email.includes("@gmail.com")) {
      alert("Invalid Email! Must contain '@gmail.com'");
      return;
    }

    if (!/^[0-9]{10}$/.test(info.phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    setPage("class");
  }

  function saveClassData() {
    if (!classInfo.cls || !classInfo.sub) {
      alert("Select class & subject");
      return;
    }
    setPage("summary");
  }

  function logout() {
    setInfo({});
    setClassInfo({});
    setRemember(false);
    setPage("login");
  }

  // Random attendance and marks
  let attendance = Math.floor(80 + Math.random() * 20);
  let marks = Math.floor(60 + Math.random() * 40);

  return (
    <div className="container">

      {/* LOGIN */}
      {page === "login" && (
        <div className="page login-page">
          <h2>Welcome Back!</h2>
          <p>Login to access your student dashboard</p>

          <div className="input-group">
            <span>👤</span>
            <input
              placeholder="Username"
              onChange={(e) => setInfo({ ...info, username: e.target.value })}
            />
          </div>

          <div className="input-group">
            <span>🔒</span>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
            />
          </div>

          <div className="remember-forgot">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember Me
            </label>
            <a href="#" onClick={() => alert("Forgot Password clicked!")}>
              Forgot Password?
            </a>
          </div>

          <button className="login-btn" onClick={login}>Login</button>

          <p className="signup-text">
            Don't have an account? <a href="#" onClick={() => alert("Sign Up Clicked!")}>Sign Up</a>
          </p>
        </div>
      )}

      {/* STUDENT INFO */}
      {page === "info" && (
        <div className="page">
          <h2>Student Info</h2>
          <input placeholder="Full Name" onChange={(e) => setInfo({ ...info, name: e.target.value })} />
          <input placeholder="Email" onChange={(e) => setInfo({ ...info, email: e.target.value })} />
          <input placeholder="Phone Number" onChange={(e) => setInfo({ ...info, phone: e.target.value })} />
          <input placeholder="Roll Number" onChange={(e) => setInfo({ ...info, roll: e.target.value })} />
          <button onClick={saveInfoData}>Save & Continue</button>
        </div>
      )}

      {/* CLASS SELECTION */}
      {page === "class" && (
        <div className="page">
          <h2>Select Class</h2>
          <select onChange={(e) => setClassInfo({ ...classInfo, cls: e.target.value })}>
            <option>Select Class</option>
            {[1,2,3,4,5,6,7,8,9,10].map(c => <option key={c}>{c}</option>)}
          </select>

          <select onChange={(e) => setClassInfo({ ...classInfo, sub: e.target.value })}>
            <option>Select Subject</option>
            <option>Maths</option>
            <option>Science</option>
            <option>English</option>
            <option>Social</option>
          </select>

          <button onClick={saveClassData}>Save & View Summary</button>
        </div>
      )}

      {/* SUMMARY */}
      {page === "summary" && (
        <div className="page">
          <h2>Summary</h2>
          <p><b>Name:</b> {info.name}</p>
          <p><b>Email:</b> {info.email}</p>
          <p><b>Phone:</b> {info.phone}</p>
          <p><b>Roll:</b> {info.roll}</p>
          <hr />
          <p><b>Class:</b> {classInfo.cls}</p>
          <p><b>Subject:</b> {classInfo.sub}</p>

          <button onClick={() => setPage("info")}>Edit Info</button>
          <button onClick={() => setPage("dashboard")}>Go to Dashboard</button>
          <button className="logout" onClick={logout}>Logout</button>
        </div>
      )}

      {/* DASHBOARD */}
      {page === "dashboard" && (
        <div className="dashboard-container">

          {/* SIDEBAR */}
          <div className="sidebar">
            <h2>Student Panel</h2>
            <div className="sidebar-item">Profile</div>
            <div className="sidebar-item">Teacher</div>
            <div className="sidebar-item">Fees</div>
            <div className="sidebar-item">Marks</div>
            <div className="sidebar-item">Quiz</div>
            <div className="sidebar-item">Attendance</div>
            <div className="sidebar-item">Extras</div>
            <div className="sidebar-item logout" onClick={logout}>Logout</div>
          </div>

          {/* MAIN CONTENT */}
          <div className="main-content">
            <h1>Welcome, {info.name} 👋</h1>
            <p>Here's your complete student dashboard overview.</p>

            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h3>👤 Profile</h3>
                <p><b>Name:</b> {info.name}</p>
                <p><b>Roll No:</b> {info.roll}</p>
                <p><b>Class:</b> {classInfo.cls}</p>
              </div>

              <div className="dashboard-card">
                <h3>👨‍🏫 Class Teacher</h3>
                <p>{teachers[classInfo.cls]}</p>
                <p>Subject: {classInfo.sub}</p>
              </div>

              <div className="dashboard-card">
                <h3>💰 Fees</h3>
                <p>Bus: ₹12,000 / Year</p>
                <p>School: ₹35,000 / Year</p>
              </div>

              <div className="dashboard-card">
                <h3>📅 Attendance</h3>
                <p className="stat">{attendance}%</p>
              </div>

              <div className="dashboard-card">
                <h3>📝 Latest Marks</h3>
                <p className="stat">{marks}</p>
              </div>

              <div className="dashboard-card">
                <h3>❓ Quiz Performance</h3>
                <p>{quizData[classInfo.cls]} / 10</p>
              </div>

              <div className="dashboard-card">
                <h3>🏆 Final Exam Marks</h3>
                <p>{marks + 5} / 100</p>
              </div>

              <div className="dashboard-card">
                <h3>⭐ Extra Activities</h3>
                <p>Cricket Team</p>
                <p>Science Club</p>
                <p>Coding Club</p>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
