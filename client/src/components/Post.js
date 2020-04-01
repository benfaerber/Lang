
let Post = async (url, data) => {
  let options = {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(data)
  };

  let response = await fetch(url, options);
  let responseOK = response && response.ok;
  if (responseOK) {
    return await response.json();
  } else {
    return null;
  }
}

export default Post;

