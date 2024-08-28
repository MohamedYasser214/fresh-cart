import { createContext, useState } from "react";



export let CounterContext = createContext(0);

export default function CounterContextProvider(props){

const[count, setCount] = useState(0);

    return <CounterContext.Provider value={ {count, setCount} }>

        {props.children}

    </CounterContext.Provider>
}
  