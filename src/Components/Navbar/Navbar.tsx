export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-light bg-light mb-4">
        
        <form className="form-inline ms-auto d-flex align-items-center   ">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <div className="mx-5">
          <i className="fa-regular fa-bell"></i>
          </div>
        </form>
      </nav>
    </>
  );
}