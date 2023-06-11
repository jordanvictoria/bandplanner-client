


export const EventForm = () => {
    return <>
        <form className="relativeForm">
            <fieldset>
                <div>Title:
                    <input type="text" id="title" onChange={
                        (evt) => {
                            const copy = { ...newEvent }
                            copy.title = evt.target.value
                            updateItem(copy)
                        }
                    } />
                </div>
                <div>Date:
                    <input type="date" id="date" onChange={
                        (evt) => {
                            const copy = { ...newEvent }
                            copy.price = parseInt(evt.target.value)
                            updateItem(copy)
                        }
                    } />
                </div>
                <div>Time:
                    <input id="price" onChange={
                        (evt) => {
                            const copy = { ...item }
                            copy.price = parseInt(evt.target.value)
                            updateItem(copy)
                        }
                    } />
                </div>
                <button onClick={(clickEvent) => {
                    handleSaveButtonClick(clickEvent)
                    navigate("/items")
                }}>Save</button>
                <button className="cancelItem" onClick={() => { navigate(`/items`) }}>Cancel</button>
            </fieldset>
        </form>
    </>
}