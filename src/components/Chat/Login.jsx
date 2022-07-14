import React from "react";

const Login = ({newUser,setNewUser,authenticateUser})=>{
    return( 
        <div className="card w-100 text-center border-white">
            <div className="row">
              <div className="clo-12">
                <h5>請輸入暱稱</h5>
              </div>
              <div className="d-flex justify-content-center py-1">
                <div className="col-4">
                  <input type="text"
                    name="username" value={newUser}
                    className="form-control mb-3"
                    placeholder="請輸入暱稱"
                    autoComplete="off"
                    onChange={({currentTarget:input}) => setNewUser(input.value)}
                    onKeyPress={(e) => (e.code === "Enter" || e.code === 108? authenticateUser() : null)}
                  />
                  <button className="btn btn-success w-100" onClick={() => authenticateUser()}>加入聊天室^_^</button>
                </div>
              </div>
            </div>
        </div>
    );
}

export default Login