import { useEffect, useState } from "react";
import { getBandUsers, getSetlistSongs, getSongs, getSetlists, getSetlistById, getSetlistSongById, getSongById, addSetlist, addSetlistSong, addSong, editSetlist, editSetlistSong, editSong, deleteSetlist, deleteSong, deleteSetlistSong } from "./LiveManager";
import React from "react";
import "./live.css"


export const Setlists = () => {
    const localUser = localStorage.getItem("userId");
    const [bandUserObj, setBandUserOb] = useState({})
    const [setlists, setSetlists] = useState([])
    const [songs, setSongs] = useState([])
    const [setlistSongs, setSetlistSongs] = useState([])
    const [setlistId, setSetlistId] = useState(0)
    const [setlistViewObj, setSetlistViewObj] = useState({})
    const [viewSetlist, setViewSetlist] = useState(false)
    const [filteredSetlistSongs, setFilteredSetlistSongs] = useState([])



    useEffect(
        () => {
            getSetlists().then((data) => {
                setSetlists(data)
            })
        }, []
    )

    useEffect(
        () => {
            getSongs().then((data) => {
                setSongs(data)
            })
        }, []
    )

    useEffect(
        () => {
            getSetlistSongs().then((data) => {
                setSetlistSongs(data)
            })
        }, []
    )

    useEffect(
        () => {
            getBandUsers().then((userArr) => {
                const matchedUser = userArr.find(user => user.user === parseInt(localUser))
                setBandUserOb(matchedUser)
            })
        }, []
    )

    useEffect(
        () => {
            if (setlistId != 0) {
                getSetlistById(setlistId).then((data) => {
                    setSetlistViewObj(data)
                })
                const setlistSongsBySetlistId = setlistSongs.filter(song => song.setlist.id === setlistId)
                setFilteredSetlistSongs(setlistSongsBySetlistId)
            }
        }, [setlistId, setlistSongs]
    )






    return <>

        <div className="setlistContainer">
            <div className="setListBandName">
                {bandUserObj.project_title}'s Setlists
            </div>
            <div className="setlistBoxContainer">
                {
                    setlists.map(setlist => {
                        const matchedSongs = setlistSongs.filter(song => song.setlist.id === setlist.id)
                        const numberOfSongs = matchedSongs.length;
                        return (
                            <div key={setlist.id} className="setlistBox" onClick={() => {
                                setSetlistId(parseInt(setlist.id))
                                setViewSetlist(true)
                            }} >
                                <h3>{setlist.title}</h3>
                                <h6>{numberOfSongs} songs</h6>
                                <h6>Last edited on -date-</h6>
                            </div>
                        )
                    })
                }
                <div className="setlistBox">
                    Add New Setlist
                </div>
            </div>
            {
                viewSetlist && (
                    <div className="viewContainer">
                        <div className="setlistView">
                            <h2 className="color">{setlistViewObj.title}</h2>
                            <h3 className="color">Description: {setlistViewObj.notes}</h3>
                            <ol className="color">
                                {
                                    filteredSetlistSongs.map(song => {
                                        return (
                                            <li key={song.id} value={song.id} className="setlistSong">
                                                {song.song.name}
                                                <button>Edit</button>
                                                <button onClick={async () => {
                                                    await deleteSetlistSong(song.id)
                                                    const newSetlistSongs = await getSetlistSongs();
                                                    setSetlistSongs(newSetlistSongs);
                                                }}>Delete</button>
                                            </li>
                                        )
                                    })
                                }
                            </ol>
                            <button onClick={() => {
                                setSetlistId(0)
                                setViewSetlist(false)
                            }}>Close</button>
                        </div>
                    </div>
                )
            }
        </div>



    </>






}