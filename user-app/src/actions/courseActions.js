const setCourse = (payload) => {
    return {
        type: "SET_COURSE",
        payload
    }
}
const setCoursePage = (payload) => {
    return {
        type: "SET_COURSE_PAGE",
        payload
    }
}
const setCourseSearch = (payload) => {
    return {
        type: "SET_COURSE_SEARCH",
        payload
    }
}
const setCourseTotal = (payload) => {
    return {
        type: "SET_COURSE_TOTAL",
        payload
    }
}

const setCourseHasNext = (payload) => {
    return {
        type: "SET_COURSE_HAS_NEXT",
        payload
    }
}
const setCourseHasPrev = (payload) => {
    return {
        type: "SET_COURSE_HAS_PREV",
        payload
    }
}

export default {
    setCourse,
    setCourseSearch,
    setCoursePage,
    setCourseTotal,
    setCourseHasNext,
    setCourseHasPrev
}