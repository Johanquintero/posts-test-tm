import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Middleware(props) {
    const { routes, loginComponent } = props;
    const { isAuthenticated } = useAuth0();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(true);

        setTimeout(() => {

            setLoading(false);

        }, 1000);
        // eslint-disable-next-line
    }, [localStorage,isAuthenticated])


    return (
        <>
            {loading ?
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                   <div className="spinner"></div>
                </div>
                :
                <>
                    {isAuthenticated ? routes : loginComponent}
                </>
            }
        </>
    );
}