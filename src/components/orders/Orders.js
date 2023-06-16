import { useEffect, useState } from "react";
import { Box, Button, DialogActions, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersThunk } from "../../store/actions/orderAction";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  getCategoryThunk,
  getWorkersThunk,
} from "../../store/actions/categoryAction";
import TextField from "@mui/material/TextField";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { makeArray } from "../../helpers/makeArray";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import OrderTable from "./orderTable";
import SchedulerComponent from "./Schedul";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "100%",
  overflowY: "scroll",
};

function Orders() {
  const limit = 16;
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderReducer.orders);
  const orderCount = useSelector((state) => state.orderReducer.count);
  const categorys = useSelector((state) => state?.categoryReducer.category);
  const subCategorys = useSelector((state) => state?.categoryReducer.allSub);
  const workers = useSelector((state) => state?.categoryReducer.workers);
  const [openS, setOpenS] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [search, setSearch] = useState({
    archive: false,
  });
  useEffect(() => {
    dispatch(getOrdersThunk({ page, limit, search }));
    dispatch(getCategoryThunk());
    dispatch(getWorkersThunk());
  }, [page, open]);

  useEffect(() => {
    if (orderCount) {
      setPages(makeArray(Math.ceil(orderCount / limit)));
    }
  }, [orderCount]);

  const handleFilter = () => {
    if (Object.keys(search).length > 0) {
      dispatch(getOrdersThunk({ page, limit, search }));
    }
  };

  const handleChange = (e) => {
    search[e.target.name] = e.target.value;
    setSearch({ ...search });
  };

  return (
    <Box m={2}>
      <h2 mt={3} mb={3}>
      Պատվերներ
      </h2>
      <Box
        m={5}
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Կարգավիճակ</InputLabel>
          <Select
            name="status"
            label="Կարգավիճակ"
            value={search.status}
            onChange={handleChange}
          >
            <MenuItem value={"new"}>Նոր</MenuItem>
            <MenuItem value={"finish"}>Ավարտվել է</MenuItem>
            <MenuItem value={"assigne"}>Հանձնարարել է</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Արխիվ</InputLabel>
          <Select
            name="archive"
            label="Արխիվ"
            value={search.archive}
            onChange={handleChange}
          >
            <MenuItem value={false}>Ակտիվ</MenuItem>
            <MenuItem value={true}>Արխիվ</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Կատեգորիա</InputLabel>
          <Select
            name="categoryId"
            label="Կատեգորիա"
            onChange={handleChange}
            value={search.categoryId}
          >
            {categorys?.map((i) => {
              return (
                <MenuItem key={i.id} value={i.id}>
                  {i.naemHy}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Մեր օգտատեր</InputLabel>
          <Select
            name="ourUser"
            label="Category"
            onChange={handleChange}
            defaultValue={true}
          >
            <MenuItem value={true}>Այո՛</MenuItem>
            <MenuItem value={false}>Ոչ</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="number"
          fullWidth
          label="Համար"
          variant="outlined"
          color="secondary"
          onChange={handleChange}
        />
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleFilter}
        >
          Օգտագործել
        </Button>
        {Object.keys(search).length > 1 && (
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={() => {
              setSearch({ ourUser: true });
              dispatch(getOrdersThunk({ page, limit }));
            }}
          >
            <FilterAltOffIcon />
          </Button>
        )}
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Box mr={5} mt={3} mb={3}>
          <Button
            variant="contained"
            color="secondary"
            style={{
              display: "flex",
              gap: "20px",
            }}
            onClick={() => setOpenS(true)}
          >
            <CalendarMonthIcon /> Օրացույց
          </Button>
        </Box>
      </Box>
      {orders?.length === 0 ? (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Դատարկ</h1>
        </Box>
      ) : (
        <Box>
          <OrderTable
            open={open}
            setOpen={setOpen}
            orders={orders}
            count={orderCount}
            workers={workers}
            cat={categorys}
            sub={subCategorys}
          />
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
        </Box>
      )}
      <Modal
        open={openS}
        onClose={() => setOpenS(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SchedulerComponent />
        </Box>
      </Modal>
    </Box>
  );
}

export default Orders;
