function UsersTab({
  users,
}) {
  return (
    <div className="admin-tab">

      <div className="section-header">
        <h2>
          Users
        </h2>

        <span>
          Total: {users.length}
        </span>
      </div>


      {users.length === 0 ? (

        <p>
          No users found
        </p>

      ) : (

        <div className="admin-table-wrapper">

          <table className="admin-table">

            <thead>
              <tr>
                <th>
                  Name
                </th>

                <th>
                  Email
                </th>

                <th>
                  Role
                </th>

                <th>
                  Created
                </th>
              </tr>
            </thead>


            <tbody>

              {users.map((user) => (

                <tr key={user._id}>

                  <td>
                    {user.name || "N/A"}
                  </td>


                  <td>
                    {user.email || "N/A"}
                  </td>


                  <td>
                    {user.role || "Customer"}
                  </td>


                  <td>
                    {user.createdAt
                      ? new Date(
                          user.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}


export default UsersTab;