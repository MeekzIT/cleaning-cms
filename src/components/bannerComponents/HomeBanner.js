import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import "../banners/banner.scss";
import { useSelector, useDispatch } from "react-redux";
import { getHomeBannerThunk } from "../../store/actions/bannersActions";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
import HomeImageItem from "./HomeImageItem";

const HomeBanner = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.bannersReducer.homeBanner);
  const [openSection, setOPenSection] = useState(false);

  useEffect(() => {
    dispatch(getHomeBannerThunk());
  }, []);

  return (
    <Box m={3} className="infoBox">
      <h2 mt={3} mb={3}>
      Գլխավոր էջի Բաններներ
      </h2>
      <Box>
        {openSection ? (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOPenSection(!openSection)}
          >
            <ArrowDropUpSharpIcon />
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOPenSection(!openSection)}
          >
            <ArrowDropDownSharpIcon />
          </Button>
        )}
      </Box>
      {openSection ? (
        <Box>
          <HomeImageItem data={data} />
        </Box>
      ) : null}
    </Box>
  );
};

export default HomeBanner;
