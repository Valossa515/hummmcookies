import Logo from "assets/img/logo.jpg";

function NavBar() {
    return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-light border-bottom shadow-sm" >
            <div className="container">
                <nav className="my-2 my-md-0 mr-md-3">
                    <img src={Logo} alt="Hummm Cookies" width="120 navbar-brand d-lg-none" />
                </nav>
            </div>
        </div>
    );
}
export default NavBar;