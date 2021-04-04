import React, { useState } from 'react';
import SearchContent from './SearchContent';
import Header from './Header';
import VideoDetail from './VideoDetail';
import Profile from './Profile';
import LoadingPage from './LoadingPage';
import {
    Route,
    Switch
} from "react-router-dom";

function Search(prop) {
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchStatus, setSearchStatus] = useState(false);

    return (
        <React.Fragment>
                <Switch>
                    <Route exact path='/'>
                        <Header setSearchResult={setSearchResult} setSearchStatus={setSearchStatus} setQuery={setQuery} oAuth={prop.oAuth} setOAuth={prop.setOAuth}
                            user={prop.user} setUser={prop.setUser} getProfile={prop.getProfile}/>
                        <SearchContent query={query} setQuery={setQuery} searchResult={searchResult} setSearchResult={setSearchResult} searchStatus={searchStatus} setSearchStatus={setSearchStatus} />
                    </Route>
                    <Route exact path='/videoDetail'>
                        <Header setSearchResult={setSearchResult} setSearchStatus={setSearchStatus} setQuery={setQuery} oAuth={prop.oAuth} setOAuth={prop.setOAuth}
                            user={prop.user} setUser={prop.setUser} getProfile={prop.getProfile}/>
                        <VideoDetail searchResult={searchResult} />
                    </Route>
                    <Route path='/profile'>
                        {prop.user && prop.oAuth && prop.setUser?<Profile user={prop.user} oAuth={prop.oAuth} setUser={prop.setUser}/>:<LoadingPage checkSignIn={true}/>}
                    </Route>
                </Switch>
        </React.Fragment>
    )

}

export default Search