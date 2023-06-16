import {Box, Button, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../banners/banner.scss";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {useDispatch, useSelector} from "react-redux";
import {getAboutUsBannerThunk} from "../../store/actions/bannersActions";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";

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
};

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const AboutBanner = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const data = useSelector((state) => state.bannersReducer.aboutBanner);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState(0);

    //vlues
    const [subTitleHy, setSubTitleHy] = useState("");
    const [subTitleRu, setSubTitleRu] = useState("");
    const [subTitleEn, setSubTitleEn] = useState("");
    const [image, setimage] = useState();
    const [thisImg, setThisImg] = useState(null);
    const [openSection, setOPenSection] = useState(false)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        dispatch(getAboutUsBannerThunk());
    }, []);
    useEffect(() => {
        setSubTitleHy(data && data.textHy);
        setSubTitleRu(data && data.textRu);
        setSubTitleEn(data && data.textEn);
        setimage(data && data.image);
    }, [data]);

    const handleEditTexts = () => {
        axios
            .post(
                `${baseUrl}/videoBanner/edit`,
                {
                    textHy: subTitleHy,
                    textRu: subTitleRu,
                    textEn: subTitleEn,
                    image: thisImg,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(function (response) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Succsess",
                    showConfirmButton: false,
                    timer: 1500,
                });
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
                setThisImg(res.data.url);
            });
    };
    return (
        <Box m={3}>
            <h2 mt={3} mb={3}>
                Video Page Banner
            </h2>
            <Box>
                {
                    openSection ? (
                        <Button variant="outlined" color="secondary" onClick={() => setOPenSection(!openSection)}>
                            <ArrowDropUpSharpIcon/>
                        </Button>
                    ) : (
                        <Button variant="outlined" color="secondary" onClick={() => setOPenSection(!openSection)}>
                            <ArrowDropDownSharpIcon/>
                        </Button>)
                }
            </Box>
            {openSection ? (
                <Box>
                    <Box sx={{width: "100%"}}>
                        <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                                textColor="secondary"
                                indicatorColor="secondary"
                            >
                                <Tab label="Hy" {...a11yProps(0)} />
                                <Tab label="Ru" {...a11yProps(1)} />
                                <Tab label="En" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <h4>Text</h4>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="8"
                                maxLength="600"
                                cols="60"
                                className="textareaText"
                                value={subTitleHy}
                                onChange={(e) => setSubTitleHy(e.target.value)}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <h4>Text</h4>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="8"
                                maxLength="600"
                                cols="60"
                                className="textareaText"
                                value={subTitleRu}
                                onChange={(e) => setSubTitleRu(e.target.value)}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <h4>Text</h4>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="8"
                                maxLength="600"
                                cols="60"
                                className="textareaText"
                                value={subTitleEn}
                                onChange={(e) => setSubTitleEn(e.target.value)}
                            />
                        </TabPanel>
                        <Box m={2}>

                        </Box>
                    </Box>
                    <Box>
                        {
                            thisImg !== null ? <img
                                src={thisImg}
                                alt="banner"
                                width={500}
                                height={300}
                                className="uploadedImage"
                            /> : <img
                                src={image}
                                alt="banner"
                                width={500}
                                height={300}
                                className="uploadedImage"
                            />
                        }

                        <br/>
                        <Button color="secondary" variant="contained" onClick={handleOpen}>
                            Edit
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Edit About Us Page Banner
                                </Typography>
                                <div className="imageArea">
                                    <div>
                                        <div className="uploadBtns">
                                            <Button color="secondary" variant="contained" component="label">
                                                {
                                                    thisImg == null ? "Upload" : "Change"
                                                }

                                                <input type="file" hidden multiple onChange={handleFile}/>
                                            </Button>
                                        </div>
                                        <div className="uploadBtns" m={2}>
                                            {
                                                thisImg !== null &&
                                                <Button color="secondary" variant="contained" onClick={handleClose}
                                                        component="label">
                                                    Submit
                                                </Button>
                                            }

                                        </div>
                                    </div>
                                    <div className="uploadImageAreaInModal">
                                        {thisImg !== null && (
                                            <img src={thisImg} alt="newImage" width={300} height={200}/>
                                        )}
                                    </div>
                                </div>
                            </Box>
                        </Modal>

                    </Box>
                    <Box style={{margin: "20px 0"}}>
                        <Button color="secondary" variant="contained" onClick={handleEditTexts}>
                            Submit
                        </Button>
                    </Box>

                </Box>) : null}
        </Box>
    );
};

export default AboutBanner;
