#!/bin/sh

SRC="$1"
XL_SIZE=3840x2160
L_SIZE="1920"
M_SIZE="1280"
S_SIZE="640"
THUMB_SIZE="150"
LOW=60
HIGH=85
#need to add something if need 4k resolution taken care of
#original size is xlarge, 1x here, 2x is original
convert $SRC.jpg -resize $L_SIZE meme-main/"$SRC"_large_2x.jpg
convert $SRC.jpg -resize $L_SIZE meme-main/"$SRC"_large_2x.webp
convert $SRC.jpg -resize $L_SIZE -quality $HIGH meme-main/"$SRC"_large_1x.jpg
convert $SRC.jpg -resize $L_SIZE -quality $HIGH meme-main/"$SRC"_large_1x.webp
#75% size is medium, 1x with high resolution, 2x with only resize
convert $SRC.jpg -resize $M_SIZE -quality $HIGH meme-main/"$SRC"_medium_1x.jpg
convert $SRC.jpg -resize $M_SIZE -quality $HIGH meme-main/"$SRC"_medium_1x.webp
convert $SRC.jpg -resize $M_SIZE meme-main/"$SRC"_medium_2x.jpg
convert $SRC.jpg -resize $M_SIZE meme-main/"$SRC"_medium_2x.webp
#45% size is small, 1x with high resolution, 2x with only resize
convert $SRC.jpg -resize $S_SIZE -quality $HIGH meme-main/"$SRC"_small_1x.jpg
convert $SRC.jpg -resize $S_SIZE -quality $HIGH meme-main/"$SRC"_small_1x.webp
convert $SRC.jpg -resize $S_SIZE meme-main/"$SRC"_small_2x.jpg
convert $SRC.jpg -resize $S_SIZE meme-main/"$SRC"_small_2x.webp

# To use this script,
# run the following from a terminal
# in a folder containing an image named foo.jpg (or whatever):
#   chmod u+x convert.sh
#   ./convert.sh foo
