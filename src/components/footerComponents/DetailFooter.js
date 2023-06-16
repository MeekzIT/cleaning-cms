import React, {useEffect, useState} from 'react';
import {Box, Button, DialogActions, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getDetailFooterThunk} from "../../store/actions/footerAction";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const DetailFooter = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState(0);
    const [titleHy, setTitleHy] = useState("")
    const [titleRu, setTitleRu] = useState("")
    const [titleEn, setTitleEn] = useState("")
    const [subtiltleHy, setSubtitleHy] = useState("")
    const [subtiltleRu, setSubtitleRu] = useState("")
    const [subtiltleEn, setSubtitleEn] = useState("")
    const [image, setImage] = useState("")
    const [open, setOPen] = useState(false)
    const [thisImg, setThisImg] = useState(null);
    const data = useSelector(state => state.footersReducer.detailFooter)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        dispatch(getDetailFooterThunk())
    }, [])
    useEffect(() => {
        setTitleHy(data && data.titleHy)
        setTitleRu(data && data.titleRu)
        setTitleEn(data && data.titleEn)
        setSubtitleHy(data && data.textHy)
        setSubtitleRu(data && data.textRu)
        setSubtitleEn(data && data.textEn)
        setImage(data && data.image)
        console.clear()

    }, [data])

    const handleChangeFooterTexts = () => {
        axios
            .post(
                `${baseUrl}/detailFooter/edit`,
                {
                    titleHy, titleRu, titleEn, textHy: subtiltleHy, textRu: subtiltleRu, textEn: subtiltleEn,
                    image: thisImg,
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
                    setOPen(false)
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 500);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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
        <Box m={2}>
            <h3 mt={3} mb={3}>Product detail page footer settings</h3>
            <Box>
                <Box sx={{width: '100%'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={handleChange} textColor="secondary"
                              indicatorColor="secondary" aria-label="basic tabs example">
                            <Tab label="Hy" {...a11yProps(0)} />
                            <Tab label="Ru" {...a11yProps(1)} />
                            <Tab label="En" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <div style={{margin: "10px 0 10px 0"}}>
                            <TextField id="outlined-basic" label="Title" variant="outlined" value={titleHy}
                                       onChange={e => setTitleHy(e.target.value)}/>
                        </div>
                        <textarea
                            id="w3review"
                            name="textHy"
                            rows="4"
                            value={subtiltleHy}
                            onChange={(e) => setSubtitleHy(e.target.value)}
                            placeholder="message"
                            maxLength="200"
                            cols="50"
                            className="textareaText"
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div style={{margin: "10px 0 10px 0"}}>
                            <TextField id="outlined-basic" label="Title" variant="outlined" value={titleRu}
                                       onChange={e => setTitleRu(e.target.value)}/>
                        </div>
                        <textarea name="textHy"
                                  rows="4"
                                  id="outlined-basic"
                                  placeholder="Subtitle"
                                  axLength="200"
                                  cols="50"
                                  className="textareaText"
                                  value={subtiltleRu}
                                  onChange={e => setSubtitleRu(e.target.value)}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div style={{margin: "10px 0 10px 0"}}>
                            <TextField id="outlined-basic" label="Title" onChange={e => setTitleEn(e.target.value)}
                                       variant="outlined" value={titleEn}/>
                        </div>
                        <textarea name="textHy"
                                  rows="4"
                                  id="outlined-basic"
                                  placeholder="Subtitle"
                                  axLength="200"
                                  cols="50"
                                  className="textareaText"
                                  value={subtiltleEn}
                                  onChange={e => setSubtitleEn(e.target.value)}
                        />
                    </TabPanel>

                    <Box m={2}>
                        {
                            thisImg == null ? (<div>
                                <img src={image} width={300}/>
                                <Button color="secondary" style={{margin: "-15px 0 20px 20px"}}
                                        onClick={() => setOPen(true)}
                                        variant="contained">Edit</Button>
                            </div>) : (
                                <img src={thisImg} width={300}/>
                            )
                        }

                    </Box>
                    <Button color="secondary" color="secondary" style={{margin: "20px"}} variant="contained"
                            onClick={handleChangeFooterTexts}>Submit</Button>
                </Box>
            </Box>
            <Modal
                open={open}
                onClose={() => setOPen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Footer Banner Image
                    </Typography>
                    <Box m={2}>
                        <div className="imageArea">
                            <div>
                                <div className="uploadBtns">
                                    <Button color="secondary" variant="contained" component="label">
                                        Upload
                                        <input type="file" hidden multiple onChange={handleFile}/>
                                    </Button>
                                </div>
                                <div className="uploadBtns" m={2}>
                                    {thisImg == null ? null :
                                        <Button color="secondary" variant="contained" onClick={() => setOPen(false)}>
                                            Submit
                                        </Button>}

                                </div>
                            </div>
                            <div className="uploadImageAreaInModal">
                                {thisImg !== null && (
                                    <img src={thisImg} alt="newImage" width={300} height={200}/>
                                )}
                            </div>
                        </div>
                    </Box>
                    <DialogActions>
                        <Button color="secondary" variant="contained" onClick={() => setOPen(false)}>Close</Button>
                        {/*<Button variant="contained" onClick={handleDelete}>Yes</Button>*/}
                    </DialogActions>
                </Box>
            </Modal>
        </Box>
    );
};

export default DetailFooter;