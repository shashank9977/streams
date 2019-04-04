import { EDIT_STREAM } from "../actions/types";

const streamReducer=(state={}, action)=>{
    switch(action.type){
        case EDIT_STREAM:
        // const newState={...state};
        // newState[action.payload.id] =action.payload;
      // return newState;
        
      // es5 syntax
        return {...state, [action.payload.id]:action.payload};

        default:
        return state;
    }
}