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

 * With the results from this request, inside "content",
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should
 * be in alphabetical order.
 */

module.exports = async function organiseMaintainers() {
  //initialise variables
  var packages = [];
  var org_Mains = [];
  var main_names = [];
  var packNames = [];
  const axios = require('axios');
  //body of post request
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
        // double for loop to get usernames and corresponding package names
        for (let i = 0; i < packages.length; i++) {
          var maintainers = resp.data.content[i].package.maintainers;
          var names =  resp.data.content[i].package.name;

          for (let j = 0; j < maintainers.length; j++) {
              var usernames = resp.data.content[i].package.maintainers[j].username;
                org_Mains.push({
                  "username": usernames,
                  "packageNames": names
                })
          }
        }
        // sort by username
        var sort_mains = org_Mains.sort((a, b) => a.username.localeCompare(b.username));
        sort_mains.push({
          "username": "???",
          "packageNames": "????"
        })
        var main_name = sort_mains[0].username;
        var main_package = sort_mains[0].packageNames;
        var k = 0;
        var g = 0;
        var t = 0;
        var count = 0;

        // Iterate over the sort main entries
        // Output usernames with all the package names in an array
        for (const [index, element] of sort_mains.entries()){
        k++;
        const isTheSameName = (currentValue) => currentValue == main_name;
        if(!isTheSameName(element.username) || k == sort_mains.length){
              main_names.push({
                "username": main_name,
                "packageNames": packNames.slice(count, t)
              })
                g = (t - count);
                count = (count + g);
            }
            main_name = element.username;
            main_package = element.packageNames;
            packNames.push(main_package);
            t++;
        }
        // Sort packageNames
        for (const [index, element] of main_names.entries()){
          console.log(element.packageNames.sort());
        }

      return main_names;
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
var contents = sendPostRequest();

return contents;

};
