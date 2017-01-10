var sass = require('node-sass');
var fs = require('fs');

process.argv.forEach((val, index, array) => {
  console.log('Compiling SASS file:'+val);
  var noExt = val.replace('.scss', '').replace('_', '');
  sass.render({
    file: val,
  }, function(err, result) {
    if(err) {
      console.log('Error compiling SASS:'+err);
    } else {
      fs.writeFile('static/css/'+noExt+'.css', (err) => {
        if(err) {
          console.log('Error saving CSS file:'+err);
        } else {
          console.log('CSS Compiled successfully.');
        }
      });
    }
  });
});
