



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




export const getMediaTypes = () => {
    return fetch("https://bandplanner-d63f46179b66.herokuapp.com/mediatypes", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("band_token")}`
      }
    })
    .then((res) => res.json())
    
  };
  
  export const getContactsByType = (media_type) => {
    return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/mediacontacts?media_type=${media_type}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("band_token")}`
      }
    }).then((res) => res.json());
  }
  
  
  //media contacts
  
  export const getMediaContacts = () => {
    return fetch("https://bandplanner-d63f46179b66.herokuapp.com/mediacontacts", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("band_token")}`
      }
    })
    .then((res) => res.json())
    
  };
  export const getMediaContactById = (id) => {
    return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/mediacontacts/${id}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("band_token")}`
      }
    }).then((res) => res.json());
  };
  
  
  
  export const addMediaContact = (newMediaContact) => {
    return fetch("https://bandplanner-d63f46179b66.herokuapp.com/mediacontacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("band_token")}`
      },
      body: JSON.stringify(newMediaContact)
    })
  };
  
  export const editMediaContact = (newMediaContact) => {
    return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/mediacontacts/${newMediaContact.id}`, {
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
    return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/mediacontacts/${mediaContactId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("band_token")}`
      }
    })
  }



    //press clippings
  
    export const getPressClippings = () => {
        return fetch("https://bandplanner-d63f46179b66.herokuapp.com/pressclippings", {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
          }
        })
        .then((res) => res.json())
        
      };
      export const getPressClippingById = (id) => {
        return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/pressclippings/${id}`, {
          headers: {
            "Authorization": `Token ${localStorage.getItem("band_token")}`
          }
        }).then((res) => res.json());
      };
      
      
      
      export const addPressClipping = (newPressClipping) => {
        return fetch("https://bandplanner-d63f46179b66.herokuapp.com/pressclippings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("band_token")}`
          },
          body: JSON.stringify(newPressClipping)
        })
      };
      
      export const editPressClipping = (newPressClipping) => {
        return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/pressclippings/${newPressClipping.id}`, {
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
        return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/pressclippings/${pressClippingId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Token ${localStorage.getItem("band_token")}`
          }
        })
      }
    