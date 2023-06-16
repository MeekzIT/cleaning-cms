import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthPages } from "../../utils/routing/routes";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const isAuth = useSelector((state) => state.isAuthReducer.isAuth);
  let location = useLocation();
  return (
    <div className="sidebar">
      <div className="top">
        <span
          className="logo"
          style={{
            fontSize: "30px",
          }}
        >
          Logo
        </span>
      </div>
      <hr />
      <div className="center">
        <ul>
          {isAuth
            ? isAuthPages.map(({ id, path, name, icon }) => {
                return (
                  <div key={id}>
                    <Link
                      to={path}
                      style={{ textDecoration: "none" }}
                      key={id}
                      className={
                        location.pathname === path ? "activeLink" : "pasiveLink"
                      }
                    >
                      <li>
                        {icon}
                        {/*<DashboardIcon className="icon"/>*/}
                        <span
                          style={{
                            fontSize: "20px",
                          }}
                        >
                          {name}
                        </span>
                      </li>
                    </Link>
                    <hr className="hra" />
                  </div>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
