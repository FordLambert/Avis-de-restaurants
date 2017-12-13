
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
	return gulp.src('app/scss/styles.scss')
    	.pipe(sass()) // Converts Sass to CSS with gulp-sass
    	.pipe(gulp.dest('app/css'))
});

gulp.task('watch', function(){
  gulp.watch('app/scss/styles.scss', ['sass']);
  gulp.watch('app/scss/config/*.scss', ['sass']);
  gulp.watch('app/scss/partials/*.scss', ['sass']); 
  gulp.watch('app/scss/pages/*.scss', ['sass']); 
})