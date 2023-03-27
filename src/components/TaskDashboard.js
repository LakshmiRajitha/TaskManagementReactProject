import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NewTask from "./NewTask";
import { GetTasks, DeleteTask } from "../services/Task";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Header from "./Header";

const TaskDashboard = (props) => {
  const [showForm, setshowform] = useState(false);
  const [deleteMessage, setdeleteMessage] = useState(false);
  const [tasksaveMessage, settasksaveMessage] = useState(false);
  const [cellValues, setCellValuess] = useState("");
  const [items, setitems] = useState([]);
  const [openAlert, setopenAlert] = useState(true);

  useEffect(() => {
    setitems(props.items);
  }, []);

  let deleteTask = async (taskId) => {
    let statusMessage = await DeleteTask(taskId);
    if (statusMessage) {
      setopenAlert(true);
      setdeleteMessage(true);
      getTasks();
    }
  };

  let getTasks = async () => {
    let result = await GetTasks();
    setitems(result);
    setTimeout(() => {
      setopenAlert(false);
    }, 2000);
  };
  const columns = [
    { field: "TaskID", headerName: "ID", width: 110 },
    {
      field: "TaskName",
      headerName: "Task name",
      width: 250,
      editable: false,
    },
    {
      field: "Description",
      headerName: "Description",
      width: 550,
      editable: false,
    },
    {
      field: "Deadline",
      headerName: "Deadline",
      width: 120,
      editable: false,
    },
    {
      field: "Action",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (cellValues) => {
        return (
          <div>
            <IconButton
              data-testid="editTask"
              aria-label="edit"
              color="primary"
              onClick={(event) => {
                setshowform(true);
                setCellValuess(cellValues);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="secondary"
              onClick={(event) => {
                handleDelete(cellValues.row.TaskID);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  //   DELETE
  const handleDelete = (index) => {
    deleteTask(index);
  };
  //   DELETE

  const callBack = (isSaved) => {
    if (isSaved) {
      if (isSaved == "created") {
        setopenAlert(true);
        settasksaveMessage("Task Created Successfully!");
      } else {
        setopenAlert(true);
        settasksaveMessage("Task Updated Successfully!");
      }
      getTasks();
    }
    setshowform(false);
  };

  return (
    <>
      <Header callBack={callBack} items={items}></Header>
      {showForm && (
        <NewTask
          IsEditItem={true}
          cellValues={cellValues}
          callBack={callBack}
          items={items}
        />
      )}
      <div className="container py-2 " data-testid="form">
        {deleteMessage || tasksaveMessage ? (
          <Snackbar
            autoHideDuration={2000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={openAlert}
            onClose={() => setopenAlert(false)}
          >
            <MuiAlert severity="success" sx={{ width: "100%" }}>
              {deleteMessage ? "Task Deleted Successfully" : tasksaveMessage}
            </MuiAlert>
          </Snackbar>
        ) : (
          ""
        )}
        <Box sx={{ height: 400, width: "100%" }}>
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              Welcome to the Task Management System!
            </CardContent>
          </Card>
          <DataGrid
            columnBuffer={5}
            getRowId={(row) => row?.TaskID}
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
            rows={items}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection={false}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </>
  );
};

export default TaskDashboard;
