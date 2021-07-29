/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */

module.exports = async function oldestPackageName() {
  // initialise variables
  var name = "";
  var packages = [];
  const axios = require('axios');
  // body of post request
  const newPost = {
    url: 'https://api.npms.io/v2/search/suggestions?q=react',
    method: 'GET',
    return_payload: true
};

const sendPostRequest = async () => {
    try {
       // post request
        const resp = await axios.post('http://ambush-api.inyourarea.co.uk/ambush/intercept', newPost);
        packages = resp.data.content;
        let old_date = resp.data.content[0].package.date;
        // iterate over the content to find the oldest date
        for (let i = 0; i < packages.length; i++) {
        if (resp.data.content[i].package.date <= old_date) {
            old_date = resp.data.content[i].package.date;
            name = resp.data.content[i].package.name;
          }
        }
        return name;
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
var contents = sendPostRequest();

return contents;
};
