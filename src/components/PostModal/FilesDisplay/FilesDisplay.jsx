import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import { X, File } from "react-feather";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "auto",
    overflowX: "auto",
    overflowY: "hidden",
    // whitespace: "nowrap",
    display: "flex",
    "&::-webkit-scrollbar": {
      width: ".5rem",
      padding: ".5rem",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      padding: ".5rem",
      background:
        theme.palette.type === "dark"
          ? "rgba(255,255,255, 0.1)"
          : "rgba(0,0,0,0.1)",
      borderRadius: ".5rem",
    },
  },
  image: {
    height: "100%",
    borderRadius: "1rem",
  },
  imageContainer: {
    height: "10rem",
    display: "inline-block",
    position: "relative",
    marginRight: ".8rem",
  },
  deleteBtn: {
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2rem",
    height: "2rem",
    position: "absolute",
    top: ".2rem",
    right: ".2rem",
    borderRadius: "2rem",
    cursor: "pointer",
  },
  filePlaceholder: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.text.primary,
    borderRadius: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "10rem",
    width: "10rem",
  },
  fileName: {
    width: "9rem",
  },
}));

const FilesDisplay = (props) => {
  const { files, onDeleteFile } = props || {};
  const styles = useStyles();

  return (
    <Box className={styles.container}>
      {files.map((e) => {
        return (
          <Box className={styles.imageContainer} key={e.name}>
            <Box
              className={styles.deleteBtn}
              onClick={() => onDeleteFile(e.name)}
            >
              <X size={20} />
            </Box>
            {e.type.includes("image") ? (
              <img
                className={styles.image}
                src={URL.createObjectURL(e)}
                alt="selected_file"
                key={e.name}
              />
            ) : (
              <Box className={styles.filePlaceholder} key={e.name}>
                <Box>
                  <File />
                </Box>
                <Typography
                  variant="body1"
                  noWrap
                  align="center"
                  className={styles.fileName}
                  color="textPrimary"
                >
                  .{e.name.split(".").reverse()[0]}
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  noWrap
                  className={styles.fileName}
                  color="textSecondary"
                >
                  {e.name}
                </Typography>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default FilesDisplay;
