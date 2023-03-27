import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NewTask from "./NewTask";

function Header(props) {
  const [showForm, setshowform] = useState(false);

  const handleAdd = () => {
    setshowform(true);
  };
  const callBack = (isSaved) => {
    setshowform(false);
    if (isSaved == "created") props.callBack("created");
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ textAlign: "left" }}
            >
              Task Management System
            </Typography>
            <Button color="inherit" onClick={handleAdd}>
              Create Task
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {showForm ? (
        <NewTask IsEditItem={false} callBack={callBack} items={props.items} />
      ) : (
        ""
      )}
    </div>
  );
}

export default Header;
