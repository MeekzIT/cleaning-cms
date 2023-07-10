import React, { useEffect, useRef, useState } from "react";
import "./navbar.scss";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import CloseIcon from "@mui/icons-material/Close";
import Menu from "@mui/material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";
import { thchangeAuAC } from "../../store/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "@mui/material";
import axios from "axios";
import { baseUrl, email, token } from "../../config/config";
import Swal from "sweetalert2";
import NotificationsIcon from "@mui/icons-material/Notifications";
import clarnet from "../../utils/audio/klarnetRingtone.mp3";
import { io } from "socket.io-client";
import { getCategoryThunk } from "../../store/actions/categoryAction";
import dayjs from "dayjs";
const Navbar = ({ close, setClose }) => {
  const dis = useDispatch();
  const socket = useRef();
  const isAuth = useSelector((state) => state.isAuthReducer.isAuth);
  const data = useSelector((state) => state?.categoryReducer.category);
  const subData = useSelector((state) => state?.categoryReducer.allSub);
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElN, setAnchorElN] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const audioRef = React.createRef();
  const open = Boolean(anchorEl);
  const openN = Boolean(anchorElN);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickN = (event) => {
    setAnchorElN(event.currentTarget);
  };
  const handleCloseN = () => {
    setAnchorElN(null);
  };
  useEffect(() => {
    dis(getCategoryThunk());
  }, []);
  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    socket.current.on("getActivityInvite", (data) => {
      console.log(data, "-------");
      setNotifications([...notifications, data]);
      new Audio(clarnet).play();
    });
  }, []);

  // useEffect(() => {
  //   socket.current = io("ws://localhost:8900");
  // }, []);

  const handleLogOut = () => {
    axios
      .post(
        `${baseUrl}/admin/logout`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        if (!response.data.error) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Success",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
          dis(thchangeAuAC(false));
          localStorage.removeItem("myToken");
          localStorage.removeItem("email");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(notifications);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <Tooltip title="Sidebar" arrow>
            {close ? (
              <CloseIcon
                onClick={() => setClose(!close)}
                style={{
                  cursor: "pointer",
                }}
              />
            ) : (
              <ClearAllIcon
                onClick={() => setClose(!close)}
                style={{
                  cursor: "pointer",
                }}
              />
            )}
          </Tooltip>
        </div>
        <div className="items">
          {notifications.length > 0 && (
            <div>
              <span className="not-box">
                <NotificationsIcon
                  sx={{
                    color: "white",
                    cursor: "pointer",
                  }}
                  fontSize="medium"
                  onClick={handleClickN}
                />
                <span className="not-dot"></span>
              </span>
              <Menu
                anchorEl={anchorElN}
                open={openN}
                onClose={handleCloseN}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{ minWidth: 500 }}
              >
                {notifications?.map((i, idx) => {
                  return (
                    <MenuItem key={idx}>
                      <div>
                        <h4>Նոր</h4>
                        {data?.filter((y) => y.id == i?.categoryId)[0]?.naemHy}
                        <br />
                        {
                          subData?.filter((y) => y.id == i?.subCategoryId)[0]
                            ?.naemHy
                        }
                        <br />
                        {i?.date.split("T")[0]} - {i?.date.split("T")[1]}
                        <br />
                        {i?.prePay ? "online" : "kanxik"}
                      </div>
                      <hr />
                      <Button
                        onClick={() => {
                          setNotifications(
                            notifications.filter((_, index) => index !== idx)
                          );
                        }}
                      >
                        Ջնջել
                      </Button>
                    </MenuItem>
                  );
                })}
              </Menu>
            </div>
          )}
          <div className="item"></div>
          {isAuth && (
            <div className="item">
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="image"
                className="avatar"
                onClick={handleClick}
              />
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleLogOut}>
                  <LogoutIcon />
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
