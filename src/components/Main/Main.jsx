import React, {useEffect, useState} from 'react';
import './main.less'
import {useDispatch, useSelector} from "react-redux";
import {getRepos} from "../../redux/actions/reposActions";
import Repo from "./Repo/Repo";
import {setCurrentPage} from "../../redux/reducers/reposReducer";
import {createPages} from "../../utils/pagesCreator";

const Main = () => {
    const dispatch = useDispatch()
    const repos = useSelector(state => state.repos.items)
    const isFetching = useSelector(state => state.repos.isFetching)
    const currentPage = useSelector(state => state.repos.currentPage)
    const totalCount = useSelector(state => state.repos.totalCount)
    const perPage = useSelector(state => state.repos.perPage)
    const [searchValue, setSearchValue] = useState(' ')
    const [pages, setPages] = useState([1,2,3,4,5])
    const pagesCount = Math.ceil(totalCount/perPage)
    createPages(pages, pagesCount, currentPage)
    useEffect(() => {
        dispatch(getRepos(searchValue, currentPage, perPage))
    }, [currentPage])
    const searchHandler = () => {
        dispatch(setCurrentPage(1))
        dispatch(getRepos(searchValue, currentPage, perPage))
    }
    return (
        <div>
            <div className="search">
                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Input repo name" type="text"/>
                <button onClick={() => searchHandler()} className="search-btn">Search</button>
            </div>
            {
                isFetching ?
                    <div className="fetching">

                    </div>
                : repos.map(repo => (
                <Repo key={repo.id} repo={repo}/>
            ))}
            <div className="pages">
                {pages.map((el,idx) => (
                    <span
                        key={idx}
                        className={currentPage == el ? "current-page" : "page"}
                        onClick={() => dispatch(setCurrentPage(el))}>
                        {el}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Main;