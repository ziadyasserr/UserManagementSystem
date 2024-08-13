import { useContext, useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Context';

interface UserData {
  image: string;
  firstName: string;
  lastName: string;
}

export default function SideBar() {
  const { userData } = useContext(AuthContext) as { userData: UserData };

  const [iscollapsed, setIsCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setIsCollapsed(!iscollapsed);
  };

  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="sidebarContainer vh-100">
      <Sidebar className="vh-100 position-relative" collapsed={iscollapsed}>
        <Menu>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <div className="pos-style position-relative ms-4">
              <span className="fw-bold">UMS</span>
            </div>
            <div className="text-end">
              {iscollapsed ? (
                <i
                  className="fa-solid fa-arrow-right-long"
                  onClick={toggleCollapsed}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-arrow-left-long"
                  onClick={toggleCollapsed}
                ></i>
              )}
            </div>
          </div>

          {!iscollapsed && (
            <div className="text-center mt-4 mb-5">
              <img
                src={userData.image}
                alt="profile"
                className="rounded-circle"
                width={130}
                height={120}
              />
              <h4 className="mt-2">{userData.firstName} {userData.lastName}</h4>
              <span>Admin</span>
            </div>
          )}
          <div className="mt-5">
            <MenuItem
              icon={<i className="fa-solid fa-house"></i>}
              component={<Link to="/dashboard/home" />}
            >
              Home
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-user"></i>}
              component={<Link to="/dashboard/userslist" />}
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-bookmark"></i>}
              component={<Link to="/dashboard/userdata" />}
            >
              Add User
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-id-badge"></i>}
              component={<Link to="/dashboard/profile" />}
            >
              Profile
            </MenuItem>

            <MenuItem
              icon={<i className="fa-solid fa-door-open"></i>}
              className="bottom-0 position-absolute"
              onClick={goToLogin}
            >
              Logout
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
}
