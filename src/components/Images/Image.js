import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { makeArray } from "../../helpers/makeArray";
import { portfolioGetImagesAC } from "../../store/actions/portfolioAction";
import axios from "axios";
import { baseUrl, token } from "../../config/config";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Image = () => {
  const limit = 10;

  const dispatch = useDispatch();
  const data = useSelector((state) => state.portfolioReducer.images);
  const count = useSelector((state) => state.portfolioReducer.imagesCount);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(portfolioGetImagesAC(page, limit));
  }, [page, limit]);

  useEffect(() => {
    if (count) {
      setPages(makeArray(Math.ceil(count / limit)));
    }
  }, [count, limit]);

  const handlerDelete = (id) => {
    axios
      .post(
        `${baseUrl}/images/del`,
        {
          id,
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
            title: "Deleted",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload(false);
          }, 500);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleFile = (e) => {
    let files = [];
    Object.keys(e.target.files).map((f) => {
      if (f === "Length") return;
      files.push(e.target.files[0]);
    });
    uploadImage(files);
  };

  let arrOfImages = [];
  const uploadImage = (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "armcodingImage");
    formData.append("cloud_name", "armcoding");
    axios
      .post(`https://api.cloudinary.com/v1_1/armcoding/image/upload`, formData)
      .then((res) => {
        arrOfImages.push(res.data.url);
        setImage(res.data.url);
      });
  };

  const handlerSubmit = () => {
    axios
      .post(
        `${baseUrl}/images`,
        {
          image,
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
          setOpen(false);
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
      Նկարներ
      </h2>
      <Box m={2}>
        <Button color="secondary" variant="contained" onClick={handleOpen}>
          <AddIcon />
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>#</strong>
              </TableCell>
              <TableCell align="left">
                <strong>պատկեր</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Ջնջել</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data !== null &&
              data?.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img src={row.image} alt="image" width={100} height={100} />
                  </TableCell>
                  <TableCell align="left" className="delBtn">
                    <Button
                      variant="outlined"
                      onClick={() => handlerDelete(row.id)}
                      color="secondary"
                      autoFocus
                    >
                      <DeleteIcon
                        className="iconsPreferances"
                        sx={{ color: "#1A1940" }}
                      />
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
            pages.map((s, index) => {
              return (
                <div
                  key={index}
                  className={page === s ? "ActivePagItem" : "pagItem"}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Ավելացնել նոր պատկեր
          </Typography>
          {image == null ? (
            <Button
              color="secondary"
              variant="contained"
              component="label"
              style={{
                margin: "0 17px 35px 43px",
              }}
            >
              Ավելացնել
              <input type="file" hidden multiple onChange={handleFile} />
            </Button>
          ) : (
            <div>
              <img src={image} alt="image" width={200} height={150} />
              <Button
                color="secondary"
                variant="contained"
                component="label"
                style={{
                  margin: "0 17px 35px 43px",
                }}
              >
                Խմբագրել
                <input type="file" hidden multiple onChange={handleFile} />
              </Button>
            </div>
          )}
          <Box>
            {image !== null && (
              <Button
                color="secondary"
                variant="contained"
                onClick={handlerSubmit}
              >
                Ներկայացնել
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Image;
