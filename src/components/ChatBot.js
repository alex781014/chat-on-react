import React, { Component } from 'react'

export class ChatBot extends Component {

    componentDidMount() {

        (function (d, m) {
            var kommunicateSettings =
                { "appId": "207d56dbf79d38532a0aa0a007d83e197", "popupWidget": true, "automaticChatOpenOnNavigation": true };
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
            // var hidethis = document.querySelector(".mck-running-on");
            // hidethis.closest("div").remove(); //動不了 

        })(document, window.kommunicate || {});
        /* NOTE : Use web server to view HTML files as real-time update will not work if you directly open the HTML file in the browser. */
    }
    // 207d56dbf79d38532a0aa0a007d83e197
    // redeame https://docs.kommunicate.io/docs/web-customization
    // 設置按鈕用法 https://docs.kommunicate.io/docs/message-types

    render() {
        return (
            <div></div>
        )
    }
}

export default ChatBot