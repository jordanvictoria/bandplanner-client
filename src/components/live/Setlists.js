import { useEffect, useState } from "react";
import { getBandUsers, getSetlistSongs, getSongs, getSetlists, getSetlistById, getSetlistSongById, getSongById, addSetlist, addSetlistSong, addSong, editSetlist, editSetlistSong, editSong, deleteSetlist, deleteSong, deleteSetlistSong } from "./LiveManager";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React from "react";
import "./live.css"


export const Setlists = () => {
    const localUser = localStorage.getItem("userId");
    const [bandUserObj, setBandUserObj] = useState({})
    const [setlists, setSetlists] = useState([])
    const [songs, setSongs] = useState([])
    const [setlistSongs, setSetlistSongs] = useState([])
    const [setlistId, setSetlistId] = useState(0)
    const [setlistViewObj, setSetlistViewObj] = useState({})
    const [viewSetlist, setViewSetlist] = useState(false)
    const [filteredSetlistSongs, setFilteredSetlistSongs] = useState([])
    const [newSetlistForm, openNewSetlistForm] = useState(false)
    const [newSetlist, updateNewSetlist] = useState({
        user: 0,
        title: "",
        notes: "",
        date_created: "",
        last_edited: ""
    })

    const [editSetlistId, setEditSetlistId] = useState(0)
    const [editSetlistForm, openEditSetlistForm] = useState(false)
    const [setlistEdit, updateSetlistEdit] = useState({
        id: 0,
        user: 0,
        title: "",
        notes: "",
        date_created: "",
        last_edited: ""
    })
    const [songForm, openSongForm] = useState(false)
    const [newSong, updateNewSong] = useState({
        user: 0,
        name: ""
    })



    // USE EFFECTS


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
                setBandUserObj(matchedUser)
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

                // Sort the songs by the order property
                setlistSongsBySetlistId.sort((a, b) => {
                    const orderA = parseInt(a.notes);
                    const orderB = parseInt(b.notes);
                    return orderA - orderB;
                });

                setFilteredSetlistSongs(setlistSongsBySetlistId);
            }
        }, [setlistId, setlistSongs]
    )

    useEffect(
        () => {
            if (editSetlistId != 0) {
                getSetlistById(editSetlistId).then((data) => {
                    updateSetlistEdit(data)
                })
                const setlistSongsByEditSetlistId = setlistSongs.filter(song => song.setlist.id === editSetlistId)

                setlistSongsByEditSetlistId.sort((a, b) => {
                    const orderA = parseInt(a.notes);
                    const orderB = parseInt(b.notes);
                    return orderA - orderB;
                });

                setFilteredSetlistSongs(setlistSongsByEditSetlistId)
            }
        }, [editSetlistId, setlistSongs]
    )














    // POST AND EDIT FORMS




    const setlistSaveButtonClick = async (event) => {
        event.preventDefault()

        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);

        const setlistToSendToAPI = {
            user: parseInt(localUser),
            title: newSetlist.title,
            notes: newSetlist.notes,
            date_created: formattedDate,
            last_edited: formattedDate
        }

        await addSetlist(setlistToSendToAPI)
            .then(response => response.json())
            .then(createdSetlist => {
                setEditSetlistId(parseInt(createdSetlist.id))
            })
    }



    const setlistEditButtonClick = async (event) => {
        event.preventDefault()

        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);

        const editToSendToAPI = {
            id: editSetlistId,
            user: parseInt(localUser),
            title: setlistEdit.title,
            notes: setlistEdit.notes,
            date_created: setlistEdit.date_created,
            last_edited: formattedDate
        }

        await editSetlist(editToSendToAPI)

        const newSetlists = await getSetlists()
        setSetlists(newSetlists)

        const newSetlistSongs = await getSetlistSongs()
        setSetlistSongs(newSetlistSongs)
    }



    const setlistSongSaveButtonClick = async (songId, setlistId) => {
        const setlistSongToSendToAPI = {
            user: parseInt(localUser),
            song: parseInt(songId),
            setlist: parseInt(setlistId),
            notes: "0"
        }

        await addSetlistSong(setlistSongToSendToAPI)
            .then(response => response.json())
    }





    const songSaveButtonClick = async (event) => {
        event.preventDefault()

        const songToSendToAPI = {
            user: parseInt(localUser),
            name: newSong.title
        }

        await addSong(songToSendToAPI)
            .then(response => response.json())

        const newSongs = await getSongs()
        setSongs(newSongs)
    }


    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }



    const formatDateDisplay = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };








    // DRAG AND DROP



    const handleDragEnd = (result) => {
        if (!result.destination) return; // Dragged outside a droppable area

        const items = Array.from(filteredSetlistSongs);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setFilteredSetlistSongs(items);
    };



    const updateFilteredSetlistSongsOrder = async (songs) => {
        for (let i = 0; i < songs.length; i++) {
            const song = songs[i];
            const setlistSong = await getSetlistSongById(parseInt(song.id));
            setlistSong.notes = String(i + 1); // Convert the order to string if needed
            setlistSong.user = parseInt(localUser);
            setlistSong.song = parseInt(setlistSong.song.id);
            setlistSong.setlist = parseInt(setlistSong.setlist.id);
            setlistSong.id = parseInt(setlistSong.id);


            await editSetlistSong(setlistSong);
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        await setlistEditButtonClick(event);

        openEditSetlistForm(false);

        // Update the order of filteredSetlistSongs
        const updatedFilteredSetlistSongs = filteredSetlistSongs.map((song, index) => {
            const updatedSong = { ...song };
            updatedSong.notes = String(index + 1); // Convert the order to string if needed
            return updatedSong;
        });

        // Save the updated order to the backend or perform any necessary operations
        await updateFilteredSetlistSongsOrder(updatedFilteredSetlistSongs) // Replace with your actual API call or update logic

        const newSetlistSongs = await getSetlistSongs()

        setSetlistSongs(newSetlistSongs)
        setEditSetlistId(0);
    };











    // UNCHOSEN SONGS



    const filterSongs = (setlistsongs, songs) => {
        // Create a new array to store the filtered songs
        let filteredSongs = [...songs];

        // Loop through each setlistsong
        setlistsongs.forEach((setlistsong) => {
            // Filter out the songs that have a matching songId
            filteredSongs = filteredSongs.filter((song) => song.id !== setlistsong.song.id);
        });

        // Return the filtered songs
        return filteredSongs;
    }

    const unchosenSongs = filterSongs(filteredSetlistSongs, songs)











    return <>

        <div className="site-background">
            <div className="header">
                <div className="button-wrap">
                <div className="new-add-live-button custom-button" onClick={() => {
                            openNewSetlistForm(true)
                        }}>
                            Add New Setlist
                        </div>
                </div>
            </div>
            <div className="content">
                <div className="setlistContainer">
                    <div className="setlistBoxContainer">
                        <div className="setListBandName">
                            {bandUserObj.project_title ? (
                                <>{bandUserObj.project_title}'s Setlists</>
                            ) : (
                                <>Setlists</>
                            )}
                        </div>

                        {
                            setlists.map(setlist => {
                                const matchedSongs = setlistSongs.filter(song => song.setlist.id === setlist.id)
                                const numberOfSongs = matchedSongs.length;
                                const dateDisplay = formatDateDisplay(setlist.last_edited)
                                return (
                                    <div key={setlist.id} className="setlistBox" onClick={() => {
                                        setSetlistId(parseInt(setlist.id))
                                        setViewSetlist(true)
                                    }} >
                                        <h3>{setlist.title}</h3>
                                        <div className="fontStyles">
                                            <h6>- {numberOfSongs} songs</h6>
                                            <h6>- Last edited on {dateDisplay}</h6>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    
                    </div>
                </div>
            </div>
            {
                viewSetlist && (
                    <div className="viewContainer">
                        <h2>{setlistViewObj.title}</h2>
                        <h3>Description: {setlistViewObj.notes}</h3>
                        <ol className="customList">
                            {
                                filteredSetlistSongs.map((song, index) => {
                                    return (
                                        <li key={song.id} value={song.id} className="setlistSong">
                                            {song.song.name}
                                        </li>
                                    )
                                })
                            }
                        </ol>
                        <div className="button_group">
                            <button className="edit_button" onClick={() => {
                                setEditSetlistId(setlistViewObj.id)
                                setSetlistId(0)
                                setViewSetlist(false)
                                openEditSetlistForm(true)
                            }}>Edit</button>
                            <button className="delete_button" onClick={async () => {
                                await deleteSetlist(setlistViewObj.id)
                                const newSetlists = await getSetlists();
                                setSetlists(newSetlists);
                                setViewSetlist(false)
                            }}>Delete</button>
                        </div>
                        <button className="close_button" onClick={() => {
                            setSetlistId(0)
                            setViewSetlist(false)
                        }}>Close</button>
                    </div>
                )
            }
            {
                newSetlistForm && (
                    <div className="setlist_form">
                        <form>
                            <fieldset>
                                <div className="formRow">Title:
                                    <input type="text" id="title" onChange={
                                        (evt) => {
                                            const copy = { ...newSetlist }
                                            copy.title = evt.target.value
                                            updateNewSetlist(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Description:
                                    <input type="text" id="notes" onChange={
                                        (evt) => {
                                            const copy = { ...newSetlist }
                                            copy.notes = evt.target.value
                                            updateNewSetlist(copy)
                                        }
                                    } />
                                </div>
                                <div className="formButtons">

                                    <button onClick={(clickEvent) => {
                                        setlistSaveButtonClick(clickEvent)
                                        openNewSetlistForm(false)
                                        openEditSetlistForm(true)
                                    }}>Save</button>
                                    <button onClick={() => {
                                        openNewSetlistForm(false)
                                    }}>Cancel</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                )
            }
            {
                editSetlistForm && (
                    <div className="edit_setlist">
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <div className="formRow">Title:
                                    <input type="text" id="title" placeholder={setlistEdit.title} value={setlistEdit.title} onChange={
                                        (evt) => {
                                            const copy = { ...setlistEdit }
                                            copy.title = evt.target.value
                                            updateSetlistEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Description:
                                    <input type="text" id="notes" placeholder={setlistEdit.notes} value={setlistEdit.notes} onChange={
                                        (evt) => {
                                            const copy = { ...setlistEdit }
                                            copy.notes = evt.target.value
                                            updateSetlistEdit(copy)
                                        }
                                    } />
                                </div>
                            </fieldset>
                            <div className="buttonDiv">
                                <button type="submit">Save</button>
                                <button onClick={() => {
                                    openEditSetlistForm(false)
                                    setEditSetlistId(0)
                                }}>Cancel</button>
                            </div>
                        </form>
                        {
                            filteredSetlistSongs && (
                                <DragDropContext onDragEnd={handleDragEnd}>
                                    <Droppable droppableId="setlistSongs">
                                        {(provided) => (
                                            <div className="customList" {...provided.droppableProps} ref={provided.innerRef}>
                                                {
                                                    filteredSetlistSongs.map((song, index) => (
                                                        <Draggable className="dragged-item" key={song.id} draggableId={String(song.id)} index={index}>
                                                            {(provided) => (
                                                                <li
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className="formRow"
                                                                >
                                                                    {song.song.name}
                                                                    <button onClick={async () => {
                                                                        await deleteSetlistSong(song.id)
                                                                        const newSetlistSongs = await getSetlistSongs();
                                                                        const setlistSongsByEditSetlistId = newSetlistSongs.filter(song => song.setlist.id === editSetlistId)
                                                                        setFilteredSetlistSongs(setlistSongsByEditSetlistId)
                                                                    }}>Remove</button>
                                                                </li>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            )
                        }
                        <div className="setlist_songs">
                            <div className="setlist-songs-header">
                                <h3>Add Songs to Setlist</h3>
                                <button className="newSong" onClick={() => {
                                    openSongForm(true)
                                }}>
                                    Create New Song
                                </button>
                            </div>
                            {
                                songForm && (
                                    <div className="song_form">
                                        <form>
                                            <fieldset>
                                                <div>Name:
                                                    <input type="text" id="name" onChange={
                                                        (evt) => {
                                                            const copy = { ...newSong }
                                                            copy.title = evt.target.value
                                                            updateNewSong(copy)
                                                        }
                                                    } />
                                                </div>
                                                <button onClick={(clickEvent) => {
                                                    songSaveButtonClick(clickEvent)
                                                    openSongForm(false)
                                                }}>Save</button>
                                                <button onClick={() => {
                                                    openSongForm(false)
                                                }}>Cancel</button>
                                            </fieldset>
                                        </form>
                                    </div>
                                )
                            }
                            {
                                unchosenSongs.map(song => {
                                    return (
                                        <li key={song.id} value={song.id} >
                                            <div className="unchosen" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                                {song.name}
                                                <div style={{ display: 'flex' }}>

                                                    <button onClick={async () => {
                                                        await setlistSongSaveButtonClick(song.id, editSetlistId)
                                                        const newSetlistSongs = await getSetlistSongs();
                                                        const setlistSongsByEditSetlistId = newSetlistSongs.filter(song => song.setlist.id === editSetlistId)
                                                        setFilteredSetlistSongs(setlistSongsByEditSetlistId)
                                                    }}>Add to Setlist</button>
                                                    <button onClick={async () => {
                                                        await deleteSong(song.id)
                                                        const newSongs = await getSongs();
                                                        setSongs(newSongs)
                                                    }}>Remove</button>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </div >



    </>
}







