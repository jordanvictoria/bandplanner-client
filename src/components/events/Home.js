// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";

import { useEffect, useState } from "react";
import { getEvents, getEventTypes, getEventsByType, deleteEvent, getEventById, editEvent, addEvent, getSingleReleases, getSingleById, addSingle, editSingleRelease, getBundleReleases, getBundleById, addBundle, editBundleRelease, getRehearsals, getRehearsalById, addRehearsal, editRehearsal, getGigs, getGigById, addGig, editGig } from "./EventManager";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-bootstrap/Modal";
import { UploadFile } from "../cloudinary/UploadFile"
import "./event.css"

export const Home = () => {
    const localUser = localStorage.getItem("userId");
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState({});
    const [eventTypes, setEventTypes] = useState([])
    const [eventType, setEventType] = useState(0)
    const [singleURL, setSingleURL] = useState("")
    const [bundleURL, setBundleURL] = useState("")
    const [flierURL, setFlierURL] = useState("")
    const [stagePlotURL, setStagePlotURL] = useState("")
    const [inputListURL, setInputListURL] = useState("")
    const [singleEditURL, setSingleEditURL] = useState("")
    const [bundleEditURL, setBundleEditURL] = useState("")
    const [flierEditURL, setFlierEditURL] = useState("")
    const [stagePlotEditURL, setStagePlotEditURL] = useState("")
    const [inputListEditURL, setInputListEditURL] = useState("")
    const [error, updateError] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [filteredByType, setFilteredByType] = useState(0)
    const [checkedIndex, setCheckedIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [dateInputType, setDateInputType] = useState('text');
    const [timeInputType, setTimeInputType] = useState('text');
    const [eventId, setEventId] = useState(0)
    const [singleReleaseId, setSingleReleaseId] = useState(0)
    const [bundleReleaseId, setBundleReleaseId] = useState(0)
    const [rehearsalId, setRehearsalId] = useState(0)
    const [gigId, setGigId] = useState(0)
    const [singleReleases, setSingleReleases] = useState([])
    const [bundleReleases, setBundleReleases] = useState([])
    const [rehearsals, setRehearsals] = useState([])
    const [gigs, setGigs] = useState([])
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
    const [bundleEditForm, openBundleEditForm] = useState(false);
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
    const [rehearsalForm, openRehearsalForm] = useState(false);
    const [rehearsalEditForm, openRehearsalEditForm] = useState(false);
    const [newRehearsal, updateNewRehearsal] = useState({
        user: 0,
        event: 0,
        location: "",
        band_info: ""
    })
    const [rehearsalEdit, updateRehearsalEdit] = useState({
        id: 0,
        user: 0,
        event: 0,
        location: "",
        band_info: ""
    })
    const [gigForm, openGigForm] = useState(false);
    const [gigEditForm, openGigEditForm] = useState(false);
    const [newGig, updateNewGig] = useState({
        user: 0,
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
    const [gigEdit, updateGigEdit] = useState({
        id: 0,
        user: 0,
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





    // USE EFFECTS

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

    useEffect(
        () => {
            getBundleReleases().then((data) => {
                setBundleReleases(data)
            })
        }, []
    )
    useEffect(
        () => {
            getRehearsals().then((data) => {
                setRehearsals(data)
            })
        }, []
    )

    useEffect(
        () => {
            getGigs().then((data) => {
                setGigs(data)
            })
        }, []
    )




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
                const matchedBundle = bundleReleases.find(bundle => bundle.event.id === eventId);
                const matchedRehearsal = rehearsals.find(rehearsal => rehearsal.event.id === eventId);
                console.log(gigs)
                const matchedGig = gigs.find(gig => gig.event.id === eventId);
                if (matchedSingle) {
                    setSingleReleaseId(matchedSingle.id);
                }
                if (matchedBundle) {
                    setBundleReleaseId(matchedBundle.id);
                }
                if (matchedRehearsal) {
                    setRehearsalId(matchedRehearsal.id);
                }
                if (matchedGig) {
                    setGigId(matchedGig.id);
                }

            });
        }
    }, [eventId]);


    useEffect(() => {
        if (singleReleaseId) {
            getSingleById(singleReleaseId).then((res) => {
                updateSingleEdit(res)
                setSingleEditURL(res.artwork)
            })
        }
        if (bundleReleaseId) {
            getBundleById(bundleReleaseId).then((res) => {
                updateBundleEdit(res)
                setBundleEditURL(res.artwork)
            })
        }
        if (rehearsalId) {
            getRehearsalById(rehearsalId).then((res) => {
                updateRehearsalEdit(res)
            })
        }
        if (gigId) {
            getGigById(gigId).then((res) => {
                updateGigEdit(res)
                setFlierEditURL(res.flier)
                setStagePlotEditURL(res.stage_plot)
                setInputListEditURL(res.input_list)
            })
        }
    }, [singleReleaseId, bundleReleaseId, rehearsalId, gigId])



    useEffect(() => {
        if (eventId) {
            openEventEditForm(true)
        }
        if (eventId && singleReleaseId) {
            openEventEditForm(false)
            openSingleEditForm(true)
        }
        if (eventId && bundleReleaseId) {
            openEventEditForm(false)
            openBundleEditForm(true)
        }
        if (eventId && rehearsalId) {
            openEventEditForm(false)
            openRehearsalEditForm(true)
        }
        if (eventId && gigId) {
            openEventEditForm(false)
            openGigEditForm(true)
        }
    }, [eventId, singleReleaseId, bundleReleaseId, gigId, rehearsalId])




    useEffect(
        () => {
            if (filteredByType !== 0) {
                getEventsByType(parseInt(filteredByType))
                    .then((data) => { setEvents(data) })
            } else {
                getEvents().then((data) => {
                    setEvents(data)
                })
            }

        }, [filteredByType]
    )




    useEffect(
        () => {
            if (singleURL !== "") {
                if (singleForm) {
                    HandleNewSingleChange(singleURL)
                }
                if (singleEditForm) {
                    HandleSingleEditChange(singleURL)
                }
            }
            if (bundleURL !== "") {
                if (bundleForm) {
                    HandleNewBundleChange(bundleURL)
                }
                if (bundleEditForm) {
                    HandleBundleEditChange(bundleURL)
                }
            }
            if (gigForm) {
                if (flierURL !== "") {
                    HandleNewFlierChange(flierURL)
                }
                if (stagePlotURL !== "") {
                    HandleNewStagePlotChange(stagePlotURL)
                }
                if (inputListURL !== "") {
                    HandleNewInputListChange(inputListURL)
                }
            }
            if (gigEditForm) {
                if (flierURL !== "") {
                    HandleFlierEditChange(flierURL)
                }
                if (stagePlotURL !== "") {
                    HandleStagePlotEditChange(stagePlotURL)
                }
                if (inputListURL !== "") {
                    HandleInputListEditChange(inputListURL)
                }
            }
        }, [singleURL, bundleURL, flierURL, stagePlotURL, inputListURL])







    // CLOUDINARY

    function handleSingleUpload(error, result, widget) {
        if (error) {
            updateError(error);
            widget.close({
                quiet: true
            });
            return;
        }
        setSingleURL(result?.info?.secure_url)
    }

    function handleBundleUpload(error, result, widget) {
        if (error) {
            updateError(error);
            widget.close({
                quiet: true
            });
            return;
        }
        setBundleURL(result?.info?.secure_url)
    }

    function handleFlierUpload(error, result, widget) {
        if (error) {
            updateError(error);
            widget.close({
                quiet: true
            });
            return;
        }
        setFlierURL(result?.info?.secure_url)
    }

    function handleStagePlotUpload(error, result, widget) {
        if (error) {
            updateError(error);
            widget.close({
                quiet: true
            });
            return;
        }
        setStagePlotURL(result?.info?.secure_url)
    }

    function handleInputListUpload(error, result, widget) {
        if (error) {
            updateError(error);
            widget.close({
                quiet: true
            });
            return;
        }
        setInputListURL(result?.info?.secure_url)
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

    const HandleNewFlierChange = (url) => {
        const copy = { ...newGig }
        copy.flier = url
        updateNewGig(copy)
    }

    const HandleNewStagePlotChange = (url) => {
        const copy = { ...newGig }
        copy.stage_plot = url
        updateNewGig(copy)
    }

    const HandleNewInputListChange = (url) => {
        const copy = { ...gigEdit }
        copy.input_list = url
        updateNewGig(copy)
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


    const HandleFlierEditChange = (url) => {
        setFlierEditURL("")
        const copy = { ...gigEdit }
        copy.flier = url
        updateGigEdit(copy)
    }

    const HandleStagePlotEditChange = (url) => {
        setStagePlotEditURL("")
        const copy = { ...gigEdit }
        copy.stage_plot = url
        updateGigEdit(copy)
    }

    const HandleInputListEditChange = (url) => {
        setInputListEditURL("")
        const copy = { ...gigEdit }
        copy.input_list = url
        updateGigEdit(copy)
    }






























    // CHECKBOX


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



    const formatTime = (time) => {
        if (!time) {
            return ''; // Return empty string or some default value if time is undefined
        }

        const [hours, minutes] = time.split(':');
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);

        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
            .replace(/^(\d+:\d+)(:\d+)?\s*(AM|PM)$/, '$1$3');
    };








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

        const newSingles = await getSingleReleases()
        setSingleReleases(newSingles)
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
        setEvents(newEvents)

        const newSingles = await getSingleReleases()
        setSingleReleases(newSingles)
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
                addBundle(bundleToSendToAPI)
            })

        const newEvents = await getEvents()
        setEvents(newEvents)
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
        setEvents(newEvents)
    }



    // POST REHEARSAL

    const rehearsalSaveButtonClick = async (event) => {
        event.preventDefault()

        const eventToSendToAPI = {
            user: parseInt(localUser),
            event_type: parseInt(eventType),
            title: newEvent.title,
            date: newEvent.date,
            time: newEvent.time,
            description: newEvent.description
        }


        let rehearsalToSendToAPI = {
            user: parseInt(localUser),
            location: newRehearsal.location,
            band_info: newRehearsal.band_info,
        }

        await addEvent(eventToSendToAPI)
            .then(response => response.json())
            .then(createdEvent => {
                rehearsalToSendToAPI.event = parseInt(createdEvent.id)
                addRehearsal(rehearsalToSendToAPI)
            })

        const newEvents = await getEvents()
        setEvents(newEvents)

        const newRehearsals = await getRehearsals()
        setRehearsals(newRehearsals)
    }


    // EDIT REHEARSAL

    const rehearsalEditButtonClick = async (event) => {
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
            editRehearsal({
                id: rehearsalId,
                user: parseInt(localUser),
                event: eventId,
                location: rehearsalEdit.location,
                band_info: rehearsalEdit.band_info
            })
        })

        const newEvents = await getEvents()
        setEvents(newEvents)
    }

    // POST GIG

    const gigSaveButtonClick = async (event) => {
        event.preventDefault()

        const eventToSendToAPI = {
            user: parseInt(localUser),
            event_type: parseInt(eventType),
            title: newEvent.title,
            date: newEvent.date,
            time: newEvent.time,
            description: newEvent.description
        }


        let gigToSendToAPI = {
            user: parseInt(localUser),
            city_state: newGig.city_state,
            venue: newGig.venue,
            band_info: newGig.band_info,
            age_requirement: newGig.age_requirement,
            ticket_price: newGig.ticket_price,
            ticket_link: newGig.ticket_link,
            guarantee: newGig.guarantee,
            sold_out: newGig.sold_out,
            announced: newGig.announced,
            flier: newGig.flier,
            stage_plot: newGig.stage_plot,
            input_list: newGig.input_list
        }

        await addEvent(eventToSendToAPI)
            .then(response => response.json())
            .then(createdEvent => {
                gigToSendToAPI.event = parseInt(createdEvent.id)
                addGig(gigToSendToAPI)
            })

        const newEvents = await getEvents()
        setEvents(newEvents)
    }


    // EDIT GIG

    const gigEditButtonClick = async (event) => {
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
            editGig({
                id: gigId,
                user: parseInt(localUser),
                event: eventId,
                city_state: gigEdit.city_state,
                venue: gigEdit.venue,
                band_info: gigEdit.band_info,
                age_requirement: gigEdit.age_requirement,
                ticket_price: gigEdit.ticket_price,
                ticket_link: gigEdit.ticket_link,
                guarantee: gigEdit.guarantee,
                sold_out: gigEdit.sold_out,
                announced: gigEdit.announced,
                flier: gigEdit.flier,
                stage_plot: gigEdit.stage_plot,
                input_list: gigEdit.input_list
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

        <div className="site-background">
            <div className="header">
                <div className="button-wrap">

                    <button className="new-add-event-button new-custom-button" onClick={() => setIsOpen(true)}>
                        Add New Event
                    </button>
                </div>
            </div>


            <div className="content">
                <div className="calendar-wrapper">
                    <div className="new-react-calendar">
                        <FullCalendar
                            themeSystem="Simplex"
                            plugins={[dayGridPlugin]}
                            events={events}
                            eventClick={(info) => {
                                setEvent(info.event);
                                handleShowModal();
                            }} />
                    </div>
                </div>
                <div className="filter-wrapper">
                    <div className="new-filter-box">
                        <div className="new-filters">
                            <label>

                                <input type="checkbox" checked={checkedIndex === 0} onChange={() => handleCheckboxChange(0)}
                                    onClick={() => setFilteredByType(0)} /> Show All
                            </label>
                        </div>
                        <div className="new-filters" >
                            <label>

                                <input type="checkbox" checked={checkedIndex === 1} onChange={() => handleCheckboxChange(1)}
                                    onClick={() => setFilteredByType(1)} /> Show Single Releases
                            </label>
                        </div>
                        <div className="new-filters" >
                            <label>

                                <input type="checkbox" checked={checkedIndex === 2} onChange={() => handleCheckboxChange(2)}
                                    onClick={() => setFilteredByType(2)} /> Show Bundle Releases
                            </label>
                        </div>
                        <div className="new-filters" >
                            <label>

                                <input type="checkbox" checked={checkedIndex === 3} onChange={() => handleCheckboxChange(3)}
                                    onClick={() => setFilteredByType(3)} /> Show Rehearsals
                            </label>
                        </div>
                        <div className="new-filters" >
                            <label>

                                <input type="checkbox" checked={checkedIndex === 4} onChange={() => handleCheckboxChange(4)}
                                    onClick={() => setFilteredByType(4)} /> Show Gigs
                            </label>
                        </div>
                    </div>
                </div>
            </div>




            {
                isOpen && (
                    <div className="new_pop_up">
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
                )
            }


            {/* SINGLE FORMS */}

            {
                singleForm && (
                    <div className="new_single_form">
                        <form>
                            <fieldset>
                                <div className="formRow">Title:
                                    <input type="text" id="title" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.title = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Date:
                                    <input type="date" id="date" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.date = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Time:
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
                                <div className="formRow">Description:
                                    <input type="text" id="description" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.description = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Song Title:
                                    <input type="text" id="song_title" onChange={
                                        (evt) => {
                                            const copy = { ...newSingleRelease }
                                            copy.song_title = evt.target.value
                                            updateNewSingleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Genre:
                                    <input type="text" id="genre" onChange={
                                        (evt) => {
                                            const copy = { ...newSingleRelease }
                                            copy.genre = evt.target.value
                                            updateNewSingleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">UPC:
                                    <input type="number" id="upc" onChange={
                                        (evt) => {
                                            const copy = { ...newSingleRelease }
                                            copy.upc = evt.target.value
                                            updateNewSingleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">ISRC:
                                    <input type="number" id="isrc" onChange={
                                        (evt) => {
                                            const copy = { ...newSingleRelease }
                                            copy.isrc = evt.target.value
                                            updateNewSingleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Composer:
                                    <input type="text" id="composer" onChange={
                                        (evt) => {
                                            const copy = { ...newSingleRelease }
                                            copy.composer = evt.target.value
                                            updateNewSingleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Producer:
                                    <input type="text" id="producer" onChange={
                                        (evt) => {
                                            const copy = { ...newSingleRelease }
                                            copy.producer = evt.target.value
                                            updateNewSingleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Explicit:
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
                                <div className="formRow">Audio:
                                    <input type="url" id="audio_url" onChange={
                                        (evt) => {
                                            const copy = { ...newSingleRelease }
                                            copy.audio_url = evt.target.value
                                            updateNewSingleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Artwork:

                                    {singleURL === "" ? ""
                                        : <img className="compressedImg" src={singleURL} alt="artwork" />}

                                    <UploadFile onUpload={handleSingleUpload} />
                                </div>
                                <div className="formRow">Uploaded to Distro:
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
                                <div className="formButtons">

                                    <button onClick={(clickEvent) => {
                                        singleSaveButtonClick(clickEvent)
                                        openSingleForm(false)
                                        setEventType(0)
                                        setSingleURL("")
                                    }}>Save</button>
                                    <button className="cancelItem" onClick={() => {
                                        openSingleForm(false)
                                        setEventType(0)
                                        setSingleURL("")
                                    }}>Cancel</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                )
            }

            {
                singleEditForm && (
                    <div className="single_form">
                        <form>
                            <fieldset>
                                <div className="formRow">Title:
                                    <input required autoFocus type="text" id="title" placeholder={eventEdit.title} value={eventEdit.title} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.title = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Date:
                                    <input type={dateInputType} id="date" placeholder={eventEdit.date} onFocus={() => setDateInputType('date')} onBlur={() => setDateInputType('text')} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.date = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Time:
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
                                <div className="formRow">Description:
                                    <input type="text" id="description" placeholder={eventEdit.description} value={eventEdit.description} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.description = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Song Title:
                                    <input type="text" id="song_title" placeholder={singleEdit.song_title} value={singleEdit.song_title} onChange={
                                        (evt) => {
                                            const copy = { ...singleEdit }
                                            copy.song_title = evt.target.value
                                            updateSingleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Genre:
                                    <input type="text" id="genre" placeholder={singleEdit.genre} value={singleEdit.genre} onChange={
                                        (evt) => {
                                            const copy = { ...singleEdit }
                                            copy.genre = evt.target.value
                                            updateSingleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">UPC:
                                    <input type="number" id="upc" placeholder={singleEdit.upc} value={singleEdit.upc} onChange={
                                        (evt) => {
                                            const copy = { ...singleEdit }
                                            copy.upc = evt.target.value
                                            updateSingleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">ISRC:
                                    <input type="number" id="isrc" placeholder={singleEdit.isrc} value={singleEdit.isrc} onChange={
                                        (evt) => {
                                            const copy = { ...singleEdit }
                                            copy.isrc = evt.target.value
                                            updateSingleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Composer:
                                    <input type="text" id="composer" placeholder={singleEdit.composer} value={singleEdit.composer} onChange={
                                        (evt) => {
                                            const copy = { ...singleEdit }
                                            copy.composer = evt.target.value
                                            updateSingleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Producer:
                                    <input type="text" id="producer" placeholder={singleEdit.producer} value={singleEdit.producer} onChange={
                                        (evt) => {
                                            const copy = { ...singleEdit }
                                            copy.producer = evt.target.value
                                            updateSingleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Explicit:
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
                                <div className="formRow">Audio:
                                    <input type="url" id="audio_url" placeholder={singleEdit.audio_url} value={singleEdit.audio_url} onChange={
                                        (evt) => {
                                            const copy = { ...singleEdit }
                                            copy.audio_url = evt.target.value
                                            updateSingleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Artwork:
                                    {singleEditURL === "" ? ""
                                        : <img className="compressedImg" src={singleEditURL} alt="artwork" />}
                                    {singleURL === "" ? ""
                                        : <img className="compressedImg" src={singleURL} alt="artwork" />}
                                    <UploadFile onUpload={handleSingleUpload} />
                                </div>
                                <div className="formRow">Uploaded to Distro:
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
                                <div className="formButtons">

                                    <button onClick={(clickEvent) => {
                                        singleEditButtonClick(clickEvent)
                                        openSingleEditForm(false)
                                        setSingleReleaseId(0)
                                        setEventId(0)
                                        setSingleURL("")
                                    }}>Save</button>
                                    <button className="cancelItem" onClick={() => {
                                        openSingleEditForm(false)
                                        setSingleReleaseId(0)
                                        setEventId(0)
                                        setSingleURL("")
                                    }}>Cancel</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                )
            }

            {/* BUNDLE FORMS */}



            {
                bundleForm && (
                    <div className="new_bundle_form">
                        <form>
                            <fieldset>
                                <div className="formRow">Title:
                                    <input type="text" id="title" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.title = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Date:
                                    <input type="date" id="date" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.date = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Time:
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
                                <div className="formRow">Description:
                                    <input type="text" id="description" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.description = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Bundle Title:
                                    <input type="text" id="bundle_title" onChange={
                                        (evt) => {
                                            const copy = { ...newBundleRelease }
                                            copy.bundle_title = evt.target.value
                                            updateNewBundleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Genre:
                                    <input type="text" id="genre" onChange={
                                        (evt) => {
                                            const copy = { ...newBundleRelease }
                                            copy.genre = evt.target.value
                                            updateNewBundleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">UPC:
                                    <input type="number" id="upc" onChange={
                                        (evt) => {
                                            const copy = { ...newBundleRelease }
                                            copy.upc = evt.target.value
                                            updateNewBundleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Audio:
                                    <input type="url" id="audio_url" onChange={
                                        (evt) => {
                                            const copy = { ...newBundleRelease }
                                            copy.audio_url = evt.target.value
                                            updateNewBundleRelease(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Artwork:
                                    {bundleURL === "" ? ""
                                        : <img className="compressedImg" src={bundleURL} alt="artwork" />}
                                    <UploadFile onUpload={handleBundleUpload} />
                                </div>
                                <div className="formRow">Uploaded to Distro:
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
                                <div className="formButtons">

                                    <button onClick={(clickEvent) => {
                                        bundleSaveButtonClick(clickEvent)
                                        openBundleForm(false)
                                        setEventType(0)
                                        setBundleURL("")
                                    }}>Save</button>
                                    <button className="cancelItem" onClick={() => {
                                        openBundleForm(false)
                                        setEventType(0)
                                        setBundleURL("")
                                    }}>Cancel</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                )
            }

            {
                bundleEditForm && (
                    <div className="bundle_form">
                        <form>
                            <fieldset>
                                <div className="formRow">Title:
                                    <input required autoFocus type="text" id="title" placeholder={eventEdit.title} value={eventEdit.title} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.title = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Date:
                                    <input type={dateInputType} id="date" placeholder={eventEdit.date} onFocus={() => setDateInputType('date')} onBlur={() => setDateInputType('text')} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.date = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Time:
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
                                <div className="formRow">Description:
                                    <input type="text" id="description" placeholder={eventEdit.description} value={eventEdit.description} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.description = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Bundle Title:
                                    <input type="text" id="bundle_title" placeholder={bundleEdit.bundle_title} value={bundleEdit.bundle_title} onChange={
                                        (evt) => {
                                            const copy = { ...bundleEdit }
                                            copy.bundle_title = evt.target.value
                                            updateBundleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Genre:
                                    <input type="text" id="genre" placeholder={bundleEdit.genre} value={bundleEdit.genre} onChange={
                                        (evt) => {
                                            const copy = { ...bundleEdit }
                                            copy.genre = evt.target.value
                                            updateBundleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">UPC:
                                    <input type="number" id="upc" placeholder={bundleEdit.upc} value={bundleEdit.upc} onChange={
                                        (evt) => {
                                            const copy = { ...bundleEdit }
                                            copy.upc = evt.target.value
                                            updateBundleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Audio:
                                    <input type="url" id="audio_url" placeholder={bundleEdit.audio_url} value={bundleEdit.audio_url} onChange={
                                        (evt) => {
                                            const copy = { ...bundleEdit }
                                            copy.audio_url = evt.target.value
                                            updateBundleEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Artwork:
                                    {bundleEditURL === "" ? ""
                                        : <img className="compressedImg" src={bundleEditURL} alt="artwork" />}
                                    {bundleURL === "" ? ""
                                        : <img className="compressedImg" src={bundleURL} alt="artwork" />}
                                    <UploadFile onUpload={handleBundleUpload} />
                                </div>
                                <div className="formRow">Uploaded to Distro:
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
                                <div className="formButtons">

                                    <button onClick={(clickEvent) => {
                                        bundleEditButtonClick(clickEvent)
                                        openBundleEditForm(false)
                                        setBundleReleaseId(0)
                                        setEventId(0)
                                        setBundleURL("")
                                    }}>Save</button>
                                    <button className="cancelItem" onClick={() => {
                                        openBundleEditForm(false)
                                        setBundleReleaseId(0)
                                        setEventId(0)
                                        setBundleURL("")
                                    }}>Cancel</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                )
            }

            {/* REHEARSAL FORMS */}

            {
                rehearsalForm && (
                    <div className="new_rehearsal_form">
                        <form>
                            <fieldset>
                                <div className="formRow">
                                    <div className="label">Title:</div>
                                    <input type="text" id="title" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.title = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">
                                    <div className="label">Date:</div>
                                    <input type="date" id="date" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.date = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">
                                    <div className="label">Time:</div>
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
                                <div className="formRow">
                                    <div className="label">Description:</div>
                                    <input type="text" id="description" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.description = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>

                                <div className="formRow">
                                    <div className="label">Location:</div>
                                    <input type="text" id="location" onChange={
                                        (evt) => {
                                            const copy = { ...newRehearsal }
                                            copy.location = evt.target.value
                                            updateNewRehearsal(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">
                                    <div className="label">Band Members:</div>
                                    <input type="text" id="band_info" onChange={
                                        (evt) => {
                                            const copy = { ...newRehearsal }
                                            copy.band_info = evt.target.value
                                            updateNewRehearsal(copy)
                                        }
                                    } />
                                </div>
                                <div className="formButtons">
                                    <button onClick={(clickEvent) => {
                                        rehearsalSaveButtonClick(clickEvent)
                                        openRehearsalForm(false)
                                        setEventType(0)
                                    }}>Save</button>
                                    <button className="cancelItem" onClick={() => {
                                        openRehearsalForm(false)
                                        setEventType(0)
                                    }}>Cancel</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                )
            }

            {
                rehearsalEditForm && (
                    <div className="rehearsal_form">
                        <form>
                            <fieldset>
                                <div className="formRow">
                                    <div className="label">Title:</div>
                                    <input required autoFocus type="text" id="title" placeholder={eventEdit.title} value={eventEdit.title} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.title = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">
                                    <div className="label">Date:</div>
                                    <input type={dateInputType} id="date" placeholder={eventEdit.date} onFocus={() => setDateInputType('date')} onBlur={() => setDateInputType('text')} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.date = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">
                                    <div className="label">Time:</div>
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
                                <div className="formRow">
                                    <div className="label">Description:</div>
                                    <input type="text" id="description" placeholder={eventEdit.description} value={eventEdit.description} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.description = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">
                                    <div className="label">Location:</div>
                                    <input type="text" id="location" placeholder={rehearsalEdit.location} value={rehearsalEdit.location} onChange={
                                        (evt) => {
                                            const copy = { ...rehearsalEdit }
                                            copy.location = evt.target.value
                                            updateRehearsalEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">
                                    <div className="label">Band Members:</div>
                                    <input type="text" id="band_info" placeholder={rehearsalEdit.band_info} value={rehearsalEdit.band_info} onChange={
                                        (evt) => {
                                            const copy = { ...rehearsalEdit }
                                            copy.band_info = evt.target.value
                                            updateRehearsalEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formButtons">
                                    <button onClick={(clickEvent) => {
                                        rehearsalEditButtonClick(clickEvent)
                                        openRehearsalEditForm(false)
                                        setRehearsalId(0)
                                        setEventId(0)
                                    }}>Save</button>
                                    <button className="cancelItem" onClick={() => {
                                        openRehearsalEditForm(false)
                                        setRehearsalId(0)
                                        setEventId(0)
                                    }}>Cancel</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                )
            }

            {/* GIG FORMS */}



            {
                gigForm && (
                    <div className="newGigForm">
                        <form>
                            <fieldset>
                                <div className="formRow">Title:
                                    <input type="text" id="title" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.title = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Date:
                                    <input type="date" id="date" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.date = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Time:
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
                                <div className="formRow">Description:
                                    <input type="text" id="description" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.description = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">City/State:
                                    <input type="text" id="city_state" onChange={
                                        (evt) => {
                                            const copy = { ...newGig }
                                            copy.city_state = evt.target.value
                                            updateNewGig(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Venue:
                                    <input type="text" id="venue" onChange={
                                        (evt) => {
                                            const copy = { ...newGig }
                                            copy.venue = evt.target.value
                                            updateNewGig(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Band members:
                                    <input type="text" id="band_info" onChange={
                                        (evt) => {
                                            const copy = { ...newGig }
                                            copy.band_info = evt.target.value
                                            updateNewGig(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Age Requirement:
                                    <select onChange={
                                        (evt) => {
                                            const copy = { ...newGig }
                                            copy.age_requirement = evt.target.value
                                            updateNewGig(copy)
                                        }
                                    } >
                                        <option value="0">Select Event Type...</option>
                                        <option value="21+">21+</option>
                                        <option value="18+">18+</option>
                                        <option value="All ages">All ages</option>
                                    </select>
                                </div>
                                <div className="formRow">Ticket Price:
                                    <input type="number" id="ticket_price" onChange={
                                        (evt) => {
                                            const copy = { ...newGig }
                                            copy.ticket_price = evt.target.value
                                            updateNewGig(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Ticket Link:
                                    <input type="url" id="ticket_link" onChange={
                                        (evt) => {
                                            const copy = { ...newGig }
                                            copy.ticket_link = evt.target.value
                                            updateNewGig(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Guarantee:
                                    <input type="number" id="guarantee" onChange={
                                        (evt) => {
                                            const copy = { ...newGig }
                                            copy.guarantee = evt.target.value
                                            updateNewGig(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Sold Out:
                                    <input type="checkbox"
                                        value={newGig.sold_out}
                                        onChange={
                                            (evt) => {
                                                const copy = { ...newGig }
                                                copy.sold_out = evt.target.checked
                                                updateNewGig(copy)
                                            }
                                        } />
                                </div>
                                <div className="formRow">Announced:
                                    <input type="checkbox"
                                        value={newGig.announced}
                                        onChange={
                                            (evt) => {
                                                const copy = { ...newGig }
                                                copy.announced = evt.target.checked
                                                updateNewGig(copy)
                                            }
                                        } />
                                </div>
                                <div className="formRow">Flier:

                                    {flierURL === "" ? ""
                                        : <img className="compressedImg" src={flierURL} alt="flier" />}

                                    <UploadFile className="upload" onUpload={handleFlierUpload} />
                                </div>
                                <div className="formRow">Stage Plot:

                                    {stagePlotURL === "" ? ""
                                        : <img className="compressedImg" src={stagePlotURL} alt="stage plot" />}

                                    <UploadFile className="upload" onUpload={handleStagePlotUpload} />
                                </div>
                                <div className="formRow">Input List:

                                    {inputListURL === "" ? ""
                                        : <img className="compressedImg" src={inputListURL} alt="input list" />}

                                    <UploadFile className="upload" onUpload={handleInputListUpload} />
                                </div>
                                <div className="formButtons">
                                    <button onClick={(clickEvent) => {
                                        gigSaveButtonClick(clickEvent)
                                        openGigForm(false)
                                        setEventType(0)
                                        setFlierURL("")
                                        setStagePlotURL("")
                                        setInputListURL("")
                                    }}>Save</button>
                                    <button className="cancelItem" onClick={() => {
                                        openGigForm(false)
                                        setEventType(0)
                                        setFlierURL("")
                                        setStagePlotURL("")
                                        setInputListURL("")
                                    }}>Cancel</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                )
            }

            {
                gigEditForm && (
                    <div className="gigForm">
                        <form>
                            <fieldset>
                                <div className="formRow">Title:
                                    <input required autoFocus type="text" id="title" placeholder={eventEdit.title} value={eventEdit.title} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.title = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Date:
                                    <input type={dateInputType} id="date" placeholder={eventEdit.date} onFocus={() => setDateInputType('date')} onBlur={() => setDateInputType('text')} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.date = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Time:
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
                                <div className="formRow">Description:
                                    <input type="text" id="description" placeholder={eventEdit.description} value={eventEdit.description} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.description = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">City/State:
                                    <input type="text" id="city_state" placeholder={gigEdit.city_state} value={gigEdit.city_state} onChange={
                                        (evt) => {
                                            const copy = { ...gigEdit }
                                            copy.city_state = evt.target.value
                                            updateGigEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Venue:
                                    <input type="text" id="venue" placeholder={gigEdit.venue} value={gigEdit.venue} onChange={
                                        (evt) => {
                                            const copy = { ...gigEdit }
                                            copy.venue = evt.target.value
                                            updateGigEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Band members:
                                    <input type="number" id="band_info" placeholder={gigEdit.band_info} value={gigEdit.band_info} onChange={
                                        (evt) => {
                                            const copy = { ...gigEdit }
                                            copy.band_info = evt.target.value
                                            updateGigEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Age Requirement:
                                    <select onChange={
                                        (evt) => {
                                            const copy = { ...gigEdit }
                                            copy.age_requirement = evt.target.value
                                            updateGigEdit(copy)
                                        }
                                    } >
                                        <option value={gigEdit?.age_requirement}>{gigEdit?.age_requirement}</option>
                                        <option value="21+">21+</option>
                                        <option value="18+">18+</option>
                                        <option value="All ages">All ages</option>
                                    </select>
                                </div>
                                <div className="formRow">Ticket Price:
                                    <input type="number" id="ticket_price" placeholder={gigEdit.ticket_price} value={gigEdit.ticket_price} onChange={
                                        (evt) => {
                                            const copy = { ...gigEdit }
                                            copy.ticket_price = evt.target.value
                                            updateGigEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Ticket Link:
                                    <input type="url" id="ticket_link" placeholder={gigEdit.ticket_link} value={gigEdit.ticket_link} onChange={
                                        (evt) => {
                                            const copy = { ...gigEdit }
                                            copy.ticket_link = evt.target.value
                                            updateGigEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Guarantee:
                                    <input type="number" id="guarantee" placeholder={gigEdit.guarantee} value={gigEdit.guarantee} onChange={
                                        (evt) => {
                                            const copy = { ...gigEdit }
                                            copy.guarantee = evt.target.value
                                            updateGigEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Sold Out:
                                    <input type="checkbox"
                                        value={gigEdit.sold_out}
                                        onChange={
                                            (evt) => {
                                                const copy = { ...gigEdit }
                                                copy.sold_out = evt.target.checked
                                                updateGigEdit(copy)
                                            }
                                        } />
                                </div>
                                <div className="formRow">Announced:
                                    <input type="checkbox"
                                        value={gigEdit.announced}
                                        onChange={
                                            (evt) => {
                                                const copy = { ...gigEdit }
                                                copy.announced = evt.target.checked
                                                updateGigEdit(copy)
                                            }
                                        } />
                                </div>
                                <div className="formRow">Flier:

                                    {flierEditURL === "" ? ""
                                        : <img className="compressedImg" src={flierEditURL} alt="flier" />}
                                    {flierURL === "" ? ""
                                        : <img className="compressedImg" src={flierURL} alt="flier" />}

                                    <UploadFile className="upload" onUpload={handleFlierUpload} />
                                </div>
                                <div className="formRow">Stage Plot:

                                    {stagePlotEditURL === "" ? ""
                                        : <img className="compressedImg" src={stagePlotEditURL} alt="stage plot" />}
                                    {stagePlotURL === "" ? ""
                                        : <img className="compressedImg" src={stagePlotURL} alt="stage plot" />}

                                    <UploadFile className="upload" onUpload={handleStagePlotUpload} />
                                </div>
                                <div className="formRow">Input List:

                                    {inputListEditURL === "" ? ""
                                        : <img className="compressedImg" src={inputListEditURL} alt="input list" />}
                                    {inputListURL === "" ? ""
                                        : <img className="compressedImg" src={inputListURL} alt="input list" />}

                                    <UploadFile className="upload" onUpload={handleInputListUpload} />
                                </div>
                                <div className="formButtons">

                                    <button onClick={(clickEvent) => {
                                        gigEditButtonClick(clickEvent)
                                        openGigEditForm(false)
                                        setGigId(0)
                                        setEventId(0)
                                        setFlierURL("")
                                        setStagePlotURL("")
                                        setInputListURL("")
                                    }}>Save</button>
                                    <button className="cancelItem" onClick={() => {
                                        openGigEditForm(false)
                                        setGigId(0)
                                        setEventId(0)
                                        setFlierURL("")
                                        setStagePlotURL("")
                                        setInputListURL("")
                                    }}>Cancel</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                )
            }

            {/* EVENT FORMS */}

            {
                newForm && (
                    <div className="event_form">
                        <form>
                            <fieldset>
                                <div className="formRow">Title:
                                    <input type="text" id="title" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.title = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Date:
                                    <input type="date" id="date" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.date = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Time:
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
                                <div className="formRow">Description:
                                    <input type="text" id="description" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.description = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div className="formButtons">

                                    <button onClick={(clickEvent) => {
                                        eventSaveButtonClick(clickEvent)
                                        openNewForm(false)
                                        setEventType(0)
                                    }}>Save</button>
                                    <button className="cancelItem" onClick={() => {
                                        openNewForm(false)
                                        setEventType(0)
                                    }}>Cancel</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                )
            }

            {
                eventEditForm && (
                    <div className="event_form">
                        <form>
                            <fieldset>
                                <div className="formRow">Title:
                                    <input required autoFocus type="text" id="title" placeholder={eventEdit.title} value={eventEdit.title} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.title = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Date:
                                    <input type={dateInputType} id="date" placeholder={eventEdit.date} onFocus={() => setDateInputType('date')} onBlur={() => setDateInputType('text')} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.date = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">Time:
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
                                <div className="formRow">Description:
                                    <input type="text" id="description" placeholder={eventEdit.description} value={eventEdit.description} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.description = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formButtons">

                                    <button onClick={(clickEvent) => {
                                        eventEditButtonClick(clickEvent)
                                        openEventEditForm(false)
                                        setEventId(0)
                                    }}>Save</button>
                                    <button className="cancelItem" onClick={() => {
                                        openEventEditForm(false)
                                        setEventId(0)
                                    }}>
                                        Cancel</button>
                                </div>
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
                dialogClassName="new-square-modal"
            >
                <Modal.Header closeButton={false} className="modal-header">
                    <Modal.Title className="modal-title">{event?.title} at {formatTime(event?.extendedProps?.time)}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <p>{event?.extendedProps?.description}</p>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <button className="left-buttons" onClick={async () => {
                        setEventId(parseInt(event.id));
                        await handleCloseModal();
                    }}>
                        Edit
                    </button>
                    <button className="left-buttons" onClick={async () => {
                        await deleteEvent(event.id);
                        const newEvents = await getEvents();
                        setEvents(newEvents);
                        handleCloseModal();
                    }}>Delete</button>
                    <button className="right-button" onClick={handleCloseModal}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    </>;
}




































