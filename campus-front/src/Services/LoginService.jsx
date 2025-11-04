import axios from 'axios';

const LOGIN_URL = 'http://localhost:9999/lost-found/login';
const STUD_URL = 'http://localhost:9999/lost-found/student';

// Configure axios to send credentials with every request
axios.defaults.withCredentials = true;

// Add authorization header to all requests if user is logged in
axios.interceptors.request.use(
    (config) => {
        const auth = localStorage.getItem('auth');
        if (auth) {
            const authData = JSON.parse(auth);
            config.headers.Authorization = `Basic ${btoa(authData.userId + ':' + authData.password)}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const registerNewUser = (user) => {
    return axios.post(LOGIN_URL, user);
};

export const validateUser = (userId, password) => {
    // Store credentials for future requests
    const authString = btoa(userId + ':' + password);
    
    return axios.get(LOGIN_URL + '/' + userId + '/' + password, {
        headers: {
            'Authorization': `Basic ${authString}`
        }
    }).then(response => {
        // Store authentication info if successful
        if (response.data !== 'false') {
            localStorage.setItem('auth', JSON.stringify({ userId, password }));
        }
        return response;
    });
};

export const getUserDetails = () => {
    return axios.get(LOGIN_URL);
};

export const getAllStudents = () => {
    return axios.get(STUD_URL);
};

export const deleteStudent = (userId) => {
    return axios.delete(STUD_URL + '/' + userId);
};

// Logout function to clear stored credentials
export const logout = () => {
    localStorage.removeItem('auth');
};