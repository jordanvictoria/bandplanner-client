
export const getEventTypes = () => {
  return fetch("http://localhost:8000/eventtypes", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  })
  .then((res) => res.json())
  
};

export const getEventsByType = (event_type) => {
  return fetch(`http://localhost:8000/events?event_type=${event_type}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  }).then((res) => res.json());
}


//events

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

export const getSingleById = (id) => {
  return fetch(`http://localhost:8000/singlereleases/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  }).then((res) => res.json());
};

export const addSingle = (newEvent) => {
  return fetch("http://localhost:8000/singlereleases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newEvent)
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

export const getBundleById = (id) => {
  return fetch(`http://localhost:8000/bundlereleases/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  }).then((res) => res.json());
};

export const addBundle = (newEvent) => {
  return fetch("http://localhost:8000/bundlereleases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newEvent)
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






//rehearsal

export const getRehearsals = () => {
  return fetch("http://localhost:8000/rehearsals", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  })
  .then((res) => res.json())
  
};

export const getRehearsalById = (id) => {
  return fetch(`http://localhost:8000/rehearsals/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  }).then((res) => res.json());
};

export const addRehearsal = (newEvent) => {
  return fetch("http://localhost:8000/rehearsals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newEvent)
  })
};
export const editRehearsal = (newRehearsal) => {
  return fetch(`http://localhost:8000/rehearsals/${newRehearsal.id}`, {
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
  return fetch("http://localhost:8000/gigs", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  })
  .then((res) => res.json())
  
};

export const getGigById = (id) => {
  return fetch(`http://localhost:8000/gigs/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  }).then((res) => res.json());
};

export const addGig = (newEvent) => {
  return fetch("http://localhost:8000/gigs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newEvent)
  })
};
export const editGig = (newGig) => {
  return fetch(`http://localhost:8000/gigs/${newGig.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newGig)
  })
}
























