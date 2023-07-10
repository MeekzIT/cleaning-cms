import React, { useEffect, useState } from "react";
import { ViewState, IntegratedEditing } from "@devexpress/dx-react-scheduler";

import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  Toolbar,
  DateNavigator,
  TodayButton,
  MonthView,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useDispatch, useSelector } from "react-redux";
import { getCalendarThunk } from "../../store/actions/orderAction";
import { CircularProgress } from "@mui/material";

const appointments = [
  {
    startDate: "2023-05-02T09:00",
    endDate: "2023-05-02T10:00",
    title: "Meeting",
  },
  {
    startDate: "2023-05-04T12:00",
    endDate: "2023-05-04T13:00",
    title: "Lunch",
  },
];

const SchedulerComponent = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const datas = useSelector((state) => state.orderReducer.calendar);

  useEffect(() => {
    dispatch(getCalendarThunk());
  }, []);

  useEffect(() => {
    datas?.length && setLoading(false);
  }, [datas]);
  console.log(datas);
  return (
    <>
      {loading ? (
        <div className="loading-box">
          <CircularProgress
            sx={{
              color: "#01dfa4",
            }}
          />
          <h3>Loading</h3>
        </div>
      ) : (
        <Scheduler
          data={datas}
          height={"auto"}
          firstDayOfWeek={1}
          locale={"ru-RU"}
        >
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={setCurrentDate}
            defaultCurrentDate={currentDate}
          />
          <WeekView
            cellDuration={60}
            // timeTableCellComponent
            // dayScaleCellComponent
            // timeScaleLabelComponent
            // timeScaleTickCellComponent
          />
          <MonthView dayScaleCellComponent />
          <Toolbar />
          <DateNavigator />
          <TodayButton messages={{ today: "այսօր" }} />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton showCloseButton />
          <AppointmentForm
            booleanEditorComponent={() => null}
            textEditorComponent={() => null}
            labelComponent={() => null}
            dateEditorComponent={() => null}
            overlayComponent={() => null}
          />
        </Scheduler>
      )}
    </>
  );
};

export default SchedulerComponent;
