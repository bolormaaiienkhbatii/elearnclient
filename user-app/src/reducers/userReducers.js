const initialState = {
    token:null,
    user:null
}
const currentUser = (state = initialState, action) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user:action.payload
            }
        case "SET_TOKEN":
            return {
                ...state,
                token:action.payload
            }
        default:
            return state
    }
}

export default currentUser;