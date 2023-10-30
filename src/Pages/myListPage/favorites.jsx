

import sprite from "./sprite.svg";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React, { useEffect, useState } from "react";
import * as S from "./favoritesStyle";
import { delMyTracks, getMyTracks, getTracks } from "../../api";
import { Link } from "react-router-dom";
import { Nav } from "../../components/Navmenu/NavMenu";
import { Search } from "../../components/Search/Search";
import { Tracks } from "../../components/Tracs/tracs";
import { Filter } from "../../components/Filter/FilterBlock";
import { Sidebar } from "../../components/Sidebar/SideBar";


import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTrackRedux, setMyTracksRedux } from "../../store/reducers/playerSlice";


let errorText = null;
let href;
let tracks = [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8" },
    { id: "9" },
    { id: "10" },
    { id: "11" },
    { id: "12" },
    { id: "13" },
    { id: "14" },
    { id: "15" },
    { id: "16" },
    { id: "17" },
    { id: "18" },
    { id: "19" },
    { id: "20" },
    { id: "21" },
];
export function Favorites({ user, setUser, playerOn, setPlayerOn, listName, setListName }) {
const [contentVisible, setContentVisible] = useState(false);
console.log(playerOn)

    //redux
const activeTrackRedux = useSelector(state => state.track.activeTrack)
const playerOnDot = useSelector(state => state.track.playerOn)
const myTracksRedux = useSelector(state => state.track.myTracks)

console.log(playerOn)

const dispatch = useDispatch();

    useEffect(() => {
        setListName('Мои треки')
        getMyTracks()
            .then((data) => {
                errorText = null;
                tracks = data;
                setContentVisible(true);
                console.log(tracks)
                dispatch(setMyTracksRedux({ data }))
                return tracks;
            })
            .catch((error) => {
                errorText = error.message;
                setContentVisible(true);
                tracks = [];
                return errorText;
            }).then((data) => {
            });
    }, []);
    return (
        <S.Wrapper>
            <S.Container>
                <S.Main>
                    <Nav setUser={setUser} setPlayerOn={setPlayerOn} />
                    <S.MainCenterBlock>
                        <Search />
                        <Tracks listName={listName} setListName={setListName} />
                        <Filter />
                        <S.FavoritesBlockContent>
                            <S.CentralBlock_playlistTitle>
                                <S.PlaylistTitleCol01>Трек</S.PlaylistTitleCol01>
                                <S.PlaylistTitleCol02>ИСПОЛНИТЕЛЬ</S.PlaylistTitleCol02>
                                <S.PlaylistTitleCol03>АЛЬБОМ</S.PlaylistTitleCol03>
                                <S.PlaylistTitleCol04>
                                    <S.Playlist__titleSvg alt="time">
                                        <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
                                    </S.Playlist__titleSvg>
                                </S.PlaylistTitleCol04>
                            </S.CentralBlock_playlistTitle>
                            <S.CentralBlockContentPlaylist>
                                <div style={{ color: "red" }}>
                                    <h1>
                                        {errorText !== null
                                            ? `Ошибка: ${errorText}, попробуйте позже`
                                            : null}
                                    </h1>
                                </div>

                                {tracks.map((track) => {
                                    return (
                                        <S.Playlist__item key={track.id} >
                                            <S.Playlist__track
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setPlayerOn('');
                                                    dispatch(setTrackRedux({ track, tracks }))
                                                }}
                                            >
                                                <S.Track__title
                                                >
                                                    <S.Track__titleImage >
                                                        {contentVisible ? (<>
                                                            <S.Playlist__titleSvg_dot_Pause style={track.id === activeTrackRedux.id & playerOnDot === false ? {
                                                                display: 'block'
                                                            } : { display: 'none' }}></S.Playlist__titleSvg_dot_Pause>
                                                            <S.Playlist__titleSvg_dot style={track.id === activeTrackRedux.id & playerOnDot === true ? { display: 'block' } : { display: 'none' }}></S.Playlist__titleSvg_dot>

                                                            <S.Track__titleSvg style={track.id === activeTrackRedux.id ? {
                                                                display: 'none'
                                                            } : {}} alt="music">
                                                                <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                                                                <use href={`${sprite}#icon-note`} />
                                                            </S.Track__titleSvg>
                                                        </>
                                                        ) : (
                                                            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                                                <S.Skeleton_square />
                                                            </SkeletonTheme>
                                                        )}
                                                    </S.Track__titleImage>
                                                    <S.Track_titleText>
                                                        <S.Track__titleLink
                                                            onClick={() => {
                                                                console.log("player load ?");
                                                            }}
                                                            className="trackNameLink"
                                                            href="http://"
                                                        >
                                                            {contentVisible ? (
                                                                <span>{track.name}</span>
                                                            ) : (
                                                                <SkeletonTheme
                                                                    baseColor="#202020"
                                                                    highlightColor="#444"
                                                                >
                                                                    <S.Skeleton_line />
                                                                </SkeletonTheme>
                                                            )}
                                                            <S.Track__titleSpan></S.Track__titleSpan>
                                                        </S.Track__titleLink>
                                                    </S.Track_titleText>
                                                </S.Track__title>
                                                <S.Track__author>
                                                    <S.Track__authorLink href="http://">
                                                        {contentVisible ? (
                                                            <span>{track.author}</span>
                                                        ) : (
                                                            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                                                <S.Skeleton_line />
                                                            </SkeletonTheme>
                                                        )}
                                                    </S.Track__authorLink>
                                                </S.Track__author>
                                                <S.Track__album>
                                                    <S.Track__albumLink href="http://">
                                                        {contentVisible ? (
                                                            <span>{track.album}</span>
                                                        ) : (
                                                            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                                                <S.Skeleton_line />
                                                            </SkeletonTheme>
                                                        )}
                                                    </S.Track__albumLink>
                                                </S.Track__album>
                                                <S.Track_time>
                                                    {contentVisible ? (
                                                        <S.Track__timeSvg onClick={() => delMyTracks(track.id)} alt="time">

                                                            {/* FAVORITES */}
                                                            <use href={`${sprite}#icon-like-liked`} />
                                                        </S.Track__timeSvg>
                                                    ) : (
                                                        <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                                            <S.Skeleton_lineMini />
                                                        </SkeletonTheme>
                                                    )}
                                                    {contentVisible ? (
                                                        <S.Track__timeText>
                                                            {track.duration_in_seconds}
                                                        </S.Track__timeText>
                                                    ) : (
                                                        <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                                            <S.Skeleton_displayNo />
                                                        </SkeletonTheme>
                                                    )}
                                                </S.Track_time>
                                            </S.Playlist__track>
                                        </S.Playlist__item>
                                    );
                                })}
                            </S.CentralBlockContentPlaylist>
                        </S.FavoritesBlockContent>
                    </S.MainCenterBlock>
                    <Sidebar user={user} />
                </S.Main>
            </S.Container>
        </S.Wrapper>
    );
}