import React from 'react';
import { useLocation} from "react-router-dom";

function VideoDetail(prop) {
    let location = useLocation();
    let video = null;
    try{
    video = location.state.video;
    }catch(e){
        console.log(e)
    }
    if(video!=null){
        console.log('pass')
    }else{
        console.log('fail')
        window.location.href = window.location.origin;
    }
    return (
        <React.Fragment>
            <div className='container mt-5' id='video-detail-container'>
                <div className="row mb-5" id='row-grid'>
                    <div className='col-md-12 my-3'>
                        <div className="card w-100 h-100" style={{ width: '18rem' }}>
                            <img src={video.snippet.thumbnails.high.url} className="card-img-top p-3 mx-auto" style={{ width: '70%' }} />
                            <div className="card-body">
                                <h5 className="card-title text-start mb-5">{video.snippet.title}</h5>
                                <p className="card-text text-start mb-3">{video.snippet.description}</p>
                                <p className="card-text text-start mb-3">publish by : {video.snippet.channelTitle}</p>
                                <a onClick={()=>window.open('https://www.youtube.com/watch?v='+video.id.videoId)} className="btn btn-primary" >watch video</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default VideoDetail;