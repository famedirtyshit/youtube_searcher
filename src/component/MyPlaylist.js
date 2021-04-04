import React, { useEffect, useState, useRef } from 'react';
import '../style/MyPlayList.css';

function MyPlaylist(prop) {
    const [myPlayList, setMyPlayList] = useState(null);

    let isSearch = useRef(false);

    useEffect(() => {
        if (isSearch.current == false) {
            if (prop.user.pageInfo.totalResults != 0) {
                searchMyPlayList();
                isSearch.current = true;
            }
        }
    })

    const searchMyPlayList = () => {
        return window.gapi.client.youtube.playlists.list({
          "part": [
            "snippet"
          ],
          "maxResults": 6,
          "mine": true
        })
            .then(function(response) {
                    setMyPlayList(response.result);
                  },
                  function(err) { console.error("Execute error", err); });
      }



    const getMyPlayList = () => {
        if (myPlayList.pageInfo.totalResults < 1) {
            return <div className="alert alert-warning position-relative text-center" role="alert" style={{ top: '55%', left: '55%' }}>
                you have no own playlist
            </div>
        } else {
            let resultHtmlTag = [];
            myPlayList.items.map((e,index) => {
                let title = e.snippet.title.substring(0, 100);
                let description = e.snippet.description.substring(0, 200);
                resultHtmlTag.push(
                    <div className='col-md-6 w-100 my-3'>
                        <div className="card w-100 h-100" style={{ width: '18rem' }}>
                            <img src={e.snippet.thumbnails.high.url} className="card-img-top p-3 mx-auto d-block" id='myPlayList-img' />
                            <div className="card-body">
                                <h5 className="card-title mb-4">{title}</h5>
                                <p className="card-text">{description}</p>
                                <a onClick={() => seePlayList(index)} className="btn btn-primary" id={index}>see playlist</a>
                            </div>
                        </div>
                    </div>
                )
            })
            return resultHtmlTag;
        }
    }

    const seePlayList = (index) => {
        let id = myPlayList.items[index].id
        window.open('https://www.youtube.com/playlist?list='+id);
    }

    const goNextPage = () => {
        return window.gapi.client.youtube.playlists.list({
            "part": [
              "snippet"
            ],
            "maxResults": 6,
            "mine": true,
            "pageToken": myPlayList.nextPageToken
          })
              .then(function(response) {
                      setMyPlayList(response.result);
                    },
                    function(err) { console.error("Execute error", err); });
    }

    const goPrevPage = () => {
        return window.gapi.client.youtube.playlists.list({
            "part": [
              "snippet"
            ],
            "maxResults": 6,
            "mine": true,
            "pageToken": myPlayList.prevPageToken
          })
              .then(function(response) {
                      setMyPlayList(response.result);
                    },
                    function(err) { console.error("Execute error", err); });
    }

    return (
        <React.Fragment>
            <section className='profile-playlist-container'>
                {prop.user.pageInfo.totalResults == 0 ? <div className="alert alert-warning position-relative text-center" role="alert" style={{ top: '55%', left: '55%' }}>
                    you have no channel
            </div> :
                    myPlayList != null ? getMyPlayList() : null}
            </section>
                <div className='container'>
                    <ul className="pagination justify-content-center">
                        {myPlayList == null || myPlayList == undefined || myPlayList.pageInfo.totalResults < 1 ? null : myPlayList.prevPageToken == undefined ?
                            <li className="page-item disabled">
                                <button className="page-link" id='previous'>Previous</button>
                            </li>
                            :
                            <li className="page-item">
                                <button className="page-link" onClick={goPrevPage} id='previous'>Previous</button>
                            </li>
                        }
                        {myPlayList == null || myPlayList == undefined || myPlayList.pageInfo.totalResults < 1 ? null : myPlayList.nextPageToken == undefined ?
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

export default MyPlaylist;