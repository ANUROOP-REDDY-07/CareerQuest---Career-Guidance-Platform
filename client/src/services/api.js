import axios from 'axios';
import axiosRetry from 'axios-retry';
import config from '../config';
import { triggerServerWakingUp, triggerServerReady } from '../utils/serverAwakeEvent';

// Create Axios instance
const api = axios.create({
    baseURL: config.API_URL,
    timeout: 30000, // 30 seconds timeout to allow for cold starts if they just hang
    headers: {
        'Content-Type': 'application/json',
    },
});

// Configure retry behavior
axiosRetry(api, {
    retries: 3, // Retry 3 times
    retryDelay: (retryCount) => {
        // Exponential backoff: 1s, 2s, 4s
        console.log(`Retry attempt: ${retryCount}`);
        return axiosRetry.exponentialDelay(retryCount);
    },
    retryCondition: (error) => {
        // Retry on network errors or 5xx status codes
        // Also retry on strict timeouts if the server is sleeping
        return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
            (error.response && error.response.status >= 500);
    },
    onRetry: (retryCount, error, requestConfig) => {
        // Trigger the "Server Waking Up" message on the first retry
        if (retryCount === 1) {
            console.log('Server might be sleeping. Triggering wake-up message...');
            triggerServerWakingUp();
        }
    }
});

// Response interceptor to clear the message on success
api.interceptors.response.use(
    (response) => {
        // If we get a success response, the server is ready
        triggerServerReady();
        return response.data; // Return data directly to match fetch().json() behavior partially
    },
    (error) => {
        // If all retries fail, we might want to keep the error or show a global error
        // For now, just reject so the component can handle it
        return Promise.reject(error);
    }
);

export default api;
