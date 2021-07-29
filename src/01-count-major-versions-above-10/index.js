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

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version
 *  greater than 10.x.x
 */

module.exports = async function countMajorVersionsAbove10() {
  // initialise variables
  var count = 0;
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
        // iterate over the content to find versions that are over 10
        for (let i = 0; i < packages.length; i++) {
          var version = resp.data.content[i].package.version;
          var sub_version = version.substring(0,2);
          var num_version = Number(sub_version);
          // console.log(num_version);
          if (num_version > 10) {
            count += 1;
          }
        }
        return count;
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
var contents = sendPostRequest();

return contents;


};
