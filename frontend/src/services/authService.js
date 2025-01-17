
const BASE_URL = 'http://localhost:8888/app';

/**
 * Sign up a new user
 * @param {Object} userData - user registration data
 * @param {string} userData.name - user name
 * @param {string} userData.email - user email
 * @param {string} userData.password - user password
 * @returns {Promise} - response from the server
 */
export const signUp = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to sign up');
        }

        return await response.json();
    } catch (error) {
        console.error('Sign up error:', error);
        throw error;
    }
};

/**
 * Sign in a user
 * @param {string} email - user email
 * @param {string} password - user password
 * @returns {Promise} - response containing authentication token
 */
export const signIn = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/sign-in`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${email}:${password}`),
            },
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        const token = response.headers.get('Authorization');
        if (!token) {
            throw new Error('No authorization token received');
        }

        return { token };
    } catch (error) {
        console.error('Sign in error:', error);
        throw error;
    }
};

/**
 * Make an authenticated request
 * @param {string} endpoint - api endpoint
 * @param {Object} options - fetch options
 * @returns {Promise} - response from the server
 */
export const authenticatedRequest = async (endpoint, options = {}) => {
    const token = sessionStorage.getItem('authToken');

    if (!token) {
        throw new Error('No authentication token found');
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Request failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

/**
 * Validate the current authentication token
 * @returns {Promise<boolean>} - token valid
 */
export const validateToken = async () => {
    try {
        const response = await authenticatedRequest('/validate-token');
        return true;
    } catch (error) {
        return false;
    }
};

export const logout = () => {
    sessionStorage.removeItem('authToken');
};

export const getToken = () => {
    return sessionStorage.getItem('authToken');
};


export const isAuthenticated = () => {
    return !!getToken();
};

export const getUserProfile = async () => {
    return await authenticatedRequest('/user/profile');
};
