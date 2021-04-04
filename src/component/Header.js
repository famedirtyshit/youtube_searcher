import React from 'react';
import '../style/Header.css'
import {Link} from 'react-router-dom';


function Header(prop) {

    const executeSearch = (query) => {
        return window.gapi.client.youtube.search.list({
            "part": [
                "snippet"
            ],
            "maxResults": 6,
            "q": query,
            "type": [
                "video"
            ]
        })
            .then(function (response) {
                // Handle the results here (response.result has the parsed body).
                prop.setQuery(query)
                prop.setSearchResult(response.result);
                prop.setSearchStatus(false);
            },
                function (err) { console.error("Execute error", err); prop.setSearchStatus(false); });
    }

    const search = async (e) => {
        var interval_id = window.setInterval(() => { }, 99999);
        for (var i = 0; i < interval_id; i++) {
            window.clearInterval(i);
        }
        let query = e.target.value;
        if (/\S/.test(query) && query !== null && query !== undefined) {
            let myInterval = setInterval(() => {
                if (e.target.value == '') {
                    clearInterval(myInterval);
                }
                else {
                    clearInterval(myInterval);
                    prop.setSearchStatus(true);
                    executeSearch(query);
                }
            }, 1000)
        }
    }

    const clearSearch = () => {
        document.getElementById('searchQuery').value = '';
        document.getElementById('searchQuery-mb').value = '';
        prop.setSearchResult(null);
    }

    const signIn = () => {
        return window.gapi.auth2.getAuthInstance()
            .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
            .then(function () { console.log("Sign-in successful"); prop.getProfile(); },
                function (err) { console.error("Error signing in", err); });
    }

    const signOut = (oAuth) => {
        oAuth.signOut();
        console.log('logout')
        prop.setUser(null);
    }

  

    const displayProfileDesktop =  () => {
        let resultHtmlTag = [];
        if(prop.user == null){
            resultHtmlTag.push(
                <p className='d-inline me-3'>Hello</p>
            )
            resultHtmlTag.push(
                <img className=" dropdown-toggle img-fluid" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false" src={window.location.origin + '/user-icon.png'} style={{ width: '10%' }} />
            )
            resultHtmlTag.push(
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ left: '25%' }}>
                    <li><button className="dropdown-item text-center" onClick={signIn}>Login</button></li>
                </ul>
            )
            return resultHtmlTag;
        }
        if (prop.user.pageInfo.totalResults == 0) {
                resultHtmlTag.push(
                    <p className='d-inline me-3'>Hello Guest</p>
                )
                resultHtmlTag.push(
                    <img className=" dropdown-toggle img-fluid" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false" src={window.location.origin + '/youtube-logo.png'} style={{ width: '10%' }} />
                )
                resultHtmlTag.push(
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ left: '25%' }}>
                        <li><Link className="dropdown-item text-center" to="/profile">Profile</Link></li>
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
                        aria-expanded="false" src={prop.user.items[0].snippet.thumbnails.high.url} style={{ width: '10%' }} />
                )
                resultHtmlTag.push(
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ left: '25%' }}>
                        <li><Link className="dropdown-item text-center" to="/profile">Profile</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item text-center" onClick={() => { signOut(prop.oAuth) }}>Logout</button></li>
                    </ul>
                )
                return resultHtmlTag;
        }
    }

    const displayProfileMobile = () => {
        let resultHtmlTag = [];
        if(prop.user == null){
            resultHtmlTag.push(
                <p className='d-inline m-0'>Hello</p>
            )
            resultHtmlTag.push(
                <div className="nav-item dropdown" id='profile-bar' style={{ left: '30%' }}>
                    <img className=" dropdown-toggle img-fluid" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false" src={window.location.origin + '/user-icon.png'} style={{ width: '20%' }} />
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown" id='header-dropdown-mobile' style={{ left: '-50%' }}>
                        <li><button className="dropdown-item text-center" onClick={signIn}>Login</button></li>
                    </ul>
                </div>
            )
            return resultHtmlTag;
        }
            if (prop.user.pageInfo.totalResults == 0) {
                resultHtmlTag.push(
                    <p className='d-inline m-0'>Hello Guest</p>
                )
                resultHtmlTag.push(
                    <div className="nav-item dropdown" id='profile-bar' style={{ left: '30%' }}>
                        <img className=" dropdown-toggle img-fluid" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false" src={window.location.origin + '/youtube-logo.png'} style={{ width: '20%' }} />
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown" id='header-dropdown-mobile' style={{ left: '-50%' }}>
                            <li><Link className="dropdown-item text-center" to="/profile">Profile</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item text-center" onClick={() => { signOut(prop.oAuth) }}>Logout</button></li>
                        </ul>
                    </div>
                )
                return resultHtmlTag;
            } else {
                let originalName = prop.user.items[0].snippet.title;
                let cutName = prop.user.items[0].snippet.title.substring(0, 25);
                resultHtmlTag.push(
                    <p className='d-inline m-0'>Hello {originalName.length > 25 ? cutName + '...' : cutName}</p>
                )
                resultHtmlTag.push(
                    <div className="nav-item dropdown" id='profile-bar' style={{ left: '30%' }}>
                        <img className=" dropdown-toggle img-fluid" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false" src={prop.user.items[0].snippet.thumbnails.high.url} style={{ width: '20%' }} />
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown" id='header-dropdown-mobile' style={{ left: '-50%' }}>
                            <li><Link className="dropdown-item text-center" to="/profile">Profile</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item text-center" onClick={() => { signOut(prop.oAuth) }}>Logout</button></li>
                        </ul>
                    </div>
                )
                return resultHtmlTag;
            }
        }
    


    return (
        <React.Fragment>
            <div className="container mt-3" id='header-desktop'>
                <nav className="navbar navbar-expand-md navbar-light  nav-fill">
                    <ul className="navbar-nav" id='navbar'>
                        <li className="nav-item" id='search-bar'>
                            <div className="position-relative">
                                <span id='search-icon' className='position-absolute top-0 start-0'><ion-icon name="search-circle-outline"></ion-icon></span>
                                <input className='form-control ps-5' type='text' placeholder='search here' id='searchQuery' onChange={search} />
                                <span id='clear-icon' className='position-absolute top-0 end-0'><ion-icon onClick={clearSearch} name="close-circle-outline"></ion-icon></span>
                            </div>
                        </li>
                        <li className="nav-item dropdown" id='profile-bar'>
                            {displayProfileDesktop()}
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="container mt-3" id='header-mobile'>
                <div className='row'>
                    <div className='col mb-2'>
                        <nav className="navbar">
                            <div className="container-fluid">
                                {displayProfileMobile()}
                            </div>
                        </nav>
                    </div>
                </div>
                <div className='row' id='search-bar-mobile'>
                    <div className='col'>
                        <div className="position-relative">
                            <span id='search-icon' className='position-absolute top-0 start-0'><ion-icon name="search-circle-outline"></ion-icon></span>
                            <input className='form-control ps-5' type='text' placeholder='search here' id='searchQuery-mb' onChange={search} />
                            <span id='clear-icon' className='position-absolute top-0 end-0'><ion-icon onClick={clearSearch} name="close-circle-outline"></ion-icon></span>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header;