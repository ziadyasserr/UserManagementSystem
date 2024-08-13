import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../SideBar/SideBar';

export default function MasterLayout() {
  return (
    <>
        <div className="d-flex">
          <div>
            <Sidebar />
          </div>
          <div className="w-100">
            <Navbar />
            <Outlet />
          </div>
        </div>
    </>
  );
}
