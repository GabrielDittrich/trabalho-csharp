import Header from "./Header";
import Nav from "./Nav";
import Aside from "./Aside";
import Footer from "./Footer";

function Layout(props) {
    return (
        <>
            <Header />
            <Nav />
            {/* <Aside /> */}
            <main>{props.children}</main>
            <Footer />
        </>
    );
}

export default Layout;