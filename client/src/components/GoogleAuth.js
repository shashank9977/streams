import React from 'react'
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions'
class  GoogleAuth extends React.Component{

  
    componentDidMount(){
            window.gapi.load('client:auth2', ()=>{
                    window.gapi.client.init({
                            clientId:'124881117721-n5phd3srbng7ltnqp7n5bp3635lb3kd3.apps.googleusercontent.com',
                            scope:'email'
                    }).then(()=>{
                        this.auth=window.gapi.auth2.getAuthInstance();
                      //  this.setState({isSignedIn:this.auth.isSignedIn.get()});
                        this.onAuthChange(this.auth.isSignedIn.get());
                        this.auth.isSignedIn.listen(this.onAuthChange);
                    });
            })
    }

    onAuthChange=(IsSignedIn)=>{
       // console.log(isSignedIn)
       if(IsSignedIn){
           
           this.props.signIn(this.auth.currentUser.get().getId());
       }
       else{
           this.props.signOut();
       }
    }

    onSignInClick=()=>{

        this.auth.signIn();
    }

    onSignOutClick=()=>{
        this.auth.signOut();
    }

    renderAuthButton(){

        console.log(this.props.IsSignedIn);

        if(this.props.IsSignedIn===null){
            return null;
        }
        else if(this.props.IsSignedIn){
            return (
                <div onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"/>
                            Sign Out
                </div>
            );
        }
        else{
            return (
                <div onClick={this.onSignInClick} className="ui red google button">
                <i className="google icon"/>
                        Sign in with Google
            </div>
            );
        }
    }

    render(){
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}
const mapStateToProps=(state)=>{

    console.log(state.auth.IsSignedIn);
    return {IsSignedIn:state.auth.IsSignedIn};
}


export default connect(mapStateToProps, {signIn, signOut} )(GoogleAuth);