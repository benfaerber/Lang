const path = require('path');
const fs = require('fs');

function pic(username) {
  return path.dirname(require.main.filename || process.mainModule.filename) + '/public/profilePics/' + username + '.png';
}

let defaultPic = pic('default');
exports.profilePic = (req, res) => {
  if (!req.query.u) {
    res.sendFile(defaultPic);
    return;
  }

  let filename = pic(req.query.u);
 
  fs.stat(filename, (err, stat) => {
    if (err == null) {
      res.sendFile(filename);
    } else {
      res.sendFile(pic('default'));
    }
  })
};