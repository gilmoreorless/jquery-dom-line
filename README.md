# jQuery DOM Line

Draw a line between any two arbitrary points, using a simple DOM element.

## Requirements

* [jQuery](http://jquery.com) version 1.4.3 or higher
* Louis-Remi Babé's [jQuery transform CSS hook](http://louisremi.github.com/jquery.transform.js) - included by default in the minified version of this plugin

## Usage

    $.line(fromPoint, toPoint[, options]);

`fromPoint` and `toPoint` are required objects with `x` and `y` numeric properties, relative to the top left of the page.
`options` is an optional object, as listed below.

Return value is a jQuery object containing the element used for the line.

### Options

The `options` object passed to `$.line` is an object with the following available properties:

* `elem` - jQuery selector of the element to use for the line, useful for re-using a single element for subsequent lines (default: empty - creates a new div)
* `className` - CSS class added to the line div element (default: "jquery-line") - not used if `elem` option is provided
* `lineWidth` - Thickness of the line in pixels (default: 1)
* `lineColor` - CSS color of the line (default: black)
* `returnValues` - If true, returns an object with the calculated dimensions for the line (see below), instead of a jQuery object (default: false)

#### Return Values

If the `returnValues` option is set to true, a plain object is returned with the following defined properties:

* `from` - The `fromPoint` argument passed to the function
* `to` - The `toPoint` argument passed to the function
* `center` - The centre point of the line (and also the point of rotation) - contains `x` and `y` properties
* `rotation` - The amount of rotation applied to the line - contains `deg` (degrees) and `rad` (radians) properties

## Todo list

* Add option to calculate CSS props without creating the line elem - can be used for animation positions
