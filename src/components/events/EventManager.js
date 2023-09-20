
export const getEventTypes = () => {
  return fetch("https://bandplanner-d63f46179b66.herokuapp.com/eventtypes", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  })
  .then((res) => res.json())
  
};

export const getEventsByType = (event_type) => {
  return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/events?event_type=${event_type}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  }).then((res) => res.json());
}


//events

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

export const getSingleById = (id) => {
  return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/singlereleases/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  }).then((res) => res.json());
};

export const addSingle = (newEvent) => {
  return fetch("https://bandplanner-d63f46179b66.herokuapp.com/singlereleases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newEvent)
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

export const getBundleById = (id) => {
  return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/bundlereleases/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  }).then((res) => res.json());
};

export const addBundle = (newEvent) => {
  return fetch("https://bandplanner-d63f46179b66.herokuapp.com/bundlereleases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newEvent)
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






//rehearsal

export const getRehearsals = () => {
  return fetch("https://bandplanner-d63f46179b66.herokuapp.com/rehearsals", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  })
  .then((res) => res.json())
  
};

export const getRehearsalById = (id) => {
  return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/rehearsals/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  }).then((res) => res.json());
};

export const addRehearsal = (newEvent) => {
  return fetch("https://bandplanner-d63f46179b66.herokuapp.com/rehearsals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newEvent)
  })
};
export const editRehearsal = (newRehearsal) => {
  return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/rehearsals/${newRehearsal.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newRehearsal)
  })
}






//gigs



export const getGigs = () => {
  return fetch("https://bandplanner-d63f46179b66.herokuapp.com/gigs", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  })
  .then((res) => res.json())
  
};

export const getGigById = (id) => {
  return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/gigs/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  }).then((res) => res.json());
};

export const addGig = (newEvent) => {
  return fetch("https://bandplanner-d63f46179b66.herokuapp.com/gigs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newEvent)
  })
};
export const editGig = (newGig) => {
  return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/gigs/${newGig.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newGig)
  })
}
























