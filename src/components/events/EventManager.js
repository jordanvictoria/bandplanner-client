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









