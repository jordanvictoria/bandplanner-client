

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








// setlists


export const getSetlists = () => {
  return fetch("https://bandplanner-d63f46179b66.herokuapp.com/setlists", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  })
  .then((res) => res.json())
  
};

export const getSetlistById = (id) => {
  return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/setlists/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  }).then((res) => res.json());
};



export const addSetlist = (newSetlist) => {
  return fetch("https://bandplanner-d63f46179b66.herokuapp.com/setlists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newSetlist)
  })
};



export const editSetlist = (newSetlist) => {
  return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/setlists/${newSetlist.id}`, {
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
  return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/setlists/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  })
}










export const getSongs = () => {
  return fetch("https://bandplanner-d63f46179b66.herokuapp.com/songs", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  })
  .then((res) => res.json())
  
};







export const getSongById = (id) => {
  return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/songs/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  }).then((res) => res.json());
};






export const addSong = (newSong) => {
  return fetch("https://bandplanner-d63f46179b66.herokuapp.com/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newSong)
  })
};




export const editSong = (newSong) => {
  return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/songs/${newSong.id}`, {
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
  return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/songs/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  })
}








export const getSetlistSongs = () => {
  return fetch("https://bandplanner-d63f46179b66.herokuapp.com/setlistsongs", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  })
  .then((res) => res.json())
  
};

export const getSetlistSongById = (id) => {
  return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/setlistsongs/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  }).then((res) => res.json());
};





 export const addSetlistSong = (newSetlistSong) => {
  return fetch("https://bandplanner-d63f46179b66.herokuapp.com/setlistsongs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    },
    body: JSON.stringify(newSetlistSong)
  })
};

export const editSetlistSong = (newSetlistSong) => {
  return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/setlistsongs/${newSetlistSong.id}`, {
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
  return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/setlistsongs/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("band_token")}`
    }
  })
}





    //events

  
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