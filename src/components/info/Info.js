import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { baseUrl, token } from "../../config/config";
import { getInfoThunk } from "../../store/actions/infoAction";
import "./info.scss";

const Info = () => {
  const dispatch = useDispatch();
  const infoData = useSelector((state) => state.infoReducer.info);
  const [data, setData] = useState({});

  const handleChange = (e) => {
    data[e.target.name] = e.target.value;
    setData(data);
  };
  console.log(data);
  useEffect(() => {
    dispatch(getInfoThunk());
  }, []);

  const handleEdit = () => {
    axios
      .post(
        `${baseUrl}/info/edit`,
        { ...data, id: 1 },
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
          setData(response.data);
          //   setTimeout(() => {
          //     window.location.reload(false);
          //   }, 500);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box m={3} className="boxHeigth">
      <h2 mt={3} mb={3}>
      Տեղեկատվության կարգավորումներ
      </h2>
      {infoData !== null && (
        <Box sx={{ width: "100%" }} className="infoBox">
          <div>
            <h4>Էլեկտրոնային հասցե</h4>
            <TextField
              id="standard-basic"
              label="Էլեկտրոնային հասցե"
              name="email"
              defaultValue={infoData?.email}
              onChange={handleChange}
              variant="standard"
            />
          </div>
          <hr className="hr" />
          <div>
            <h4>Գտնվելու վայրը</h4>
            <TextField
              id="standard-basic"
              label="Գտնվելու վայրը"
              onChange={handleChange}
              name="address"
              variant="standard"
              defaultValue={infoData?.address}
            />
          </div>
          <hr className="hr" />
          <div>
            <h4>Համար</h4>
            <TextField
              id="standard-basic"
              label="phone"
              name="Համար"
              onChange={handleChange}
              variant="standard"
              defaultValue={infoData !== null && infoData?.phone}
            />
          </div>
          <hr className="hr" />
          <div>
            <h4>երկրորդ հեռախոս</h4>
            <TextField
              id="standard-basic"
              label="երկրորդ հեռախոս"
              name="secondPhone"
              onChange={handleChange}
              variant="standard"
              defaultValue={infoData !== null && infoData?.secondPhone}
            />
          </div>
          <hr className="hr" />
          <div>
            <h4>Facebook</h4>
            <TextField
              id="standard-basic"
              label="facebook"
              onChange={handleChange}
              name="facebook"
              variant="standard"
              defaultValue={infoData !== null && infoData?.facebook}
            />
          </div>
          <hr className="hr" />
          <div>
            <h4>Instagram</h4>
            <TextField
              id="standard-basic"
              label="instagram"
              name="instagram"
              onChange={handleChange}
              variant="standard"
              defaultValue={infoData !== null && infoData?.instagram}
            />
          </div>

          <hr className="hr" />
          <div>
            <Button variant="contained" onClick={handleEdit} color="secondary">
            Ներկայացնել
            </Button>
          </div>
        </Box>
      )}
    </Box>
  );
};

export default Info;
