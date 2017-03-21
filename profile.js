const https = require('https');
const http = require('http');

// Function to print message to console
// Print error messages
function printError(error) {
  console.error(error.message);
};


function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in Javascript`;
  console.log(message);
};

function getProfile(username) {
  try {
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
      if (response.statusCode === 200) {
        let body = "";
        response.on('data', data => {
          body += data.toString();
        })
        response.on('end', () => {
          try {
            const profile = JSON.parse(body);
            printMessage(username, profile.badges.length, profile.points.JavaScript);
          } catch (error) {
            printError(error);
          }
        }); // Read the data
      } else {
        const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
        const statusCodeError = new Error(message);
        printError(statusCodeError);
      }
  });
    // Parse the data // Print the data
    request.on('error', printError);
  } catch (error) {
    printError(error);
  }
}

module.exports.get = getProfile;