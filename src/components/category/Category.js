import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSubCategoryThunk,
  getCategoryThunk,
  getSubCategoryThunk,
} from "../../store/actions/categoryAction";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../aboutUs/aboutUs.scss";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl, token } from "../../config/config";
import { TextField } from "@mui/material";
import CategoryAddModal from "./CategoryAddModal";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SubCategory from "./SubCategory";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: 600,
  overflowY: "scroll",
};

const Category = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.categoryReducer.category);
  const subData = useSelector((state) => state?.categoryReducer.sub);
  const [categorys, setCategorys] = useState();
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [sub, setSub] = useState(false);
  const [subId, setSubId] = useState(null);
  const [subs, setSubs] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const handleClose = () => {
    setOpen(false);
    setSub(false);
  };
  const handleCloseDelete = () => setOpenDelete(false);
  const handleCloseAdd = () => setOpenAdd(false);
  const [nameEditHy, setNameEditHy] = useState("");
  const [nameEditRu, setNameEditRu] = useState("");
  const [nameEditEn, setNameEditEn] = useState("");
  const [editImage, setEditImage] = useState("");
  useEffect(() => {
    dispatch(getCategoryThunk());
  }, []);

  const [am, setAm] = useState();
  const [ru, setRu] = useState();
  const [en, setEn] = useState();
  const [dam, setDam] = useState();
  const [dru, setDru] = useState();
  const [den, setDen] = useState();
  const [pric, setPric] = useState();
  useEffect(() => {
    setCategorys(data);
    setSubs(subData);
  }, [data, subData]);

  useEffect(() => {
    subId && dispatch(getSubCategoryThunk(subId));
    setEditImage(subData?.mainImage);
  }, [subId]);

  const handelDelete = () => {
    axios
      .post(
        `${baseUrl}/category/del`,
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
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Succses",
            showConfirmButton: false,
            timer: 1500,
          });
          setCategorys(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleEdit = () => {
    axios
      .post(
        `${baseUrl}/category/edit`,
        {
          id: currentId,
          nameHy: nameEditHy,
          nameRu: nameEditRu,
          nameEn: nameEditEn,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        if (!response.data.error) {
          setOpen(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Succses",
            showConfirmButton: false,
            timer: 1500,
          });

          setCategorys(response.data);
          dispatch(getAllSubCategoryThunk());
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubEdit = () => {
    axios
      .post(
        `${baseUrl}/subCategory/edit`,
        {
          id: subId,
          nameHy: am,
          nameRu: ru,
          nameEn: en,
          descHy: dam,
          descRu: dru,
          descEn: den,
          mainImage: editImage,
          price: pric,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        if (!response.data.error) {
          setOpen(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Succses",
            showConfirmButton: false,
            timer: 1500,
          });
          setCategorys(response.data);
          setSubId(null);
          setSub(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    subData[e.target.name] = e.target.value;
    setSubs({ ...subs });
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
        setEditImage(res.data.url);
      });
  };
  return (
    <Box m={3} className="boxHeigth">
      <h2 mt={3} mb={3}>
      Կատեգորիայի կարգավորումներ
      </h2>
      <Box m={2}>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setOpenAdd(true)}
        >
          Ավելացնել
        </Button>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Անուն Հայ</TableCell>
                <TableCell align="left">Անուն Ռու</TableCell>
                <TableCell align="left">Անուն En</TableCell>
                <TableCell align="left">Ենթակատեգորիաներ</TableCell>
                <TableCell align="left">Խմբագրել</TableCell>
                <TableCell align="left">Ջնջել</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categorys &&
                categorys.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.naemHy}
                    </TableCell>
                    <TableCell align="left">{row.nameRu}</TableCell>
                    <TableCell align="left">{row.nameEn}</TableCell>
                    <TableCell align="left">
                      <ul>
                        {row?.SubCategories?.map((y) => {
                          return (
                            <li
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "10px",
                                margin: "10px 0",
                              }}
                            >
                              {y.naemHy} {y?.nameRu} {y?.nameEn}
                              <Button
                                color="secondary"
                                variant="contained"
                                onClick={() => {
                                  setSubId(y?.id);
                                  setSub(true);
                                  setAm(y.naemHy);
                                  setEn(y.nameEn);
                                  setRu(y.nameRu);
                                  setPric(y.price);
                                  setDen(y.nameEn);
                                  setDam(y.descHy);
                                  setDru(y.descRu);
                                  setDen(y.descEn);
                                }}
                              >
                                Խմբագրել
                              </Button>
                            </li>
                          );
                        })}
                      </ul>
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          setCurrentId(row.id);
                          setOpen(true);
                          setNameEditHy(row.naemHy);
                          setNameEditRu(row.nameRu);
                          setNameEditEn(row.nameEn);
                        }}
                      >
                        Խմբագրել
                      </Button>
                    </TableCell>
                    <TableCell align="left">
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
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <h3>Խմբագրել</h3>
              <TextField
                id="filled-basic"
                label="Հայ"
                variant="filled"
                className="addInp"
                value={nameEditHy}
                onChange={(e) => setNameEditHy(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Ռու"
                variant="filled"
                className="addInp"
                value={nameEditRu}
                onChange={(e) => setNameEditRu(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="En"
                variant="filled"
                className="addInp"
                value={nameEditEn}
                onChange={(e) => setNameEditEn(e.target.value)}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Button
                color="secondary"
                variant="contained"
                onClick={handleEdit}
              >
                Ներկայացնել
              </Button>
            </Typography>
          </Box>
        </Modal>

        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
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
        <CategoryAddModal
          openAdd={openAdd}
          handleCloseAdd={handleCloseAdd}
          style={style}
          setOpenAdd={setOpenAdd}
          setCategorys={setCategorys}
        />
      </Box>

      <Modal
        open={sub}
        onClose={() => {
          setSubId(null);
          setSub(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h3>Խմբագրել Ենթակատեգորիաներ</h3>
            <TextField
              id="filled-basic"
              label="Հայ"
              variant="filled"
              className="addInp"
              name="naemHy"
              value={am}
              onChange={(e) => setAm(e.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Ռու"
              variant="filled"
              className="addInp"
              name="nameRu"
              value={ru}
              onChange={(e) => setRu(e.target.value)}
            />
            <TextField
              id="filled-basic"
              label="En"
              variant="filled"
              className="addInp"
              name="nameEn"
              value={en}
              onChange={(e) => setEn(e.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Գին"
              variant="filled"
              className="addInp"
              name="price"
              value={pric}
              onChange={(e) => setPric(e.target.value)}
            />
            <textarea
              id="w3review"
              rows="8"
              value={dam}
              onChange={(e) => setDam(e.target.value)}
              name="descHy"
              maxLength="600"
              cols="60"
              className="textareaText"
            />
            <textarea
              id="w3review"
              rows="8"
              value={dru}
              onChange={(e) => setDru(e.target.value)}
              name="descRu"
              maxLength="600"
              cols="60"
              className="textareaText"
            />
            <textarea
              id="w3review"
              rows="8"
              value={den}
              onChange={(e) => setDen(e.target.value)}
              maxLength="600"
              cols="60"
              className="textareaText"
            />
            <div>
              {editImage && (
                <div>
                  <img
                    src={editImage}
                    alt="image"
                    style={{
                      width: "150px",
                      height: "150px",
                    }}
                  />
                  <Button
                    color="secondary"
                    variant="contained"
                    component="label"
                    style={{
                      margin: "20px",
                    }}
                  >
                    {editImage ? "Փոխել պատկերը" : "Վերբեռնել պատկերը"}
                    <input type="file" hidden multiple onChange={handleFile} />
                  </Button>
                </div>
              )}
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleSubEdit}
            >
              Ներկայացնել
            </Button>
          </Typography>
        </Box>
      </Modal>
      <SubCategory />
    </Box>
  );
};

export default Category;
