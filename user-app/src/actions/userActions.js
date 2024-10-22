const setToken = (payload) => {
    return {
        type: "SET_TOKEN",
        payload
    }
}

const setUser = (payload) => {
    return {
        type: "SET_USER",
        payload
    }
}

export default {
    setToken,
    setUser
}