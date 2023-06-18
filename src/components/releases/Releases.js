import { useEffect, useState } from "react";
import { getEvents, getEventsByType, deleteEvent, getEventById, editEvent, addEvent, getSingleReleases, getSingleReleaseById, addSingleRelease, editSingleRelease, getBundleReleases, getBundleReleaseById, addBundleRelease, editBundleRelease } from "./ReleaseManager";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-bootstrap/Modal";
import "./releases.css"
// import '@fullcalendar/common/main.css';
// import '@fullcalendar/daygrid/main.css';

export const Releases = () => {
    const localUser = localStorage.getItem("userId");
    const [allEvents, setAllEvents] = useState([])
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState({});
    const [eventType, setEventType] = useState(0)
    const [showModal, setShowModal] = useState(false);
    const [filteredByType, setFilteredByType] = useState(0)
    const [checkedIndex, setCheckedIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [dateInputType, setDateInputType] = useState('');
    const [timeInputType, setTimeInputType] = useState('');
    const [eventId, setEventId] = useState(0)
    const [singleReleaseId, setSingleReleaseId] = useState(0)
    const [bundleReleaseId, setBundleReleaseId] = useState(0)
    const [singleReleases, setSingleReleases] = useState([])
    const [bundleReleases, setBundleReleases] = useState([])
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





    useEffect(() => {
        const eventArr = [
            ...singleReleases.flatMap(singleRelease =>
                allEvents.filter(event => event.id === singleRelease.event.id)
            ),
            ...bundleReleases.flatMap(bundleRelease =>
                allEvents.filter(event => event.id === bundleRelease.event.id)
            )
        ];

        setEvents(eventArr);
    }, [allEvents, singleReleases, bundleReleases]);







    useEffect(() => {
        if (eventType === 3) {
            openSingleReleaseForm(true)
        }
        if (eventType === 4) {
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
            })
        }
        if (bundleReleaseId) {
            getBundleReleaseById(bundleReleaseId).then((res) => {
                updateBundleEdit(res)
            })
        }
    }, [singleReleaseId, bundleReleaseId])



    useEffect(() => {
        if (eventId && singleReleaseId) {
            openSingleReleaseEditForm(true)
        }
        if (eventId && bundleReleaseId) {
            openBundleReleaseEditForm(true)
        }
    }, [bundleReleaseId, singleReleaseId])




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



















    return <>

        <div className="container">
            <div className="button-checkbox-container">
                <button onClick={() => setIsOpen(true)}>
                    Add New Event
                </button>
                <span className="filterBox">
                    <span className="filterThree">
                        Show All <input type="checkbox" checked={checkedIndex === 0} onChange={() => handleCheckboxChange(0)}
                            onClick={() => setFilteredByType(0)} />
                    </span>
                    <span className="filterThree">
                        Show Single Releases Only <input type="checkbox" checked={checkedIndex === 1} onChange={() => handleCheckboxChange(1)}
                            onClick={() => setFilteredByType(1)} />
                    </span>
                    <span className="filterFour">
                        Show Bundle Releases Only <input type="checkbox" checked={checkedIndex === 2} onChange={() => handleCheckboxChange(2)}
                            onClick={() => setFilteredByType(2)} />
                    </span>
                </span>
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
                                    <input type="url" id="artwork" onChange={
                                        (evt) => {
                                            const copy = { ...newSingleRelease }
                                            copy.artwork = evt.target.value
                                            updateNewSingleRelease(copy)
                                        }
                                    } />
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
                                }}>Save</button>
                                <button className="cancelItem" onClick={() => {
                                    openSingleReleaseForm(false)
                                    setEventType(0)
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
                                    <input type="url" id="artwork" onChange={
                                        (evt) => {
                                            const copy = { ...newBundleRelease }
                                            copy.artwork = evt.target.value
                                            updateNewBundleRelease(copy)
                                        }
                                    } />
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
                                }}>Save</button>
                                <button className="cancelItem" onClick={() => {
                                    openBundleReleaseForm(false)
                                    setEventType(0)
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
                                    <input type="url" id="artwork" placeholder={bundleEdit.artwork} onChange={
                                        (evt) => {
                                            const copy = { ...bundleEdit }
                                            copy.artwork = evt.target.value
                                            updateBundleEdit(copy)
                                        }
                                    } />
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
    </>;
}
