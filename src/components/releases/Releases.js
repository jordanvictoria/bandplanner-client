import { useEffect, useState } from "react";
import { getEvents, getEventsByType, deleteEvent, getEventById, editEvent, addEvent, getSingleReleases, getSingleReleaseById, addSingleRelease, editSingleRelease, getBundleReleases, getBundleReleaseById, addBundleRelease, editBundleRelease, getBundleSongs, getBundleSongById, addBundleSong, editBundleSong, deleteBundleSong } from "./ReleaseManager";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-bootstrap/Modal";
import { UploadFile } from "../cloudinary/UploadFile"
import { ReplaceFile } from "../cloudinary/ReplaceFile"
import "./releases.css"
import cloudinary from 'cloudinary-core';
// import '@fullcalendar/common/main.css';
// import '@fullcalendar/daygrid/main.css';

export const Releases = () => {
    const localUser = localStorage.getItem("userId");
    const [allEvents, setAllEvents] = useState([])
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState({});
    const [eventType, setEventType] = useState(0)
    const [url, setURL] = useState("")
    const [singleEditURL, setSingleEditURL] = useState("")
    const [bundleEditURL, setBundleEditURL] = useState("")
    const [error, updateError] = useState("")
    const [listSelected, setListSelected] = useState(true);
    const [calendarSelected, setCalendarSelected] = useState(false);
    const [eventListId, setEventListId] = useState(0)
    const [matchedSingle, setMatchedSingle] = useState({});
    const [viewMatchedSingle, setViewMatchedSingle] = useState(false);
    const [matchedBundle, setMatchedBundle] = useState({});
    const [viewMatchedBundle, setViewMatchedBundle] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [filteredByType, setFilteredByType] = useState(0)
    const [checkedIndex, setCheckedIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [dateInputType, setDateInputType] = useState('');
    const [timeInputType, setTimeInputType] = useState('');
    const [eventId, setEventId] = useState(0)
    const [bundleId, setBundleId] = useState(0)
    const [singleReleaseId, setSingleReleaseId] = useState(0)
    const [bundleReleaseId, setBundleReleaseId] = useState(0)
    const [bundleSongId, setBundleSongId] = useState(0)
    const [singleReleases, setSingleReleases] = useState([])
    const [bundleReleases, setBundleReleases] = useState([])
    const [bundleSongs, setBundleSongs] = useState([])
    const [matchedBundleSongs, setMatchedBundleSongs] = useState([])
    const [singleReleaseForm, openSingleReleaseForm] = useState(false);
    const [singleReleaseEditForm, openSingleReleaseEditForm] = useState(false);
    const [newSingleRelease, updateNewSingleRelease] = useState({
        user: 0,
        event: 0,
        song_title: "",
        genre: "",
        upc: 0,
        isrc: 0,
        composer: "",
        producer: "",
        explicit: false,
        audio_url: "",
        artwork: "",
        uploaded_to_distro: false
    })
    const [singleEdit, updateSingleEdit] = useState({
        id: 0,
        user: 0,
        event: 0,
        song_title: "",
        genre: "",
        upc: 0,
        isrc: 0,
        composer: "",
        producer: "",
        explicit: false,
        audio_url: "",
        artwork: "",
        uploaded_to_distro: false
    })
    const [bundleReleaseForm, openBundleReleaseForm] = useState(false);
    const [bundleReleaseEditForm, openBundleReleaseEditForm] = useState(false);
    const [newBundleRelease, updateNewBundleRelease] = useState({
        user: 0,
        event: 0,
        bundle_title: "",
        genre: "",
        upc: 0,
        audio_url: "",
        artwork: "",
        uploaded_to_distro: false
    })
    const [bundleEdit, updateBundleEdit] = useState({
        id: 0,
        user: 0,
        event: 0,
        bundle_title: "",
        genre: "",
        upc: 0,
        audio_url: "",
        artwork: "",
        uploaded_to_distro: false
    })
    const [bundleSongForm, openBundleSongForm] = useState(false);
    const [bundleSongEditForm, openBundleSongEditForm] = useState(false);
    const [newBundleSong, updateNewBundleSong] = useState({
        user: 0,
        bundle: 0,
        song_title: "",
        genre: "",
        isrc: 0,
        composer: "",
        producer: "",
        explicit: false
    })
    const [bundleSongEdit, updateBundleSongEdit] = useState({
        id: 0,
        user: 0,
        bundle: 0,
        song_title: "",
        genre: "",
        isrc: 0,
        composer: "",
        producer: "",
        explicit: false
    })
    const [newEvent, updateNewEvent] = useState({
        user: 0,
        event_type: 0,
        title: "",
        date: "",
        time: "",
        description: ""
    })
    const [eventEdit, updateEventEdit] = useState({
        id: 0,
        user: 0,
        event_type: 0,
        title: "",
        date: "",
        time: "",
        description: ""
    })





    // USE EFFECTS

    useEffect(
        () => {
            getEvents().then((data) => {
                setAllEvents(data)
            })
        }, []
    )



    useEffect(
        () => {
            getSingleReleases().then((data) => {
                setSingleReleases(data)
            })
        }, []
    )

    useEffect(
        () => {
            getBundleReleases().then((data) => {
                setBundleReleases(data)
            })
        }, []
    )

    useEffect(
        () => {
            getBundleSongs().then((data) => {
                setBundleSongs(data)
            })
        }, []
    )







    useEffect(() => {
        const eventArr = [
            ...singleReleases.flatMap(singleRelease =>
                allEvents.filter(event => event.id === singleRelease.event.id)
            ),
            ...bundleReleases.flatMap(bundleRelease =>
                allEvents.filter(event => event.id === bundleRelease.event.id)
            )
        ];

        // Custom comparison function to compare the date strings
        const compareDates = (a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        };

        // Sort the eventArr based on the date property
        eventArr.sort(compareDates);

        setEvents(eventArr);
    }, [allEvents, singleReleases, bundleReleases]);







    useEffect(() => {
        if (eventType === 1) {
            openSingleReleaseForm(true)
        }
        if (eventType === 2) {
            openBundleReleaseForm(true)
        }
    }, [eventType])




    useEffect(() => {
        if (eventId) {
            getEventById(eventId).then((res) => {
                updateEventEdit(res);
                const matchedSingleRelease = singleReleases.find(singleRelease => singleRelease.event.id === eventId);
                const matchedBundleRelase = bundleReleases.find(bundleRelase => bundleRelase.event.id === eventId);
                if (matchedSingleRelease) {
                    setSingleReleaseId(matchedSingleRelease.id);
                }
                if (matchedBundleRelase) {
                    setBundleReleaseId(matchedBundleRelase.id);
                }

            });
        }
    }, [eventId]);


    useEffect(() => {
        if (singleReleaseId) {
            getSingleReleaseById(singleReleaseId).then((res) => {
                updateSingleEdit(res)
                setSingleEditURL(res.artwork)
            })
        }
        if (bundleReleaseId) {
            getBundleReleaseById(bundleReleaseId).then((res) => {
                updateBundleEdit(res)
                setBundleEditURL(res.artwork)
            })
        }
        if (bundleSongId) {
            getBundleSongById(bundleSongId).then((res) => {
                updateBundleSongEdit(res)
            })
        }
    }, [singleReleaseId, bundleReleaseId, bundleSongId])



    useEffect(() => {
        if (eventId && singleReleaseId) {
            openSingleReleaseEditForm(true)
        }
        if (eventId && bundleReleaseId) {
            openBundleReleaseEditForm(true)
        }
        if (bundleSongId) {
            openBundleSongEditForm(true)
        }
    }, [eventId, bundleReleaseId, singleReleaseId, bundleSongId])






    useEffect(
        () => {
            if (filteredByType !== 0) {
                getEventsByType(parseInt(filteredByType))
                    .then((data) => { setAllEvents(data) })
            } else {
                getEvents().then((data) => {
                    setAllEvents(data)
                })
            }

        }, [filteredByType]
    )


    useEffect(() => {
        if (eventListId !== 0) {
            const matchedSingleRelease = singleReleases.find(release => release.event.id === eventListId);
            const matchedBundleRelease = bundleReleases.find(release => release.event.id === eventListId);

            if (matchedSingleRelease) {
                setMatchedSingle(matchedSingleRelease);
                setViewMatchedSingle(true)
            } else if (matchedBundleRelease) {
                setMatchedBundle(matchedBundleRelease);
                setViewMatchedBundle(true)
            }
        }
    }, [eventListId, singleReleases, bundleReleases]);


    useEffect(() => {
        if (matchedBundle) {
            const filteredSongs = bundleSongs.filter(bundle => bundle.bundle.id === matchedBundle.id)
            setMatchedBundleSongs(filteredSongs)

        }
    }, [bundleSongs, matchedBundle]);


    useEffect(
        () => {
            if (url !== "") {
                if (openSingleReleaseForm) {
                    HandleNewSingleChange(url)
                }
                if (openSingleReleaseEditForm) {
                    HandleSingleEditChange(url)
                }
                if (openBundleReleaseForm) {
                    HandleNewBundleChange(url)
                }
                if (openBundleReleaseEditForm) {
                    HandleBundleEditChange(url)
                }
            }
        }, [url, openSingleReleaseForm, openSingleReleaseEditForm, openBundleReleaseForm, openBundleReleaseEditForm])














    // TOGGLE

    const handleOptionClick = (option) => {
        if (option === 1) {
            setCalendarSelected(false);
            setListSelected(true);
        }
        if (option === 2) {
            setListSelected(false);
            setCalendarSelected(true);
        }
    };




    //LIST VIEW


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }









    // CHECKBOXES

    const handleCheckboxChange = (index) => {
        setCheckedIndex(index);
    };





    // MODAL


    const handleShowModal = () => {
        setShowModal(true);
    };


    const handleCloseModal = () => {
        return new Promise((resolve) => {
            setShowModal(false);
            resolve();
        });
    };







    // CLOUDINARY

    function handleOnUpload(error, result, widget) {
        if (error) {
            updateError(error);
            widget.close({
                quiet: true
            });
            return;
        }
        setURL(result?.info?.secure_url)
    }

    const HandleNewSingleChange = (url) => {
        const copy = { ...newSingleRelease }
        copy.artwork = url
        updateNewSingleRelease(copy)
    }

    const HandleNewBundleChange = (url) => {
        const copy = { ...newBundleRelease }
        copy.artwork = url
        updateNewBundleRelease(copy)
    }

    const HandleSingleEditChange = (url) => {
        setSingleEditURL("")
        const copy = { ...singleEdit }
        copy.artwork = url
        updateSingleEdit(copy)
    }

    const HandleBundleEditChange = (url) => {
        setBundleEditURL("")
        const copy = { ...bundleEdit }
        copy.artwork = url
        updateBundleEdit(copy)
    }







    // POST SINGLE RELEASE

    const singleSaveButtonClick = async (event) => {
        event.preventDefault()

        const eventToSendToAPI = {
            user: parseInt(localUser),
            event_type: parseInt(eventType),
            title: newEvent.title,
            date: newEvent.date,
            time: newEvent.time,
            description: newEvent.description
        }


        let singleToSendToAPI = {
            user: parseInt(localUser),
            song_title: newSingleRelease.song_title,
            genre: newSingleRelease.genre,
            upc: newSingleRelease.upc,
            isrc: newSingleRelease.isrc,
            composer: newSingleRelease.composer,
            producer: newSingleRelease.producer,
            explicit: newSingleRelease.explicit,
            audio_url: newSingleRelease.audio_url,
            artwork: newSingleRelease.artwork,
            uploaded_to_distro: newSingleRelease.uploaded_to_distro
        }

        await addEvent(eventToSendToAPI)
            .then(response => response.json())
            .then(createdEvent => {
                singleToSendToAPI.event = parseInt(createdEvent.id)
                addSingleRelease(singleToSendToAPI)
            })

        const newEvents = await getEvents()
        setAllEvents(newEvents)

        const newSingleReleases = await getSingleReleases()
        setSingleReleases(newSingleReleases)
    }


    // EDIT SINGLE

    const singleEditButtonClick = async (event) => {
        event.preventDefault()


        await editEvent({
            id: eventId,
            user: parseInt(localUser),
            event_type: eventEdit.event_type.id,
            title: eventEdit.title,
            date: eventEdit.date,
            time: eventEdit.time,
            description: eventEdit.description
        }).then(() => {
            editSingleRelease({
                id: singleReleaseId,
                user: parseInt(localUser),
                event: eventId,
                song_title: singleEdit.song_title,
                genre: singleEdit.genre,
                upc: singleEdit.upc,
                isrc: singleEdit.isrc,
                composer: singleEdit.composer,
                producer: singleEdit.producer,
                explicit: singleEdit.explicit,
                audio_url: singleEdit.audio_url,
                artwork: singleEdit.artwork,
                uploaded_to_distro: singleEdit.uploaded_to_distro
            })
        })

        const newEvents = await getEvents()
        setAllEvents(newEvents)
    }

    // POST BUNDLE

    const bundleSaveButtonClick = async (event) => {
        event.preventDefault()

        const eventToSendToAPI = {
            user: parseInt(localUser),
            event_type: parseInt(eventType),
            title: newEvent.title,
            date: newEvent.date,
            time: newEvent.time,
            description: newEvent.description
        }


        let bundleToSendToAPI = {
            user: parseInt(localUser),
            bundle_title: newBundleRelease.bundle_title,
            genre: newBundleRelease.genre,
            upc: newBundleRelease.upc,
            audio_url: newBundleRelease.audio_url,
            artwork: newBundleRelease.artwork,
            uploaded_to_distro: newBundleRelease.uploaded_to_distro
        }

        await addEvent(eventToSendToAPI)
            .then(response => response.json())
            .then(createdEvent => {
                bundleToSendToAPI.event = parseInt(createdEvent.id)
                addBundleRelease(bundleToSendToAPI)
            })

        const newEvents = await getEvents()
        setAllEvents(newEvents)
    }


    // EDIT BUNDLE

    const bundleEditButtonClick = async (event) => {
        event.preventDefault()


        await editEvent({
            id: eventId,
            user: parseInt(localUser),
            event_type: eventEdit.event_type.id,
            title: eventEdit.title,
            date: eventEdit.date,
            time: eventEdit.time,
            description: eventEdit.description
        }).then(() => {
            editBundleRelease({
                id: bundleReleaseId,
                user: parseInt(localUser),
                event: eventId,
                bundle_title: bundleEdit.bundle_title,
                genre: bundleEdit.genre,
                upc: bundleEdit.upc,
                audio_url: bundleEdit.audio_url,
                artwork: bundleEdit.artwork,
                uploaded_to_distro: bundleEdit.uploaded_to_distro
            })
        })

        const newEvents = await getEvents()
        setAllEvents(newEvents)
    }


    // POST BUNDLE SONG RELEASE

    const bundleSongSaveButtonClick = async (event) => {
        event.preventDefault()


        let singleToSendToAPI = {
            user: parseInt(localUser),
            bundle: bundleId,
            song_title: newBundleSong.song_title,
            genre: newBundleSong.genre,
            isrc: newBundleSong.isrc,
            composer: newBundleSong.composer,
            producer: newBundleSong.producer,
            explicit: newBundleSong.explicit
        }

        await addBundleSong(singleToSendToAPI)
            .then(response => response.json())


        const newBundleSongs = await getBundleSongs()
        setBundleSongs(newBundleSongs)
    }


    // EDIT BUNDLE SONG

    const bundleSongEditButtonClick = async (event) => {
        event.preventDefault()



        await editBundleSong({
            id: bundleSongId,
            user: parseInt(localUser),
            bundle: bundleSongEdit.bundle.id,
            song_title: bundleSongEdit.song_title,
            genre: bundleSongEdit.genre,
            isrc: bundleSongEdit.isrc,
            composer: bundleSongEdit.composer,
            producer: bundleSongEdit.producer,
            explicit: bundleSongEdit.explicit
        })


        const newBundleSongs = await getBundleSongs()
        setBundleSongs(newBundleSongs)
    }


















    return <>

        <div className="container">

            <div className="button-checkbox-container">
                <button onClick={() => setIsOpen(true)}>
                    Add New Event
                </button>
                <span className="filterBox">
                    <span className="releaseFilterOne">
                        Show All <input type="checkbox" checked={checkedIndex === 0} onChange={() => handleCheckboxChange(0)}
                            onClick={() => setFilteredByType(0)} />
                    </span>
                    <span className="releaseFilterThree">
                        Show Single Releases <input type="checkbox" checked={checkedIndex === 1} onChange={() => handleCheckboxChange(1)}
                            onClick={() => setFilteredByType(1)} />
                    </span>
                    <span className="releaseFilterFour">
                        Show Bundle Releases <input type="checkbox" checked={checkedIndex === 2} onChange={() => handleCheckboxChange(2)}
                            onClick={() => setFilteredByType(2)} />
                    </span>
                </span>
            </div>
            <div className="button-view-container">
                <button
                    onClick={() => handleOptionClick(1)}
                    style={{
                        backgroundColor: listSelected ? 'green' : 'white',
                    }}
                >
                    List View
                </button>
                <button
                    onClick={() => handleOptionClick(2)}
                    style={{
                        backgroundColor: calendarSelected ? 'green' : 'white',
                    }}
                >
                    Calendar View
                </button>
            </div>


            {
                isOpen && (
                    <div className="pop_up">
                        <div>
                            <select onChange={
                                (evt) => {
                                    setEventType(parseInt(evt.target.value))
                                    setIsOpen(false)
                                }
                            } >
                                <option value="0">Select Event Type...</option>
                                <option value="1">Single Release</option>
                                <option value="2">Bundle Release</option>
                            </select>
                        </div>
                        <button onClick={() => setIsOpen(false)}>
                            Cancel
                        </button>
                    </div>
                )
            }

            {/* SINGLE FORMS */}

            {
                singleReleaseForm && (
                    <div className="pop_up_rehearsal">
                        <form className="relativeForm">
                            <fieldset>
                                <div>Title:
                                    <input type="text" id="title" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.title = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div>Date:
                                    <input type="date" id="date" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.date = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div>Time:
                                    <input type="time" id="time" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            const unformattedTime = evt.target.value
                                            const formattedTime = unformattedTime.slice(0, 5) + ":00"
                                            copy.time = formattedTime
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div>Description:
                                    <input type="text" id="description" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.description = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                            </fieldset>
                            <h3>Single Release</h3>
                            <fieldset>
                                <div>Song Title:
                                    <input type="text" id="song_title" onChange={
                                        (evt) => {
                                            const copy = { ...newSingleRelease }
                                            copy.song_title = evt.target.value
                                            updateNewSingleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div>Genre:
                                    <input type="text" id="genre" onChange={
                                        (evt) => {
                                            const copy = { ...newSingleRelease }
                                            copy.genre = evt.target.value
                                            updateNewSingleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div>UPC:
                                    <input type="number" id="upc" onChange={
                                        (evt) => {
                                            const copy = { ...newSingleRelease }
                                            copy.upc = evt.target.value
                                            updateNewSingleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div>ISRC:
                                    <input type="number" id="isrc" onChange={
                                        (evt) => {
                                            const copy = { ...newSingleRelease }
                                            copy.isrc = evt.target.value
                                            updateNewSingleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div>Composer:
                                    <input type="text" id="composer" onChange={
                                        (evt) => {
                                            const copy = { ...newSingleRelease }
                                            copy.composer = evt.target.value
                                            updateNewSingleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div>Producer:
                                    <input type="text" id="producer" onChange={
                                        (evt) => {
                                            const copy = { ...newSingleRelease }
                                            copy.producer = evt.target.value
                                            updateNewSingleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div>Explicit:
                                    <input type="checkbox"
                                        value={newSingleRelease.explicit}
                                        onChange={
                                            (evt) => {
                                                const copy = { ...newSingleRelease }
                                                copy.explicit = evt.target.checked
                                                updateNewSingleRelease(copy)
                                            }
                                        } />
                                </div>
                                <div>Audio:
                                    <input type="url" id="audio_url" onChange={
                                        (evt) => {
                                            const copy = { ...newSingleRelease }
                                            copy.audio_url = evt.target.value
                                            updateNewSingleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div>Artwork:

                                    {url === "" ? ""
                                        : <img src={url} alt="artwork" />}

                                    <UploadFile onUpload={handleOnUpload} />
                                </div>
                                <div>Uploaded to Distro:
                                    <input type="checkbox"
                                        value={newSingleRelease.uploaded_to_distro}
                                        onChange={
                                            (evt) => {
                                                const copy = { ...newSingleRelease }
                                                copy.uploaded_to_distro = evt.target.checked
                                                updateNewSingleRelease(copy)
                                            }
                                        } />
                                </div>
                                <button onClick={(clickEvent) => {
                                    singleSaveButtonClick(clickEvent)
                                    openSingleReleaseForm(false)
                                    setEventType(0)
                                    setURL("")
                                }}>Save</button>
                                <button className="cancelItem" onClick={() => {
                                    openSingleReleaseForm(false)
                                    setEventType(0)
                                    setURL("")
                                }}>Cancel</button>
                            </fieldset>
                        </form>
                    </div>
                )
            }

            {
                singleReleaseEditForm && (
                    <div className="pop_up_rehearsal">
                        <form className="relativeForm">
                            <fieldset>
                                <div>Title:
                                    <input type="text" id="title" placeholder={eventEdit.title} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.title = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div>Date:
                                    <input type={dateInputType} id="date" placeholder={eventEdit.date} onFocus={() => setDateInputType('date')} onBlur={() => setDateInputType('text')} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.date = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div>Time:
                                    <input type={timeInputType} id="time" placeholder={eventEdit.time} onFocus={() => setTimeInputType('time')} onBlur={() => setTimeInputType('text')} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            const unformattedTime = evt.target.value
                                            const formattedTime = unformattedTime.slice(0, 5) + ":00"
                                            copy.time = formattedTime
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div>Description:
                                    <input type="text" id="description" placeholder={eventEdit.description} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.description = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                            </fieldset>
                            <h3>Rehearsal</h3>
                            <fieldset>
                                <div>Song Title:
                                    <input type="text" id="song_title" placeholder={singleEdit.song_title} onChange={
                                        (evt) => {
                                            const copy = { ...singleEdit }
                                            copy.song_title = evt.target.value
                                            updateSingleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div>Genre:
                                    <input type="text" id="genre" placeholder={singleEdit.genre} onChange={
                                        (evt) => {
                                            const copy = { ...singleEdit }
                                            copy.genre = evt.target.value
                                            updateSingleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div>UPC:
                                    <input type="number" id="upc" placeholder={singleEdit.upc} onChange={
                                        (evt) => {
                                            const copy = { ...singleEdit }
                                            copy.upc = evt.target.value
                                            updateSingleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div>ISRC:
                                    <input type="number" id="isrc" placeholder={singleEdit.isrc} onChange={
                                        (evt) => {
                                            const copy = { ...singleEdit }
                                            copy.isrc = evt.target.value
                                            updateSingleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div>Composer:
                                    <input type="text" id="composer" placeholder={singleEdit.composer} onChange={
                                        (evt) => {
                                            const copy = { ...singleEdit }
                                            copy.composer = evt.target.value
                                            updateSingleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div>Producer:
                                    <input type="text" id="producer" placeholder={singleEdit.producer} onChange={
                                        (evt) => {
                                            const copy = { ...singleEdit }
                                            copy.producer = evt.target.value
                                            updateSingleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div>Explicit:
                                    <input type="checkbox"
                                        value={singleEdit.explicit}
                                        onChange={
                                            (evt) => {
                                                const copy = { ...singleEdit }
                                                copy.explicit = evt.target.checked
                                                updateSingleEdit(copy)
                                            }
                                        } />
                                </div>
                                <div>Audio:
                                    <input type="url" id="audio_url" placeholder={singleEdit.audio_url} onChange={
                                        (evt) => {
                                            const copy = { ...singleEdit }
                                            copy.audio_url = evt.target.value
                                            updateSingleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div>Artwork:
                                    {singleEditURL === "" ? ""
                                        : <img src={singleEditURL} alt="artwork" />}
                                    {url === "" ? ""
                                        : <img src={url} alt="artwork" />}
                                    <ReplaceFile onUpload={handleOnUpload} />
                                </div>
                                <div>Artwork:
                                    <input type="url" id="artwork" placeholder={singleEdit.artwork} onChange={
                                        (evt) => {
                                            const copy = { ...singleEdit }
                                            copy.artwork = evt.target.value
                                            updateSingleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div>Uploaded to Distro:
                                    <input type="checkbox"
                                        value={singleEdit.uploaded_to_distro}
                                        onChange={
                                            (evt) => {
                                                const copy = { ...singleEdit }
                                                copy.uploaded_to_distro = evt.target.checked
                                                updateSingleEdit(copy)
                                            }
                                        } />
                                </div>
                                <button onClick={(clickEvent) => {
                                    singleEditButtonClick(clickEvent)
                                    openSingleReleaseEditForm(false)
                                    setSingleReleaseId(0)
                                    setEventId(0)
                                }}>Save</button>
                                <button className="cancelItem" onClick={() => {
                                    openSingleReleaseEditForm(false)
                                    setSingleReleaseId(0)
                                    setEventId(0)
                                }}>Cancel</button>
                            </fieldset>
                        </form>
                    </div>
                )
            }

            {/* BUNDLE FORMS */}


            {
                bundleReleaseForm && (
                    <div className="pop_up_gig">
                        <form className="relativeForm">
                            <fieldset>
                                <div>Title:
                                    <input type="text" id="title" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.title = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div>Date:
                                    <input type="date" id="date" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.date = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div>Time:
                                    <input type="time" id="time" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            const unformattedTime = evt.target.value
                                            const formattedTime = unformattedTime.slice(0, 5) + ":00"
                                            copy.time = formattedTime
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div>Description:
                                    <input type="text" id="description" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.description = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                            </fieldset>
                            <h3>Bundle Release</h3>
                            <fieldset>
                                <div>Bundle Title:
                                    <input type="text" id="bundle_title" onChange={
                                        (evt) => {
                                            const copy = { ...newBundleRelease }
                                            copy.bundle_title = evt.target.value
                                            updateNewBundleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div>Genre:
                                    <input type="text" id="genre" onChange={
                                        (evt) => {
                                            const copy = { ...newBundleRelease }
                                            copy.genre = evt.target.value
                                            updateNewBundleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div>UPC:
                                    <input type="number" id="upc" onChange={
                                        (evt) => {
                                            const copy = { ...newBundleRelease }
                                            copy.upc = evt.target.value
                                            updateNewBundleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div>Audio:
                                    <input type="url" id="audio_url" onChange={
                                        (evt) => {
                                            const copy = { ...newBundleRelease }
                                            copy.audio_url = evt.target.value
                                            updateNewBundleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div>Artwork:
                                    {url === "" ? ""
                                        : <img src={url} alt="artwork" />}
                                    <UploadFile onUpload={handleOnUpload} />
                                </div>
                                <div>Uploaded to Distro:
                                    <input type="checkbox"
                                        value={newBundleRelease.uploaded_to_distro}
                                        onChange={
                                            (evt) => {
                                                const copy = { ...newBundleRelease }
                                                copy.uploaded_to_distro = evt.target.checked
                                                updateNewBundleRelease(copy)
                                            }
                                        } />
                                </div>
                                <button onClick={(clickEvent) => {
                                    bundleSaveButtonClick(clickEvent)
                                    openBundleReleaseForm(false)
                                    setEventType(0)
                                    setURL("")
                                }}>Save</button>
                                <button className="cancelItem" onClick={() => {
                                    openBundleReleaseForm(false)
                                    setEventType(0)
                                    setURL("")
                                }}>Cancel</button>
                            </fieldset>
                        </form>
                    </div>
                )
            }

            {
                bundleReleaseEditForm && (
                    <div className="pop_up_gig">
                        <form className="relativeForm">
                            <fieldset>
                                <div>Title:
                                    <input type="text" id="title" placeholder={eventEdit.title} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.title = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div>Date:
                                    <input type={dateInputType} id="date" placeholder={eventEdit.date} onFocus={() => setDateInputType('date')} onBlur={() => setDateInputType('text')} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.date = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div>Time:
                                    <input type={timeInputType} id="time" placeholder={eventEdit.time} onFocus={() => setTimeInputType('time')} onBlur={() => setTimeInputType('text')} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            const unformattedTime = evt.target.value
                                            const formattedTime = unformattedTime.slice(0, 5) + ":00"
                                            copy.time = formattedTime
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div>Description:
                                    <input type="text" id="description" placeholder={eventEdit.description} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.description = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                            </fieldset>
                            <h3>Bundle Release</h3>
                            <fieldset>
                                <div>Bundle Title:
                                    <input type="text" id="bundle_title" placeholder={bundleEdit.bundle_title} onChange={
                                        (evt) => {
                                            const copy = { ...bundleEdit }
                                            copy.bundle_title = evt.target.value
                                            updateBundleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div>Genre:
                                    <input type="text" id="genre" placeholder={bundleEdit.genre} onChange={
                                        (evt) => {
                                            const copy = { ...bundleEdit }
                                            copy.genre = evt.target.value
                                            updateBundleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div>UPC:
                                    <input type="number" id="upc" placeholder={bundleEdit.upc} onChange={
                                        (evt) => {
                                            const copy = { ...bundleEdit }
                                            copy.upc = evt.target.value
                                            updateBundleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div>Audio:
                                    <input type="url" id="audio_url" placeholder={bundleEdit.audio_url} onChange={
                                        (evt) => {
                                            const copy = { ...bundleEdit }
                                            copy.audio_url = evt.target.value
                                            updateBundleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div>Artwork:
                                    {bundleEditURL === "" ? ""
                                        : <img src={bundleEditURL} alt="artwork" />}
                                    {url === "" ? ""
                                        : <img src={url} alt="artwork" />}
                                    <ReplaceFile onUpload={handleOnUpload} />
                                </div>
                                <div>Uploaded to Distro:
                                    <input type="checkbox"
                                        value={bundleEdit.uploaded_to_distro}
                                        onChange={
                                            (evt) => {
                                                const copy = { ...bundleEdit }
                                                copy.uploaded_to_distro = evt.target.checked
                                                updateBundleEdit(copy)
                                            }
                                        } />
                                </div>
                                <button onClick={(clickEvent) => {
                                    bundleEditButtonClick(clickEvent)
                                    openBundleReleaseEditForm(false)
                                    setBundleReleaseId(0)
                                    setEventId(0)
                                }}>Save</button>
                                <button className="cancelItem" onClick={() => {
                                    openBundleReleaseEditForm(false)
                                    setBundleReleaseId(0)
                                    setEventId(0)
                                }}>Cancel</button>
                            </fieldset>
                        </form>
                    </div>
                )
            }
        </div >

        <div>
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{event.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Time: {event?.extendedProps?.time}</p>
                    <p>Description: {event?.extendedProps?.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseModal}>
                        Close
                    </button>
                    <button className="btn btn-secondary" onClick={async () => {
                        setEventId(parseInt(event.id));
                        await handleCloseModal();
                    }}>
                        Edit
                    </button>
                    <button className="btn btn-secondary" onClick={async () => {
                        await deleteEvent(event.id);
                        const newEvents = await getEvents();
                        setAllEvents(newEvents);
                        handleCloseModal();
                    }}>Delete</button>

                </Modal.Footer>
            </Modal>

        </div>


        {
            listSelected && (
                <div className="listViewContainer">
                    <ul>
                        {
                            events.map((event) => {
                                const formattedListDate = formatDate(event.date)
                                return (
                                    <li className="eventCard" key={event.id} value={event.id}>
                                        <div>
                                            <h3>{event.title}</h3>
                                            <section>{formattedListDate}</section>
                                            <section>{event.description}</section>
                                            <button onClick={() => { setEventListId(event.id) }}>View Details</button>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {
                        viewMatchedSingle && (
                            <div className="pop_up_single">
                                <h3>Title: {matchedSingle.song_title}</h3>
                                <div>Genre: {matchedSingle.genre}</div>
                                <div>UPC: {matchedSingle.upc}</div>
                                <div>ISRC: {matchedSingle.isrc}</div>
                                <div>Composer: {matchedSingle.composer}</div>
                                <div>Producer: {matchedSingle.producer}</div>
                                <div>Explicit: {matchedSingle.explicit ? 'Yes' : 'No'}</div>
                                <div>Audio URL: {matchedSingle.audio_url}</div>
                                <div>Artwork: {matchedSingle.artwork}</div>
                                <div>Ready for Distribution: {matchedSingle.uploaded_to_distro ? 'Yes' : 'No'}</div>
                                <button className="btn btn-secondary" onClick={async () => {
                                    setViewMatchedSingle(false)
                                    setEventListId(0)
                                    setEventId(parseInt(matchedSingle.event.id));
                                }}>
                                    Edit
                                </button>
                                <button className="btn btn-secondary" onClick={async () => {
                                    await deleteEvent(parseInt(matchedSingle.event.id));
                                    const newEvents = await getEvents();
                                    setAllEvents(newEvents);
                                }}>Delete</button>
                                <button onClick={() => {
                                    setViewMatchedSingle(false)
                                    setEventListId(0)
                                }}>Close</button>
                            </div>
                        )
                    }
                    {
                        viewMatchedBundle && (
                            <div className="pop_up_gig">
                                <h3>Title: {matchedBundle.bundle_title}</h3>
                                <div>Genre: {matchedBundle.genre}</div>
                                <div>UPC: {matchedBundle.upc}</div>
                                <div>Audio URL: {matchedBundle.audio_url}</div>
                                <div>Artwork: {matchedBundle.artwork}</div>
                                <div>Ready for Distribution: {matchedBundle.uploaded_to_distro ? 'Yes' : 'No'}</div>
                                <button onClick={() => {
                                    setBundleId(matchedBundle.id)
                                    openBundleSongForm(true)
                                }}>Add Song to Bundle Release</button>
                                {
                                    bundleSongForm && (
                                        <div className="pop_up_rehearsal">
                                            <form className="relativeForm">
                                                <h3>Bundle Song</h3>
                                                <fieldset>
                                                    <div>Song Title:
                                                        <input type="text" id="song_title" onChange={
                                                            (evt) => {
                                                                const copy = { ...newBundleSong }
                                                                copy.song_title = evt.target.value
                                                                updateNewBundleSong(copy)
                                                            }
                                                        } />
                                                    </div>
                                                    <div>Genre:
                                                        <input type="text" id="genre" onChange={
                                                            (evt) => {
                                                                const copy = { ...newBundleSong }
                                                                copy.genre = evt.target.value
                                                                updateNewBundleSong(copy)
                                                            }
                                                        } />
                                                    </div>
                                                    <div>ISRC:
                                                        <input type="number" id="isrc" onChange={
                                                            (evt) => {
                                                                const copy = { ...newBundleSong }
                                                                copy.isrc = evt.target.value
                                                                updateNewBundleSong(copy)
                                                            }
                                                        } />
                                                    </div>
                                                    <div>Composer:
                                                        <input type="text" id="composer" onChange={
                                                            (evt) => {
                                                                const copy = { ...newBundleSong }
                                                                copy.composer = evt.target.value
                                                                updateNewBundleSong(copy)
                                                            }
                                                        } />
                                                    </div>
                                                    <div>Producer:
                                                        <input type="text" id="producer" onChange={
                                                            (evt) => {
                                                                const copy = { ...newBundleSong }
                                                                copy.producer = evt.target.value
                                                                updateNewBundleSong(copy)
                                                            }
                                                        } />
                                                    </div>
                                                    <div>Explicit:
                                                        <input type="checkbox"
                                                            value={newBundleSong.explicit}
                                                            onChange={
                                                                (evt) => {
                                                                    const copy = { ...newBundleSong }
                                                                    copy.explicit = evt.target.checked
                                                                    updateNewBundleSong(copy)
                                                                }
                                                            } />
                                                    </div>
                                                    <button onClick={(clickEvent) => {
                                                        bundleSongSaveButtonClick(clickEvent)
                                                        openBundleSongForm(false)
                                                        setBundleId(0)
                                                    }}>Save</button>
                                                    <button className="cancelItem" onClick={() => {
                                                        openBundleSongForm(false)
                                                        setBundleId(0)
                                                    }}>Cancel</button>
                                                </fieldset>
                                            </form>
                                        </div>
                                    )
                                }
                                {
                                    bundleSongEditForm && (
                                        <div className="pop_up_rehearsal">
                                            <form className="relativeForm">
                                                <h3>Bundle Song</h3>
                                                <fieldset>
                                                    <div>Song Title:
                                                        <input type="text" id="song_title" placeholder={bundleSongEdit.song_title} onChange={
                                                            (evt) => {
                                                                const copy = { ...bundleSongEdit }
                                                                copy.song_title = evt.target.value
                                                                updateBundleSongEdit(copy)
                                                            }
                                                        } />
                                                    </div>
                                                    <div>Genre:
                                                        <input type="text" id="genre" placeholder={bundleSongEdit.genre} onChange={
                                                            (evt) => {
                                                                const copy = { ...bundleSongEdit }
                                                                copy.genre = evt.target.value
                                                                updateBundleSongEdit(copy)
                                                            }
                                                        } />
                                                    </div>
                                                    <div>ISRC:
                                                        <input type="number" id="isrc" placeholder={bundleSongEdit.isrc} onChange={
                                                            (evt) => {
                                                                const copy = { ...bundleSongEdit }
                                                                copy.isrc = evt.target.value
                                                                updateBundleSongEdit(copy)
                                                            }
                                                        } />
                                                    </div>
                                                    <div>Composer:
                                                        <input type="text" id="composer" placeholder={bundleSongEdit.composer} onChange={
                                                            (evt) => {
                                                                const copy = { ...bundleSongEdit }
                                                                copy.composer = evt.target.value
                                                                updateBundleSongEdit(copy)
                                                            }
                                                        } />
                                                    </div>
                                                    <div>Producer:
                                                        <input type="text" id="producer" placeholder={bundleSongEdit.producer} onChange={
                                                            (evt) => {
                                                                const copy = { ...bundleSongEdit }
                                                                copy.producer = evt.target.value
                                                                updateBundleSongEdit(copy)
                                                            }
                                                        } />
                                                    </div>
                                                    <div>Explicit:
                                                        <input type="checkbox"
                                                            value={bundleSongEdit.explicit}
                                                            onChange={
                                                                (evt) => {
                                                                    const copy = { ...bundleSongEdit }
                                                                    copy.explicit = evt.target.checked
                                                                    updateBundleSongEdit(copy)
                                                                }
                                                            } />
                                                    </div>
                                                    <button onClick={(clickEvent) => {
                                                        bundleSongEditButtonClick(clickEvent)
                                                        openBundleSongEditForm(false)
                                                        setBundleSongId(0)
                                                    }}>Save</button>
                                                    <button className="cancelItem" onClick={() => {
                                                        openBundleSongEditForm(false)
                                                        setBundleSongId(0)
                                                    }}>Cancel</button>
                                                </fieldset>
                                            </form>
                                        </div>
                                    )
                                }
                                {
                                    matchedBundleSongs ? (
                                        <div className="matched_bundle_songs">
                                            {
                                                matchedBundleSongs.map(song => {
                                                    return <>
                                                        <li key={song.id} value={song.id}>
                                                            <h3>Title: {song.song_title}</h3>
                                                            <div>Genre: {song.genre}</div>
                                                            <div>ISRC: {song.isrc}</div>
                                                            <div>Composer: {song.composer}</div>
                                                            <div>Producer: {song.producer}</div>
                                                            <div>Explicit: {song.explicit ? 'Yes' : 'No'}</div>
                                                            <button className="btn btn-secondary" onClick={async () => {
                                                                setBundleSongId(song.id)
                                                            }}>
                                                                Edit
                                                            </button>
                                                            <button className="btn btn-secondary" onClick={async () => {
                                                                await deleteBundleSong(parseInt(song.id));
                                                                const newBundleSongs = await getBundleSongs();
                                                                setBundleSongs(newBundleSongs);
                                                            }}>Delete</button>
                                                        </li>
                                                    </>
                                                })
                                            }
                                        </div>
                                    )
                                        :
                                        ""
                                }
                                <div>
                                    <button className="btn btn-secondary" onClick={async () => {
                                        setViewMatchedBundle(false)
                                        setEventListId(0)
                                        setEventId(parseInt(matchedBundle.event.id));
                                    }}>
                                        Edit
                                    </button>
                                    <button className="btn btn-secondary" onClick={async () => {
                                        await deleteEvent(parseInt(matchedBundle.event.id));
                                        const newEvents = await getEvents();
                                        setAllEvents(newEvents);
                                    }}>Delete</button>
                                    <button onClick={() => {
                                        setViewMatchedBundle(false)
                                        setEventListId(0)
                                    }}>Close</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            )
        }


        {
            calendarSelected && (

                <div className="react-calendar">
                    <FullCalendar
                        // defaultView="dayGridMonth"
                        // header={{
                        //     left: "prev,next",
                        //     center: "title",
                        //     right: "dayGridMonth,timeGridWeek,timeGridDay",
                        //     height: "auto"
                        // }}
                        themeSystem="Simplex"
                        plugins={[dayGridPlugin]}
                        events={events}
                        eventClick={(info) => {
                            setEvent(info.event);
                            handleShowModal();
                        }} />
                </div>
            )
        }


    </>;
}
