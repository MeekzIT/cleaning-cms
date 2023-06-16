import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserHistory, getUsers } from "../../store/actions/usersAction";
import { makeArray } from "../../helpers/makeArray";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';
import Swal from "sweetalert2";
import axios from "axios";
import { baseUrl, token } from "../../config/config";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    height: 450,
    overflowY: "scroll",
  };

const Users = () => {
    const dispatch = useDispatch()
    let limit = 2
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const data = useSelector(state => state.usersReducer.users)
    const dataCount = useSelector(state => state.usersReducer.count)
    const history = useSelector(state => state.usersReducer.history)


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(()=>{
        dispatch(getUsers(page, limit))
        if (dataCount) {
            setPages(makeArray(Math.ceil(dataCount / limit)));
          }
    },[dataCount, dispatch, limit, page])

    useEffect(()=>{
        if (dataCount) {
            setPages(makeArray(Math.ceil(dataCount / limit)));
          }
    },[dataCount, limit])

    const handelDelete = () => {
        axios
          .post(
            `${baseUrl}/users/del`,
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
              Swal.fire({
                position: "center",
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
              setOpenDelete(false);
              setTimeout(() => {
                window.location.reload(false);
              }, 500);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      };

    console.log(data,dataCount);
    return (
        <Box m={3} className="boxHeigth">
        <h2 mt={3} mb={3}>
        Օգտատերեր
        </h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>#</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>Անուն</strong>
                </TableCell>
                 <TableCell align="left">
                  <strong>Ազգանուն</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>Էլեկտրոնային հասցե</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>Հեռախոսահամար</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>Պատմություն</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>Ջնջել</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data !== null &&
                data.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.firstName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.lastName}
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.phoneNumber}</TableCell>
                    <TableCell align="left" className="delBtn">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            dispatch(getUserHistory(row.id))
                            setCurrentId(row.id)
                            handleOpen()
                        }}
                      >
                        <HistoryIcon/>
                      </Button>
                    </TableCell>
                    <TableCell align="left" className="delBtn">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            setCurrentId(row.id);
                            setOpenDelete(true);
                        }}
                      >
                        <DeleteIcon/>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box m={3}>
          <div className="pagBox"
        //    style={{
        //     display:"flex"
        //   }}
          >
            <div className="arrowBack">
              {pages.length - 1 == page ? (
                <ArrowBackIcon
                  onClick={() => {
                    setPage(page - 1);
                  }}
                />
              ) : null}
            </div>
            {pages.length > 1 &&
              pages.map((s) => {
                return (
                  <div
                    className={page === s ? "ActivePagItem" : "pagItem"}
                    key={s}
                    onClick={() => {
                      setPage(s);
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {s + 1}
                  </div>
                );
              })}
            <div className="arrowBack">
              {pages.length - 1 == page ? null : (
                <ArrowForwardIcon
                  onClick={() => {
                    setPage(page + 1);
                  }}
                />
              )}
            </div>
          </div>
        </Box>
        <Dialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Ջնջել ?"}</DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDelete(false)}>Ոչ</Button>
            <Button onClick={handelDelete} autoFocus>
            Այո՛
            </Button>
          </DialogActions>
        </Dialog>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
          Պատմություն
          </Typography>
          <Box>{
            !history?.length ? <Box style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column"
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">Դատարկ</Typography> 
            </Box> : <Box pt={2}>
                <hr/>
                {
                    history?.map(h => {
                        return <Box mt={2} mb={2} pb={3} key={h.id}>
                          <Typography variant="h6" component="h2">կատեգորիա - {h.Category.naemHy} / {h.SubCategory.naemHy}</Typography>   
                          <br/> <Typography variant="h6" component="h2">Ամսաթիվ - {h.startDate.slice(0,10)} - {h.startDate.slice(11,16)}</Typography>   
                          <br/> <Typography variant="h6" component="h2">Գին - {h.expectedPrice} ֏ / {h.dedactoPrice !== "null" ? `${h.dedactoPrice} ֏` : "Դեռևս գնահատված չէ" }</Typography>   
                         <br/> <Typography variant="h6" component="h2">Վճարման տեսակը - {h.prePay ? "Առցանց վճարում" : "Կանխիկ վճարում" }</Typography>  
                         <br/> <Typography variant="h6" component="h2">Աշխատակից - {h.Worker ? `Աշխատակից - ${h.Worker.firstName} ${h.Worker.lastName}` : "Դեռևս ընթացքի մեջ է" }</Typography>   
                            <hr/>
                        </Box>
                    })
                }
            </Box>
            }</Box>
        </Box>
      </Modal>
      </Box>
    )
}

export default Users;