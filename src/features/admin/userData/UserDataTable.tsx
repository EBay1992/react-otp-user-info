import React from 'react';
import { UserData } from '@api/Admin.types';
import styles from './UserDataTable.module.css';

interface UserDataTableProps {
  userData: UserData;
}

const UserDataTable: React.FC<UserDataTableProps> = ({ userData }) => {
  return (
    <table className={styles.userDataTable}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Contact</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{userData.firstName}</td>
          <td>{userData.lastName}</td>
          <td>{userData.contact}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserDataTable;
