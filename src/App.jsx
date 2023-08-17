import { useState, useEffect } from 'react'

import './App.css'
import { addUser, getUser, updateUser } from './APIHandler';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



function App() {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({
    id:null,
    name: "",
    age: 1,
    jobtitle: ""
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
      const addUserData = await addUser(form.name, form.age, form.jobtitle)
      console.log(addUserData)
      fetchData()
    }
    submitData()

  }

  function update(e) {
    e.preventDefault()
    console.log(form)
    async function submitData() {
      const updateUserData = await updateUser(form.id,form.name, form.age, form.jobtitle)
      console.log(updateUserData)
      fetchData()
    }
    submitData()

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
              <td> <Popup trigger={<button>Update</button>} position="right center">
                <form className='popUp'>
                  <h3>Update User</h3>
                  <label>Name</label>
                  <input type='text' name='name' value={form.name} onChange={handleChange} />
                  <label>Age</label>
                  <input type='number' name='age' value={form.age} onChange={handleChange} />
                  <label>Job Title</label>
                  <input type='text' name='jobtitle' value={form.jobtitle} onChange={handleChange} />
                  <button onClick={update}>Update</button>
                </form>
              </Popup></td>
              <td><button>Delete</button></td>
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
          <input type='text' name='jobtitle' value={form.jobtitle} onChange={handleChange} />
          <button onClick={submit}>Submit</button>
        </form>
      </Popup>
    </>
  )
}

export default App
