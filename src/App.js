import React, { useEffect, useState } from 'react';
const baseUrl = 'http://localhost:5000';

function App() {
  // Define the guestList array
  const [list, setList] = useState([]);

  // fetch guest list from server, runs only once
  useEffect(() => {
    const getList = async () => {
      const response = await fetch(`${baseUrl}/`);
      const data = await response.json();
      setList(data);
    };

    getList();
  }, []);
  console.log(list);

  // Define input fields
  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [attending, setAttending] = useState(false);

  // when Submit button is clicked:
  function handleSubmit(e) {
    e.preventDefault();

    // create a new guest
    async function newGuest() {
      const response = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: fname,
          lastName: lname,
        }),
      });
      // eslint-disable-next-line
      const createdGuest = await response.json();

      window.location.reload(false);
    }

    newGuest();
  }

  // set state for checkbox
  const [checkboxes, setCheckboxes] = useState({});

  // Object.keys () returns an array of strings which are values of specific key of the object
  const checkboxKeys = Object.keys(checkboxes);

  // when Delete button is clicked:
  function handleDelete() {
    async function deleteGuest() {
      const response = await fetch(`${baseUrl}/${checkboxKeys}`, {
        method: 'DELETE',
      });
      // eslint-disable-next-line no-unused-vars
      const deletedGuest = await response.json();

      window.location.reload(false);
    }
    deleteGuest();
  }

  // Function which edits the data:
  function handleEdit() {
    async function editGuest() {
      const response = await fetch(`${baseUrl}/${checkboxKeys}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attending: true,
        }),
      });
      // eslint-disable-next-line no-unused-vars
      const updatedGuest = await response.json();

      window.location.reload(false);
    }
    editGuest();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Add the guest to the list:</h1>
      </header>
      {/* Personal data input fields */}
      <form onSubmit={handleSubmit}>
        {/* <label> */}
        <span>First name: </span>
        {/* </label> */}
        <input
          type="text"
          id="firstName"
          onChange={(e) => setfName(e.target.value)}
        />
        <br />
        <br />
        {/* <label>Last name: </label> */}
        <span>Last name: </span>
        <input
          type="text"
          id="lastName"
          onChange={(e) => setlName(e.target.value)}
        />
        <br />

        <p>
          <button>Submit</button>
        </p>
      </form>

      {/* Table of content- guest list */}
      <h1 className="guestlist"> Guest list:</h1>

      <table>
        <tbody>
          <tr>
            <th>Select</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Attending</th>
          </tr>
          {list.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={checkboxes[item.id]}
                  onChange={() => {
                    setCheckboxes({ ...checkboxes, [item.id]: true });
                  }}
                />
              </td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{`${item.attending}`}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Set attending */}
      <p>
        {/* <label> */}
        <button type="button" onClick={(e) => handleEdit(e)}>
          Confirm guest attendance
        </button>
        {/* </label> */}
      </p>

      {/* Delete-Button */}
      <p>
        {/* <label> */}
        <button
          type="button"
          onClick={(item) => handleDelete(item.id)}
          id="delete"
        >
          Delete guest
        </button>
        {/* </label> */}
      </p>
    </div>
  );
}

export default App;
