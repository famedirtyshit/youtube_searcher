import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import LoadingPage from './LoadingPage';

function Profile(prop) {

    return (
        <React.Fragment>
            {prop.user && prop.oAuth && prop.setUser ?<ProfileHeader user={prop.user} setUser={prop.setUser} oAuth={prop.oAuth} />:<LoadingPage />}
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md'>
                        <img src={prop.user != null ? prop.user.pageInfo.totalResults == 0
                            ? window.location.origin + '/youtube-logo.png' : prop.user.items[0].snippet.thumbnails.high.url :
                            null} className="img-fluid mx-auto d-block" style={{ width: '10%', borderRadius: '50%' }} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md'>
                        <p className='text-center'>{prop.user.pageInfo.totalResults != 0 ?prop.user.items[0].snippet.title.substring(0, 25):'Guest'}</p>
                    </div>
                </div>
                {prop.user ?<ProfileContent user={prop.user}/>:<LoadingPage />}
            </div>
        </React.Fragment>
    )
}

export default Profile;