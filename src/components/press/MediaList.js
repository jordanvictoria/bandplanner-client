import { useState, useEffect } from "react"
import { getBandUsers, getContactsByType, getMediaTypes, getMediaContacts, getMediaContactById, addMediaContact, editMediaContact, deleteMediaContact } from "./PressManager"



export const MediaList = () => {
  const localUser = localStorage.getItem("userId");
  const [bandUserObj, setBandUserObj] = useState({})
  const [mediaContactId, setMediaContactId] = useState(0)
  const [mediaContacts, setMediaContacts] = useState([])
  const [mediaTypes, setMediaTypes] = useState([])
  const [blogSelected, setBlogSelected] = useState(true);
  const [magazineSelected, setMagazineSelected] = useState(false);
  const [newspaperSelected, setNewspaperSelected] = useState(false);
  const [radioSelected, setRadioSelected] = useState(false);
  const [mediaContactForm, openMediaContactForm] = useState(false);
  const [mediaContactEditForm, openMediaContactEditForm] = useState(false);
  const [newMediaContact, updateNewMediaContact] = useState({
    user: 0,
    organization: "",
    contact: "",
    role: "",
    location: "",
    email: "",
    website: "",
    notes: "",
    media_type: 0
  })
  const [mediaContactEdit, updateMediaContactEdit] = useState({
    id: 0,
    user: 0,
    organization: "",
    contact: "",
    role: "",
    location: "",
    email: "",
    website: "",
    notes: "",
    media_type: 0
  })


  useEffect(
    () => {
      getMediaContacts().then((contactArr) => {
        setFilteredContacts(contactArr)
      })
    }, [blogSelected, magazineSelected, newspaperSelected, radioSelected]
  )

  useEffect(
    () => {
      getMediaTypes().then((typeArr) => {
        setMediaTypes(typeArr)
      })
    }, []
  )

  useEffect(() => {
    if (mediaContactId) {
      getMediaContactById(mediaContactId).then((res) => {
        updateMediaContactEdit(res)
      })
      openMediaContactEditForm(true)
    }
  }, [mediaContactId])


  useEffect(
    () => {
      getBandUsers().then((userArr) => {
        const matchedUser = userArr.find(user => user.user === parseInt(localUser))
        setBandUserObj(matchedUser)
      })
    }, []
  )



  const setFilteredContacts = (contactArr) => {
    if (blogSelected) {
      const filteredContacts = contactArr.filter(contact => parseInt(contact.media_type.id) === 1)
      setMediaContacts(filteredContacts)
    }
    if (magazineSelected) {
      const filteredContacts = contactArr.filter(contact => parseInt(contact.media_type.id) === 2)
      setMediaContacts(filteredContacts)
    }
    if (newspaperSelected) {
      const filteredContacts = contactArr.filter(contact => parseInt(contact.media_type.id) === 3)
      setMediaContacts(filteredContacts)
    }
    if (radioSelected) {
      const filteredContacts = contactArr.filter(contact => parseInt(contact.media_type.id) === 4)
      setMediaContacts(filteredContacts)
    }
  }



  // TOGGLE

  const handleOptionClick = (option) => {
    if (option === 1) {
      setMagazineSelected(false);
      setNewspaperSelected(false);
      setRadioSelected(false);
      setBlogSelected(true);
    }
    if (option === 2) {
      setBlogSelected(false);
      setNewspaperSelected(false);
      setRadioSelected(false);
      setMagazineSelected(true);
    }
    if (option === 3) {
      setBlogSelected(false);
      setRadioSelected(false);
      setMagazineSelected(false);
      setNewspaperSelected(true);
    }
    if (option === 4) {
      setBlogSelected(false);
      setNewspaperSelected(false);
      setMagazineSelected(false);
      setRadioSelected(true);
    }
  };







  // POST AND EDIT


  const contactSaveButtonClick = async (event) => {
    event.preventDefault()

    const contactToSendToAPI = {
      user: parseInt(localUser),
      organization: newMediaContact.organization,
      contact: newMediaContact.contact,
      role: newMediaContact.role,
      location: newMediaContact.location,
      email: newMediaContact.email,
      website: newMediaContact.website,
      notes: newMediaContact.notes,
      media_type: parseInt(newMediaContact.media_type)
    }

    await addMediaContact(contactToSendToAPI)
      .then(response => response.json())

    const newMediaContacts = await getMediaContacts()
    setFilteredContacts(newMediaContacts)
  }



  const contactEditButtonClick = async (event) => {
    event.preventDefault()

    const editToSendToAPI = {
      id: mediaContactId,
      user: parseInt(localUser),
      organization: mediaContactEdit.organization,
      contact: mediaContactEdit.contact,
      role: mediaContactEdit.role,
      location: mediaContactEdit.location,
      description: mediaContactEdit.description,
      email: mediaContactEdit.email,
      website: mediaContactEdit.website,
      notes: mediaContactEdit.notes,
      media_type: parseInt(mediaContactEdit.media_type.id)
    }

    await editMediaContact(editToSendToAPI)

    const newMediaContacts = await getMediaContacts()
    setFilteredContacts(newMediaContacts)
  }








  return <>
    <div className="site-background">
      <div className="contactHeader">
        <div className="secondHeader">

        
        <div className="button-wrap">
            <button className="add-event-button custom-button" onClick={() => openMediaContactForm(true)}>
              Add New Media Contact
            </button>
          </div>
          <div className="four-buttons">
            <button
              onClick={() => handleOptionClick(1)}
              style={{
                backgroundColor: blogSelected ? 'green' : 'white',
              }}
            >
              Blog
            </button>
            <button
              onClick={() => handleOptionClick(2)}
              style={{
                backgroundColor: magazineSelected ? 'green' : 'white',
              }}
            >
              Magazine
            </button>
            <button
              onClick={() => handleOptionClick(3)}
              style={{
                backgroundColor: newspaperSelected ? 'green' : 'white',
              }}
            >
              Newspaper
            </button>
            <button
              onClick={() => handleOptionClick(4)}
              style={{
                backgroundColor: radioSelected ? 'green' : 'white',
              }}
            >
              Radio
            </button>
          </div>
          </div>
      </div>
      <div className="content">


        <div className="contactViewContainer">
          <ul>


            {
              mediaContacts.map((media) => {
                return (
                  <li className="contactCard" key={media.id} value={media.id}>
                    <div>
                      <h3><b>Name</b>: {media.contact}</h3>
                      <section><b>Role</b>: {media.role}</section>
                      <section><b>Company</b>: {media.organization}</section>
                      <section><b>Location</b>: {media.location}</section>
                      <section><b>Email</b>: {media.email}</section>
                      <section>
                        <b>Website</b>:
                        <></>
                        {media.website ? (
                          <a href={media.website} target="_blank" rel="noopener noreferrer">Open in New Tab</a>
                        ) : (
                          ""
                        )}
                      </section>
                      <section><b>Notes</b>: {media.notes}</section>
                      <button onClick={() => {
                        setMediaContactId(media.id)
                      }}>Edit</button>
                      <button onClick={async () => {
                        await deleteMediaContact(media.id);
                        const newMediaContacts = await getMediaContacts()
                        setFilteredContacts(newMediaContacts)
                      }}>Delete</button>
                    </div>
                  </li>
                )
              })
            }
          </ul>
          {
            mediaContactForm && (
              <div className="contact_form">
                <form >
                  <fieldset>
                    <div className="formRow">Media Type:
                      <select className="mediaSelect" onChange={
                        (evt) => {
                          const copy = { ...newMediaContact }
                          copy.media_type = parseInt(evt.target.value)
                          updateNewMediaContact(copy)
                        }
                      } >
                        <option value="0">Select Media Type...</option>
                        {
                          mediaTypes.map(media => {
                            return <option key={media.id} value={media.id}>{media.label}</option>
                          })
                        }
                      </select>
                    </div>
                    <div className="formRow">Name:
                      <input type="text" id="contact" onChange={
                        (evt) => {
                          const copy = { ...newMediaContact }
                          copy.contact = evt.target.value
                          updateNewMediaContact(copy)
                        }
                      } />
                    </div>
                    <div className="formRow">Role:
                      <input type="text" id="role" onChange={
                        (evt) => {
                          const copy = { ...newMediaContact }
                          copy.role = evt.target.value
                          updateNewMediaContact(copy)
                        }
                      } />
                    </div>
                    <div className="formRow">Company:
                      <input type="text" id="organization" onChange={
                        (evt) => {
                          const copy = { ...newMediaContact }
                          copy.organization = evt.target.value
                          updateNewMediaContact(copy)
                        }
                      } />
                    </div>
                    <div className="formRow">Location:
                      <input type="text" id="location" onChange={
                        (evt) => {
                          const copy = { ...newMediaContact }
                          copy.location = evt.target.value
                          updateNewMediaContact(copy)
                        }
                      } />
                    </div>
                    <div className="formRow">Email:
                      <input type="email" id="email" onChange={
                        (evt) => {
                          const copy = { ...newMediaContact }
                          copy.email = evt.target.value
                          updateNewMediaContact(copy)
                        }
                      } />
                    </div>
                    <div className="formRow">Website:
                      <input type="url" id="link" onChange={
                        (evt) => {
                          const copy = { ...newMediaContact }
                          copy.website = evt.target.value
                          updateNewMediaContact(copy)
                        }
                      } />
                    </div>
                    <div className="formRow">Notes:
                      <input type="text" id="notes" onChange={
                        (evt) => {
                          const copy = { ...newMediaContact }
                          copy.link = evt.target.value
                          updateNewMediaContact(copy)
                        }
                      } />
                    </div>
                    <div className="formButtons">
                      <button onClick={(clickEvent) => {
                        contactSaveButtonClick(clickEvent)
                        openMediaContactForm(false)
                      }}>Save</button>
                      <button className="cancelItem" onClick={() => {
                        openMediaContactForm(false)
                      }}>Cancel</button>
                    </div>
                  </fieldset>
                </form>
              </div>
            )
          }

          {
            mediaContactEditForm && (
              <div className="contact_form">
                <form >
                  <fieldset>
                    <div className="formRow">Media Type:
                      <select className="mediaSelect" onChange={
                        (evt) => {
                          const copy = { ...mediaContactEdit }
                          copy.media_type = parseInt(evt.target.value)
                          updateMediaContactEdit(copy)
                        }}>
                        <option value={mediaContactEdit.media_type.id}>{mediaContactEdit.media_type.label}</option>
                        {
                          mediaTypes.map(media => {
                            return <option key={media.id} value={media}>{media.label}</option>
                          })}
                      </select>
                    </div>
                    <div className="formRow">Name:
                      <input type="text" id="contact" placeholder={mediaContactEdit.contact} value={mediaContactEdit.contact} onChange={
                        (evt) => {
                          const copy = { ...mediaContactEdit }
                          copy.contact = evt.target.value
                          updateMediaContactEdit(copy)
                        }
                      } />
                    </div>
                    <div className="formRow">Role:
                      <input type="text" id="role" placeholder={mediaContactEdit.role} value={mediaContactEdit.role} onChange={
                        (evt) => {
                          const copy = { ...mediaContactEdit }
                          copy.role = evt.target.value
                          updateMediaContactEdit(copy)
                        }
                      } />
                    </div>
                    <div className="formRow">Company:
                      <input type="text" id="organization" placeholder={mediaContactEdit.organization} value={mediaContactEdit.organization} onChange={
                        (evt) => {
                          const copy = { ...mediaContactEdit }
                          copy.organization = evt.target.value
                          updateMediaContactEdit(copy)
                        }
                      } />
                    </div>
                    <div className="formRow">Location:
                      <input type="text" id="location" placeholder={mediaContactEdit.location} value={mediaContactEdit.location} onChange={
                        (evt) => {
                          const copy = { ...mediaContactEdit }
                          copy.location = evt.target.value
                          updateMediaContactEdit(copy)
                        }
                      } />
                    </div>
                    <div className="formRow">Email:
                      <input type="email" id="email" placeholder={mediaContactEdit.email} value={mediaContactEdit.email} onChange={
                        (evt) => {
                          const copy = { ...mediaContactEdit }
                          copy.email = evt.target.value
                          updateMediaContactEdit(copy)
                        }
                      } />
                    </div>
                    <div className="formRow">Website:
                      <input type="url" id="website" value={mediaContactEdit.website} onChange={
                        (evt) => {
                          const copy = { ...mediaContactEdit }
                          copy.website = evt.target.value
                          updateMediaContactEdit(copy)
                        }
                      } />
                    </div>
                    <div className="formRow">Notes:
                      <input type="text" id="notes" value={mediaContactEdit.notes} onChange={
                        (evt) => {
                          const copy = { ...mediaContactEdit }
                          copy.notes = evt.target.value
                          updateMediaContactEdit(copy)
                        }
                      } />
                    </div>
                    <div className="formButtons">

                      <button onClick={(clickEvent) => {
                        contactEditButtonClick(clickEvent)
                        openMediaContactEditForm(false)
                        setMediaContactId(0)
                      }}>Save</button>
                      <button className="cancelItem" onClick={() => {
                        openMediaContactEditForm(false)
                        setMediaContactId(0)
                      }}>Cancel</button>
                    </div>
                  </fieldset>
                </form>
              </div>
            )
          }
        </div>
      </div>
    </div>


  </>



}