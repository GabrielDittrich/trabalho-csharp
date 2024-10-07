
import { NavLink } from "react-router-dom";

function Nav() {
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Inicio</NavLink></li>
                <li><NavLink to="/cadastros">Cadastros</NavLink></li>
            </ul>
        </nav>
    );
}

export default Nav;