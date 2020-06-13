import React, { useState } from "react";
import _ from "lodash";
import {
  Box,
  Paper,
  Dialog,
  makeStyles,
  Typography,
  IconButton,
  TextField,
  Avatar,
  Divider,
  Grow,
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Checkbox,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { X, List, File, Image, MessageCircle } from "react-feather";

import SearchInput from "../../components/SearchInput/SearchInput";
import { resetPostModalOpen, sendPost } from "../../store/actions/global";
import PostInput from "./PostInput/PostInput";
import FilesDisplay from "./FilesDisplay/FilesDisplay";
import PostFooter from "./PostFooter/PostFooter";
import CharCounter from "../CharCounter/CharCounter";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: " .5rem 0",
    // overflow: "hidden",
    position: "relative",
    minHeight: "80vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    display: "flex",
  },
  section1: {
    flexShrink: 1,
  },
  section2: {
    flexGrow: 1,

    display: "flex",
    minHeight: "75vh",
    maxHeight: "75vh",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: ".5rem",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background:
        theme.palette.type === "dark"
          ? "rgba(255,255,255, 0.1)"
          : "rgba(0,0,0,0.1)",
      borderRadius: ".5rem",
    },
  },
  input2Container: {
    width: "100%",
  },
  input: {
    width: "100%",
    flexGrow: 1,
  },
  input2sec1: {
    display: "flex",
    alignItems: "center",
  },
  formControl: {
    width: "50%",
  },
  footer: {
    width: "100%",
    // position: "absolute",
    // bottom: 0,
    // left: 0,
  },
  fileChip: {
    display: "inline-block",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} timeout={300} />;
});

const Post = (props) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const modalOpen = useSelector((state) => state.global.postModal.open);
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const account = useSelector((state) => state.auth.account);
  const [form, setForm] = useState({
    postText: {
      value: "",
      error: null,
      count: 0,
      max: 1000,
    },
    visibleTo: {
      value: "all",
      error: null,
    },
    classes: {
      value: [],
      error: null,
    },
    classesTo: {
      value: "all",
      error: null,
    },
  });
  const [disableComments, setDisableComments] = useState(false);
  const [files, setFiles] = useState([]);
  const { postText, visibleTo, classesTo, classes } = form;
  const onModalClose = () => {
    dispatch(resetPostModalOpen());
  };
  const handleCloseModalClick = () => {
    dispatch(resetPostModalOpen());
  };
  const handleVisibleToSwitch = () => {
    setForm((prev) => ({
      ...prev,
      visibleTo: {
        ...prev.visibleTo,
        value: "all",
        error: null,
      },
    }));
  };
  const toOptions = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "All Students",
      value: "all_students",
    },
    {
      label: "All Teachers",
      value: "all_teachers",
    },
    {
      label: "Selected Classes",
      value: "selected_classes",
    },
  ];
  const classesToOptions = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Students",
      value: "all_students",
    },
    {
      label: "Teachers",
      value: "all_teachers",
    },
  ];
  // const payload = {
  //   classes: [],
  //   visibleTo: "",
  //   postType: "",
  //   postText: "",
  //   files: [],
  //   disableComments: true,
  // };
  const handleInputChange = (e) => {
    const newVal = e.target.value;
    const name = e.target.name;
    setForm((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: newVal,
        error: null,
        count: newVal.length,
      },
    }));
  };
  const handleFilesChange = (e) => {
    setFiles(Array.from(e.target.files));
    console.log(Array.from(e.target.files));
  };
  const handleDeleteFile = (filename) => {
    const newFiles = files.filter((e) => e.name !== filename);
    setFiles(newFiles);
  };
  const handleCommentsDisableToggle = (e) => {
    setDisableComments(e.target.checked);
  };
  const handleClassesChange = (event, newVal) => {
    const newArr = newVal.map((e) => e.value);
    setForm((prev) => ({
      ...prev,
      classes: {
        value: newArr,
        error: null,
      },
    }));
  };
  const handleSubmit = () => {
    setLoading(true);
    // const payloadd = {
    //   classes: classes.value,
    //   visibleTo: visibleTo.value,
    //   classesTo: classesTo.value,
    //   disableComments: disableComments || false,
    //   files: files,
    //   postText: postText.value,
    // };

    let payload = new FormData();
    payload.append("classes", JSON.stringify(classes.value));
    if (visibleTo.value === "selected_classes") {
      payload.append("visibleTo", classesTo.value);
    } else {
      payload.append("visibleTo", visibleTo.value);
    }
    payload.append("disableComments", disableComments);
    payload.append("postText", postText.value);
    files.forEach((e) => {
      payload.append("files", e);
    });

    dispatch(sendPost(payload))
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => setLoading(false));
    console.log(payload);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={Boolean(modalOpen)}
      TransitionComponent={Transition}
      onClose={onModalClose}
    >
      <Box className={styles.container}>
        <Box className={styles.header} px={2}>
          <Typography variant="h6">New Post</Typography>
          <IconButton onClick={handleCloseModalClick}>
            <X />
          </IconButton>
        </Box>
        <Divider />
        <Box className={styles.content} mt={2} px={2}>
          <Box className={styles.section1} mr={1}>
            <Avatar src={account.profileImageUrl} size={20} />
          </Box>
          <Box className={styles.section2}>
            <Box className={styles.input}>
              <PostInput
                open={Boolean(modalOpen)}
                onChange={handleInputChange}
                name="postText"
                value={postText.value}
              />
              <CharCounter count={postText.count} maxCount={postText.max} />
            </Box>

            <Box className={styles.input2Container} mt={2}>
              <Box>
                {visibleTo.value === "selected_classes" ? (
                  <>
                    <Box className={styles.input2sec1}>
                      <SearchInput
                        searchType="class"
                        onChange={handleClassesChange}
                        label="Visible to Classes"
                        // error={!!studentReqData.classId.error}
                        // helperText={studentReqData.classId.error}
                        placeholder="Type class name and press search..."
                        noOptionsText="No class found"
                        multiple
                      />
                      <Box>
                        <IconButton onClick={handleVisibleToSwitch}>
                          <List />
                        </IconButton>
                      </Box>
                    </Box>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="position"
                        name="classesTo"
                        defaultValue={classesTo.value}
                      >
                        {classesToOptions.map((c) => (
                          <FormControlLabel
                            value={c.value.toLowerCase()}
                            key={c.value}
                            control={<Radio color="primary" />}
                            label={c.label.replace(/\w+/g, _.capitalize)}
                            labelPlacement="end"
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </>
                ) : (
                  <>
                    <FormControl
                      variant="outlined"
                      className={styles.formControl}
                      error={!!visibleTo.error}
                      // disabled={loading}
                    >
                      <InputLabel
                        id="type"
                        // ref={inputLabel}
                        error={!!visibleTo.error}
                      >
                        Visible To
                      </InputLabel>
                      <Select
                        labelId="type"
                        id="type"
                        error={!!visibleTo.error}
                        value={visibleTo.value}
                        onChange={handleInputChange}
                        name="visibleTo"
                        labelWidth={75}
                      >
                        {toOptions.map((c) => (
                          <MenuItem value={c.value.toLowerCase()} key={c.value}>
                            {c.label.replace(/\w+/g, _.capitalize)}
                          </MenuItem>
                        ))}
                      </Select>
                      {visibleTo.error && (
                        <FormHelperText error>{visibleTo.error}</FormHelperText>
                      )}
                    </FormControl>
                  </>
                )}
              </Box>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={disableComments}
                  onChange={handleCommentsDisableToggle}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Disable Comments"
            />
            <Box mt={1}>
              {files.length > 0 && (
                <FilesDisplay files={files} onDeleteFile={handleDeleteFile} />
              )}

              {/* {files.length > 0 && (
                <>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Images and Files
                    </Typography>
                  </Box>
                  {files.map((e) => (
                    <Box
                      key={e.size + e.name}
                      mr={1}
                      mb={1}
                      className={styles.fileChip}
                    >
                      <Chip
                        icon={
                          e.type.indexOf("image") > -1 ? <Image /> : <File />
                        }
                        label={e.name}
                        // onClick={handleClick}
                        onDelete={() => handleFileRemoveClick(e.name)}
                      />
                    </Box>
                  ))}
                </>
              )} */}
            </Box>
            {/* <Box mt={2}></Box> */}
            <Box className={styles.footer} mt={1}>
              <PostFooter
                onFilesChange={handleFilesChange}
                onSubmit={handleSubmit}
                postBtnLoading={loading}
                postBtnDisabled={Boolean(
                  !postText.value ||
                    postText.value === "" ||
                    (visibleTo.value === "selected_classes" &&
                      classes.value.length === 0)
                )}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default Post;
