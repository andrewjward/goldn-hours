import React, { useEffect, useState } from "react";

function SearchUserList() {
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState("");
  const [searchString, setSearchString] = useState("");

  const handleUserChange = (event) => {
    const value = event.target.value;
    setUser(value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchString(user);
  };

  const fetchAccountList = async () => {
    const listUrl = `http://localhost:8000/api/accounts/`;
    const fetchList = await fetch(listUrl);
    if (fetchList.ok) {
      const data = await fetchList.json();
      console.log(data);
      setAccounts(data);
    }
  };
  useEffect(() => {
    fetchAccountList();
  }, []);
  console.log(accounts);

  return (
    <>
      <div className="container">
        <div className="mt-4 d-flex flex-row-reverse align-items-center justify-content-between">
          <div>
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                id="usernameinput"
                name="usernameinput"
                maxLength="25"
                onChange={handleUserChange}
                value={user}
              ></input>
              <button
                className="btn btn-sm btn-outline-info"
                onClick={handleSearchSubmit}
              >
                Search Users
              </button>
            </div>
          </div>
          <div className="p-2 flex-fill">
            <h1>Service History</h1>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {accounts &&
              accounts.map((account) => {
                return (
                  account.username.includes(searchString) && (
                    <tr key={account.username}>{account.username}</tr>
                  )
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default SearchUserList;