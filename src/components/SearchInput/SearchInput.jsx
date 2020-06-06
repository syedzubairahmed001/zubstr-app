import React, { useState } from "react";
import { TextField, CircularProgress, IconButton } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Search } from "react-feather";
import { useDispatch, useSelector } from "react-redux";

import { searchClasses } from "../../store/actions/campus";

const SearchInput = (props) => {
  const dispatch = useDispatch();
  const {
    searchType,
    onChange,
    multiple,
    name,
    disabled,
    label,
    noOptionsText,
    placeholder,
    error,
    helperText,
    ...remProps
  } = props;
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (inputValue) {
      if (searchType === "class") {
        setLoading(true);
        dispatch(searchClasses({ query: inputValue }))
          .then((res) => {
            setLoading(false);
            if (res.data) {
              setOpen(true);
              let dataOptions =
                Array.isArray(res.data) &&
                res.data.map((e) => ({ name: e.name, value: e._id }));
              setOptions(dataOptions);
            }
          })
          .catch((err) => {
            setLoading(false);
            console.error(err);
          });
      }
    }
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      fullWidth
      {...remProps}
      disabled={disabled}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onInputChange={(event, newVal) => {
        setInputValue(newVal);
      }}
      onChange={onChange}
      onClose={() => {
        setOpen(false);
      }}
      multiple={multiple}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      disableClearable
      noOptionsText={noOptionsText || "No Options"}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={name}
          error={error}
          helperText={helperText}
          variant="outlined"
          fullWidth
          placeholder={placeholder || "Type and press search..."}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={25} />
                ) : (
                  <IconButton
                    onClick={handleSearch}
                    style={{ padding: "5px" }}
                    disabled={disabled}
                  >
                    <Search size={25} />
                  </IconButton>
                )}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchInput;
