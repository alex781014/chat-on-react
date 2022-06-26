const sessions = new Map();

//之後如果要用資料庫的話 就在這裡改 暫時先將資料寫在這裡

export function findSession(id) {
    return sessions.get(id);
}


// 這裡是為什麼使用map原因 如果已經保存了id我們將可以替換她 可以找到在array 
export function saveSession(id, session) {
    sessions.set(id, session);
}

export function findAllSessions() {
    return [...sessions.values()];
}