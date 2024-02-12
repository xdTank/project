import React, { FC, useEffect } from "react";
import User from "./User";
import Paginator from '../common/Paginator/Paginator'
import { UsersSearchForm } from "./UsersSearchForm"
import { FilterType, requestUsers } from "../../redux/usersReducer";
import { useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from "../../redux/usersSelectors";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";


type PropsType = {
}
type QueryParamsType = {
    entries(): Iterable<readonly [PropertyKey, any]>; term?: string; page?: string; friend?: string
}


export const Users: FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch<any>()
    const { search } = useLocation();
    const navigate = useNavigate();

    
    // useQueryParams
    useEffect(() => {
        const searchParams = new URLSearchParams(search.substring(1)) as QueryParamsType
        const parsed = Object.fromEntries(searchParams.entries())

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)


        if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }

        switch (parsed.friend) {
            case "null":
                actualFilter = { ...actualFilter, friend: null }
                break;
            case "true":
                actualFilter = { ...actualFilter, friend: true }
                break;
            case "false":
                actualFilter = { ...actualFilter, friend: false }
                break;
        }
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [search, dispatch, currentPage, pageSize, filter])


    useEffect(() => {
        const searchParams = new URLSearchParams();

        if (!!filter.term) searchParams.append('term', filter.term)
        if (filter.friend !== null) searchParams.append('friend', String(filter.friend))
        if (currentPage !== 1) searchParams.append('page', String(currentPage))

        navigate({
            search: searchParams.toString()
        })
    }, [filter, currentPage, navigate]);

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }
    const follow = (userId: number) => {
        dispatch(follow(userId))
    }

    return <div>
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
        </div>
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
        <div>
            {
                users.map(u => <User user={u}
                    followingInProgress={followingInProgress}
                    key={u.id}
                    unfollow={unfollow}
                    follow={follow}
                />

                )

            }
        </div>
    </div>
}


