import React,{useState} from 'react';
import '../style/ProfileContent.css';
import MyVideo from './MyVideo';
import MyPlaylist from './MyPlaylist';
import MySubscription from './MySubscription';
import LoadingPage from './LoadingPage';

function ProfileContent(prop) {

    const [selectTab,setSelectTab] = useState('video');

    const selectMyVideo = () => {
        setSelectTab('video');
    }
    const selectMyPlayList = () => {
        setSelectTab('playlist');
    }
    const selectMySubscription = () => {
        setSelectTab('subscription');
    }

    return (
        <React.Fragment>
            <div className='container'>
                <section className='profile-content-title'>
                    <button className='btn-title' onClick={selectMyVideo} style={selectTab=='video'?{borderBottom : '3px solid #ED5C4D' , color : 'rgba(39, 50, 83, 1)'}:null}>My Video</button>
                    <button className='btn-title' onClick={selectMyPlayList} style={selectTab=='playlist'?{borderBottom : '3px solid #ED5C4D' , color : 'rgba(39, 50, 83, 1)'}:null}>My Playlist</button>
                    <button className='btn-title' onClick={selectMySubscription} style={selectTab=='subscription'?{borderBottom : '3px solid #ED5C4D' , color : 'rgba(39, 50, 83, 1)'}:null}>My Subscription</button>
                </section>
                    {selectTab == 'video'?prop.user?<MyVideo user={prop.user}/>:<LoadingPage />:null}
                    {selectTab == 'playlist'?prop.user?<MyPlaylist user={prop.user}/>:<LoadingPage />:null}
                    {selectTab == 'subscription'?prop.user?<MySubscription user={prop.user}/>:<LoadingPage />:null}
            </div>
        </React.Fragment>
    )
}

export default ProfileContent;