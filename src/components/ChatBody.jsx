import React from "react";

const ChatBody = ({user,messages})=>{
        return(
            <div className="position-relative overflow-auto chat-height">
                {/* <ScrollableFeed> */}
                <div className="p-4 d-flex flex-column"> 
                    {messages.map((message,index) => { 
                        return message.type === "userStatus" ? (
                          <div key={index} className="text-center">
                            {/* <span className="badge bg-info">
                                {message.userId === user.userId
                                 ? "您已加入此聊天室" 
                                 : `${message.username} 已加入聊天室囉!`} 
                            </span> */}
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
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                {/* <img
                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                    alt={message.username}
                                    title={message.username}
                                    width="40" 
                                    height="40" 
                                    className="rounded-cirle mr-1" 
                                /> */}
                                {/* 顯示訊息時間 */}

                            </div>
                            <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                {/* <div className="font-weight-bold mb-1">
                                    {message.userId === user.userId ? "You" : message.username}
                                </div> */}
                                {message.message}
                                {/* <div className="text-muted small text-nowrap mt-2">
                                    12:00 AM
                                </div>                                 */}
                            </div>
                        </div>
                        );
                    })}
                </div>
                {/* </ScrollableFeed> */}
            </div>
    )
}

export default ChatBody