import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeArray } from "../../helpers/makeArray";
import { getContactsThunk } from "../../store/actions/contactUsAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { baseUrl, token } from "../../config/config";
import Swal from "sweetalert2";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
const ContactUs = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.contactUsReducer.contacts);
  const count = useSelector((state) => state?.contactUsReducer.count);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([]);
  const limit = 4;
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  useEffect(() => {
    dispatch(getContactsThunk(page, limit));
  }, [page]);

  useEffect(() => {
    if (count) {
      setPages(makeArray(Math.ceil(count / limit)));
    }
  }, [count, limit]);
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDlete = () => {
    setOpenDelete(false);
  };

  const handleSendAnswer = () => {
    if (subject == "" && message == "") {
      setOpen(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } else {
      axios
        .post(
          `${baseUrl}/contactUs/sendAnswer`,
          {
            id: currentId,
            email: currentEmail,
            message,
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
              title: "Sended",
              showConfirmButton: false,
              timer: 1500,
            });
            setOpen(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handelDelete = () => {
    axios
      .post(
        `${baseUrl}/contactUs/delete`,
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
  return (
    <Box m={3} className="boxHeigth">
      <h2 mt={3} mb={3}>
      Կոնտակտներ
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
                <strong>Էլեկտրոնային հասցե</strong>
              </TableCell>
              <TableCell align="left">
                <strong>հաղորդագրություն</strong>
              </TableCell>
              <TableCell align="left">
                <strong>պատասխանել</strong>
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
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.notes}</TableCell>
                  <TableCell align="left">
                    {row?.answer ? (
                      row?.answer
                    ) : (
                      <span
                        style={{
                          color: "red",
                          fontSize: "20px",
                          textDecoration: "underline",
                        }}
                      >
                        Պատասխան է պետք
                      </span>
                    )}
                  </TableCell>
                  <TableCell align="left" className="delBtn">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setCurrentId(row.id);
                        setCurrentEmail(row.email);
                        setOpen(true);
                      }}
                    >
                      <MarkEmailReadIcon />
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
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={3}>
        <div className="pagBox">
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
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Send Answer"}</DialogTitle>
          <DialogContent>
            <br />
            <textarea
              id="w3review"
              name="textHy"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="message"
              maxlength="200"
              cols="50"
              className="textareaText"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleSendAnswer} autoFocus>
            Ուղարկել
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDelete}
          onClose={handleCloseDlete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Ջնջել ?"}</DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDlete}>Ոչ</Button>
            <Button onClick={handelDelete} autoFocus>
            Այո՛
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ContactUs;
