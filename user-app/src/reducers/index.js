import {combineReducers} from 'redux';
import currentUser from './userReducers';
import post from './post';
import category from './category';
import course from './courses'
const rootReducer = combineReducers({
    currentUser,
    post,
    category,
    course
})

export default rootReducer