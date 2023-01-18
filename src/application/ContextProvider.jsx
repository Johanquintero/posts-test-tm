import { createContext, useState } from "react";

const ContextProvider = (props) => {
    const [state, setState] = useState({
    });

    return (
        <AppContext.Provider value={[state, setState]}>
            {props.children}
        </AppContext.Provider>
    );
};

export default ContextProvider;
export const AppContext = createContext();