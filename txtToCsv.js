var fs = require('fs');
var files = fs.readdirSync('txtFiles');

// For CSOD .txt files. XML injection.


for (var j = 0; j < files.length; j++) {

  if (files[j][0] !== '.') {
    var modifiedFileName = files[j].slice(0, files[j].length - 3);

    modifiedFileName += 'xml';

    fs.renameSync(`txtFiles/${files[j]}`, `txtFiles/${modifiedFileName}`)

    var data = fs.readFileSync(`txtFiles/${modifiedFileName}`, 'utf8');

    var dataArray = data.split('\n');

    sanitized = [];

    for (var i = 0; i < dataArray.length - 1; i++) {
      var srcPrep = dataArray[i].split('token');
      var srcSplit = srcPrep[1].split('comments');
      var src = srcSplit[0].slice(5,srcSplit[0].length);

      var targetPrep = dataArray[i].split('comments');
      var targetSplit = targetPrep[1].split('</token>');
      var targetCheck = targetSplit[0].split('">');
      var target = targetCheck[1];

      var kvObj = {};
      kvObj.src = src;
      kvObj.target = target;

      sanitized.push(kvObj)
    }

    var data =JSON.stringify(sanitized);
    fs.writeFileSync(`${files[j]}.json`, data, 'utf8');
  }

}