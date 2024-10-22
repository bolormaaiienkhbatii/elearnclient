const initialState = {
    categoryList:[]
}
const categoryReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_CATEGORY":
            return {
                ...state,
                categoryList:action.payload
            }
        default:
            return state
    }
}

export default categoryReducer;