![SpaceBook](https://cdn.filestackcontent.com/RtKLuovRQBmEvxbC3JOs)
[![Built at Fullstack Academy](https://img.shields.io/badge/Built%20at-Fullstack%20Academy-red.svg?style=round-square)](http://fullstackacademy.com)

SpaceBook aims to recreate the spreadsheet with today's media rich world in mind.

## To run application

Use 'npm install && npm run dev' to run the development version of the application
Note - requires local MongoDB instance to be running

Check out SpaceBook in action [here](https://spacebookapp.herokuapp.com) or [here](https://www.dropbox.com/s/xx7q678z07qo2h3/SpaceBook.mp4?dl=0).

## Summary

Now you can organize all of your information, including images, lists, checkbox, map locations, and more, in one simple place. SpaceBook also allows users to collaborate while viewing and manipulating their data in a variety of ways.

## Features

	Interacts with a number of different data types
	Quickly write custom Javascript functions to manipulate your data and upload for other users to utilize
	Collaborate with team members
	View complete edit history and revert to any historical state

## User introduction

### Column Types

New sheets in SpaceBook start with an ID column (see Referencing). Users can add columns with Text, Numbers, Formula, Images, Checkbox, Select, Link, or Reference designation. Columns of these types will create cells that manage the following:
	Text: Any string of characters
	Number: Numbers
	Formula: Javascript style functions that act on the current row. These can be written by the user or imported from the store
	Images: Upload images from any location
	Checkbox: Checkboxes that can be Checked or Off
	Select: Dropdown menus for designated items
	Link: Links to external sites and mailto:emails
	References: Imports all information from another sheet with the designed ID column

### Displaying Data

Each row number has an expansion button next to it when hovered. Clicking these icons opens a pane where users can see and edit all of the information from that row in one place.

### Referencing

When editing a ref column users will be asked to designate the sheet they would like to reference. Once a sheet is selected users can "Link" to any of the records in the selected sheet. The ID of that record(s) will be interpolated into the designated cell.


### Formulas

Formula cells allow you to import formulas written by other users from the Formula Store, or write your own custom Javascript formulas. Formulas can reference data from other columns by either refering to them by name or Col#.

e.g.

The formula: `Record Name + ' Formula' ` or `Col1 + ' Formula'` will both output the value from the first column appended by ' Formula'.


## Technologies

SpaceBook leverages React and Redux to quickly render all of your information.

The backend is supported by NodeJs, ExpressJS, and MongoDB.
