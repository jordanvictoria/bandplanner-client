


export const getBandUsers = () => {
    return fetch("https://bandplanner-d63f46179b66.herokuapp.com/bandusers", {
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
    return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/events?event_type=${event_type}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    }).then((res) => res.json());
}



export const getEvents = () => {
    return fetch("https://bandplanner-d63f46179b66.herokuapp.com/events", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    })
        .then((res) => res.json())

};
export const getEventById = (id) => {
    return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/events/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    }).then((res) => res.json());
};











export const addEvent = (newEvent) => {
    return fetch("https://bandplanner-d63f46179b66.herokuapp.com/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        },
        body: JSON.stringify(newEvent)
    })
};

export const editEvent = (newEvent) => {
    return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/events/${newEvent.id}`, {
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
    return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/events/${eventId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    })
}



//single releases

export const getSingleReleases = () => {
    return fetch("https://bandplanner-d63f46179b66.herokuapp.com/singlereleases", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    })
        .then((res) => res.json())

};

export const getSingleReleaseById = (id) => {
    return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/singlereleases/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    }).then((res) => res.json());
};

export const addSingleRelease = (newSingleRelease) => {
    return fetch("https://bandplanner-d63f46179b66.herokuapp.com/singlereleases", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        },
        body: JSON.stringify(newSingleRelease)
    })
};
export const editSingleRelease = (newSingleRelease) => {
    return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/singlereleases/${newSingleRelease.id}`, {
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
    return fetch("https://bandplanner-d63f46179b66.herokuapp.com/bundlereleases", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    })
        .then((res) => res.json())

};

export const getBundleReleaseById = (id) => {
    return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/bundlereleases/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    }).then((res) => res.json());
};

export const addBundleRelease = (newBundleRelease) => {
    return fetch("https://bandplanner-d63f46179b66.herokuapp.com/bundlereleases", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        },
        body: JSON.stringify(newBundleRelease)
    })
};
export const editBundleRelease = (newBundleRelease) => {
    return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/bundlereleases/${newBundleRelease.id}`, {
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
    return fetch("https://bandplanner-d63f46179b66.herokuapp.com/bundlesongs", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    })
        .then((res) => res.json())

};

export const getBundleSongById = (id) => {
    return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/bundlesongs/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    }).then((res) => res.json());
};

export const addBundleSong = (newBundleSong) => {
    return fetch("https://bandplanner-d63f46179b66.herokuapp.com/bundlesongs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        },
        body: JSON.stringify(newBundleSong)
    })
};
export const editBundleSong = (newBundleSong) => {
    return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/bundlesongs/${newBundleSong.id}`, {
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
    return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/bundlesongs/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("band_token")}`
        }
    })
}