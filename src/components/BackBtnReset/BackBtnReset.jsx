import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetBackBtnEnabled } from "../../store/actions/global";

const BackBtnReset = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  React.useEffect(() => {
    history.listen((l) => dispatch(resetBackBtnEnabled()));
  }, []);
  return <></>;
};

export default BackBtnReset;
