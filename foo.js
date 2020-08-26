import React, { useEffect } from "react";
import InputSearch from "../components/inputSearch";
import { Link } from "react-router-dom";
import api from "../api/index";

/**
 * Input search component which is used in both header and search module
 * @param {*} props // its a function component so using props via params
 */
// annie changes and some features added
const Search = (props) => {
    let cardList;
    if (props.searchAPiResult.data && props.searchAPiResult.data.length > 0) {
        cardList = (
            <div className="card-container search-card-list">
                {props.searchAPiResult.data.map((data, index) => {
                    return (
                        <div className="card-box" key={`autosearch-${index}`}>
                            <div className="card-inner">
                                <div className="card-head">
                                    <div className="ch-left">
                                        <h4 className="card-title">
                                            {data.name}
                                        </h4>
                                        <div className="card-tag">
                                            {data.tags.join(", ")}
                                        </div>
                                    </div>
                                    <div className="ch-right">
                                        <div>
                                            <img
                                                className="img-responsive"
                                                src="/img/rating-star.png"
                                            />
                                        </div>
                                        <div className="fav-icon">
                                            <img
                                                className="img-responsive"
                                                src="/img/wishlist.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-img">
                                    <img
                                        src={data.picture}
                                        alt={data.name}
                                        title={data.name}
                                    />
                                </div>
                                <div className="card-content">
                                    <div className="card-price">
                                        {"$" + data.price}
                                    </div>
                                    <button className="text-uppercase">
                                        Add to bag
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } else if (
        !props.searchAPiResult.data ||
        (props.searchAPiResult.data && props.searchAPiResult.data.length <= 0)
    ) {
        cardList = <div className="no-result">No Data Found</div>;
    }

    const getSearchData = (queryparams) => {
        if (Object.entries(queryparams).length > 0 && queryparams.searchkey) {
            api.get({ searchValue: queryparams.searchkey })
                .then((result) => {
                    props.searchAPiUpdate({
                        showAutoSuggest: false,
                        searchAPiResult: {
                            data: result.data,
                            statusCode: result.status,
                        },
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    function parseQuery(queryString) {
        var query = {};
        var pairs = (queryString[0] === "?"
            ? queryString.substr(1)
            : queryString
        ).split("&");
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split("=");
            query[decodeURIComponent(pair[0])] = decodeURIComponent(
                pair[1] || ""
            );
        }
        return query;
    }
    useEffect(() => {
        getSearchData(parseQuery(props.history.location.hash.split("?").pop()));
        props.searchAPiUpdate({
            showingSearch: false,
            showAutoSuggest: false,
        });
    }, []);

    return (
        <div>
            <div className="search-block-lg">
                <InputSearch
                    searchAPiUpdate={props.searchAPiUpdate}
                    autoSearchKey={props.autoSearchKey}
                    className="search-ip-lg"
                    inputSize="lg"
                />
            </div>
            <div className="search-result text-uppercase">
                <Link className="back-to-home" to="/">
                    back to Home
                </Link>
                Search Results
            </div>
            {cardList}
        </div>
    );
};

export default Search;

