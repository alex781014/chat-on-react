import React,{useState, useEffect} from "react";
import Login from "./Login";
import Chat from "./Chat";


const Main = ({socket})=>{
    const [newUser, setNewUser] = useState("");
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
      socket.on("users",(users)=>{
        const messagesArr = [];
        for (const {userId,username} of users) {
          const newMessage = { type:"userStatus", userId, username};
          messagesArr.push(newMessage)
        }
        setMessages([...messages, ...messagesArr])
        setUsers(users);
      })
      socket.on("session",({ userId,username})=>{
        setUser({ userId,username});
      });
      socket.on("user connected",({userId,username})=>{
        const newMessage = { type:"userStatus", userId, username};
        setMessages([...messages,newMessage])
      })
      socket.on("new message",({ userId,username,message })=>{
      const newMessage = { 
        type:"message", 
        userId:userId,
        username:username,
        message,
      }
      setMessages([...messages,newMessage]);
      })
    },[socket,messages]);

    function logNewUser() {
    socket.auth = {username:newUser}
    socket.connect();
    }

    function sendMessage(){
      socket.emit("new message", message)
      const newMessage = { 
        type:"message", 
        userId:user.userId,
        username:user.username,
        message,
      }
      setMessages([...messages,newMessage]);
      setMessage("");
    }

    return(
    <main className="content">
      <div className="container mt-3">
        {user.userId && (
          <Chat user={user} message={message} messages={messages} setMessage={setMessage} sendMessage={sendMessage} />
        )}
        {!user.userId && (
          <Login newUser={newUser} setNewUser={setNewUser} logNewUser={logNewUser} />
        )}
      </div>
    </main>
    )
}
<script>
  <script src="https://cdn.jsdelivr.net/npm/react-scrollable-feed@1.3.1/dist/index.js" integrity="sha256-16tOO76JK+hKgV95c7AWSGxscWMF3fv+8Rru93tC2xQ=" crossorigin="anonymous"></script>
</script>
export default Main