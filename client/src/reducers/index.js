import {combineReducers} from 'redux'
import authReducer from './authReducer'
// our state
export default combineReducers({
   auth:authReducer
   

});
