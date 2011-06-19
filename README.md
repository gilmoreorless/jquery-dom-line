# jQuery Line

Draw a line between any two arbitrary points, using a simple div element.

## Usage

    $.line(fromPoint, toPoint, options);

`fromPoint` and `toPoint` are required plain objects with x and y properties relative to the top left of the page.
`options` is an optional plain object, as listed below.

Return value is a jQuery object containing the element used for the line.

### Options

The `options` object passed to `$.line` is an object with the following available properties:

* `elem` - jQuery selector of the element to use for the line, useful for re-using a single element for subequent lines (default: empty - creates a new div)
* `className` - CSS class added to the line div element (default: "jquery-line") - not used if `elem` option is provided
* `lineWidth` - Thickness of the line in pixels (default: 1)
* `lineColor` - CSS color of the line (default: black)

(More options to come when I think of them - first draft for now)

