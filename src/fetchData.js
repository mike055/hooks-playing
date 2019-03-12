export const fetchData = () => {
  console.log("fetchData");
  return fetch(
    "https://my-json-server.typicode.com/mike055/fake-server/profile"
  )
    .then(response => response.json())
    .then(json => {
      console.log("fetch parsed json: ", json);
      return json;
    });
};

export default fetchData;
