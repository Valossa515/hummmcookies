import Footer from "components/Footer";
import NavBar from "components/NavBar";
const Home = () => {
    return (
        <>
        <NavBar />
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-4">Hummm Cookies</h1>
                <p className="lead">Cookies E biscoitos</p>
                <hr />
                <p>Esta aplicação consiste em exibir um app de compras a partir de dados fornecidos por um back end construído com Spring Boot.</p>
            </div>
        </div>
        <Footer/>
        </>
    );
}
export default Home;