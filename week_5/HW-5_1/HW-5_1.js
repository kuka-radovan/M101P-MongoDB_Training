use blog;
/* Finding the most frequent author of comments on blog */
db.posts.aggregate([
	/* project only comments because of maximum document size exceeding */
	{ 
		'$project' : {
			'comments.author' : 1
		}
	},
	/* unwind by comments */
	{
		'$unwind':'$comments'
	},
	/* group by authors of comments and count them */
	{
		'$group' : {
			'_id':{
				'author' : "$comments.author"
			},
			'num' : {'$sum':1}
		}
	},
	/* sort by number of posts */
	{
		'$sort' : {
			'num' : -1
		}
	},
	/* show only first author */
	{
		'$limit' : 1
	}
]);