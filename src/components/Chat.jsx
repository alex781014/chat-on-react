import React, {  useState,useEffect, useCallback} from "react";
import ChatBody from "./ChatBody";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";
import ChatInput from "./Chatinput";


const Chat = ({socket,user,users,setUsers,messages,setMessages})=>{
    const[message,setMessage] = useState("");
    const[selectedUser,setselectedUser] = useState({});

    const findUser = useCallback(
        (userId)=>{
            const userIndex = users.findIndex((u)=>u.userId === userId)
            return userIndex >= 0
        },
        [users]
    );
    const handleConnectionStatus = useCallback(
      (userId,status)=>{
      const userIndex = users.findIndex((u)=>u.userId === userId)
      if(userIndex >=0 ){
          users[userIndex].connected = status;
          setUsers([...users]);
      }
    },
    [users,setUsers]
    );

    const userConnected = useCallback(
      ({userId,username})=>{
      if(user.userId !== userId){
       const userExists = findUser(userId)
        if(userExists){
          handleConnectionStatus(userId,true)
        }else{
          const newUser = {userId,username,connected:true};
          setUsers([...users,newUser]);
          }
        }
      },
      [user,users,setUsers,findUser,handleConnectionStatus]
    );

    const userDisconnected = useCallback(
      ({userId})=>{handleConnectionStatus(userId,false)     
    },[handleConnectionStatus]
    );

    const handleNewMessageStatus = useCallback((userId,status)=>{
      const userIndex = users.findIndex((u)=>u.userId === userId);
      if(userIndex >= 0 ){
        users[userIndex].hasNewMessage = status;
        setUsers([...users]);
      }
    },
    [users,setUsers]
    );

    const privateMessage = useCallback(
      ({content,from,to})=>{
        //if user is selected
        if(selectedUser.userId){
          if(selectedUser.userId === from){
            const newMessage= {
              userId:from,
              message:content,
            };
            setMessages([...messages,newMessage]);      
         }else{
          handleNewMessageStatus(from,true)
         }
        }else{
        //if user is not selected
          handleNewMessageStatus(from,true)
        }
    },
    [messages,setMessages,selectedUser,handleNewMessageStatus]
    );

    useEffect(()=>{
        socket.on("user connected",(user)=>userConnected(user));

        socket.on("user disconnected",(user)=>userDisconnected(user))

        socket.on("private message",(message)=>privateMessage(message));
    },[socket,userConnected,userDisconnected,privateMessage]);

    const sendMessage = () =>{
        socket.emit("private message",{
          content:message,
          to:selectedUser.userId,
        });
        const newMessage = {
            userId:user.userId,
            username:user.username,
            message,
        }
        setMessages([...messages,newMessage]);
        setMessage("")
    };

    const selectUser = (user)=>{
        setselectedUser(user);

        setMessage([]);
    }

    return (
        <ChatContainer>
            <div className="d-flex flex-column col-4 col-lg-4 col-xl-4 pe-0 border-right-info">
                <div className="align-items-start py-2 px-4 w-100 border-bottom border-info d-lg-block sticky-top bg-white">
                    <div className="d-flex align-items-center py-1">
                        <div className="position-relative">
                        <img src="http://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mx-2" alt={user.username} width="40" height="40" />
                        </div>
                        <div className="flex-grow-1">{user.username}</div>
                    </div>
                </div>
                <div className="text-center bg-primary text-white">已連線用戶</div>
                {users.length > 0 ?
                    users.map((user,index)=>{
                        return <div key={index} className="py-2 px-2 border-bottom border-info d-lg-black cursor-pointer" onClick={()=>selectUser(user)}>
                            <div className="d-flex align-items-center py-1">
                                <div className="d-flex flex-column position-relative">
                                <img src={`http://bootdey.com/img/Content/avatar/avatar${index + 1}.png`} className="rounded-circle mx-2" alt={user.username} width="45" height="45" />
                                <span className={user.connected ? "online":"offline"}></span>
                            </div>
                        <div className="d-flex flex-row position-relative w-100">
                          <strong className="me-auto">{user.username}</strong>
                          <span className={user.hasNewMessage ? "new-message-alert mt-2" : ""}></span>
                          </div>
                    </div>
                        </div>
                    })
                :(
                    <div className="d-flex justify-content-center align-items-center chat-window">
                    沒有使用者登入
                    </div>
                )}
            </div>
                {selectedUser.userId  && ( <div className="d-flex flex-column col-8 col-lg-8 col-xl-8 ps-0 chat-window">
                <ChatHeader user={selectedUser}/>
                <ChatBody user={user} messages={messages}/>
                <ChatInput 
                message={message}  
                setMessage={setMessage}  
                sendMessage={sendMessage}
                /> 
            </div>
            )}

        </ChatContainer>   
    );
};
export default Chat