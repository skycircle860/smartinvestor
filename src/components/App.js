import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init , setInit] = useState(false);
 const [userObj, setUserObj] = useState(null);
  useEffect(()  => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj({
         displayName: user.displayName,
         uid: user.uid,
         updateProfile: (args) =>user.updateProfile(args), 
        
        });
        console.log('111',user);
      } else {
        setUserObj(null);
        console.log('else ',user);
      }
      setInit(true);
      console.log('set init ',user);
    });
  }, []);

  const refreshUser = () =>{
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) =>user.updateProfile(args), 
       
     });
     console.log('refresh User : ',userObj);
  };

  return (
    <>
      {init ? (
        <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/> 
      ):( 
        "Initializing.... "
      )}
     
    </>
  );
}

export default App;