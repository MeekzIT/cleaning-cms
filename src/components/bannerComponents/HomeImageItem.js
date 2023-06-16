import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import axios from "axios";
import { baseUrl, token } from "../../config/config";
import Swal from "sweetalert2";
import { TextField } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const HomeImageItem = ({ data }) => {
  const [value, setValue] = React.useState(0);
  const [textHy, setTextHy] = useState(data?.descHy);
  const [textRu, setTextRu] = useState(data?.descRu);
  const [textEn, setTextEn] = useState(data?.descEn);
  const [image, setImage] = useState(data?.image);
  const [am, setAm] = useState(data?.titleHy);
  const [ru, setRu] = useState(data?.titleRu);
  const [en, setEn] = useState(data?.titleEn);
  const [dam, setDam] = useState(data?.imageTextHy);
  const [dru, setDru] = useState(data?.imageTextRu);
  const [den, setDen] = useState(data?.imageTextEn);
  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  const handleSubmit = () => {
    axios
      .post(
        `${baseUrl}/header/edit`,
        {
          titleHy: am,
          titleRu: ru,
          titleEn: en,
          descHy: textHy,
          descRu: textRu,
          descEn: textEn,
          image,
          imageTextHy: dam,
          imageTextRu: dru,
          imageTextEn: den,
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
            title: "Succses",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Հայ" {...a11yProps(0)} />
            <Tab label="Ռու" {...a11yProps(1)} />
            <Tab label="En" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TextField
            id="filled-basic"
            label="Հայ"
            className="addInp"
            name="naemHy"
            value={am}
            onChange={(e) => setAm(e.target.value)}
            sx={{
              width: "40%",
            }}
          />
          <br />
          <textarea
            id="w3review"
            name="textHy"
            rows="8"
            value={textHy}
            onChange={(e) => setTextHy(e.target.value)}
            maxLength="600"
            cols="60"
            defaultValue={data?.length == 0 ? null : data?.textHy}
            className="textareaText"
          />{" "}
          <br />
          <TextField
            id="w3review"
            rows="8"
            value={dam}
            onChange={(e) => setDam(e.target.value)}
            name="descHy"
            maxLength="600"
            cols="60"
            className="textareaText"
            sx={{
              width: "40%",
            }}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TextField
            id="filled-basic"
            label="Ռու"
            className="addInp"
            name="nameRu"
            value={ru}
            onChange={(e) => setRu(e.target.value)}
            sx={{
              width: "40%",
            }}
          />
          <br />
          <textarea
            id="w3review"
            name="textHy"
            rows="8"
            value={textRu}
            onChange={(e) => setTextRu(e.target.value)}
            maxLength="600"
            cols="60"
            defaultValue={data?.length == 0 ? null : data?.textRu}
            className="textareaText"
          />{" "}
          <br />
          <TextField
            id="w3review"
            rows="8"
            value={dru}
            onChange={(e) => setDru(e.target.value)}
            name="descRu"
            maxLength="600"
            cols="60"
            className="textareaText"
            sx={{
              width: "40%",
            }}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TextField
            id="filled-basic"
            label="En"
            className="addInp"
            name="nameEn"
            value={en}
            onChange={(e) => setEn(e.target.value)}
            sx={{
              width: "40%",
            }}
          />
          <br />
          <textarea
            id="w3review"
            name="textHy"
            rows="8"
            value={textEn}
            onChange={(e) => setTextEn(e.target.value)}
            maxLength="600"
            cols="60"
            defaultValue={data?.length == 0 ? null : data?.textEn}
            className="textareaText"
          />{" "}
          <br />
          <TextField
            id="w3review"
            rows="8"
            value={den}
            onChange={(e) => setDen(e.target.value)}
            maxLength="600"
            cols="60"
            className="textareaText"
            sx={{
              width: "40%",
            }}
          />
        </TabPanel>
        <Box>
          {image && (
            <div>
              <img
                src={image}
                alt="banner"
                style={{
                  width: "50%",
                  height: "50%",
                }}
              />
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
        </Box>
        <Box>
          <Button
            color="secondary"
            variant="contained"
            component="label"
            onClick={handleSubmit}
          >
            Ներկայացնել
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default HomeImageItem;
