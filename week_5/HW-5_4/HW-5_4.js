use hw;
/* Calculate the class with the best average student performance of all non-quiz assessments. */
db.zips.aggregate([
	{
		'$project' : {
			'first_char' : {'$substr' : ['$city',0,1]},
			'city' : 1,
			'pop' : 1
		}
	},
	{
		'$match' : {
			'first_char' : {'$regex' : /\d/}
		}
	},
	{
		'$group' : {
			'_id' : null,
			'pop' : {'$sum' : '$pop'}
		}
	},
	{
		'$project' : {
			'_id' : 0,
			'pop' : 1
		}
	}
]);