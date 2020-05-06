var csv = require('csv-parser')
var fs = require('fs')
var path = require('path')

let count = 0;
fs.createReadStream(path.join(__dirname, '../../accs.csv'))
  .pipe(csv())
  .on('data', function (data) {
      fs.appendFile(path.join(__dirname, '../../sitemap.xml'), 
      	`<url><loc>https://nv6khovry9.execute-api.us-east-1.amazonaws.com/dev/lookup/${data.account_name}</loc></url>
      	`, (err) => {
  		 if (err) throw err;
 		 console.log(count++);
	  });
  })