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


  export const editProfile = (newProfile) => {
    return fetch(`https://bandplanner-d63f46179b66.herokuapp.com/bandusers/${newProfile.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("band_token")}`
      },
      body: JSON.stringify(newProfile)
    })
  }