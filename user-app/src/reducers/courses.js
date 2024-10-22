const initialState = {
    courseList:[],
    search:"",
    page:1,
    limit:10,
    total:0,
    hasNext:false,
    hasPrev:false

}
const courseReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_COURSE":
            return {
                ...state,
                courseList:action.payload
            }
        case "SET_COURSE_PAGE":
            return {
                ...state,
                page:action.payload
            }
        case "SET_COURSE_TOTAL":
            return {
                ...state,
                total:action.payload
            }
        case "SET_COURSE_HAS_NEXT":
            return {
                ...state,
                hasNext:action.payload
            }
        case "SET_COURSE_HAS_PREV":
            return {
                ...state,
                hasPrev:action.payload
            }
        case "SET_SEARCH":
            return {
                ...state,
                search:action.payload
            }
        
        default:
            return state
    }
}

export default courseReducer;