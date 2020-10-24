import axios from 'axios';

class User {
    baseUrl = 'http://127.0.0.1:8000/api/users';

    signup = async (data) => {
        return await axios.post(this.baseUrl, data);
    }

    signupLoginCallback = (data) => {
        // signed in successfully
        // action: save in localstorage userid and is logged in true
        localStorage.setItem("agency-uid", data.id);
        localStorage.setItem("agency-loggedin", 1);
        window.location.href = "/profile";
    }

    logout = () => {
        localStorage.removeItem("agency-uid");
        localStorage.removeItem("agency-loggedin");
        window.location.href = "/";

    }

    login = async (data) => {
        const {email, password} = data;
        const querystr = '?email=' + email + '&password=' + password;
        return await axios.get(this.baseUrl + querystr);
    }

    listFilterByTalent = async (talent) => {
        let queryStr = '';
        if (talent) queryStr = '?talent=' + talent;
        return await axios.get(this.baseUrl + queryStr);
    }

    show = async () => {
        return await axios.get(this.baseUrl + '/' + localStorage.getItem('agency-uid'));
    }

    update = async (data) => {
        return await axios.put(this.baseUrl + '/' + localStorage.getItem('agency-uid'), data);
    }
}

export default new User();
