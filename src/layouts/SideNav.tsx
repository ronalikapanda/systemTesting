
import { useState } from 'react';
import logo from '../asset/logo/logo.png';



function SideNav({logout}:{logout:any}) {
    const [sideMenu,SetSideMenu]=useState(true);

    return ( <>
    <nav className={"sidebar " +((sideMenu)?"close":"")}>
        <header>
            <div className="image-text">
                <span className="image">
                    <img src={logo} alt="" />
                </span>
                <div className="text logo-text">
                    <span className="name" >Total <span className="subname">Language</span></span>
                    <span className="profession">Web developer</span>
                </div>
            </div>
            <i  onClick={()=>{SetSideMenu(!sideMenu)}} className='far fa-angle-right toggle'></i>
        </header>

        <div className="menu-bar">
            <div className="menu">
                <ul className="menu-links ps-0">
                    <li className="nav-link">
                        <a href="#">
                            <i className='fal fa-grid-2 icon'></i>
                            <span className="text nav-text">Dashboard</span>
                        </a>
                    </li>
                    <li className="nav-link">
                        <a href="#">
                            <i className='fal fa-sliders-h icon'></i>
                            <span className="text nav-text">Manage</span>
                        </a>
                    </li>
                    <li className="nav-link">
                        <a href="#">
                            <i className='fal fa-briefcase icon'></i>
                            <span className="text nav-text">Finance</span>
                        </a>
                    </li>
                    <li className="nav-link">
                        <a href="#">
                            <i className='fal fa-chart-column icon'></i>
                            <span className="text nav-text">Reports</span>
                        </a>
                    </li>
                    <li className="nav-link">
                        <a href="#">
                            <i className='fal fa-user-cog icon'></i>
                            <span className="text nav-text">Admin</span>
                        </a>
                    </li>
                </ul>
            </div>

            <ul className="bottom-content ps-0">
                <li className="">
                    <a href="#" onClick={logout} >
                        <i className='fal fa-arrow-right-from-bracket icon'></i>
                        <span className="text nav-text">Logout</span>
                    </a>
                </li>
                <li className="mode">
                    <div className="sun-moon">
                        <i className='bx bx-moon icon moon'></i>
                        <i className='bx bx-sun icon sun'></i>
                    </div>
                    <span className="mode-text text">Dark mode</span>
                    <div className="toggle-switch">
                        <span className="switch"></span>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
    </> );
}

export default SideNav;