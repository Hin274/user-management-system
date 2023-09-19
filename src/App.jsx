import { useState, useEffect } from 'react'

import './App.css'
import { addUser, deleteUser, getUser, updateUser } from './APIHandler';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import UserPopup from './UserPopup';



function App() {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({
    name: "",
    age: 1,
    job_title: ""
  })

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }
  async function fetchData() {
    const usersData = await getUser()
    setUsers(usersData)
  }

  useEffect(() => {
    console.log("running use effect")
    fetchData()
  }, []);

  function submit(e) {
    e.preventDefault()
    console.log(form)
    async function submitData() {
      const addUserData = await addUser(form.name, form.age, form.job_title)
      console.log(addUserData)
      fetchData()
    }
    submitData()

  }

  function submitUpdatedUser(e, id, name, age, job_title) {
    e.preventDefault()
    async function submitData() {
      const updateUserData = await updateUser(id, name, age, job_title)
      console.log(updateUserData)
      fetchData()
    }
    submitData()
    console.log("sent")
  }



  function updateUserState(id, name, age, job_title) {
    for (let i = 0; i < users.length; i++) {
      if (id === users[i].id) {
        users[i].name = name
        users[i].age = age
        users[i].job_title = job_title
      }
    }
    setUsers([...users])

  }


  function submitDeleteUser(id) {
    for (let i = 0; i < users.length; i++) {
      if (id === users[i].id) {
        console.log("Deleted user with ID "+id)
        deleteUser(id)
      }

    }
  }

  return (
    <>
      <h1>User Management System</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Job Title</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.job_title}</td>
              <td> <UserPopup label="update" name={user.name} age={user.age} job_title={user.job_title} handleChangeName={
                (e) => {
                  const newValue = e.target.value;
                  updateUserState(user.id, newValue, user.age, user.job_title)
                }
              }
                handleChangeAge={
                  (e) => {
                    const newValue = e.target.value;
                    updateUserState(user.id, user.name, newValue, user.job_title)
                  }
                }
                handleChangeJobTitle={
                  (e) => {
                    const newValue = e.target.value;
                    updateUserState(user.id, user.name, user.age, newValue)
                  }
                } submit={(e) => { submitUpdatedUser(e, user.id, user.name, user.age, user.job_title) }}></UserPopup></td>
              <td><button onClick={() => submitDeleteUser(user.id)}>Delete</button></td>
            </tr>
          ))}

        </tbody>
      </table>

      <Popup trigger={<button>Add user</button>} position="right center">
        <form className='popUp'>
          <h3>New User</h3>
          <label>Name</label>
          <input type='text' name='name' value={form.name} onChange={handleChange} />
          <label>Age</label>
          <input type='number' name='age' value={form.age} onChange={handleChange} />
          <label>Job Title</label>
          <input type='text' name='job_title' value={form.job_title} onChange={handleChange} />
          <button onClick={submit}>Submit</button>
        </form>
      </Popup>
      <UserPopup label="Submit" value={[form.name, form.age, form.job_title]} onChange={handleChange} submit={submit} />
    </>
  )
}

export default App
