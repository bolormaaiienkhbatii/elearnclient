const initialState = {
    post:null
}
const currentPost = (state = initialState, action) => {
    switch(action.type){
        case "SET_POST":
            return {
                ...state,
                post:action.payload
            }
        default:
            return state
    }
}

export default currentPost;