import React from 'react';

function LoadingPage(prop) {

    if (prop.checkSignIn != undefined) {
        window.gapi.load("client:auth2", async () => {
            let oAuthResult = await window.gapi.auth2.init({ client_id: process.env.REACT_APP_CLIENT_ID });
            if (oAuthResult.isSignedIn.fe == false) {
                window.location.href = window.location.origin;
            }
        })
    }

    return (
        <React.Fragment>
            <div className="spinner-border" role="status" id='loader'>
                <span className="visually-hidden">Loading...</span>
            </div>
        </React.Fragment>
    )
}

export default LoadingPage;