/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const baseUrl = 'https://express-rest-guest-list-api.herokuapp.com';

const gray = '#282c34';
const teal = '#32a895';
const teal2 = '#32a86f';
const red = '#d93030';

const headerStyles = css`
  background-color: ${teal};
  width: auto;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  text-transform: uppercase;
  font-family: 'Simplifica';
`;

const imgStyles = css`
  border-radius: 20px;
  width: 40%;
  height: auto;
`;

const bodyStyles = css`
  background-color: ${gray};
  width: auto;
  min-height: 80vh;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 50px;
  align-items: top;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const inputField = css`
  line-height: 40px;
  width: 100%;
  margin-bottom: 20px;
`;

const addGuestStyles = css`
  margin-right: auto;
  padding: 20px 50px;
  justify-content: center;
`;

const buttonStyles = css`
  color: #fff !important;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 20px;
  margin-bottom: 20px;
  padding: 20px 50px;
  border: none;
  border-radius: 15px;
  background: ${teal};
  transition: all 0.4s ease 0s;

  :hover {
    background: ${teal2};

    letter-spacing: 3px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all 0.4s ease 0s;
  }
`;

const buttonDeleteStyles = css`
  color: #fff !important;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 20px;
  margin-bottom: 20px;
  padding: 20px 50px;
  display: inline-block;
  border: none;
  border-radius: 15px;
  background: ${teal};
  transition: all 0.4s ease 0s;

  :hover {
    background: ${red};

    letter-spacing: 3px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all 0.4s ease 0s;
  }
`;

const tableStyles = css`
  text-align: center;
  line-height: 30px;
  border-spacing: 15px 5px;
`;

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
  // console.log(list);

  // Define input fields
  const [fName, setFname] = useState('');
  const [lName, setLname] = useState('');
  const [checkboxes, setCheckboxes] = useState({});
  // Object.keys() returns an array of strings which are values of specific key of the object
  const checkboxKeys = Object.keys(checkboxes);

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
          firstName: fName,
          lastName: lName,
        }),
      });

      const createdGuest = await response.json();
      window.location.reload();
      return createdGuest;
    }

    newGuest();
  }

  // when Delete button is clicked:
  function handleDelete() {
    async function deleteGuest() {
      const response = await fetch(`${baseUrl}/${checkboxKeys}`, {
        method: 'DELETE',
      });

      const deletedGuest = await response.json();

      window.location.reload();
      return deletedGuest;
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

      const updatedGuest = await response.json();

      window.location.reload();
      return updatedGuest;
    }
    editGuest();
  }

  return (
    <div className="App">
      <header css={headerStyles} className="App-header">
        <img css={imgStyles} src="/group-tnt.jpg" alt="Group TNT" />
        <h1>Group TNT guest List</h1>
      </header>
      <section css={bodyStyles} className="App-body">
        <div css={addGuestStyles}>
          <h2>Add the guest to the list:</h2>
          {/* Personal data input fields */}
          <form onSubmit={handleSubmit}>
            <input
              css={inputField}
              type="text"
              placeholder="First name"
              id="firstName"
              onChange={(e) => setFname(e.target.value)}
            />
            <br />

            <input
              css={inputField}
              type="text"
              placeholder="Last name"
              id="lastName"
              onChange={(e) => setLname(e.target.value)}
            />
            <br />

            <button css={buttonStyles}>Submit</button>
          </form>
        </div>
        <div css={addGuestStyles}>
          {/* Table of content- guest list */}
          <h2 className="guestlist"> Guest list:</h2>

          <table css={tableStyles}>
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

          {/* <label> */}
          <button
            css={buttonStyles}
            type="button"
            onClick={(e) => handleEdit(e)}
          >
            Confirm guest attendance
          </button>
          {/* </label> */}

          <br />

          {/* Delete-Button */}

          {/* <label> */}
          <button
            css={buttonDeleteStyles}
            type="button"
            onClick={(item) => handleDelete(item.id)}
            id="delete"
          >
            Delete guest
          </button>
          {/* </label> */}
        </div>
      </section>
    </div>
  );
}

export default App;
