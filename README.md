# html-playground
html-playground

# tasks
* 2019.12.24 - show overlay on hover
* 2019.12.24 - zoom and rotate about the frame center
* 2019.12.23 - add toaster notifications (swap w/out two panels selected)
* 2019.12.22 - ability to style the outer panel-container (onfocus => "focus" style, command applies to "focus" element(s))
* 2019.12.22 - "shift+click" to group/ungroup (think sketchup)
* 2019.12.21 - ability to TRS text overlay, panel styles
* 2019.12.20 - rotate the actual background image and not the panel
* 2019.12.20 - refactor into modules, "hires" command to improve resolution
* 2019.12.20 - refactor into commands
* 2019.12.18 - drag photo to re-position within frame, overlay text
* 2019.12.12 - dnd panel-to-panel
* 2019.12.11 - drag/drop images, generate resulting command (draggable, droppable, action-handler)

# definitions
* collage - a collection of frames
* frame - the panel containing a background image
* image - the background image of a frame
* photo - the icon representing a picture to bring into the collage

# commands
* border all # changes the border of all the frames
* save - todo

# ideas
* undo/redo
* border to match edges of photo
* rotate about a point
* show a focal point for rotation and scale actions
* arc text as a series of rotated labels (or svg path)

# reference
* https://developers.google.com/photos/library/reference/rest
* https://www.w3schools.com/howto/howto_js_image_magnifier_glass.asp
* https://www.sitepoint.com/css3-transform-background-image/
* https://www.quackit.com/css/functions/css_matrix_function.cfm
* https://dev.to/morinoko/debugging-google-cloud-storage-cors-errors-in-rails-6-action-text-direct-upload-of-images-2445
* https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture
* https://css-tricks.com/snippets/css/multiple-borders/
* https://docs.oracle.com/cd/E19683-01/806-7612/6jgfmsvqf/index.html
* https://css-tricks.com/snippets/svg/curved-text-along-path/