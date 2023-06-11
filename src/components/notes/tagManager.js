export const getTags = () => {
    return fetch('http://localhost:8088/tags')
    .then(res => res.json())
}

export const createTag = (tag) => {
    return fetch("http://localhost:8088/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"

      },
      body: JSON.stringify(tag)
    })
  }

  export const getPostTags = () => {
    return fetch('http://localhost:8088/posttags')
    .then(res => res.json())
}

export const createPostTag = (post_tag) => {
    return fetch("http://localhost:8088/posttags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"

      },
      body: JSON.stringify(post_tag)
    })
  }

