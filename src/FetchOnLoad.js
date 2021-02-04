import { useEffect, useState } from 'react';

export default function FetchOnLoad() {
  const [userData, setUserData] = useState(/** @type {any} */ (null));
  const baseUrl = 'http://localhost:5000';

  useEffect(
    () => {
      async function fetchData() {
        const response = await fetch(`${baseUrl}/`);
        const allGuests = await response.json();

        console.log(allGuests);
        setUserData(allGuests.results);
      }
      fetchData();
    },
    // Empty dependency array says that we only want to run
    // this on the first mount (only once, on load)
    [],
  );

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* <img src={userData.picture.medium} alt="" /> */}
      <div>First Name: {userData.firstName}</div>
      <div>Last Name: {userData.lastName}</div>
    </>
  );
}
