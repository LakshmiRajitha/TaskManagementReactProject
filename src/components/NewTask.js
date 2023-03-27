import React, { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { CreateTask, UpdateTask } from "../services/Task";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function NewTask(props) {
  const [inputTitle, setinputTitle] = useState("");
  const [inputDesc, setinputDesc] = useState("");
  const [inputDeadline, setinputDeadline] = useState();
  const [showList, setshowList] = useState(true);
  const [toggleSubmit, settoggleSubmit] = useState(true);
  const [showForm, setshowform] = useState(true);
  const [isEditItem, setisEditItem] = useState(null);
  const [items, setitems] = useState(props.items);

  useEffect(() => {
    setshowform(true);
    if (props.IsEditItem) handleEdit(props.cellValues);
  }, []);

  //   HANDLING INPUT FIELDS
  const handleInput = (e) => {
    setinputTitle(e.target.value);
  };
  const handleInputdesc = (e) => {
    setinputDesc(e.target.value);
  };
  //   HANDLING INPUT FIELDS
  let createTask = async (task) => {
    let res = await CreateTask(task);
    if (res) {
      handleClose("created");
    } else handleClose();
    // setitems(res);
  };
  let updateTask = async (task) => {
    let res = await UpdateTask(task);
    if (res) handleClose("updated");
    else handleClose();
  };
  //   SUBMITTING FORM
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputTitle || !inputDesc) {
      window.alert("Please fill all the fields");
      setshowList(false);
    } else if (inputTitle && !toggleSubmit) {
      let selectedItem = items.filter((elem) => elem.TaskID == isEditItem);

      if (selectedItem) {
        selectedItem[0].TaskName = inputTitle;
        selectedItem[0].Description = inputDesc;
        selectedItem[0].Deadline = inputDeadline.toLocaleDateString();
      }
      updateTask(selectedItem[0]);
      setinputTitle("");
      setinputDesc("");
    } else {
      const ids = items.map((object) => {
        return object.TaskID;
      });
      const max = Math.max(...ids);
      const allinputTitle = {
        TaskID: ids.length > 0 ? max + 1 : 1,
        TaskName: inputTitle,
        Description: inputDesc,
        Deadline: inputDeadline.toLocaleDateString(),
      };
      createTask(allinputTitle);
      setinputTitle("");
      setinputDesc("");
    }
  };
  //   SUBMITTING FORM

  //   EDIT
  const handleEdit = (cellValues) => {
    setshowList(false);
    setshowform(true);
    let id = cellValues.row.TaskID;
    settoggleSubmit(false);
    let newEditItem = items.find((elem) => {
      return elem.TaskID === id;
    });
    setinputTitle(newEditItem.TaskName);
    setinputDesc(newEditItem.Description);
    setinputDeadline(new Date(newEditItem.Deadline));
    setisEditItem(id);
  };
  //   EDIT

  const handleClose = (typeOfSave) => {
    props.callBack(typeOfSave);
    setshowform(false);
  };

  return (
    <>
      <Dialog
        onClose={() => {
          setshowform(false);
          props.callBack();
        }}
        open={showForm}
        maxWidth="md"
        PaperProps={{
          sx: {
            height: 450,
          },
        }}
      >
        <DialogTitle>
          <Typography
            style={{ fontWeight: "bold", fontSize: "20px" }}
            align="center"
          >
            {toggleSubmit ? "Add Task" : " Edit Task"}
          </Typography>
          <IconButton
            onClick={() => {
              setshowform(false);
              props.callBack();
            }}
            aria-label="close"
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <form className="col-12 p-2" onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              label="Enter Task Name"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "70ch" }}
              onChange={handleInput}
              value={inputTitle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              label="Enter Description"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "70ch" }}
              onChange={handleInputdesc}
              value={inputDesc}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <div style={{ marginLeft: "20px" }}>
              <span
                style={{
                  marginLeft: "1px",
                  color: "grey",
                  fontWeight: 400,
                  fontSize: "12px",
                }}
              >
                Enter Deadline
              </span>
              <DatePicker
                style={{
                  textAlign: "center",
                }}
                size="xs"
                selected={inputDeadline}
                dateFormat="MM/dd/yyyy"
                onChange={(date) => setinputDeadline(date)}
                selectsStart // tells this DatePicker that it is part of a range*
                popperPlacement="top-start"
                placeholderText="Choose a date"
              />
            </div>
          </FormControl>

          {toggleSubmit ? (
            <div className="text-center">
              <button
                className="btn btn-primary my-2"
                data-testid="saveTestButton"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="text-center">
              <button className="btn btn-primary my-2">Update</button>
            </div>
          )}
        </form>
      </Dialog>
    </>
  );
}
