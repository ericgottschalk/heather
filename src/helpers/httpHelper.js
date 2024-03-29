export function getHeaders() {
    let user = JSON.parse(localStorage.getItem('user'));
    let headers = { 'Content-Type': 'application/json' };
    
    if (user && user.token) {
        headers.Authorization = 'Bearer ' + user.token;
    } 

    return headers;
}

export function getAuthHeader(){
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } 
    
    return '';
}