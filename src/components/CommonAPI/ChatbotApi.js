import axios from "axios"
import * as Config from "../../Utils/Config";

export const askQuestion = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.ChatBot_Base_Url}ask/`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return res?.data
    }
    catch (err) {
        return err
    }

}


export const unsatisfied = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.ChatBot_Base_Url}unsatisfied`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return res?.data
    }
    catch (err) {
        return err
    }

}