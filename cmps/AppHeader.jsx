const { Link, NavLink } = ReactRouterDOM


export function AppHeader() {
    return (
        <header className="app-header">
             <NavLink to="/home">
            <div className="logo" >Mister Book</div>
             </NavLink>
            <nav className="nav-bar">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/book" >Book</NavLink>
            </nav>
        </header>
    )
}