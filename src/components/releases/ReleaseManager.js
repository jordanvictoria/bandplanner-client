


export const getBandUsers = () => {
    return fetch("http://localhost:8000/bandusers", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    })
        .then((res) => res.json())

};







// events


export const getEventsByType = (event_type) => {
    return fetch(`http://localhost:8000/events?event_type=${event_type}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    }).then((res) => res.json());
}



export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    })
        .then((res) => res.json())

};
export const getEventById = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    }).then((res) => res.json());
};











export const addEvent = (newEvent) => {
    return fetch("http://localhost:8000/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        },
        body: JSON.stringify(newEvent)
    })
};

export const editEvent = (newEvent) => {
    return fetch(`http://localhost:8000/events/${newEvent.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        },
        body: JSON.stringify(newEvent)
    })
}


export const deleteEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    })
}



//single releases

export const getSingleReleases = () => {
    return fetch("http://localhost:8000/singlereleases", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    })
        .then((res) => res.json())

};

export const getSingleReleaseById = (id) => {
    return fetch(`http://localhost:8000/singlereleases/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    }).then((res) => res.json());
};

export const addSingleRelease = (newSingleRelease) => {
    return fetch("http://localhost:8000/singlereleases", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        },
        body: JSON.stringify(newSingleRelease)
    })
};
export const editSingleRelease = (newSingleRelease) => {
    return fetch(`http://localhost:8000/singlereleases/${newSingleRelease.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        },
        body: JSON.stringify(newSingleRelease)
    })
}




//bundle releases

export const getBundleReleases = () => {
    return fetch("http://localhost:8000/bundlereleases", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    })
        .then((res) => res.json())

};

export const getBundleReleaseById = (id) => {
    return fetch(`http://localhost:8000/bundlereleases/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    }).then((res) => res.json());
};

export const addBundleRelease = (newBundleRelease) => {
    return fetch("http://localhost:8000/bundlereleases", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        },
        body: JSON.stringify(newBundleRelease)
    })
};
export const editBundleRelease = (newBundleRelease) => {
    return fetch(`http://localhost:8000/bundlereleases/${newBundleRelease.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        },
        body: JSON.stringify(newBundleRelease)
    })
}





// bundle songs

export const getBundleSongs = () => {
    return fetch("http://localhost:8000/bundlesongs", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    })
        .then((res) => res.json())

};

export const getBundleSongById = (id) => {
    return fetch(`http://localhost:8000/bundlesongs/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    }).then((res) => res.json());
};

export const addBundleSong = (newBundleSong) => {
    return fetch("http://localhost:8000/bundlesongs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        },
        body: JSON.stringify(newBundleSong)
    })
};
export const editBundleSong = (newBundleSong) => {
    return fetch(`http://localhost:8000/bundlesongs/${newBundleSong.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        },
        body: JSON.stringify(newBundleSong)
    })
}

export const deleteBundleSong = (id) => {
    return fetch(`http://localhost:8000/bundlesongs/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    })
}