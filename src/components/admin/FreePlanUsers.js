import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase"; // Firebase setup
import { collection, query, where, getDocs } from "firebase/firestore";
import '../assets/admincss/FreePlanUsers.css'

const FreePlanUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreePlanUsers = async () => {
      try {
        const usersQuery = query(
          collection(db, "users"),
          where("plan", "==", "free")
        );

        const querySnapshot = await getDocs(usersQuery);
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          uid: doc.data().uid,
          email: doc.data().email,
          department: doc.data().department,
          university: doc.data().university,
          role: doc.data().role,
        }));

        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching free plan users: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFreePlanUsers();
  }, []);

  return (
    <div>
      <h1>Free Plan Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>UID</th>
              <th>Email</th>
              <th>Department</th>
              <th>University</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.uid}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>{user.university}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FreePlanUsers;
