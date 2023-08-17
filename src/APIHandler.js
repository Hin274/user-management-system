export async function getUser() {
  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();
  console.log(users);
  return users
}

export async function addUser(name, age, jobtitle) {
  const add = await fetch("http://localhost:3000/users/posts", {

    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify({
      name: name,
      age: age,
      jobtitle: jobtitle
    }),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json"
    }

  })
}

export async function updateUser(id,name, age, jobtitle) {
  const update = await fetch(`http://localhost:3000/users/${id}`, {

    // Adding method type
    method: "PUT",

    // Adding body or contents to send
    body: JSON.stringify({
      name: name,
      age: age,
      jobtitle: jobtitle
    }),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json"
    }

  })
}