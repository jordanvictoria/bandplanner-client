export const getAllUsers = () => {
    return fetch('http://localhost:8088/users')
    .then(res => res.json())
}

export const getUserById = (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`)
    .then(res => res.json())
}

export const addNewSubscription = (newSubscription) => {
    return fetch("http://localhost:8088/subscriptions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newSubscription)
})
}
