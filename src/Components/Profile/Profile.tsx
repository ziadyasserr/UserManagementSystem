import { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { AuthContext } from '../../Context/Context';

// Adjust the UserData interface if necessary
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  gender: string;
}

// Define the type for the AuthContext
interface AuthContextType {
  userData: UserData | null;
}

export default function Profile() {
  const { userData } = useContext(AuthContext) as AuthContextType;

  // Handle the case where userData might be null
  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-5">
      <h3 className="fw-bold">Profile</h3>
      <hr />
      <form className="shadow p-md-5 p-0 m-5">
        <div className="row">
          <div className="col-12 col-md-6 mb-5">
            <Form.Group className="mb-3">
              <Form.Label>FirstName</Form.Label>
              <Form.Control
                type="text"
                placeholder={userData.firstName}
                disabled
              />
            </Form.Group>
          </div>
          <div className="col-12 col-md-6 mb-5">
            <Form.Group className="mb-3">
              <Form.Label>LastName</Form.Label>
              <Form.Control
                type="text"
                placeholder={userData.lastName}
                disabled
              />
            </Form.Group>
          </div>
          <div className="col-12 col-md-6 mb-5">
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder={userData.email}
                disabled
              />
            </Form.Group>
          </div>
          <div className="col-12 col-md-6 mb-5">
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder={userData.id}
                disabled
              />
            </Form.Group>
          </div>
          <div className="col-12 col-md-6 mb-5">
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder={userData.gender}
                disabled
              />
            </Form.Group>
          </div>
          <div className="col-12 col-md-6 mb-5">
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" placeholder="28" disabled />
            </Form.Group>
          </div>
        </div>
      </form>
    </div>
  );
}
