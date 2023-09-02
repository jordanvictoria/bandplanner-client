import { useEffect, useState } from "react";
import { getEvents, getEventsByType, deleteEvent, getEventById, editEvent, addEvent, getRehearsals, getRehearsalById, addRehearsal, editRehearsal, getGigs, getGigById, addGig, editGig } from "./LiveManager";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-bootstrap/Modal";
import { UploadFile } from "../cloudinary/UploadFile"
import "./live.css"
// import '@fullcalendar/common/main.css';
// import '@fullcalendar/daygrid/main.css';


export const LiveEvents = () => {
    const localUser = localStorage.getItem("userId");
    const [allEvents, setAllEvents] = useState([])
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState({});
    const [eventType, setEventType] = useState(0)
    const [flierURL, setFlierURL] = useState("")
    const [stagePlotURL, setStagePlotURL] = useState("")
    const [inputListURL, setInputListURL] = useState("")
    const [flierEditURL, setFlierEditURL] = useState("")
    const [stagePlotEditURL, setStagePlotEditURL] = useState("")
    const [inputListEditURL, setInputListEditURL] = useState("")
    const [error, updateError] = useState("")
    const [listSelected, setListSelected] = useState(true);
    const [calendarSelected, setCalendarSelected] = useState(false);
    const [eventListId, setEventListId] = useState(0)
    const [matchedRehearsal, setMatchedRehearsal] = useState({});
    const [viewMatchedRehearsal, setViewMatchedRehearsal] = useState(false);
    const [matchedGig, setMatchedGig] = useState({});
    const [viewMatchedGig, setViewMatchedGig] = useState(false);
    const [showFlierPopup, setShowFlierPopup] = useState(false);
    const [showStagePlotPopup, setShowStagePlotPopup] = useState(false);
    const [showInputListPopup, setShowInputListPopup] = useState(false);
    const [eventsFromAPI, setEventsFromAPI] = useState([])
    const [searchOption, setSearchOption] = useState('');
    const [startSearch, setStartSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [locationSearch, setLocationSearch] = useState(false);
    const [locationForAPI, setLocationForAPI] = useState('');
    const [artistSearch, setArtistSearch] = useState(false);
    const [artistForAPI, setArtistForAPI] = useState('');
    const [venueSearch, setVenueSearch] = useState(false);
    const [venueForAPI, setVenueForAPI] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [filteredByType, setFilteredByType] = useState(0)
    const [checkedIndex, setCheckedIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [dateInputType, setDateInputType] = useState('');
    const [timeInputType, setTimeInputType] = useState('');
    const [eventId, setEventId] = useState(0)
    const [rehearsalId, setRehearsalId] = useState(0)
    const [gigId, setGigId] = useState(0)
    const [rehearsals, setRehearsals] = useState([])
    const [gigs, setGigs] = useState([])
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
        const eventArr = [
            ...rehearsals.flatMap(rehearsal =>
                allEvents.filter(event => event.id === rehearsal.event.id)
            ),
            ...gigs.flatMap(gig =>
                allEvents.filter(event => event.id === gig.event.id)
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
    }, [allEvents, rehearsals, gigs]);







    useEffect(() => {
        if (eventType === 3) {
            openRehearsalForm(true)
        }
        if (eventType === 4) {
            openGigForm(true)
        }
    }, [eventType])




    useEffect(() => {
        if (eventId) {
            getEventById(eventId).then((res) => {
                updateEventEdit(res);
                const matchedRehearsal = rehearsals.find(rehearsal => rehearsal.event.id === eventId);
                const matchedGig = gigs.find(gig => gig.event.id === eventId);
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
    }, [rehearsalId, gigId])



    useEffect(() => {
        if (eventId && rehearsalId) {
            openRehearsalEditForm(true)
        }
        if (eventId && gigId) {
            openGigEditForm(true)
        }
    }, [gigId, rehearsalId])




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
            const matchedRehearsals = rehearsals.find(release => release.event.id === eventListId);
            const matchedGig = gigs.find(release => release.event.id === eventListId);

            if (matchedRehearsals) {
                setMatchedRehearsal(matchedRehearsals);
                setViewMatchedRehearsal(true)
            } else if (matchedGig) {
                setMatchedGig(matchedGig);
                setViewMatchedGig(true)
            }
        }
    }, [eventListId, rehearsals, gigs]);


    useEffect(
        () => {
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
        }, [flierURL, stagePlotURL, inputListURL])







    // CLOUDINARY

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


    const formatListDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }



    const openFlierPopup = () => {
        setShowFlierPopup(true);
    };

    const openStagePlotPopup = () => {
        setShowStagePlotPopup(true);
    };

    const openInputListPopup = () => {
        setShowInputListPopup(true);
    };

    const closeFlierPopup = () => {
        setShowFlierPopup(false);
    };

    const closeStagePlotPopup = () => {
        setShowStagePlotPopup(false);
    };

    const closeInputListPopup = () => {
        setShowInputListPopup(false);
    };




    // SEARCH API  


    const handleSearchOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSearchOption(selectedOption);
        setLocationSearch(false);
        setArtistSearch(false);
        setVenueSearch(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "location":
                setLocationForAPI(value);
                break;
            case "artist":
                setArtistForAPI(value);
                break;
            case "venue":
                setVenueForAPI(value);
                break;
            default:
                break;
        }
        setStartSearch(false)
        setIsLoading(true)
    };



    const handleSearch = () => {
        setStartSearch(true);
    };

    useEffect(() => {
        if (startSearch) {
            let url = "";
            if (searchOption === "location" && locationForAPI) {
                const minDate = getCurrentDateFormatted()
                const maxDate = getDateAfter30DaysFormatted()
                url = `https://concerts-artists-events-tracker.p.rapidapi.com/location?name=${locationForAPI}&minDate=${minDate}&maxDate=${maxDate}&page=1`;
            } else if (searchOption === "artist" && artistForAPI) {
                url = `https://concerts-artists-events-tracker.p.rapidapi.com/artist?name=${artistForAPI}&page=1`;
            } else if (searchOption === "venue" && venueForAPI) {
                url = `https://concerts-artists-events-tracker.p.rapidapi.com/venue?name=${venueForAPI}&page=1`;
            }

            if (url) {
                const options = {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": "f4fd0aabbbmshd2eba6317676c1fp1b3ae7jsn6ca78867923e",
                        "X-RapidAPI-Host": "concerts-artists-events-tracker.p.rapidapi.com",
                    },
                };
                fetchData(url, options);
                console.log(url)
            }
        }
    }, [startSearch, searchOption, locationForAPI, artistForAPI, venueForAPI]);

    async function fetchData(url, options) {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const events = result.data;
            console.log(events);
            setEventsFromAPI(events);
            setIsLoading(false);
            setLocationForAPI('')
            setArtistForAPI('')
            setVenueForAPI('')
        } catch (error) {
            console.error(error);
            // You can handle the error here or throw it to be handled elsewhere
            throw error;
        }
    }






    const formatDate = (dateTimeStr) => {
        const dateTime = new Date(dateTimeStr);

        // Format date
        const month = dateTime.getMonth() + 1; // Months are zero-based
        const day = dateTime.getDate();
        const year = dateTime.getFullYear();
        const formattedDate = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;

        // Format time
        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const amPm = hours >= 12 ? 'PM' : 'AM';
        const formattedTime = `${(hours % 12 || 12)}:${minutes.toString().padStart(2, '0')}${amPm}`;

        // Combine date and time
        const formattedDateTime = `${formattedDate} at ${formattedTime}`;

        return formattedDateTime;
    }


    const getCurrentDateFormatted = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        let day = currentDate.getDate();

        // Add leading zero if month/day is a single digit
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const getDateAfter30DaysFormatted = () => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 30);

        const year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        let day = currentDate.getDate();

        // Add leading zero if month/day is a single digit
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
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
        setAllEvents(newEvents)

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
        setAllEvents(newEvents)

        const newRehearsals = await getRehearsals()
        setRehearsals(newRehearsals)
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
        setAllEvents(newEvents)

        const newGigs = await getGigs()
        setGigs(newGigs)
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
        setAllEvents(newEvents)

        const newGigs = await getGigs()
        setGigs(newGigs)
    }



















    return <>

        <div className="site-background">
            <div className="header">
                <div className="button-wrap">
                    <button className="new-add-live-button custom-button" onClick={() => setIsOpen(true)}>
                        Add Live Event
                    </button>
                    <div className="new-button-view-container">
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
                </div>
            </div>

            {
                listSelected && (

                    <div className="content">
                        <div className="API-wrapper">
                            <div className="API">
                                <div className="searchBox">Search Live Events By: </div>
                                <div className="radioButtons">
                                    <input
                                        type="radio"
                                        id="radioOption1"
                                        name="searchOption"
                                        value="location"
                                        onChange={handleSearchOptionChange}
                                    />
                                    <label htmlFor="radioOption1">Location</label>
                                    <input
                                        type="radio"
                                        id="radioOption2"
                                        name="searchOption"
                                        value="artist"
                                        onChange={handleSearchOptionChange}
                                    />
                                    <label htmlFor="radioOption2">Artist</label>
                                    <input
                                        type="radio"
                                        id="radioOption3"
                                        name="searchOption"
                                        value="venue"
                                        onChange={handleSearchOptionChange}
                                    />
                                    <label htmlFor="radioOption3">Venue</label>
                                </div>
                                {searchOption === "location" && (
                                    <div className="searchBar">
                                        <input
                                            type="text"
                                            onChange={handleInputChange}
                                            name="location"
                                            placeholder="Enter your search query"
                                        />
                                        <button className="searchButton" onClick={handleSearch}>Search</button>
                                    </div>
                                )}
                                {searchOption === "artist" && (
                                    <div className="searchBar">
                                        <input
                                            type="text"
                                            onChange={handleInputChange}
                                            name="artist"
                                            placeholder="Enter your search query"
                                        />
                                        <button onClick={handleSearch}>Search</button>
                                    </div>
                                )}
                                {searchOption === "venue" && (
                                    <div className="searchBar">
                                        <input
                                            type="text"
                                            onChange={handleInputChange}
                                            name="venue"
                                            placeholder="Enter your search query"
                                        />
                                        <button onClick={handleSearch}>Search</button>
                                    </div>
                                )}
                                {
                                    !isLoading && eventsFromAPI && (
                                        <div className="scrollable">
                                            {
                                                eventsFromAPI.map((event, index) => {
                                                    const key = event.id || index;
                                                    const humanDate = formatDate(event.startDate)
                                                    return (
                                                        <li key={key}>
                                                            <section className="APIcard">
                                                                <header>{event.name} at {event.location.name}</header>
                                                                <body>{humanDate}</body>
                                                                <img src={event.image} alt="Event" />
                                                            </section>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="liveContainer">
                            <ul>
                                {
                                    events.map((event) => {
                                        const formattedListDate = formatDate(event.date)
                                        return (
                                            <li key={event.id} value={event.id}>
                                                <div className="liveItem">
                                                    <h3><b>{event.title}</b></h3>
                                                    <section>{formattedListDate}</section>
                                                    <section className="liveFont">{event.description}</section>
                                                    <button className="liveButton" onClick={() => { setEventListId(event.id) }}>View Details</button>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            {
                                viewMatchedRehearsal && (
                                    <div className="pop_up_rehearsal">
                                        <div className="listItem">
                                            <div className="listKey">Location:</div> <div className="listValue">{matchedRehearsal.location}</div>
                                        </div>
                                        <div className="listItem lastKey">
                                            <div className="listKey">Band Members:</div> <div className="listValue"> {matchedRehearsal.band_info}</div>
                                        </div>
                                        <div className="new_button_live_group">
                                            <div className="group_one">
                                                <button className="edit_button" onClick={async () => {
                                                    setViewMatchedRehearsal(false)
                                                    setEventListId(0)
                                                    setEventId(parseInt(matchedRehearsal.event.id));
                                                }}>
                                                    Edit
                                                </button>
                                                <button className="delete_button" onClick={async () => {
                                                    await deleteEvent(parseInt(matchedRehearsal.event.id));
                                                    const newEvents = await getEvents();
                                                    setAllEvents(newEvents);
                                                    setViewMatchedRehearsal(false)
                                                }}>Delete</button>
                                            </div>
                                            <div className="group_two">
                                                <button className="new_close_live_button" onClick={() => {
                                                    setViewMatchedRehearsal(false)
                                                    setEventListId(0)
                                                }}>Close</button>
                                            </div>
                                        </div>
                                    </div>

                                )
                            }
                            {
                                viewMatchedGig && (
                                    <div className="pop_up_gig">
                                        <div className="listItem">
                                            <div className="listKey">City/State: </div><div className="listValue">{matchedGig.song_city_state}</div>
                                        </div>
                                        <div className="listItem">
                                            <div className="listKey">Venue:</div><div className="listValue"> {matchedGig.venue}</div>
                                        </div>
                                        <div className="listItem">
                                            <div className="listKey">Band Members:</div><div className="listValue"> {matchedGig.band_info}</div>
                                        </div>
                                        <div className="listItem">
                                            <div className="listKey">Age Requirement: </div><div className="listValue">{matchedGig.age_requirement}</div>
                                        </div>
                                        <div className="listItem">
                                            <div className="listKey">Ticket Price:</div><div className="listValue"> {matchedGig.ticket_price}</div>
                                        </div>
                                        <div className="listItem">
                                            <div className="listKey">Ticket Link: </div><div className="listValue">
                                                {matchedGig.ticket_link ? (
                                                    <a href={matchedGig.ticket_link} target="_blank" rel="noopener noreferrer"> Open in New Tab</a>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="listItem">
                                            <div className="listKey">Guarantee:</div><div className="listValue"> {matchedGig.guarantee}</div>
                                        </div>
                                        <div className="listItem">
                                            <div className="listKey">Sold out:</div><div className="listValue"> {matchedGig.sold_out ? 'Yes' : 'No'}</div>
                                        </div>
                                        <div className="listItem">
                                            <div className="listKey">Announced:</div><div className="listValue"> {matchedGig.announced ? 'Yes' : 'No'}</div>
                                        </div>
                                        <div className="listItem">
                                            <div className="listKey">Flier: </div>
                                            <div className="listValue">
                                                <button className="viewImageBtn" onClick={openFlierPopup}>
                                                    View Image
                                                </button>
                                            </div>
                                        </div>
                                        <div className="listItem">
                                            <div className="listKey">Stage Plot: </div>
                                            <div className="listValue">
                                                <button className="viewImageBtn" onClick={openStagePlotPopup}>
                                                    View Image
                                                </button>
                                            </div>
                                        </div>
                                        <div className="listItem lastKey">
                                            <div className="listKey">Input List:</div>
                                            <div className="listValue">
                                                <button className="viewImageBtn" onClick={openInputListPopup}>
                                                    View Image
                                                </button>
                                            </div>
                                        </div>
                                        <div className="new_button_live_group">
                                            <div className="group_one">
                                                <button className="edit_button" onClick={async () => {
                                                    setViewMatchedGig(false)
                                                    setEventListId(0)
                                                    setEventId(parseInt(matchedGig.event.id));
                                                }}>
                                                    Edit
                                                </button>
                                                <button className="delete_button" onClick={async () => {
                                                    await deleteEvent(parseInt(matchedGig.event.id));
                                                    const newEvents = await getEvents();
                                                    setAllEvents(newEvents);
                                                    setViewMatchedGig(false)
                                                }}>Delete</button>
                                            </div>
                                            <div className="group_two">
                                                <button className="close_button" onClick={() => {
                                                    setViewMatchedGig(false)
                                                    setEventListId(0)
                                                }}>Close</button>
                                            </div>
                                        </div>
                                        {/* Flier Pop-up */}
                                        {showFlierPopup && (
                                            <div className="imagePopup">
                                                <button className="closePopupBtn" onClick={closeFlierPopup}>
                                                    x
                                                </button>
                                                <img src={matchedGig.flier} alt="flier" />
                                            </div>
                                        )}

                                        {/* Stage Plot Pop-up */}
                                        {showStagePlotPopup && (
                                            <div className="imagePopup">
                                                <button className="closePopupBtn" onClick={closeStagePlotPopup}>
                                                    x
                                                </button>
                                                <img src={matchedGig.stage_plot} alt="stage_plot" />
                                            </div>
                                        )}

                                        {/* Input List Pop-up */}
                                        {showInputListPopup && (
                                            <div className="imagePopup">
                                                <button className="closePopupBtn" onClick={closeInputListPopup}>
                                                    x
                                                </button>
                                                <img src={matchedGig.input_list} alt="input_list" />
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }

            {
                calendarSelected && (

                    <div className="content">
                        <div className="API-wrapper">
                            <div className={`API ${startSearch ? 'fullHeight' : 'thirtyPercentHeight'}`}>
                                <div className="searchBox">Search Live Events By: </div>
                                <div className="radioButtons">
                                    <input
                                        type="radio"
                                        id="radioOption1"
                                        name="searchOption"
                                        value="location"
                                        onChange={handleSearchOptionChange}
                                    />
                                    <label htmlFor="radioOption1">Location</label>
                                    <input
                                        type="radio"
                                        id="radioOption2"
                                        name="searchOption"
                                        value="artist"
                                        onChange={handleSearchOptionChange}
                                    />
                                    <label htmlFor="radioOption2">Artist</label>
                                    <input
                                        type="radio"
                                        id="radioOption3"
                                        name="searchOption"
                                        value="venue"
                                        onChange={handleSearchOptionChange}
                                    />
                                    <label htmlFor="radioOption3">Venue</label>
                                </div>
                                {searchOption === "location" && (
                                    <div className="searchBar">
                                        <input
                                            type="text"
                                            onChange={handleInputChange}
                                            name="location"
                                            placeholder="Enter your search query"
                                        />
                                        <button onClick={handleSearch}>Search</button>
                                    </div>
                                )}
                                {searchOption === "artist" && (
                                    <div className="searchBar">
                                        <input
                                            type="text"
                                            onChange={handleInputChange}
                                            name="artist"
                                            placeholder="Enter your search query"
                                        />
                                        <button onClick={handleSearch}>Search</button>
                                    </div>
                                )}
                                {searchOption === "venue" && (
                                    <div className="searchBar">
                                        <input
                                            type="text"
                                            onChange={handleInputChange}
                                            name="venue"
                                            placeholder="Enter your search query"
                                        />
                                        <button onClick={handleSearch}>Search</button>
                                    </div>
                                )}
                                {
                                    !isLoading && eventsFromAPI && (
                                        <div className="scrollable">
                                            {
                                                eventsFromAPI.map((event, index) => {
                                                    const key = event.id || index;
                                                    const humanDate = formatDate(event.startDate)
                                                    return (
                                                        <li key={key}>
                                                            <section className="APIcard">
                                                                <header>{event.name} at {event.location.name}</header>
                                                                <body>{humanDate}</body>
                                                                <img src={event.image} alt="Event" />
                                                            </section>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="live-calendar-wrapper">
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
                            <div className="live-filter-box">
                                <div className="live-filters">
                                    <div >
                                        <label>

                                            <input type="checkbox" checked={checkedIndex === 0} onChange={() => handleCheckboxChange(0)}
                                                onClick={() => setFilteredByType(0)} />  Show All
                                        </label>
                                    </div>
                                    <div >
                                        <label>

                                            <input type="checkbox" checked={checkedIndex === 3} onChange={() => handleCheckboxChange(3)}
                                                onClick={() => setFilteredByType(3)} />  Show Rehearsals Only
                                        </label>
                                    </div>
                                    <div >
                                        <label>

                                            <input type="checkbox" checked={checkedIndex === 4} onChange={() => handleCheckboxChange(4)}
                                                onClick={() => setFilteredByType(4)} /> Show Gigs Only
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }





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
                                <option value="3">Rehearsal</option>
                                <option value="4">Gig</option>
                            </select>
                        </div>
                        <button onClick={() => setIsOpen(false)}>
                            Cancel
                        </button>
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
                                    Title:
                                    <input type="text" id="title" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.title = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">
                                    Date:
                                    <input type="date" id="date" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.date = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">
                                    Time:
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
                                    Description:
                                    <input type="text" id="description" onChange={
                                        (evt) => {
                                            const copy = { ...newEvent }
                                            copy.description = evt.target.value
                                            updateNewEvent(copy)
                                        }
                                    } />
                                </div>

                                <div className="formRow">
                                    Location:
                                    <input type="text" id="location" onChange={
                                        (evt) => {
                                            const copy = { ...newRehearsal }
                                            copy.location = evt.target.value
                                            updateNewRehearsal(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">
                                    Band Members:
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
                    <div className="new_rehearsal_form">
                        <form>
                            <fieldset>
                                <div className="formRow">
                                    Title:
                                    <input required autoFocus type="text" id="title" placeholder={eventEdit.title} value={eventEdit.title} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.title = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">
                                    Date:
                                    <input type={dateInputType} id="date" placeholder={eventEdit.date} onFocus={() => setDateInputType('date')} onBlur={() => setDateInputType('text')} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.date = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">
                                    Time:
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
                                    Description:
                                    <input type="text" id="description" placeholder={eventEdit.description} value={eventEdit.description} onChange={
                                        (evt) => {
                                            const copy = { ...eventEdit }
                                            copy.description = evt.target.value
                                            updateEventEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">
                                    Location:
                                    <input type="text" id="location" placeholder={rehearsalEdit.location} value={rehearsalEdit.location} onChange={
                                        (evt) => {
                                            const copy = { ...rehearsalEdit }
                                            copy.location = evt.target.value
                                            updateRehearsalEdit(copy)
                                        }
                                    } />
                                </div>
                                <div className="formRow">
                                    Band Members:
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
                    <div className="newGigForm">
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
                                        setFlierEditURL("")
                                        setStagePlotEditURL("")
                                        setInputListEditURL("")
                                    }}>Save</button>
                                    <button className="cancelItem" onClick={() => {
                                        openGigEditForm(false)
                                        setGigId(0)
                                        setEventId(0)
                                        setFlierURL("")
                                        setStagePlotURL("")
                                        setInputListURL("")
                                        setFlierEditURL("")
                                        setStagePlotEditURL("")
                                        setInputListEditURL("")
                                    }}>Cancel</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                )
            }



            <div>
                <Modal
                    show={showModal}
                    onHide={handleCloseModal}
                    backdrop="static"
                    keyboard={false}
                    dialogClassName="live-square-modal"
                >
                    <Modal.Header closeButton={false} className="modal-header">
                        <Modal.Title>{event?.title} at {formatTime(event?.extendedProps?.time)}</Modal.Title>
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



        </div >
    </>;
}