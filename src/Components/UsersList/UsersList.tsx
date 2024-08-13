import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  image: string;
}

export default function UsersList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = (user: User) => {
    setShow(true);
    setUserId(user.id);
    setUserData(user);
  };

  const getUsers = async () => {
    try {
      const response = await axios.get<{ users: User[] }>('https://dummyjson.com/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async () => {
    try {
      if (userId !== null) {
        await axios.delete(`https://dummyjson.com/users/${userId}`);
        toast.success('User deleted successfully');
        handleClose();
        setUsers(users.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-capitalize">
          Are you sure you want to delete{' '}
          <span className="fs-5 fw-bold">
            {userData?.firstName} {userData?.lastName}
          </span>
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteUser}>
            Yes
          </Button>
          <Button variant="warning" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="px-5">
        <div className="d-flex justify-content-between align-items-center ">
          <div>
            <h3 className='fw-bold'>Users List</h3>
          </div>
          <div>
            <button
              className="btn btn-warning text-light"
              onClick={() => navigate('/dashboard/userdata')}
            >
              ADD NEW USER
            </button>
          </div>
        </div>
        <hr />
        <table className="table mt-4 shadow-sm ">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Birth Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">
                  <img src={user.image} className="w-25" alt="user" />
                </th>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.birthDate}</td>
                <td>
                  <div className="text-warning fs-5 d-flex">
                    <div>
                      <i
                        className="fa-solid fa-pen mx-3"
                        onClick={() => navigate(`/dashboard/userdata/${user.id}`)}
                      ></i>
                    </div>
                    <div>
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => handleShow(user)}
                      ></i>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
