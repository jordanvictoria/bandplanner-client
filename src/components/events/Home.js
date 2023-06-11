// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";

import { useEffect, useState } from "react";
import { getEvents, getEventTypes, deleteEvent, editEvent, addEvent, addBundle, addGig, addRehearsal, addSingle } from "./EventManager";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-bootstrap/Modal";
import "./event.css"

export const Home = () => {
    const localUser = localStorage.getItem('bandUserId')
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState({
        event_type: 0,
        title: "",
        date: "",
        time: "",
        description: ""
    });
    const [eventTypes, setEventTypes] = useState([])
    const [eventType, setEventType] = useState(0)
    const [showModal, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [newForm, openNewForm] = useState(false);
    const [newEvent, updateNewEvent] = useState({
        user: 0,
        event_type: 0,
        title: "",
        date: "",
        time: "",
        description: ""
    })
    const [newSingleRelease, updateNewSingleRelease] = useState({
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
    const [newBundleRelease, updateNewBundleRelease] = useState({
        event: 0,
        bundle_title: "",
        genre: "",
        upc: 0,
        audio_url: "",
        artwork: "",
        uploaded_to_distro: false
    })
    const [newRehearsal, updateNewRehearsal] = useState({
        event: 0,
        location: "",
        band_info: ""
    })
    const [newGig, updateNewGig] = useState({
        event: 0,
        city_state: "",
        venue: "",
        band_info: "",
        age_requirement: "",
        ticket_price: 0,
        ticket_link: "",
        guarantee: 0,
        sold_out: false,
        announced: false,
        flier: "",
        stage_plot: "",
        input_list: ""
    })


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


    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };






   


    const eventHandleSaveButtonClick = (event) => {
        event.preventDefault()

        const eventToSendToAPI = {
            user: parseInt(localUser.id),
            event_type: parseInt(eventType),
            title: newEvent.title,
            date: newEvent.date,
            time: newEvent.time,
            description: newEvent.description
        }
        console.log(eventToSendToAPI)

        addEvent(eventToSendToAPI)
            .then(response => response.json())
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
                                setEventType(evt.target.value)
                                setIsOpen(false)
                                openNewForm(true)
                            }
                        } >
                            <option value="0">Select Event Type...</option>
                            {
                                eventTypes.map(type => {
                                    return <option key={type?.id} value={parseInt(type?.id)}>{type?.label}</option>
                                })
                            }
                        </select>
                    </div>
                    <button onClick={() => setIsOpen(false)}>
                        Cancel
                    </button>
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
                                eventHandleSaveButtonClick(clickEvent)
                                openNewForm(false)
                            }}>Save</button>
                            <button className="cancelItem" onClick={() => openNewForm(false)}>Cancel</button>
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
                    <button className="btn btn-secondary">
                        Edit
                    </button>
                    <button className="btn btn-secondary" onClick={() =>
                        deleteEvent(event.id)
                    }>Delete
                    </button>
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
                    console.log(event)
                    handleShowModal();
                }} />
        </div>
    </>;
}

















// const singleHandleSaveButtonClick = (event) => {
//     event.preventDefault()

//     const eventToSendToAPI = {
//         event_type: newEvent.eventType,
//         title: newEvent.title,
//         date: newEvent.date,
//         time: newEvent.time,
//         description: newEvent.description
//     }

//     let singleToSendToAPI = {
//         song_title: newSingleRelease.song_title,
//         genre: newSingleRelease.genre,
//         upc: newSingleRelease.upc,
//         isrc: newSingleRelease.isrc,
//         composer: newSingleRelease.composer,
//         producer: newSingleRelease.producer,
//         explicit: newSingleRelease.explicit,
//         audio_url: newSingleRelease.audio_url,
//         artwork: newSingleRelease.artwork,
//         uploaded_to_distro: newSingleRelease.uploaded_to_distro
//     }

//     addEvent(eventToSendToAPI)
//         .then(response => response.json())
//         .then(createdEvent => {
//             singleToSendToAPI.item = parseInt(createdEvent.id)
//             addSingle(singleToSendToAPI)
//         })
// }







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


















































