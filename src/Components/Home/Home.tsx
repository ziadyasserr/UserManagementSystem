import { useContext } from 'react';
import { AuthContext } from '../../Context/Context';

interface UserData {
  firstName: string;
  lastName: string;
}

export default function Home() {
  const { userData } = useContext(AuthContext) as { userData: UserData };

  return (
    <div className="container mt-5">
      <div className="jumbotron bg-light p-4 rounded shadow-sm">
        <h2 className="mb-4">
          Hello, <span className="text-warning fs-1">{userData.firstName} {userData.lastName}</span>!
        </h2>
        <p className="text-secondary fs-5 mb-3">
          Welcome to your personalized dashboard for managing users within our system. Here, you can effortlessly create, update, and organize user accounts. Our platform is built with security, simplicity, and efficiency in mind, allowing you to focus on what really matters.
        </p>
        <p className="text-secondary fs-5 mb-3">
          Explore the features designed to streamline your workflow, from role management to real-time activity tracking. We're committed to providing you with the tools you need to manage users effectively and securely.
        </p>
        <p className="text-secondary fs-5 mb-3">
          Stay tuned for upcoming updates as we continue to enhance the system based on your valuable feedback. We're here to support you every step of the way. Enjoy your experience!
        </p>
      </div>
    </div>
  );
}
