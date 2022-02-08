var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

const serverDetails = require('./getServerDetails');
var portNo = serverDetails.serverDetails.port;


var server = http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    //console.log(form);
    form.options.maxFileSize = 5000 * 1024 * 1024;
    //console.log(form);
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.filepath;
      var newpath = '/Users/harshmacbook/Documents/myRoot/www/file-upload-node/uploaded-files/' + files.filetoupload.originalFilename;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<p>File uploaded and moved!</p>');
        res.write(`<a href="${serverDetails.serverDetails.address}">Go Back</a>`);
        res.end();
      });
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(portNo);

console.log(`This server can listen at ${serverDetails.serverDetails.address}`);


