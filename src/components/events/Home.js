// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";

import { useEffect, useState } from "react";
import { getEvents, getSingleReleases, getEventTypes, deleteEvent, getEventById, editEvent, editSingleRelease, addEvent, addBundle, addGig, addRehearsal, getSingleById, addSingle } from "./EventManager";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-bootstrap/Modal";
import "./event.css"

export const Home = () => {
    const localUser = localStorage.getItem("userId");
    const [singleReleases, setSingleReleases] = useState([])
    const [eventTypes, setEventTypes] = useState([])
    const [eventType, setEventType] = useState(0)
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState({
        user: 0,
        event_type: 0,
        title: "",
        date: "",
        time: "",
        description: ""
    });
    const [singleReleaseId, setSingleReleaseId] = useState(0)
    const [eventId, setEventId] = useState(0)
    const [dateInputType, setDateInputType] = useState('text');
    const [timeInputType, setTimeInputType] = useState('text');
    const [showModal, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [singleForm, openSingleForm] = useState(false);
    const [singleEditForm, openSingleEditForm] = useState(false);
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
    const [bundleForm, openBundleForm] = useState(false);
    const [rehearsalForm, openRehearsalForm] = useState(false);
    const [gigForm, openGigForm] = useState(false);
    const [newForm, openNewForm] = useState(false);
    const [eventEditForm, openEventEditForm] = useState(false);
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
    // const [newBundleRelease, updateNewBundleRelease] = useState({
    //     event: 0,
    //     bundle_title: "",
    //     genre: "",
    //     upc: 0,
    //     audio_url: "",
    //     artwork: "",
    //     uploaded_to_distro: false
    // })
    // const [newRehearsal, updateNewRehearsal] = useState({
    //     event: 0,
    //     location: "",
    //     band_info: ""
    // })
    // const [newGig, updateNewGig] = useState({
    //     event: 0,
    //     city_state: "",
    //     venue: "",
    //     band_info: "",
    //     age_requirement: "",
    //     ticket_price: 0,
    //     ticket_link: "",
    //     guarantee: 0,
    //     sold_out: false,
    //     announced: false,
    //     flier: "",
    //     stage_plot: "",
    //     input_list: ""
    // })


    useEffect(
        () => {
            getEvents().then((data) => {
                setEvents(data)
            })
        }, []
    )

    useEffect(
        () => {
            getEventTypes().then((data) => {
                setEventTypes(data)
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
        
        console.log(singleReleases)



    useEffect(() => {
        if (eventType === 1) {
            openSingleForm(true)
        }
        if (eventType === 2) {
            openBundleForm(true)
        }
        if (eventType === 3) {
            openRehearsalForm(true)
        }
        if (eventType === 4) {
            openGigForm(true)
        }
        if (eventType === 5) {
            openNewForm(true)
        }
    }, [eventType])




    useEffect(() => {
        if (eventId) {
          getEventById(eventId).then((res) => {
            updateEventEdit(res);
            const matchedSingle = singleReleases.find(single => single.event.id === eventId);
            if (matchedSingle) {
              setSingleReleaseId(matchedSingle.id);
            }
          });
        }
      }, [eventId]);


    useEffect(() => {
        if (singleReleaseId) {
            getSingleById(singleReleaseId).then((res) => {
                updateSingleEdit(res)
            })
        }
    }, [singleReleaseId])







    const handleShowModal = () => {
        setShowModal(true);
    };


    const handleCloseModal = () => {
        return new Promise((resolve) => {
            setShowModal(false);
            resolve();
        });
    };



    


    const openEditFormAsync = () => {
        return new Promise((resolve) => {
            if (eventId) {
                openEventEditForm(true)
                if (singleReleaseId) {
                    openSingleEditForm(true)
                    openEventEditForm(false)
                }
            }
            resolve();
        });
    };
    
    
    // if (eventId && bundleReleaseId) {
    //     openBundleEditForm(true)
    // }
    // if (eventId && rehearsalId) {
    //     openRehearsalEditForm(true)
    // }
    // if (eventId && gigId) {
    //     openGigEditForm(true)
    // }





    // POST SINGLE

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
                addSingle(singleToSendToAPI)
            })

        const newEvents = await getEvents()
        setEvents(newEvents)
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
        setEvents(newEvents)
    }



    // POST EVENT

    const eventSaveButtonClick = async (event) => {
        event.preventDefault()

        const eventToSendToAPI = {
            user: parseInt(localUser),
            event_type: parseInt(eventType),
            title: newEvent.title,
            date: newEvent.date,
            time: newEvent.time,
            description: newEvent.description
        }
        console.log(eventToSendToAPI)

        await addEvent(eventToSendToAPI)
            .then(response => response.json())

        const newEvents = await getEvents()
        setEvents(newEvents)
    }

    // EDIT EVENT

    const eventEditButtonClick = async (event) => {
        event.preventDefault()

        const editToSendToAPI = {
            id: eventId,
            user: parseInt(localUser),
            event_type: eventEdit.event_type.id,
            title: eventEdit.title,
            date: eventEdit.date,
            time: eventEdit.time,
            description: eventEdit.description
        }

        console.log(editToSendToAPI)

        await editEvent(editToSendToAPI)

        const newEvents = await getEvents()
        setEvents(newEvents)
    }


















    return <>

        <div>
            <button onClick={() => setIsOpen(true)}>
                Add New Event
            </button>

            {isOpen && (
                <div>
                    <div>
                        <select onChange={
                            (evt) => {
                                setEventType(parseInt(evt.target.value))
                                setIsOpen(false)
                            }
                        } >
                            <option value="0">Select Event Type...</option>
                            {
                                eventTypes.map(type => {
                                    return <option key={type?.id} value={type?.id}>{type?.label}</option>
                                })
                            }
                        </select>
                    </div>
                    <button onClick={() => setIsOpen(false)}>
                        Cancel
                    </button>
                </div>
            )}




            {singleForm && (
                <div>
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
                                openSingleForm(false)
                                setEventType(0)
                            }}>Save</button>
                            <button className="cancelItem" onClick={() => {
                                openSingleForm(false)
                                setEventType(0)
                            }}>Cancel</button>
                        </fieldset>
                    </form>
                </div>
            )}

            {singleEditForm && (
                <div>
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
                        <h3>Single Release</h3>
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
                                openSingleEditForm(false)
                                // setEventType(0)
                            }}>Save</button>
                            <button className="cancelItem" onClick={() => {
                                openSingleEditForm(false)
                                // setEventType(0)
                            }}>Cancel</button>
                        </fieldset>
                    </form>
                </div>
            )}

            {newForm && (
                <div>
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
                            <button onClick={(clickEvent) => {
                                eventSaveButtonClick(clickEvent)
                                openNewForm(false)
                                setEventType(0)
                            }}>Save</button>
                            <button className="cancelItem" onClick={() => {
                                openNewForm(false)
                                setEventType(0)
                            }}>Cancel</button>
                        </fieldset>
                    </form>
                </div>
            )}

            {eventEditForm && (
                <div>
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
                            <button onClick={(clickEvent) => {
                                eventEditButtonClick(clickEvent)
                                openEventEditForm(false)
                            }}>Save</button>
                            <button className="cancelItem" onClick={() => openEventEditForm(false)}>Cancel</button>
                        </fieldset>
                    </form>
                </div>
            )}
        </div>

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
                    <p>Description: {event?.extendedProps?.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseModal}>
                        Close
                    </button>
                    <button className="btn btn-secondary" onClick={async () => {
                        setEventId(parseInt(event.id));
                        await handleCloseModal();
                        await openEditFormAsync();
                    }}>
                        Edit
                    </button>
                    <button className="btn btn-secondary" onClick={async () => {
                        await deleteEvent(event.id);
                        const newEvents = await getEvents();
                        setEvents(newEvents);
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
























// const bundleHandleSaveButtonClick = (event) => {
//     event.preventDefault()

//     const eventToSendToAPI = {
//         event_type: newEvent.eventType,
//         title: newEvent.title,
//         date: newEvent.date,
//         time: newEvent.time,
//         description: newEvent.description
//     }

//     let bundleToSendToAPI = {
//         bundle_title: newSingleRelease.bundle_title,
//         genre: newSingleRelease.genre,
//         upc: newSingleRelease.upc,
//         audio_url: newSingleRelease.audio_url,
//         artwork: newSingleRelease.artwork,
//         uploaded_to_distro: newSingleRelease.uploaded_to_distro
//     }

//     addEvent(eventToSendToAPI)
//         .then(response => response.json())
//         .then(createdEvent => {
//             bundleToSendToAPI.event = parseInt(createdEvent.id)
//             addBundle(bundleToSendToAPI)
//         })
// }









// const rehearsalHandleSaveButtonClick = (event) => {
//     event.preventDefault()

//     const eventToSendToAPI = {
//         event_type: newEvent.eventType,
//         title: newEvent.title,
//         date: newEvent.date,
//         time: newEvent.time,
//         description: newEvent.description
//     }

//     let rehearsalToSendToAPI = {
//         location: newRehearsal.location,
//         band_info: newRehearsal.band_info
//     }

//     addEvent(eventToSendToAPI)
//         .then(response => response.json())
//         .then(createdEvent => {
//             rehearsalToSendToAPI.event = parseInt(createdEvent.id)
//             addRehearsal(rehearsalToSendToAPI)
//         })
// }









// const gigHandleSaveButtonClick = (event) => {
//     event.preventDefault()

//     const eventToSendToAPI = {
//         event_type: newEvent.eventType,
//         title: newEvent.title,
//         date: newEvent.date,
//         time: newEvent.time,
//         description: newEvent.description
//     }

//     let gigToSendToAPI = {
//         city_state: newGig.city_state,
//         venue: newGig.venue,
//         band_info: newGig.band_info,
//         age_requirement: newGig.age_requirement,
//         ticket_price: newGig.ticket_price,
//         ticket_link: newGig.ticket_link,
//         guarantee: newGig.guarantee,
//         sold_out: newGig.sold_out,
//         announced: newGig.announced,
//         flier: newGig.flier,
//         stage_plot: newGig.stage_plot,
//         input_list: newGig.input_list
//     }

//     addEvent(eventToSendToAPI)
//         .then(response => response.json())
//         .then(createdEvent => {
//             gigToSendToAPI.event = parseInt(createdEvent.id)
//             addGig(gigToSendToAPI)
//         })
// }


















































