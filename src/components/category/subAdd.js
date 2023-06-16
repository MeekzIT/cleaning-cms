import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { baseUrl, token } from "../../config/config";
import Swal from "sweetalert2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import Switch from '@mui/material/Switch';
const SubAdd = ({
  openAdd,
  handleCloseAdd,
  style,
  setOpenAdd,
  setCategorys,
}) => {
  const [am, setAm] = useState();
  const [ru, setRu] = useState();
  const [en, setEn] = useState();
  const [dam, setDam] = useState();
  const [dru, setDru] = useState();
  const [den, setDen] = useState();
  const [pric, setPric] = useState();
  const [editImage, setEditImage] = useState("");
  const [withArea, setWithArea] = React.useState(false);
  const [age, setAge] = React.useState("");
  const data = useSelector((state) => state?.categoryReducer.category);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleChangeArea = (event) => {
    setWithArea(event.target.checked);
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
  const handleAdd = () => {
    axios
      .post(
        `${baseUrl}/subCategory`,
        {
          categoryId: age,
          naemHy: am,
          nameRu: ru,
          nameEn: en,
          mainImage: editImage,
          descHy: dam,
          descRu: dru,
          descEn: den,
          price: pric,
          withArea
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        if (!response.data.error) {
          setOpenAdd(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Succses",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload(false);

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Modal
      open={openAdd}
      onClose={handleCloseAdd}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <h3>Add</h3>
          <TextField
            id="filled-basic"
            label="Hy"
            variant="filled"
            className="addInp"
            name="naemHy"
            value={am}
            onChange={(e) => setAm(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="Ru"
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
            label="Price"
            variant="filled"
            className="addInp"
            name="price"
            value={pric}
            onChange={(e) => setPric(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Service</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Service"
              onChange={handleChange}
            >
              {data?.map((i) => (
                <MenuItem value={i.id}>{i.naemHy}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box>
          With Area
          <Switch
            checked={withArea}
            onChange={handleChangeArea}
            inputProps={{ 'aria-label': 'controlled' }}
            label=""
         />
          </Box>
          <textarea
            id="w3review"
            rows="8"
            value={dam}
            onChange={(e) => setDam(e.target.value)}
            name="descHy"
            maxLength="600"
            cols="60"
            className="textareaText"
            placeholder="Description"
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
            placeholder="Description"
          />
          <textarea
            id="w3review"
            rows="8"
            value={den}
            onChange={(e) => setDen(e.target.value)}
            maxLength="600"
            cols="60"
            className="textareaText"
            placeholder="Description"
          />
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
              {editImage ? "Change Image" : "Upload Image"}
              <input type="file" hidden multiple onChange={handleFile} />
            </Button>
          </div>
          <Button color="secondary" onClick={handleCloseAdd}>
            Close
          </Button>
          <Button color="secondary" variant="contained" onClick={handleAdd}>
            Submit
          </Button>
        </Typography>
      </Box>
    </Modal>
  );
};

export default SubAdd;
