require('coffee-script/register');
requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
// https://github.com/greypants/gulp-starter/blob/master/gulpfile.js
requireDir('./gulp/tasks', { recurse: true });