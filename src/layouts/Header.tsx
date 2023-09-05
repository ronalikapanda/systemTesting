import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";
import emptyProfileIcon from 'https://lsp.smsionline.com/images/noProfile.jpg';

function Header({logout}:{logout:any}) {
    const [profileDropDown,SetProfileDropDown]=useState(true);
    const userProfile = useAppSelector((state) => state.profile.userProfile);
    const profileImageNotFound=(event:any)=>{
        event.target.src = 'https://lsp.smsionline.com/images/noProfile.jpg';
    }

    return ( <>
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Total Language</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
                        <li className="">
                            <a className="display-picture" onClick={()=>{SetProfileDropDown(!profileDropDown)}}>
                                {/* <img src="https://i.pravatar.cc/85" alt=""/> */}
                                <img onError={ profileImageNotFound}  src={'https://lsp.totallanguage.com/'+userProfile?.companyLogo} alt=""/>
                            </a>
                            <div className={"card ProfileDropdown "+((profileDropDown)?"showdropp":"") }>
                                <ul>
                                    <li className="dropdown-menu-header">
                                        <h6 className="dropdown-header ms-inline m-0 py-0 fs-16"><span className="text-disabled fs-12 w-100 d-block mb-1">Welcome, </span>{userProfile?.fullName} </h6>
                                    </li>
                                    <li><a href="#"><i className="fal fa-user-circle me-2 fa-lg profile-icon"></i>Profile </a> </li>
                                    <li><a href="#"><i className="fal fa-lock-alt me-2 fa-lg profile-icon"></i>Change Password </a></li>
                                    <li><a href="#" onClick={logout}  ><i className="fal fa-sign-out me-2 fa-lg profile-icon"></i>Log Out </a></li>
                                    <li><a href="#" className="closeProfile"><i className="fal fa-times-circle me-2 fa-lg profile-icon"></i>Close </a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </> );
}

export default Header;