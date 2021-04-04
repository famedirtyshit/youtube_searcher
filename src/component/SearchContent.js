import React, { useState, useEffect } from 'react';
import '../style/SearchContent.css';
import { useHistory } from 'react-router-dom';


function SearchContent(prop) {
    let history = useHistory();

    const displayResult = () => {
        let resultHtmlTag = [];
        prop.searchResult.items.map((e, index) => {
            let title = e.snippet.title.substring(0, 100);
            let description = e.snippet.description.substring(0, 200);
            resultHtmlTag.push(
                <div className='col-md-4 my-3'>
                    <div className="card w-100 h-100" style={{ width: '18rem'}}>
                        <img src={e.snippet.thumbnails.high.url} className="card-img-top p-3" style={{ width: '100%' }} />
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


    const goNextPage = () => {
        return window.gapi.client.youtube.search.list({
            "part": [
                "snippet"
            ],
            "maxResults": 6,
            "q": prop.query,
            pageToken: prop.searchResult.nextPageToken,
            "type": [
                "video"
            ]
        })
            .then(function (response) {
                // Handle the results here (response.result has the parsed body).
                prop.setSearchResult(response.result);
                prop.setSearchStatus(false);
            },
                function (err) { console.error("Execute error", err); prop.setSearchStatus(false); });
    }

    const goPrevPage = () => {
        return window.gapi.client.youtube.search.list({
            "part": [
                "snippet"
            ],
            "maxResults": 6,
            "q": prop.query,
            pageToken: prop.searchResult.prevPageToken,
            "type": [
                "video"
            ]
        })
            .then(function (response) {
                // Handle the results here (response.result has the parsed body).
                prop.setSearchResult(response.result);
                prop.setSearchStatus(false);
            },
                function (err) { console.error("Execute error", err); prop.setSearchStatus(false); });
    }

    const seeVideoDetail = (index) => {
        history.push({
            pathname: "/videoDetail",
            state: {
                video: prop.searchResult.items[index]
            }
        });
    }

    return (
        <React.Fragment>
            <div className='container mt-5'>
                <div className="row mb-5" id='row-grid'>
                    {prop.searchResult == null || prop.searchStatus === true ?
                        null
                        :
                        prop.searchResult.items.length > 0 ?
                            displayResult()
                            :
                            <div className='container mt-5'>
                                <div className="alert alert-warning text-center w-25 position-relative" id='no-result-warning' role="alert">
                                    no result
                                </div>
                            </div>
                    }
                </div>
                <div className='container'>
                    <ul className="pagination justify-content-center">
                        {prop.searchResult == null ? null : prop.searchResult.prevPageToken == undefined ?
                            <li className="page-item disabled">
                                <button className="page-link" id='previous'>Previous</button>
                            </li>
                            :
                            <li className="page-item">
                                <button className="page-link" onClick={goPrevPage} id='previous'>Previous</button>
                            </li>
                        }
                        {prop.searchResult == null ? null : prop.searchResult.nextPageToken == undefined ?
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
            </div>
            {prop.searchStatus == false ?
                null
                :
                <div className="spinner-border text-primary" id='search-loader' role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            }
        </React.Fragment>
    )
}

export default SearchContent