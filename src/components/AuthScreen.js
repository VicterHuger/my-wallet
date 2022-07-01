import { Link } from "react-router-dom";
import AuthStyle from "../assets/styles/AuthStyle";

export default function AuthScreen({children,linkPath,textPath}){
    return(
        <AuthStyle>
            <h1>MyWallet</h1>
            {children}
            <Link to={linkPath}>
                <h4>{textPath}</h4>
            </Link>
        </AuthStyle>
    )
}