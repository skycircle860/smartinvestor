import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";
import React from "react";


const Auth = () =>{ 
    
    const onSocialClick = async(event) => {
        const {
            target : {name},
        } = event;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if(name ==="github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);

    };
    // input 태그 안의 onchange 속성은 값이 바뀔때마다 onChange 함수를 호출한다는 것을 의미한다.
    //또한 value는 state 에 저장이 된다. input의 값이 바뀔때마다 state의 값도 변화하는것.
    return(
        <div className="authContainer" >
            
            <AuthForm />
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                    Continue with Google 
                </button>
                <button onClick={onSocialClick} name="github" className="authBtn">
                    Continue with Github
                </button>
            </div>
        </div>
    );
};
export default Auth;