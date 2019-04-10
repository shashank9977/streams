import _ from 'lodash';
import { EDIT_STREAM,
   FETCH_STREAM,
   DELETE_STREAM,
   CREATE_STREAM, 
   FETCH_STREAMS} from "../actions/types";

const streamReducer=(state={}, action)=>{
    switch(action.type){

        case FETCH_STREAMS:
          return {...state, ..._.mapKeys(action.payload,'id')}

        case FETCH_STREAM:
        // const newState={...state};
        // newState[action.payload.id] =action.payload;
      // return newState;
        
      // es5 syntax
      return {...state, [action.payload.id]:action.payload};

       case CREATE_STREAM:
       return {...state, [action.payload.id]:action.payload};

      case EDIT_STREAM:
      return {...state, [action.payload.id]:action.payload};

      case DELETE_STREAM:
      return _.omit(state, action.payload)
      
      default:
      return state;
    }
}

export default streamReducer;