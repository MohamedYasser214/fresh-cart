import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export let UserContext = createContext();

export default function UserContextProvider({children}){

    const [userData, setUserData] = useState(null)

        useEffect(()=>{
            if(localStorage.getItem('userToken')){
                setUserData(localStorage.getItem('userToken'))
            }
        },[])



    return <UserContext.Provider value={{userData , setUserData}}>
        {children}
    </UserContext.Provider>
}