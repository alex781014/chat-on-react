import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
// import { io } from "socket.io-client";
import React, { useState } from "react";
import NewUser from "./components/NewUser";

function App() {
  const [newUser, setNewUser] = useState("");
  const [user, setUser] = useState("");
  function handleChange({ currentTarget: input }) {
    setNewUser(input.value)
  }
  function logNewUser() {
    setUser(newUser)
  }
  //username 
  return (
    <main className="content">
      <div className="container mt-3">
        {user && <div>Logged in as {user}</div>}
        {!user && (
          <NewUser newUser={newUser} handleChange={handleChange} logNewUser={logNewUser} />
        )}
      </div>
    </main>
  );
}

export default App;
