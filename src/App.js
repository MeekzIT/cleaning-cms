import "./style/dark.scss";
import {useContext, useEffect} from "react";
import {DarkModeContext} from "./context/darkModeContext";
import Home from "./layouts/Home/Home";
import {useDispatch} from "react-redux"
import {token} from "./config/config";
import {thchangeAuAC} from "./store/actions/authAction";
import {useLocation} from "react-router-dom";
import {createMuiTheme, ThemeProvider} from "@mui/material";


const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#1A1940'
        }
    }
});


function App() {
    const dispatch = useDispatch()
    const {darkMode} = useContext(DarkModeContext);
    const {pathname} = useLocation();

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }, 100)
        // console.clear()
    }, [pathname]);

    useEffect(() => {
        token !== null && dispatch(thchangeAuAC(true));
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <div className={darkMode ? "app dark" : "app"}>
                <Home/>
            </div>
        </ThemeProvider>
    );
}

export default App;
