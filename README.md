# jQuery Line

Draw a line between any two arbitrary points, using a simple div element.

## Usage

    $.line(fromPoint, toPoint, options);

`fromPoint` and `toPoint` are plain objects with x and y properties relative to the top left of the page.

### Options

The `options` object passed to `$.line` is an optional plain object, with the following available properties:

* `className` - CSS class added to the line div element (default: "jquery-line")

(More options to come when I think of them - first draft for now)

## TODO

* Customise line thickness/colour
