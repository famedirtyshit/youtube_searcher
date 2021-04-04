import React, { useEffect, useState, useRef } from 'react';
import '../style/MySubscription.css';

function MySubscription(prop) {
    const [mySubscription, setMySubscription] = useState(null);

    let isSearch = useRef(false);

    useEffect(() => {
        if (isSearch.current == false) {
            if (prop.user) {
                searchMySubscription();
                isSearch.current = true;
            }
        }
    })

    const searchMySubscription = () => {
        return window.gapi.client.youtube.subscriptions.list({
          "part": [
            "snippet"
          ],
          "maxResults": 6,
          "mine": true
        })
            .then(function(response) {
                    setMySubscription(response.result);
                  },
                  function(err) { console.error("Execute error", err); });
      }



    const getMySubscription = () => {
        if (mySubscription.pageInfo.totalResults < 1) {
            return <div className="alert alert-warning position-relative text-center" role="alert" style={{ top: '55%', left: '55%' }}>
                you have no subscription
            </div>
        } else {
            let resultHtmlTag = [];
            mySubscription.items.map((e,index) => {
                let title = e.snippet.title.substring(0, 100);
                let description = e.snippet.description.substring(0, 200);
                resultHtmlTag.push(
                    <div className='col-md-6 w-100 my-3'>
                        <div className="card w-100 h-100" style={{ width: '18rem' }}>
                            <img src={e.snippet.thumbnails.high.url} className="card-img-top p-3 mx-auto d-block" id='mySubscription-img' />
                            <div className="card-body">
                                <h5 className="card-title mb-4">{title}</h5>
                                <p className="card-text">{description}</p>
                                <a onClick={() => seeChannel(index)} className="btn btn-primary" id={index}>see this channel</a>
                            </div>
                        </div>
                    </div>
                )
            })
            return resultHtmlTag;
        }
    }

    const seeChannel = (index) => {
        let id = mySubscription.items[index].snippet.resourceId.channelId;
        window.open('https://www.youtube.com/channel/'+id);
    }

    const goNextPage = () => {
        return window.gapi.client.youtube.subscriptions.list({
            "part": [
              "snippet"
            ],
            "maxResults": 6,
            "mine": true,
            "pageToken": mySubscription.nextPageToken
          })
              .then(function(response) {
                      setMySubscription(response.result);
                    },
                    function(err) { console.error("Execute error", err); });
    }

    const goPrevPage = () => {
        return window.gapi.client.youtube.subscriptions.list({
            "part": [
              "snippet"
            ],
            "maxResults": 6,
            "mine": true,
            "pageToken": mySubscription.prevPageToken
          })
              .then(function(response) {
                      setMySubscription(response.result);
                    },
                    function(err) { console.error("Execute error", err); });
    }

    return (
        <React.Fragment>
            <section className='profile-subscription-container'>
                {mySubscription != null ? getMySubscription() : null}
            </section>
                <div className='container'>
                    <ul className="pagination justify-content-center">
                        {mySubscription == null || mySubscription == undefined || mySubscription.pageInfo.totalResults < 1 ? null : mySubscription.prevPageToken == undefined ?
                            <li className="page-item disabled">
                                <button className="page-link" id='previous'>Previous</button>
                            </li>
                            :
                            <li className="page-item">
                                <button className="page-link" onClick={goPrevPage} id='previous'>Previous</button>
                            </li>
                        }
                        {mySubscription == null || mySubscription == undefined || mySubscription.pageInfo.totalResults < 1 ? null : mySubscription.nextPageToken == undefined ?
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

export default MySubscription;