import config from "./config"

export const getTask = async (id) => {

  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "Application/json")

  const requestOptions = {

    method: "GET",
    headers: myHeaders,
    redirect: "follow"

  }

  try {

    const response = await fetch(`${config.Backend_URI}task?assignTo=${id}`, requestOptions)
    const result = await response.json()
    return result

  }
  catch (err) {

    throw new Error(err.message)

  }

}

export const getAllTask = async () => {

  const requestOptions = {

    method: "GET",
    redirect: "follow"

  };

  const response = await fetch(`${config.Backend_URI}task/alltask`, requestOptions)
  const result = await response.json()
  return result

}

export const updateTask = async (id, task, assignTo = "", status = "") => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let employee = ""
  let finalstatus = ""

  if (assignTo) {

    employee = assignTo

  }
  else {

    employee = task.assignTo

  }

  if (status) {

    finalstatus = status

  }
  else {

    finalstatus = task.status

  }

  const raw = JSON.stringify({

    "tasks": {

      "assignTo": employee,
      "_id": id,
      "title": task.title,
      "desc": task.desc,
      "dueDate": task.dueDate,
      "priority": task.priority,
      "status": finalstatus

    }

  });

  const requestOptions = {

    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"

  };

  const response = await fetch(`${config.Backend_URI}task`, requestOptions)
  const result = await response.json()
  return result

}

export const createTask = async (task) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({

    "assignTo": task.assignTo,
    "tasks": {

      "_id": task._id,
      "title": task.title,
      "desc": task.desc,
      "dueDate": task.dueDate,
      "priority": task.priority,
      "status": task.status

    }

  });

  const requestOptions = {

    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"

  };

  const response = await fetch(`${config.Backend_URI}task`, requestOptions)
  const result = await response.json()
  return result

}

export const deleteTask = async (id) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ "_id": id });

  const requestOptions = {

    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow"

  };

  const response = await fetch(`${config.Backend_URI}task`, requestOptions)
  const result = await response.json()
  return result

}

export const findAssignTo = async (id) => {

  const requestOptions = {

    method: "GET",
    redirect: "follow"

  };

  const response = await fetch(`${config.Backend_URI}task/assignTo?_id=${id}`, requestOptions)
  const result = await response.json()
  return result.result

}