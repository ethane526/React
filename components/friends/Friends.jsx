import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import * as friendsService from "../../services/friendsService";
import FriendsTemp from "./FriendsTemp";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import toastr from "toastr";
import debug from "sabio-debug";

function Friends() {
  const _logger = debug.extend("Friends");
  const [pageData, setPageData] = useState({
    arrayOfPeople: [],
    peopleComponenets: [],
  });

  const [toggle, setToggle] = useState(true);

  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalCount: 0,
    pageSize: 4,
  });

  const [searchFormData, setSearchFormData] = useState({ search: "" });

  const onPageChange = (page) => {
    console.log(page);
    setPaginationData((prevState) => {
      const pd = { ...prevState };
      pd.currentPage = page;
      return pd;
    });
  };

  useEffect(() => {
    let pageIndex = paginationData.currentPage - 1;
    if (!searchFormData.search) {
      friendsService
        .getFriends(pageIndex, paginationData.pageSize)
        .then(onGetFriendsSuccess)
        .catch(onGetFriendsError);
    } else {
      friendsService
        .searchFriend(pageIndex, paginationData.pageSize, searchFormData.search)
        .then(onSearchSuccess)
        .catch(onSearchError);
    }
  }, [paginationData.currentPage]);

  const onGetFriendsSuccess = (response) => {
    _logger("onGetFriendsSuccess", response);
    let newPeepArray = response.data.item.pagedItems;
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfPeople = newPeepArray;
      pd.peopleComponenets = newPeepArray.map(mappingFriends);
      return pd;
    });

    setPaginationData((prevState) => {
      const pd = { ...prevState };
      pd.totalCount = response.data.item.totalCount;
      return pd;
    });
  };

  const onGetFriendsError = (err) => {
    console.error("onGetFriendsError", err);
  };

  const onSearchClick = (e) => {
    e.preventDefault();
    let pageIndex = paginationData.currentPage - 1;
    let pageSize = paginationData.pageSize;
    let searchQuery = searchFormData.search;
    if (!searchQuery) {
      friendsService
        .getFriends(pageIndex, pageSize)
        .then(onGetFriendsSuccess)
        .catch(onGetFriendsError);
    } else {
      friendsService
        .searchFriend(pageIndex, pageSize, searchQuery)
        .then(onSearchSuccess)
        .catch(onSearchError);
    }
  };

  const searchData = (event) => {
    const target = event.target;
    const newFormValue = target.value;
    const nameOfField = target.name;
    setSearchFormData((prevState) => {
      const newFormObject = {
        ...prevState,
      };
      newFormObject[nameOfField] = newFormValue;
      return newFormObject;
    });
  };

  const onSearchSuccess = (response) => {
    _logger("onSearchSuccess", response);
    let newPeepArray = response.data.item.pagedItems;
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfPeople = newPeepArray;
      pd.peopleComponenets = newPeepArray.map(mappingFriends);
      return pd;
    });
    setPaginationData((prevState) => {
      const pd = { ...prevState };
      pd.totalCount = response.data.item.totalCount;
      return pd;
    });
  };

  const onSearchError = (err) => {
    console.error("onSearchError", err);
    toastr.error(err);
  };

  const mappingFriends = (aPerson) => {
    return (
      <FriendsTemp
        friends={aPerson}
        key={`listA - ${aPerson.id}`}
        onPersonDelClicked={onDeleteClicked}
      />
    );
  };

  const toggleContent = () => {
    setToggle(!toggle);
  };

  const onDeleteClicked = useCallback((myFriend, e) => {
    console.log(myFriend.id, { myFriend, e });
    const handler = getDeleteSuccessHandler(myFriend.id); //currying the data
    friendsService.deleteFriend(myFriend.id).then(handler).catch(onDeleteError);
  }, []);

  const getDeleteSuccessHandler = (idToBeDeleted) => {
    console.log("getDeleteSuccessHandler", idToBeDeleted);
    return () => {
      console.log("onDeleteSuccess", idToBeDeleted);
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.arrayOfPeople = [...pd.arrayOfPeople];
        const idxOf = pd.arrayOfPeople.findIndex((friend) =>
          friend.id === idToBeDeleted ? true : false
        );
        if (idxOf >= 0) {
          pd.arrayOfPeople.splice(idxOf, 1);
          pd.peopleComponenets.map(mappingFriends);
        }
        return pd;
      });
    };
  };

  const onDeleteError = (err) => {
    console.error("onDeleteError", err);
  };

  return (
    <React.Fragment>
      <div className="container">
        <h1>Friends</h1>
        <div className="row">
          <div className="col-md-6 mb-3">
            <button
              type="button"
              name="btnToggle"
              className="btn me-3 mb-3 btn-dark bg-gradient text-warning"
              onClick={toggleContent}
            >
              {!toggle ? "Show Content" : "Hide Content"}
            </button>
            <Link
              to="/friends/addfriend"
              type="button"
              name="addFriend"
              className="btn btn-dark bg-gradient text-warning mb-3"
            >
              Add Friend
            </Link>
            <Pagination
              onChange={onPageChange}
              current={paginationData.currentPage}
              total={paginationData.totalCount}
              defaultPageSize={paginationData.pageSize}
              locale={locale}
            />
          </div>
          <div className="col-md-6">
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="search"
                value={searchFormData.search}
                onChange={searchData}
              />
              <button
                className="btn btn-dark text-warning"
                type="submit"
                onClick={onSearchClick}
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          {toggle && pageData.arrayOfPeople.map(mappingFriends)}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Friends;
