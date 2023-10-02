import axios from "axios";

export default class CallService {
    async postCall(data) {
        try {
            const response = await axios.post(
                import.meta.env.VITE_APP_API_URL + "api/call", data,
                { headers: { 'Content-Type': 'application/json' } }
            );

            return response;
        } catch ({ response : err }) {
            return err;
        }
    }
}