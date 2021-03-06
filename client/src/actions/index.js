import streams from '../apis/streams';
import history from '../history';
import{SIGN_IN, SIGN_OUT, CREATE_STREAM, 
 FETCH_STREAMS,
 FETCH_STREAM,
 DELETE_STREAM,
 EDIT_STREAM } from './types'

export const signIn=(userId)=>{
    return {
        type:SIGN_IN,
        payload:userId
    };
};

export const signOut=()=>{
    return {
        type:SIGN_OUT
    };
};

export const createStream=(formValues)=> async(dispatch,getState)=>{

  const{userId} = getState().auth;
  const response=await streams.post('/streams',{...formValues, userId});
  dispatch({type:CREATE_STREAM, payload:response.data});

  // Do some programmatic navigation to get users  back to root route.
    history.push('/'); // our own history object

}

export const fetchStreams=()=>async(dispatch)=>{
    const response=await streams.get('/streams');
    dispatch({type:FETCH_STREAMS, payload:response.data});
}

export const fetchStream=(id)=>async(dispatch)=>{
    const response=await streams.get(`/streams/${id}`);
    dispatch({type:FETCH_STREAM, payload:response.data});
}

export const editStream=(id, formValues)=>async(dispatch)=>{
  //  const response=await streams.put(`/streams/${id}`, formValues); // put updates all the properties in the database, so can lead to missed properties as we update less props
    
    const response=await streams.patch(`/streams/${id}`, formValues); // with just those forvalues could be updated leading to no loss in data properties.
    dispatch({type:EDIT_STREAM, payload:response.data});
    history.push('/'); // our own history object
}

export const deleteStream=(id)=>async(dispatch)=>{
    await streams.delete(`/streams/${id}`);
    dispatch({type:DELETE_STREAM, payload:id});
}