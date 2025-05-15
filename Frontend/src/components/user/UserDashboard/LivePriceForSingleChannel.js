import axios from "axios";
import { getSessionId } from "../../CommonAPI/User";
import CryptoJS from 'crypto-js';


const WS_URL = "wss://ws1.aliceblueonline.com/NorenWS";
const SESSION_API = "https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/ws/createWsSession";

const client_id = "YOUR_CLIENT_ID";
const api_key = "YOUR_API_KEY";

let ws = null;
let currentSocket = null; // Track the current active socket


export const getSessionIdFromAPI = async () => {
    try {
        const response = await getSessionId();
        return {
            userId: response.Userid,
            sessionId: response.Access_Token,
        };
    } catch (error) {
        console.error("Error fetching credentials:", error);
        return null;
    }
};


export async function CreateSocketSession(type, userid, userSession1) {
    return axios.post(SESSION_API, type, {
        headers: {
            'Authorization': `Bearer ${userid} ${userSession1}`
        }
    });
};

async function ConnectSocket(onResponse, channelList, userId1, userSession1) {
    const url = "wss://ws1.aliceblueonline.com/NorenWS/";

    // Disconnect the old socket if it exists
    if (currentSocket) {
        currentSocket.close();
        currentSocket = null;
    }

    const socket = new WebSocket(url);
    currentSocket = socket; // Set the new socket as the current one

    socket.onopen = function () {
        const encrcptToken = CryptoJS.SHA256(CryptoJS.SHA256(userSession1).toString()).toString();
        const initCon = {
            susertoken: encrcptToken,
            t: "c",
            actid: userId1 + "_" + "API",
            uid: userId1 + "_" + "API",
            source: "API"
        };

        socket.send(JSON.stringify(initCon));
    };

    socket.onmessage = async function (msg) {
        const response = JSON.parse(msg.data);

        if (response.lp) {
            await onResponse(response);
        }

        if (response.s === 'OK') {
            const json = {
                k: channelList,
                t: 't'
            };

            await socket.send(JSON.stringify(json));
        }
    };

    socket.onclose = function () {
        console.log("Socket closed");
    };

    socket.onerror = function (error) {
        console.error("Socket error:", error);
    };
}

export const connectWebSocketForSingleChannel = async (instrument, onPriceUpdate) => {

    const type = { loginType: "API" };

    const credentials = await getSessionIdFromAPI();
    if (!credentials) return;
    // console.log("credentials", credentials)

    const { userId, sessionId } = credentials;

    try {

        const res = await CreateSocketSession(type, userId, sessionId);
        const wsSession = res.data.result.wsSess;

        ConnectSocket(onPriceUpdate, instrument, userId, sessionId)

    } catch (error) {
        console.error("Error during WebSocket setup:", error);
    }
};