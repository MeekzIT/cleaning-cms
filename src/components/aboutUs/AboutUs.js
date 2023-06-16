import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAboutUsInfoThunk,
  getAboutUsThunk,
} from "../../store/actions/aboutUsAction";
import "./aboutUs.scss";
import { baseUrl, token } from "../../config/config";
import axios from "axios";
import Swal from "sweetalert2";

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

const AboutUs = () => {
  const dispatch = useDispatch();
  const aboutUsData = useSelector((state) => state?.aboutUsReducer.aboutUs);
  const [value, setValue] = React.useState(0);
  const [imageOne, setImageOne] = useState(null);
  //values
  const [subTitleHy, setSubTitleHy] = useState("");
  const [subTitleRu, setSubTitleRu] = useState("");
  const [subTitleEn, setSubTitleEn] = useState("");
  //
  useEffect(() => {
    dispatch(getAboutUsThunk());
    console.clear();
  }, []);

  useEffect(() => {
    setSubTitleHy(aboutUsData && aboutUsData.textHy);
    setSubTitleRu(aboutUsData && aboutUsData.textRu);
    setSubTitleEn(aboutUsData && aboutUsData.textEn);
    setImageOne(aboutUsData && aboutUsData.image);
    console.clear();
  }, [aboutUsData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    axios
      .post(
        `${baseUrl}/about/edit`,
        {
          textHy: subTitleHy,
          textEn: subTitleEn,
          textRu: subTitleRu,
          image: imageOne,
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
        setImageOne(res.data.url);
      });
  };

  return (
    <Box m={3} className="boxHeigth">
      <h2 mt={3} mb={3}>
      Մեր մասին Կարգավորումներ
      </h2>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Հայ" {...a11yProps(0)} />
            <Tab label="Ռու" {...a11yProps(1)} />
            <Tab label="En" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <textarea
            id="w3review"
            name="textHy"
            rows="8"
            value={subTitleHy}
            onChange={(e) => setSubTitleHy(e.target.value)}
            maxLength="600"
            cols="60"
            defaultValue={aboutUsData.length == 0 ? null : aboutUsData.textHy}
            className="textareaText"
          />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <textarea
            id="w3review"
            name="textRu"
            rows="8"
            value={subTitleRu}
            onChange={(e) => setSubTitleRu(e.target.value)}
            maxLength="600"
            defaultValue={aboutUsData.length == 0 ? null : aboutUsData.textRu}
            cols="60"
            className="textareaText"
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <textarea
            id="w3review"
            name="textEn"
            value={subTitleEn}
            onChange={(e) => setSubTitleEn(e.target.value)}
            rows="8"
            maxLength="600"
            defaultValue={aboutUsData.length == 0 ? null : aboutUsData.textEn}
            cols="60"
            className="textareaText"
          />
        </TabPanel>
      </Box>
      <Box m={2}>
        {imageOne !== null && (
          <div>
            <img
              src={imageOne}
              alt="one"
              style={{ width: "150px", height: "150px" }}
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
      <Button color="secondary" variant="contained" onClick={handleSubmit}>
      Ներկայացնել
      </Button>
    </Box>
  );
};

export default AboutUs;
