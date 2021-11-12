const gulp = require("gulp");
const { src, series, watch } = require("gulp");

//* image plugin
const imagemin = require("gulp-imagemin");
const imageWebp = require("gulp-webp");

//! define paths for source and destination
const SOURCE = "src";
const DIST = "dist";

const SRC_IMAGE_PATH = `${SOURCE}/*.{jpg,png,mp4}`;
const DIST_IMAGE_PATH = `${DIST}`;

//* compress images and copy them into dist/images folder
function imgCompressionTask() {
  return src(SRC_IMAGE_PATH).pipe(imagemin()).pipe(gulp.dest(DIST_IMAGE_PATH));
}

//* convert Them into webp images !!Folder Location dist/images
function convertImagesIntoWebPeTask() {
  return src("dist/*.{jpg,png}")
    .pipe(imageWebp())
    .pipe(gulp.dest(DIST_IMAGE_PATH));
}

//*  watch changes in files
function watchTask() {
  //* changes in images
  watch("src/*.{jpg,png}", imgCompressionTask);

  watch("dist/*.{jpg,png}", convertImagesIntoWebPeTask);
}

//* exporting functions
exports.imgCompressionTask = imgCompressionTask;
exports.convertImagesIntoWebPeTask = convertImagesIntoWebPeTask;

//* setup default task generate dist and wait for changes
exports.default = series(
  imgCompressionTask,
  convertImagesIntoWebPeTask,
  watchTask
);
