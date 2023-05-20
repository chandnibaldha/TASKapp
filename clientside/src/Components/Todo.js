import React, { useEffect, useState } from "react";

function Todo() {
  const port = "http://localhost:5000";
  const [Data, setData] = useState({
    firstName: "",
    taskName: "",
  });
  const [count, setCount] = useState([]);
  const handalchange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetchData = async () => {
      const respone = await fetch(`${port}/api/task/fetch-task`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await respone.json();
      setCount(json);
    };
    fetchData();
  }, []);

  const handalSubmit = async () => {
    const respone = await fetch(`${port}/api/task/add-task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });
    const user = await respone.json();
    //setCount(user.Count);
    alert("Task-Added");
    setData({
      firstName: "",
      taskName: "",
    });
    console.log(user);
  };

  const handalDlt = async (_id) => {
    const respone = await fetch(`${port}/api/task/delete-task/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await respone.json();
    console.log(json);
    alert("Task Delete");
    //setCount(json);
  };

  const handalEdit = async (_id) => {
    const respone = await fetch(`${port}/api/task/update-task/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await respone.json();
    console.log(json);
    alert("Task updated");
  };

  return (
    <div className="container my-5">
      <h1>Todo-App</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="FirstName"
          name="firstName"
          onChange={handalchange}
          value={Data.firstName}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="Task-Name"
          name="taskName"
          onChange={handalchange}
          value={Data.taskName}
        />
      </div>
      <div>
        <button className="btn btn-dark" onClick={handalSubmit}>
          Submit
        </button>
      </div>
      <table className="table">
        <tbody>
          <tr>
            <th>FirstName</th>
            <th>TaskName</th>
          </tr>
        </tbody>
        {count.map((item) => {
          return (
            <tr key={item._id}>
              <th>{item.firstName}</th>
              <th>{item.taskName}</th>
              <button
                className="btn btn-danger mx-2 my-2"
                onClick={() => handalDlt(item._id)}
              >
                DLT
              </button>
              <button
                className="btn btn-success mx-2 my-2"
                onClick={() => handalEdit(item)}
              >
                Edit
              </button>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Todo;
