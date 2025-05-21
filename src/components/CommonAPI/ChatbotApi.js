import axios from "axios"
import * as Config from "../../Utils/Config";

export const askQuestion = async (data) => {
    try {
        const res = await axios.post(`${Config.ChatBot_Base_Url}ask/`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )

        return res?.data
    }
    catch (err) {
    console.error("CORS error details:", err);
    throw err;
}

}


export const unsatisfied = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.ChatBot_Base_Url}unsatisfied`, data,
            {
                headers: {
                    'Content-Type': 'application/json',

                }
            }
        )

        return res?.data
    }
    catch (err) {
        return err
    }

}