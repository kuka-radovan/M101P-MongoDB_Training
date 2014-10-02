use enron;
db.messages.aggregate([
	{
		'$project' : {
			'From' : '$headers.From',
			'To' : '$headers.To'
		}
	},
	{
		'$unwind' : '$To'
	},
	{
		'$group' : {
			'_id' : {
				'_id' : '$_id',
				'From' : '$From',
				'To' : '$To'
			},
		}
	},
	{
		'$group' : {
			'_id' : {
				'From' : '$_id.From',
				'To' : '$_id.To'
			},
			'Count' : {
				'$sum' : 1
			}
		}
	},
	{
		'$sort' : {
			'Count' : -1
		}
	},
	{
		'$limit' : 1
	},
	{
		'$project' : {
			'_id' : 0,
			'From' : '$_id.From',
			'To' : '$_id.To'
		}
	}
]);