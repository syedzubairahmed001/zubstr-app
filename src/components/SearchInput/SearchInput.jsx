import React, { useState } from "react";
import { TextField, CircularProgress, IconButton } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Search } from "react-feather";
import { useDispatch, useSelector } from "react-redux";

import { searchClasses } from "../../store/actions/campus";

const SearchInput = (props) => {
  const dispatch = useDispatch();
  const { type, onChange } = props;
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (inputValue) {
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
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      //   disabled={noNextClassChecked}
      fullWidth
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
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      disableClearable
      noOptionsText="No class found"
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Next Class"
          variant="outlined"
          fullWidth
          placeholder="Next Class (Required)"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <IconButton onClick={handleSearch}>
                    <Search />
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
