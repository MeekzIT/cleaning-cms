import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkersThunk } from "../../store/actions/categoryAction";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { Button, Modal, Switch, TextField, Typography } from "@mui/material";
import axios from "axios";
import { baseUrl, token } from "../../config/config";
import Swal from "sweetalert2";
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
const Workers = () => {
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = useState(false);
  const [categorys, setCategorys] = useState();
  const [currentId, setCurrentId] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [active, setActive] = useState(null);
  const workers = useSelector((state) => state?.categoryReducer.workers);

  ////
  const [f, setF] = useState("");
  const [l, setL] = useState("");
  const [p, setP] = useState("");
  const [a, setA] = useState();
  ////

  const handleCloseDelete = () => setOpenDelete(false);
  useEffect(() => {
    setCategorys(workers);
  }, [workers]);

  useEffect(() => {
    dispatch(getWorkersThunk());
  }, []);

  useEffect(() => {
    setF(active?.firstName);
    setL(active?.lastName);
    setP(active?.number);
    setA(active?.active);
  }, [active]);

  console.log(workers);
  const handelDelete = () => {
    axios
      .post(
        `${baseUrl}/workers/del`,
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
          handleCloseDelete();
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

  const handleEdit = () => {
    axios
      .post(
        `${baseUrl}/workers/edit`,
        {
          id: active.id,
          firstName: f,
          lastName: l,
          number: p,
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
          handleCloseDelete();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Succses",
            showConfirmButton: false,
            timer: 1500,
          });
          setCategorys(response.data.paginateData);
          setActive({});
          setOpen(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleAdd = () => {
    axios
      .post(
        `${baseUrl}/workers/create`,
        {
          firstName: f,
          lastName: l,
          number: p,
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
          handleCloseDelete();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Succses",
            showConfirmButton: false,
            timer: 1500,
          });
          setCategorys(response.data.paginateData);
          setActive({});
          setOpen(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box m={3} className="boxHeigth">
      <h2 mt={3} mb={3}>
      Աշխատողներ
      </h2>
      <Button
        color="secondary"
        variant="contained"
        m={3}
        onClick={() => setOpenAdd(true)}
      >
        <h2 mt={3} mb={3}>
        Ավելացնել
        </h2>
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Անուն</TableCell>
              <TableCell align="right">Ազգանուն</TableCell>
              <TableCell align="right">Համար</TableCell>
              <TableCell align="right">Ակտիվ</TableCell>
              <TableCell align="right">Խմբագրել</TableCell>
              <TableCell align="right">Ջնջել</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorys?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.firstName}
                </TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.number}</TableCell>
                <TableCell align="right">
                  {row.active ? (
                    <span>Ակտիվ</span>
                  ) : (
                    <span
                      style={{
                        color: "green",
                      }}
                    >
                      Արխիվ
                    </span>
                  )}
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      setActive(row);
                      setOpen(true);
                    }}
                  >
                    Խմբագրել
                  </Button>
                </TableCell>{" "}
                <TableCell align="right">
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      setOpenDelete(true);
                      setCurrentId(row.id);
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
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Խմբագրել
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box
              style={{
                width: "100%",
                margin: "10px 0",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div> {"Անուն "}</div>
              <TextField
                value={f}
                onChange={(e) => setF(e.target.value)}
                label="Անուն"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div> {" Ազգանուն"}</div>
              <TextField
                value={l}
                onChange={(e) => setL(e.target.value)}
                label="Ազգանուն"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div> {"Համար "}</div>
              <TextField
                value={p}
                onChange={(e) => setP(e.target.value)}
                label="Համար"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div>
                <div>Արխիվ</div>
                <Switch
                  defaultChecked={a}
                  onChange={(e) => {
                    setA(!a);
                  }}
                />
              </div>
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Button
                color="secondary"
                variant="contained"
                fullWidth
                onClick={handleEdit}
              >
                Խմբագրել
              </Button>
            </Box>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Ավելացնել
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box
              style={{
                width: "100%",
                margin: "10px 0",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div> {"Անուն"}</div>
              <TextField
                value={f}
                onChange={(e) => setF(e.target.value)}
                label="Անուն"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div> {"Ազգանուն"}</div>
              <TextField
                value={l}
                onChange={(e) => setL(e.target.value)}
                label="Ազգանուն"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div> {"Համար"}</div>
              <TextField
                value={p}
                onChange={(e) => setP(e.target.value)}
                label="Համար"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Button
                color="secondary"
                variant="contained"
                fullWidth
                onClick={handleAdd}
              >
                Ավելացնել
              </Button>
            </Box>
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

export default Workers;
