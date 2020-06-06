import React, { useRef } from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {},
  input: {
    fontSize: "1.1rem",
    fontFamily: "'Roboto', sans-serif",
    minWidth: "100%",
    maxWidth: "100%",
    width: "100%",
    backgroundColor: "transparent",
    color: theme.palette.text.primary,
    resize: "none",
    border: "none",
    "&::placeholder": {
      color: theme.palette.text.secondary,
    },
    "&:focus": {
      outline: "none",
      border: "none",
    },
  },
}));

const PostInput = (props) => {
  const styles = useStyles();
  const { open, value, onChange, ...remProps } = props;
  const inputRef = useRef(null);
  React.useEffect(() => {
    if (open) {
      inputRef.current.focus();
    }
  }, [open, inputRef]);

  return (
    <textarea
      {...remProps}
      className={styles.input}
      ref={inputRef}
      value={value}
      onChange={onChange}
      placeholder="Type Somenthing..."
      rows={10}
    ></textarea>
  );
};

export default PostInput;
