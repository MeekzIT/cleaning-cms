import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubCategoryThunk } from "../../store/actions/categoryAction";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../aboutUs/aboutUs.scss";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl, token } from "../../config/config";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Switch from "@mui/material/Switch";
import { getOrdersThunk } from "../../store/actions/orderAction";
import CheckIcon from "@mui/icons-material/Check";
const label = { inputProps: { "aria-label": "Switch demo" } };

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: 450,
  overflowY: "scroll",
};

const delStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const OrderTable = ({ open, setOpen, orders, count, workers, cat, sub }) => {
  const dispatch = useDispatch();
  const [categorys, setCategorys] = useState();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [active, setActive] = useState(null);

  ////
  const [c, setC] = useState(active?.categoryId);
  const [s, setS] = useState(active?.subCategoryId);
  const [w, setW] = useState(active?.workerId);
  const [a, setA] = useState(active?.archive);
  const [p, setP] = useState(active?.dedactoPrice);
  ////

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDelete = () => setOpenDelete(false);
  useEffect(() => {
    dispatch(getAllSubCategoryThunk());
  }, []);

  useEffect(() => {
    setCategorys(orders);
  }, [orders]);

  useEffect(() => {
    setC(active?.categoryId);
    setS(active?.subCategoryId);
    setW(active?.workerId);
    setA(active?.archive);
  }, [active]);

  const handelDelete = () => {
    axios
      .post(
        `${baseUrl}/order/del`,
        {
          id: currentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        if (!response.data.error) {
          setOpenDelete(false);
          handleClose();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Succses",
            showConfirmButton: false,
            timer: 1500,
          });
          setCategorys(categorys?.filter((i) => i.id !== currentId));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handelArchive = (val) => {
    axios
      .post(
        `${baseUrl}/order/archive`,
        {
          id: active.id,
          val,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        if (!response.data.error) {
          setOpenDelete(false);
          handleClose();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Succses",
            showConfirmButton: false,
            timer: 1500,
          });
          setCategorys(categorys?.filter((i) => i.id !== currentId));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const setWorker = (val) => {
    axios
      .post(
        `${baseUrl}/order/assignee`,
        {
          orderId: active.id,
          workerId: val,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        if (!response.data.error) {
          setOpenDelete(false);
          handleClose();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Succses",
            showConfirmButton: false,
            timer: 1500,
          });
          setCategorys(categorys?.filter((i) => i.id !== currentId));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const setFinish = () => {
    axios
      .post(
        `${baseUrl}/order/finish`,
        {
          orderId: active.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        if (!response.data.error) {
          setOpenDelete(false);
          handleClose();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Succses",
            showConfirmButton: false,
            timer: 1500,
          });
          setCategorys(categorys?.filter((i) => i.id !== currentId));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const changeDefacto = () => {
    axios
      .post(
        `${baseUrl}/order/defacto`,
        {
          id: active.id,
          val: p,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        if (!response.data.error) {
          setOpenDelete(false);
          handleClose();
          setP("");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Succses",
            showConfirmButton: false,
            timer: 1500,
          });
          setCategorys(categorys?.filter((i) => i.id !== currentId));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Box m={3} className="boxHeigth">
      <Box>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
        <TableContainer component={Paper}>
        
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Անուն</TableCell>
                <TableCell align="left">Էլեկտրոնային հասցե</TableCell>
                <TableCell align="left">Համար</TableCell>
                <TableCell align="left">Ամսաթիվ</TableCell>
                <TableCell align="left">Կարգավիճակ</TableCell>
                <TableCell align="left">Աշխատող</TableCell>
                <TableCell align="left">Հասցե</TableCell>
                <TableCell align="left">Տարածք</TableCell>
                <TableCell align="left">Արխիվ</TableCell>
                <TableCell align="left">Վճարման կարգավիճակ</TableCell>
                <TableCell align="left">Սպասվող գին</TableCell>
                <TableCell align="left">Դեֆակտո Գին</TableCell>
                <TableCell align="left">Կատեգորիա</TableCell>
                <TableCell align="left">Ծառայություն</TableCell>
                <TableCell align="left">Վճարում</TableCell>
                <TableCell align="left">Ջնջել</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categorys &&
                categorys.map((y) => (
                  <TableRow
                    key={y.email}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {y.firstName} {y.lastName}
                    </TableCell>
                    <TableCell align="left">{y.email}</TableCell>
                    <TableCell align="left">{y.number}</TableCell>
                    <TableCell align="left">
                      {y?.startDate.split("T")[0]} -{" "}
                      {y?.startDate.split("T")[1]}
                    </TableCell>
                    <TableCell align="left">
                      {y.status === "finish" ? (
                        <CheckIcon sx={{ color: "green" }} />
                      ) : (
                        y.status.toUpperCase()
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {y.workerId === 0 && (
                        <AddCircleIcon
                          sx={{ color: "#1A1940", cursor: "pointer" }}
                          onClick={() => {
                            setActive(y);
                            handleOpen();
                          }}
                        />
                      )}
                      {y.workerId === "finish" && (
                        <span
                          onClick={() => {
                            setActive(y);
                            handleOpen();
                          }}
                        >
                          finish
                        </span>
                      )}
                      {y.workerId !== "finish" && y.workerId !== 0 && (
                        <span
                          style={{
                            color: "#1A1940",
                            textDecoration: "underline",
                            fontWeight: "bold",
                          }}
                          onClick={() => {
                            setActive(y);
                            handleOpen();
                          }}
                        >
                          {y.Worker.firstName + " " + y.Worker.lastName}
                        </span>
                      )}
                    </TableCell>
                    <TableCell align="left">{y.address}</TableCell>
                    <TableCell align="left">{y.area}</TableCell>
                    <TableCell align="left">
                      {y.archive ? (
                        <span
                          onClick={() => {
                            setActive(y);
                            handleOpen();
                          }}
                        >
                          Արխիվ
                        </span>
                      ) : (
                        <span
                          onClick={() => {
                            setActive(y);
                            handleOpen();
                          }}
                          style={{
                            color: "green",
                          }}
                        >
                          Ակտիվ
                        </span>
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {y.paymentStatus === "new" && !y.prePay ? (
                        <span
                          style={{
                            color: "green",
                            textDecoration: "underline",
                          }}
                        >
                          Կանխիկ վճարում
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "yellow",
                          }}
                        >
                          Քարտով վճարում
                        </span>
                      )}
                    </TableCell>
                    <TableCell align="left">{y.expectedPrice}</TableCell>
                    <TableCell align="left">
                      {y.dedactoPrice == "null" ? (
                        <span
                          style={{
                            color: "red",
                          }}
                          onClick={() => {
                            setActive(y);
                            handleOpen();
                          }}
                        >
                          Լրացնէլ!
                        </span>
                      ) : (
                        <span
                          onClick={() => {
                            setActive(y);
                            handleOpen();
                          }}
                        >
                          {y.dedactoPrice}
                        </span>
                      )}
                    </TableCell>
                    <TableCell align="left">{y?.Category?.naemHy}</TableCell>
                    <TableCell align="left">{y?.SubCategory?.naemHy}</TableCell>
                    <TableCell align="left">
                      {y.prePay ? "նոր" : "Կանխիկ"}
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          setOpenDelete(true);
                          setCurrentId(y.id);
                        }}
                      >
                        Ջնջել
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
          </Box></Box>
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={delStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Ջնջել ?
            </Typography>
            <Typography
              className="btnsBox"
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              <div>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleCloseDelete}
                >
                  Ոչ
                </Button>
              </div>
              <div>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handelDelete}
                >
                  Այո՛
                </Button>
              </div>
            </Typography>
          </Box>
        </Modal>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Խմբագրել
          </Typography>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "20px 0",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Կատեգորիա</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={c}
                label="Ծառայություն"
                onChange={(e) => setC(e.target.value)}
              >
                {cat?.map((i) => (
                  <MenuItem value={i.id}>{i.naemHy}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Ծառայություն</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={s}
                label="Ծառայություն"
                onChange={(e) => setS(e.target.value)}
              >
                {sub?.map((i) => (
                  <MenuItem value={i.id}>{i.naemHy}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Աշխատող</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={w}
                label="Աշխատող"
                onChange={(e) => {
                  setW(e.target.value);
                  setWorker(e.target.value);
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Succses",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }}
              >
                {workers?.map((i) => (
                  <MenuItem value={i.id}>
                    {i.firstName} {i.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              value={p}
              onChange={(e) => setP(e.target.value)}
              label="Դեֆակտո"
              variant="outlined"
            />
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                changeDefacto();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Succses",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }}
            >
              Change Defacto
            </Button>
            <Box>
              {active?.status !== "finish" &&
                active?.workerId !== "finish" &&
                active?.workerId !== 0 && (
                  <>
                    <span
                      style={{
                        color: "#1A1940",
                        textDecoration: "underline",
                        fontWeight: "bold",
                      }}
                    >
                      Կցված է `{" "}
                      {active?.Worker.firstName + " " + active?.Worker.lastName}
                    </span>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{
                        marginLeft: "20px",
                      }}
                      onClick={() => {
                        setFinish();
                        Swal.fire({
                          position: "center",
                          icon: "success",
                          title: "Succses",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                      }}
                    >
                      Ավարտել
                    </Button>
                  </>
                )}
            </Box>
            <div>
              <p>Արխիվ</p>
              <Switch
                {...label}
                defaultChecked={a}
                onChange={(e) => {
                  handelArchive(!a);
                  setA(!a);
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Succses",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }}
              />
            </div>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default OrderTable;
