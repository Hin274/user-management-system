export async function getUser() {
  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();
  console.log(users);
  return users
}

export async function addUser(name, age, job_title) {
  const add = await fetch("http://localhost:3000/users/posts", {

    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify({
      name: name,
      age: age,
      job_title: job_title
    }),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json"
    }

  })
}

export async function updateUser(id,name, age, job_title) {
  const update = await fetch(`http://localhost:3000/users/update`, {

    // Adding method type
    method: "PUT",

    // Adding body or contents to send
    body: JSON.stringify({
      id:id,
      name: name,
      age: age,
      job_title: job_title
    }),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json"
    }

  })
}

export async function deleteUser(id) {
  const remove = await fetch(`http://localhost:3000/users/delete`, {

    // Adding method type
    method: "DELETE",

    // Adding body or contents to send
    body: JSON.stringify({
      id:id
    }),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json"
    }

  })
}