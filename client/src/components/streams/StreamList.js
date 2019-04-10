import React from 'react'
import {connect} from 'react-redux';
import {fetchStreams} from '../../actions';
import {Link} from 'react-router-dom';
class StreamList extends React.Component{

componentDidMount(){
    this.props.fetchStreams();
}

renderAdmin(stream){
    if(stream.userId === this.props.currentuserId){
        return(
            <div className="right floated content">
                <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                <Link className="ui button negative">Delete</Link>
            </div>
        )
    }
}

renderList(){
    return this.props.streams.map(stream =>{
            return(
                <div className="item" key={stream.id}>
                   {this.renderAdmin(stream)}
                   <i className="large middle aligned icon camera"/>
                    <div className="content">
                        {stream.title}
                        <div className="description">{stream.description}</div>
                    </div>                
                </div>
            );
    });
}

    renderCreate(){
       
        if(this.props.IsSignedIn){
                return(
                        <div style={{textAlign:"right"}}>
                            <Link to="/streams/new" className="ui button primary"> 
                                Create Stream
                            </Link>
                        </div>
                );
        }
    }

    // using <Link> is intentional navigation

    render(){
        console.log(this.props.streams)
        return (
        <div>
            <h2>streams</h2>
             <div className="ui ceiled list">{this.renderList()}</div>
             {this.renderCreate()}
        </div>
        );
    }
}

const mapStateToProps=(state)=>{

    return {
        streams: Object.values(state.streams),
        currentuserId:state.auth.userId,
        IsSignedIn:state.auth.IsSignedIn
    } // converts it into an array
}


export default connect(mapStateToProps,{fetchStreams})(StreamList);