import axios from 'axios';

class Talent {
    baseUrl = 'http://127.0.0.1:8000/api/talents';

    list = async () => {
        return await axios.get(this.baseUrl);
    }
}

export default new Talent();
