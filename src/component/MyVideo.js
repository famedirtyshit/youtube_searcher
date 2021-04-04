import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import '../style/MyVideo.css';

function MyVideo(prop) {
    const [myVideo, setMyVideo] = useState(null);
    const [page, setPage] = useState(1);
    const [pageToken, setPageToken] = useState(new Map());

    let isSearch = useRef(false);
    let history = useHistory();

    useEffect(() => {
        if (isSearch.current == false) {
            if (prop.user.pageInfo.totalResults != 0) {
                searchMyVideo();
                isSearch.current = true;
            }
        }
    })

    const searchMyVideo = () => {
        return window.gapi.client.youtube.search.list({
            "part": [
                "snippet"
            ],
            "forMine": true,
            "maxResults": 6,
            "type": [
                "video"
            ]
        })
            .then(function (response) {
                setMyVideo(response.result);
                setPageToken(pageToken.set(1, ''));
            },
                function (err) { console.error("Execute error", err); });
    }



    const getMyVideo = () => {
        if (myVideo.pageInfo.totalResults < 1) {
            return <div className="alert alert-warning position-relative text-center" role="alert" style={{ top: '55%', left: '55%' }}>
                you have no own video
            </div>
        } else {
            let resultHtmlTag = [];
            myVideo.items.map((e, index) => {
                let title = e.snippet.title.substring(0, 100);
                let description = e.snippet.description.substring(0, 200);
                resultHtmlTag.push(
                    <div className='col-md-6 w-100 my-3'>
                        <div className="card w-100 h-100" style={{ width: '18rem' }}>
                            <img src={e.snippet.thumbnails.high.url} className="card-img-top p-3 mx-auto d-block" id='myVideo-img' />
                            <div className="card-body">
                                <h5 className="card-title mb-4">{title}</h5>
                                <p className="card-text">{description}</p>
                                <a onClick={() => seeVideoDetail(index)} className="btn btn-primary" id={index}>video detail</a>
                            </div>
                        </div>
                    </div>
                )
            })
            return resultHtmlTag;
        }
    }

    const seeVideoDetail = (index) => {
        history.push({
            pathname: "/videoDetail",
            state: {
                video: myVideo.items[index]
            }
        });
    }

    const goNextPage = () => {
        let token = myVideo.nextPageToken;
        let curPageNum = page + 1;
        return window.gapi.client.youtube.search.list({
            "part": [
                "snippet"
            ],
            "forMine": true,
            "maxResults": 6,
            "pageToken": myVideo.nextPageToken,
            "type": [
                "video"
            ]
        })
            .then(function (response) {
                setMyVideo(response.result);
                setPage(curPageNum);
                setPageToken(pageToken.set(curPageNum, token));
            },
                function (err) { console.error("Execute error", err); });
    }

    const goPrevPage = () => {
        let prevPageNum = page - 1;
        return window.gapi.client.youtube.search.list({
            "part": [
                "snippet"
            ],
            "forMine": true,
            "maxResults": 6,
            "pageToken": pageToken.get(prevPageNum),
            "type": [
                "video"
            ]
        })
            .then(function (response) {
                setMyVideo(response.result);
                setPage(prevPageNum);
            },
                function (err) { console.error("Execute error", err); });
    }

    return (
        <React.Fragment>
            <section className='profile-video-container'>
                {prop.user.pageInfo.totalResults == 0 ? <div className="alert alert-warning position-relative text-center" role="alert" style={{ top: '55%', left: '55%' }}>
                    you have no channel
            </div> :
                    myVideo != null ? getMyVideo() : null}
            </section>
                <div className='container'>
                    <ul className="pagination justify-content-center">
                        {myVideo == null || myVideo == undefined || myVideo.pageInfo.totalResults < 1? null : page <= 1 ?
                            <li className="page-item disabled">
                                <button className="page-link" id='previous'>Previous</button>
                            </li>
                            :
                            <li className="page-item">
                                <button className="page-link" onClick={goPrevPage} id='previous'>Previous</button>
                            </li>
                        }
                        {myVideo == null || myVideo == undefined || myVideo.pageInfo.totalResults < 1? null : myVideo.nextPageToken == undefined ?
                            <li className="page-item disabled">
                                <button className="page-link" id='next'>Next</button>
                            </li>
                            :
                            <li className="page-item">
                                <button className="page-link" onClickCapture={goNextPage} id='next'>Next</button>
                            </li>
                        }
                    </ul>
                </div>
        </React.Fragment>
    )
}

export default MyVideo;