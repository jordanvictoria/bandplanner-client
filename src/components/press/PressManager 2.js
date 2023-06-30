



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




export const getMediaTypes = () => {
    return fetch("http://localhost:8000/mediatypes", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("band_token")}`
      }
    })
    .then((res) => res.json())
    
  };
  
  export const getContactsByType = (media_type) => {
    return fetch(`http://localhost:8000/mediacontacts?media_type=${media_type}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("band_token")}`
      }
    }).then((res) => res.json());
  }
  
  
  //media contacts
  
  export const getMediaContacts = () => {
    return fetch("http://localhost:8000/mediacontacts", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("band_token")}`
      }
    })
    .then((res) => res.json())
    
  };
  export const getMediaContactById = (id) => {
    return fetch(`http://localhost:8000/mediacontacts/${id}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("band_token")}`
      }
    }).then((res) => res.json());
  };
  
  
  
  export const addMediaContact = (newMediaContact) => {
    return fetch("http://localhost:8000/mediacontacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("band_token")}`
      },
      body: JSON.stringify(newMediaContact)
    })
  };
  
  export const editMediaContact = (newMediaContact) => {
    return fetch(`http://localhost:8000/mediacontacts/${newMediaContact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("band_token")}`
      },
      body: JSON.stringify(newMediaContact)
    })
  }
  
  
  export const deleteMediaContact = (mediaContactId) => {
    return fetch(`http://localhost:8000/mediacontacts/${mediaContactId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("band_token")}`
      }
    })
  }



    //press clippings
  
    export const getPressClippings = () => {
        return fetch("http://localhost:8000/pressclippings", {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
          }
        })
        .then((res) => res.json())
        
      };
      export const getPressClippingById = (id) => {
        return fetch(`http://localhost:8000/pressclippings/${id}`, {
          headers: {
            "Authorization": `Token ${localStorage.getItem("band_token")}`
          }
        }).then((res) => res.json());
      };
      
      
      
      export const addPressClipping = (newPressClipping) => {
        return fetch("http://localhost:8000/pressclippings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
          },
          body: JSON.stringify(newPressClipping)
        })
      };
      
      export const editPressClipping = (newPressClipping) => {
        return fetch(`http://localhost:8000/pressclippings/${newPressClipping.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
          },
          body: JSON.stringify(newPressClipping)
        })
      }
      
      
      export const deletePressClipping = (pressClippingId) => {
        return fetch(`http://localhost:8000/pressclippings/${pressClippingId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Token ${localStorage.getItem("band_token")}`
          }
        })
      }
    