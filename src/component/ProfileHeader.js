import React, { useEffect } from 'react';
import '../style/ProfileHeader.css';

function ProfileHeader(prop) {

    useEffect(() => {
       
    })

    const signOut = (oAuth) => {
        oAuth.signOut();
        console.log('logout')
        prop.setUser(null);
        window.location.href = '/';
    }

    const displayProfile = () => {
        let resultHtmlTag = [];
        if (prop.user.pageInfo.totalResults == 0) {
            resultHtmlTag.push(
                <p className='d-inline me-3'>Hello Guest</p>
            )
            resultHtmlTag.push(
                <img className=" dropdown-toggle img-fluid" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false" src={window.location.origin + '/youtube-logo.png'} style={{ width: '3%' }} />
            )
            resultHtmlTag.push(
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown" id='header-profile-dropdown' style={{ width : '10%'}}>
                    <li><a className="dropdown-item text-center" href="/">Back to search</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item text-center" onClick={() => { signOut(prop.oAuth) }}>Logout</button></li>
                </ul>
            )
            return resultHtmlTag;
        } else {
            let originalName = prop.user.items[0].snippet.title;
            let cutName = prop.user.items[0].snippet.title.substring(0, 25);
            resultHtmlTag.push(
                <p className='d-inline me-3'>Hello {originalName.length > 25 ? cutName + '...' : cutName}</p>
            )
            resultHtmlTag.push(
                <img className=" dropdown-toggle img-fluid" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false" src={prop.user.items[0].snippet.thumbnails.high.url} style={{ width: '3%' }} />
            )
            resultHtmlTag.push(
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown" id='header-profile-dropdown' style={{width : '10%'}}>
                    <li><a className="dropdown-item text-center" href="/">Back to search</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item text-center" onClick={() => { signOut(prop.oAuth) }}>Logout</button></li>
                </ul>
            )
            return resultHtmlTag;
        }
    }
    return (
        <React.Fragment>
            <div className="container mt-3" id='header-profile-container'>
                <nav className="navbar navbar-expand-md navbar-light  nav-fill">
                    <ul className="navbar-nav w-100">
                        <li className="nav-item dropdown text-end" id='header-profile' >
                            {displayProfile()}
                        </li>
                    </ul>
                </nav>
            </div>
        </React.Fragment>
    )
}

export default ProfileHeader;