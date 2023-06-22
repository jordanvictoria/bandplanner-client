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


  export const editProfile = (newProfile) => {
    return fetch(`http://localhost:8000/bandusers/${newProfile.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("band_token")}`
      },
      body: JSON.stringify(newProfile)
    })
  }