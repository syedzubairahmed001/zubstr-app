import React from "react";
import {
  IconButton,
  makeStyles,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import { FilePlus } from "react-feather";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
  },
  sec1: {
    display: "flex",
    flexGrow: 1,
  },
  sec2: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  icon: {
    color: theme.palette.primary.main,
  },
  fileInput: {
    display: "none",
  },
}));

const PostFooter = (props) => {
  const styles = useStyles();
  const { onFilesChange, onSubmit, postBtnDisabled, postBtnLoading } =
    props || {};
  return (
    <Box className={styles.container}>
      <Box className={styles.sec1}>
        <input
          accept="image/* , .doc, .pdf, .docx, "
          multiple
          className={styles.fileInput}
          onChange={onFilesChange}
          id="icon-button-file"
          type="file"
        />
        <label htmlFor="icon-button-file">
          <IconButton
            className={styles.icon}
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <FilePlus />
          </IconButton>
        </label>
      </Box>
      <Box className={styles.sec2}>
        <Button
          color="primary"
          disableElevation
          variant="contained"
          onClick={onSubmit}
          disabled={postBtnDisabled || postBtnLoading}
          startIcon={
            postBtnLoading ? (
              <CircularProgress
                color="primary"
                style={{ width: "20px", height: "20px" }}
              />
            ) : null
          }
        >
          Post
        </Button>
      </Box>
    </Box>
  );
};

export default PostFooter;
