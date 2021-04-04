import React, { useEffect, useState } from 'react';
import Search from './Search';
import '../style/PreLoad.css';
import LoadingPage from './LoadingPage';

function PreLoad(prop) {
    const [oAuth, setOAuth] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(async () => {
        await initYoutubeApi();
        setIsLoaded(true);
    })

    const checkLogin = async (oAuth) => {
        if (oAuth.isSignedIn.fe == true) {
            if (user == null) {
                await getProfile();
            }
        }
        return true;
    }

    const loadClient = () => {
        window.gapi.client.setApiKey(process.env.REACT_APP_API_KEY);
        return window.gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
            .then(function () { console.log("GAPI client loaded for API"); },
                function (err) { console.error("Error loading GAPI client for API", err); });
    }

    const getProfile = () => {
        return window.gapi.client.youtube.channels.list({
            "part": [
                "snippet"
            ],
            "mine": true
        })
            .then(function (response) {
                setUser(response.result)
            },
                function (err) { console.error("Execute error", err); });
    }


    const initYoutubeApi = async () => {
        let oAuthResult = null;
        if (oAuth == null) {
            window.gapi.load("client:auth2", async () => {
                oAuthResult = await window.gapi.auth2.init({ client_id: process.env.REACT_APP_CLIENT_ID });
                await loadClient();
                setOAuth(oAuthResult);
                await checkLogin(oAuthResult)
            });
        }
    }

    return (
        <React.Fragment>
            {isLoaded === true ? <Search oAuth={oAuth} setOAuth={setOAuth} user={user} setUser={setUser} getProfile={getProfile} /> :
                <LoadingPage />
            }
        </React.Fragment>
    )
}

export default PreLoad;