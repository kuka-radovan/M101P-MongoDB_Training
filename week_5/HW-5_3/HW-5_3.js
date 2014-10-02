use hw;
/* Calculate the class with the best average student performance of all non-quiz assessments. */
db.grades.aggregate([
	/* Unwind scores*/
	{
		'$unwind' : '$scores'
	},
	/* Filter only non-quiz scores */
	{
		'$match' : {
			'scores.type' : {'$ne' : 'quiz'}
		}
	},
	/* Group by student and class to calculate average score of students per class */
	{
		'$group' : {
			'_id' : {
				'student_id' : '$student_id',
				'class_id' : '$class_id'
			},
			'avg_score' : {'$avg' : '$scores.score'}
		}
	},
	/* Group by class to calculate average score prer class */
	{
		'$group' : {
			'_id' : '$_id.class_id',
			'avg_class_score' : {'$avg' : '$avg_score'}
		}
	},
	/* Sort results by class score */
	{
		'$sort' : {'avg_class_score' : -1}
	},
	/* Display only best class */
	{
		'$limit' : 1
	}
]);