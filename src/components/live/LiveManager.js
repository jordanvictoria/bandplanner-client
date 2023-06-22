

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








// setlists


export const getSetlists = () => {
  return fetch("http://localhost:8000/setlists", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  })
  .then((res) => res.json())
  
};

export const getSetlistById = (id) => {
  return fetch(`http://localhost:8000/setlists/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  }).then((res) => res.json());
};



export const addSetlist = (newSetlist) => {
  return fetch("http://localhost:8000/setlists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newSetlist)
  })
};



export const editSetlist = (newSetlist) => {
  return fetch(`http://localhost:8000/setlists/${newSetlist.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newSetlist)
  })
}


export const deleteSetlist = (id) => {
  return fetch(`http://localhost:8000/setlists/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  })
}










export const getSongs = () => {
  return fetch("http://localhost:8000/songs", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  })
  .then((res) => res.json())
  
};







export const getSongById = (id) => {
  return fetch(`http://localhost:8000/songs/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  }).then((res) => res.json());
};






export const addSong = (newSong) => {
  return fetch("http://localhost:8000/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newSong)
  })
};




export const editSong = (newSong) => {
  return fetch(`http://localhost:8000/songs/${newSong.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newSong)
  })
}


export const deleteSong = (id) => {
  return fetch(`http://localhost:8000/songs/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  })
}








export const getSetlistSongs = () => {
  return fetch("http://localhost:8000/setlistsongs", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  })
  .then((res) => res.json())
  
};

export const getSetlistSongById = (id) => {
  return fetch(`http://localhost:8000/setlistsongs/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  }).then((res) => res.json());
};





 export const addSetlistSong = (newSetlistSong) => {
  return fetch("http://localhost:8000/setlistsongs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newSetlistSong)
  })
};

export const editSetlistSong = (newSetlistSong) => {
  return fetch(`http://localhost:8000/setlistsongs/${newSetlistSong.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newSetlistSong)
  })
}



export const deleteSetlistSong = (id) => {
  return fetch(`http://localhost:8000/setlistsongs/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  })
}





    //events

  
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