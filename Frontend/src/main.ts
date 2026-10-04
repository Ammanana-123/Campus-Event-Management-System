import "./style.css";
import { loginUser } from "./api";

const app = document.querySelector("#app")!;

function homePage() {
  app.innerHTML = `
    <div class="container">
      <h1>Campus Event Management System</h1>
      <p>Welcome to our project</p>

      <button id="loginBtn">Login</button>
    </div>
  `;

  document.getElementById("loginBtn")!
    .addEventListener("click", loginPage);
}


function loginPage() {
  app.innerHTML = `
    <div class="login-box">

      <h2>Campus Event Management System</h2>

      <input id="email" type="email" placeholder="Email">

      <input id="password" type="password" placeholder="Password">

      <select id="role">
        <option>Student</option>
        <option>Organizer</option>
        <option>Admin</option>
      </select>

      <button id="login">Login</button>

      <p id="message"></p>

      <p>Forgot Password?</p>

    </div>
  `;

  document.getElementById("login")!
    .addEventListener("click", async () => {

      const email =
        (document.getElementById("email") as HTMLInputElement).value;

      const password =
        (document.getElementById("password") as HTMLInputElement).value;

      try {

        const data = await loginUser(email, password);

        console.log("Login API Response:", data);

        const userRole = data.user.role;

        if (userRole === "student") {
          studentDashboard();
        }
        else if (userRole === "organizer") {
          organizerDashboard();
        }
        else if (userRole === "admin") {
          adminDashboard();
        }

      } catch (error) {

        const message = document.getElementById("message")!;

        message.textContent = "Invalid email or password";
      }

    });
}

function studentDashboard() {

  app.innerHTML = `
  <div class="dashboard">
  <div class="navbar">
    <span>🎓 Campus Event Management</span>
    <span>Student</span>
</div>
<div class="dashboard">

<div class="navbar">
    <span>📅 Upcoming Events</span>
    <span>Student</span>
</div>

<div class="stats">
  <div class="stat-box">
    <h3>12</h3>
    <p>Upcoming Events</p>
  </div>

  <div class="stat-box">
    <h3>3</h3>
    <p>Registered</p>
  </div>

  <div class="stat-box">
    <h3>5</h3>
    <p>Notifications</p>
  </div>
</div>

<h1>📅 Upcoming Events</h1>

...x

  <h1>Student Dashboard</h1>
 <input
  type="text"
  placeholder="🔍 Search Events..."
  class="search-box"
/>

  <button id="events">Upcoming Events</button>

  <button id="register">My Registrations</button>

  <button id="ai">AI Recommended Events</button>

  <button id="notify">Notifications</button>

  <button id="logout">Logout</button>

  </div>
  `;

  document.getElementById("events")!
    .addEventListener("click", eventPage);

  document.getElementById("register")!
  .addEventListener("click", myRegistrations);

  document.getElementById("ai")!
  .addEventListener("click", aiRecommendedEvents);

  document.getElementById("notify")!
  .addEventListener("click", notificationsPage);

  document.getElementById("logout")!
    .addEventListener("click", homePage);

    
}
function organizerDashboard() {

app.innerHTML = `
<div class="dashboard">

<h1>👨‍🏫 Organizer Dashboard</h1>

<div class="card">➕ Create Event</div>

<div class="card">✏ Edit Event</div>

<div class="card">👥 View Participants</div>

<div class="card">📊 Analytics</div>

<button id="orgBack">Back</button>

</div>
`;

document.getElementById("orgBack")!
.addEventListener("click",homePage);

}

function adminDashboard(){

app.innerHTML=`
<div class="dashboard">

<h1>👨‍💼 Admin Dashboard</h1>

<div class="card">👨‍🎓 Manage Students</div>

<div class="card">👨‍🏫 Manage Organizers</div>

<div class="card">✅ Approve Events</div>

<div class="card">📈 Reports</div>

<button id="adminBack">Back</button>

</div>
`;

document.getElementById("adminBack")!
.addEventListener("click",homePage);

}

homePage();
function eventPage() {

  app.innerHTML = `
  <div class="dashboard">
  <div class="navbar">
    <span>📅 Upcoming Events</span>
    <span>Student</span>
</div>

  <h1>📅 Upcoming Events</h1>

  <div class="card">
      <h2>💻 AI Workshop</h2>
      <p>Date : 15 Sept 2026</p>
      <p>Venue : Seminar Hall</p>
      <button id="event1">Register</button>
  </div>

  <div class="card">
      <h2>🤖 Hackathon</h2>
      <p>Date : 20 Sept 2026</p>
      <p>Venue : Auditorium</p>
      <button id="event2">Register</button>
  </div>

  <div class="card">
      <h2>🎭 Cultural Fest</h2>
      <p>Date : 25 Sept 2026</p>
      <p>Venue : Open Ground</p>
      <button id="event3">Register</button>
  </div>

  <button id="back">⬅ Back</button>

  </div>
  `;

  document.getElementById("event1")!.addEventListener("click", eventDetails);
  document.getElementById("event2")!.addEventListener("click", eventDetails);
  document.getElementById("event3")!.addEventListener("click", eventDetails);

  document.getElementById("back")!
    .addEventListener("click", studentDashboard);

}

function eventDetails(){

app.innerHTML=`

<div class="dashboard">

<h1>AI Workshop</h1>

<p><b>Date:</b>15 Sept 2026</p>

<p><b>Time:</b>10:00 AM</p>

<p><b>Venue:</b>Seminar Hall</p>

<p>Learn AI, ML and hands-on projects.</p>

<button id="confirm">Confirm Registration</button>

</div>

`;

document.getElementById("confirm")!
.addEventListener("click",myRegistrations);

}

function aiRecommendedEvents() {
  app.innerHTML = `
    <div class="dashboard">
      <div class="navbar">
        <span>🤖 AI Recommended Events</span>
        <span>Student</span>
      </div>

      <h1>🤖 AI Recommended Events</h1>

      <div class="card">
        <h2>💻 AI Workshop</h2>
        <p>Recommended based on your interest in AI and Machine Learning.</p>
        <p>Date: 15 Sept 2026</p>
        <p>Venue: Seminar Hall</p>
      </div>

      <div class="card">
        <h2>🤖 Hackathon</h2>
        <p>Recommended for students interested in technology and coding.</p>
        <p>Date: 20 Sept 2026</p>
        <p>Venue: Auditorium</p>
      </div>

      <button id="aiBack">⬅ Back to Dashboard</button>
    </div>
  `;

  document.getElementById("aiBack")!
    .addEventListener("click", studentDashboard);
}

function notificationsPage() {
  app.innerHTML = `
    <div class="dashboard">
      <div class="navbar">
        <span>🔔 Notifications</span>
        <span>Student</span>
      </div>

      <h1>🔔 Notifications</h1>

      <div class="card">
        <h2>📢 New Event Available</h2>
        <p>AI Workshop registration is now open.</p>
      </div>

      <div class="card">
        <h2>✅ Registration Confirmed</h2>
        <p>Your registration for AI Workshop was successful.</p>
      </div>

      <button id="notifyBack">⬅ Back to Dashboard</button>
    </div>
  `;

  document.getElementById("notifyBack")!
    .addEventListener("click", studentDashboard);
}

function myRegistrations(){

app.innerHTML=`

<div class="dashboard">

<h1>✅ My Registrations</h1>

<div class="card">

<h2>💻 AI Workshop</h2>

<p>Status : Registered Successfully</p>

</div>

<button id="home">Go To Dashboard</button>

</div>

`;

document.getElementById("home")!
.addEventListener("click",studentDashboard);

}
