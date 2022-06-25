import React from "react";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";
import ChatInput from "./Chatinput";
// import ScrollableFeed from 'react-scrollable-feed';
// import ScrollableFeed from './cdn.html'

const Chat = ({user,message,messages,setMessage,sendMessage})=>{
    return (
        <ChatContainer>
            <ChatHeader user={user}/>
            <div className="position-relative overflow-auto chat-height">
                {/* <ScrollableFeed> */}
                <div className="p-4 d-flex flex-column"> 
                    
                    {messages.map((message,index) => { 
                        return message.type === "userStatus" ? (
                        <div key={index} className="text-center">
                            <span className="badge bg-info">
                                {message.userId === user.userId
                                 ? "您已加入此聊天室" 
                                 : `${message.username} 已加入聊天室囉!`} 
                            </span>
                        </div>
                        ):(
                        <div
                            key={index}
                            className={
                                message.userId === user.userId
                                    ? "chat-message-right pb-4"
                                    : "chat-message-left pb-4"
                                    }
                         >
                            <div>
                                <img
                                    src="https://i.pinimg.com/236x/5b/e7/ef/5be7efcd864816b80b4c6d74e1d58f09.jpg"
                                    alt={message.username}
                                    title={message.username}
                                    width="40" 
                                    height="40" 
                                    className="rounded-cirle mr-1" 
                                />
                                {/* 顯示訊息時間 */}
                                <div className="text-muted small text-nowrap mt-2">
                                    12:00 AM
                                </div>
                            </div>
                            <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                <div className="font-weight-bold mb-1">
                                    {message.userId === user.userId ? "You" : message.username}
                                </div>
                                {message.message}
                            </div>
                        </div>
                        );
                    })}
                </div>
                {/* </ScrollableFeed> */}
            </div>
            <ChatInput 
                message={message}  
                setMessage={setMessage}  //
                sendMessage={sendMessage}
            /> 
        </ChatContainer>   
    );
};

  <script src="https://cdn.jsdelivr.net/npm/react-scrollable-feed@1.3.1/dist/index.js" integrity="sha256-16tOO76JK+hKgV95c7AWSGxscWMF3fv+8Rru93tC2xQ=" crossorigin="anonymous"></script>

export default Chat