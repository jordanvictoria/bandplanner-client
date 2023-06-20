import { useEffect, useState } from "react";
import { getPressClippings, getPressClippingById, addPressClipping, editPressClipping, deletePressClipping, getBandUsers } from "./PressManager"
import "./press.css"


export const PressClipping = () => {
  const localUser = localStorage.getItem("userId");
  const [bandUserObj, setBandUserObj] = useState({})
  const [dateInputType, setDateInputType] = useState('');
  const [pressClippingId, setPressClippingId] = useState(0)
  const [pressClippings, setPressClippings] = useState([])
  const [pressClippingForm, openPressClippingForm] = useState(false);
  const [pressClippingEditForm, openPressClippingEditForm] = useState(false);
  const [newPressClipping, updateNewPressClipping] = useState({
    user: 0,
    title: "",
    date: "",
    author: "",
    description: "",
    link: "",
  })
  const [pressClippingEdit, updatePressClippingEdit] = useState({
    id: 0,
    user: 0,
    title: "",
    date: "",
    author: "",
    description: "",
    link: ""
  })



  useEffect(
    () => {
      getPressClippings().then((clippingArr) => {
        clippingArr.sort(compareDates);

        setPressClippings(clippingArr)
      })
    }, []
  )

  useEffect(() => {
    if (pressClippingId) {
      getPressClippingById(pressClippingId).then((res) => {
        updatePressClippingEdit(res)
      })
      openPressClippingEditForm(true)
    }
  }, [pressClippingId])


  useEffect(
    () => {
      getBandUsers().then((userArr) => {
        const matchedUser = userArr.find(user => user.user === parseInt(localUser))
        setBandUserObj(matchedUser)
      })
    }, []
  )








  const compareDates = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  };



  const formatListDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }





  
  // POST AND EDIT

  const clippingSaveButtonClick = async (event) => {
    event.preventDefault()

    const pressClippingToSendToAPI = {
      user: parseInt(localUser),
      title: newPressClipping.title,
      date: newPressClipping.date,
      author: newPressClipping.author,
      description: newPressClipping.description,
      link: newPressClipping.link
    }

    await addPressClipping(pressClippingToSendToAPI)
      .then(response => response.json())

    const newPressClippings = await getPressClippings()
    await newPressClippings.sort(compareDates)
    setPressClippings(newPressClippings)
  }




  const clippingEditButtonClick = async (event) => {
    event.preventDefault()

    const editToSendToAPI = {
      id: pressClippingId,
      user: parseInt(localUser),
      title: pressClippingEdit.title,
      date: pressClippingEdit.date,
      author: pressClippingEdit.author,
      description: pressClippingEdit.description,
      link: pressClippingEdit.link
    }

    await editPressClipping(editToSendToAPI)

    const newPressClippings = await getPressClippings()
    await newPressClippings.sort(compareDates)
    setPressClippings(newPressClippings)
  }







  return <>
    <div className="container">
      <div className="pressCoverageBandName">
        {bandUserObj.project_title}'s Press Coverage
      </div>
      <div className="clippingContainer">
        <button onClick={() => openPressClippingForm(true)}>
          Add New Press Clipping
        </button>
        <ul>
          {
            pressClippings.map((clipping) => {
              const formattedListDate = formatListDate(clipping.date)
              return (
                <li className="clippingCard" key={clipping.id} value={clipping.id}>
                  <div>
                    <h3>{clipping.title}</h3>
                    <section>{formattedListDate}</section>
                    <section>{clipping.author}</section>
                    <section>{clipping.description}</section>
                    <section>{clipping.link}</section>
                    <button onClick={() => {
                      setPressClippingId(clipping.id)
                    }}>Edit</button>
                    <button onClick={async () => {
                      await deletePressClipping(clipping.id);
                      const newPressClippings = await getPressClippings();
                      await newPressClippings.sort(compareDates)
                      setPressClippings(newPressClippings);
                    }}>Delete</button>
                  </div>
                </li>
              )
            })
          }
        </ul>
        {
          pressClippingForm && (
            <div className="pop_up_rehearsal">
              <form className="relativeForm">
                <fieldset>
                  <div>Title:
                    <input type="text" id="title" onChange={
                      (evt) => {
                        const copy = { ...newPressClipping }
                        copy.title = evt.target.value
                        updateNewPressClipping(copy)
                      }
                    } />
                  </div>
                  <div>Date:
                    <input type="date" id="date" onChange={
                      (evt) => {
                        const copy = { ...newPressClipping }
                        copy.date = evt.target.value
                        updateNewPressClipping(copy)
                      }
                    } />
                  </div>
                  <div>Author:
                    <input type="text" id="author" onChange={
                      (evt) => {
                        const copy = { ...newPressClipping }
                        copy.author = evt.target.value
                        updateNewPressClipping(copy)
                      }
                    } />
                  </div>
                  <div>Description:
                    <input type="text" id="description" onChange={
                      (evt) => {
                        const copy = { ...newPressClipping }
                        copy.description = evt.target.value
                        updateNewPressClipping(copy)
                      }
                    } />
                  </div>
                  <div>Link:
                    <input type="url" id="link" onChange={
                      (evt) => {
                        const copy = { ...newPressClipping }
                        copy.link = evt.target.value
                        updateNewPressClipping(copy)
                      }
                    } />
                  </div>
                  <button onClick={(clickEvent) => {
                    clippingSaveButtonClick(clickEvent)
                    openPressClippingForm(false)
                  }}>Save</button>
                  <button className="cancelItem" onClick={() => {
                    openPressClippingForm(false)
                  }}>Cancel</button>
                </fieldset>
              </form>
            </div>
          )
        }

        {
          pressClippingEditForm && (
            <div className="pop_up_rehearsal">
              <form className="relativeForm">
                <fieldset>
                  <div>Title:
                    <input type="text" id="title" placeholder={pressClippingEdit.title} onChange={
                      (evt) => {
                        const copy = { ...pressClippingEdit }
                        copy.title = evt.target.value
                        updatePressClippingEdit(copy)
                      }
                    } />
                  </div>
                  <div>Date:
                    <input type={dateInputType} id="date" placeholder={pressClippingEdit.date} onFocus={() => setDateInputType('date')} onBlur={() => setDateInputType('text')} onChange={
                      (evt) => {
                        const copy = { ...pressClippingEdit }
                        copy.date = evt.target.value
                        updatePressClippingEdit(copy)
                      }
                    } />
                  </div>
                  <div>Author:
                    <input type="text" id="author" placeholder={pressClippingEdit.author} onChange={
                      (evt) => {
                        const copy = { ...pressClippingEdit }
                        copy.author = evt.target.value
                        updatePressClippingEdit(copy)
                      }
                    } />
                  </div>
                  <div>Description:
                    <input type="text" id="description" placeholder={pressClippingEdit.description} onChange={
                      (evt) => {
                        const copy = { ...pressClippingEdit }
                        copy.description = evt.target.value
                        updatePressClippingEdit(copy)
                      }
                    } />
                  </div>
                  <div>Link:
                    <input type="url" id="link" placeholder={pressClippingEdit.link} onChange={
                      (evt) => {
                        const copy = { ...pressClippingEdit }
                        copy.link = evt.target.value
                        updatePressClippingEdit(copy)
                      }
                    } />
                  </div>
                  <button onClick={(clickEvent) => {
                    clippingEditButtonClick(clickEvent)
                    openPressClippingEditForm(false)
                    setPressClippingId(0)
                  }}>Save</button>
                  <button className="cancelItem" onClick={() => {
                    openPressClippingEditForm(false)
                    setPressClippingId(0)
                  }}>Cancel</button>
                </fieldset>
              </form>
            </div>
          )
        }
      </div>
    </div>


  </>


};
