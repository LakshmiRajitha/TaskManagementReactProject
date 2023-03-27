export const GetTasks = () => {
  return fetch("/api/task/alltasks")
    .then((response) => response.json())
    .then((actualData) => {
      return actualData;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
export const CreateTask = (task) => {
  return fetch("/api/task/createtask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "x-access-token": "token-value",
    },
    body: JSON.stringify(task),
  }).then(() => {
    return "Created task successfully";
  });
};
export const UpdateTask = (task) => {
  return fetch("/api/task/updatetask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "x-access-token": "token-value",
    },
    body: JSON.stringify(task),
  }).then(() => {
    return "Updated task successfully";
  });
};
export const DeleteTask = (taskId) => {
  return fetch("/api/task/" + taskId + "/deletetask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "x-access-token": "token-value",
    },
  }).then(() => {
    return "Deleted successfully";
  });
};
