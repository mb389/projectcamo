//columns: 
{
	1: {
		title: 'Name',
		type: 'String',
		},
	2: {
		title: 'Task',
		type: 'Checkbox',
		},
	3: {
		title: 'Trip Pics',
		type: 'Images',
		},


}
// Sheet
[
	// Row 0
	[
		// Cell 0
		{	
			columnRef: 1
			value:'A'
		},
		{
			columnRef: 2
			value:true
		},
		{
			columnRef: 3
			value:[url2,url1,url3]
		}

	],
	[
		// Cell 0
		{
			columnRef: 1
			value:'B'
		},
		{
			columnRef: 2
			value:false
		},
		{
			columnRef: 3
			value:[url2,url4,url1]
		}

	],

]


/// Renders as
________________________________
| Name  |  Task  |  Trip Pics |
|  'A'  |  check | thumbnails |
|  'B'  | uncheck| thumbnails |

