use hw;
/* Calculate the average population of cities in California (abbreviation CA) and New York (NY) (taken together) with populations over 25,000. */
db.zips.aggregate([
	/* Filter only states California and New York  */
	{ 
		'$match' : {
			'state' : {'$in':['CA','NY']}
		}
	},
	/* Group by state and cities and sum their population */
	{
		'$group' : {
			'_id' : {'state':'$state', 'city':'$city'},
			'pop' : {'$sum':'$pop'}
		}
	},
	/* Get only cityes with population over 25000 */
	{
		'$match' : {
			'pop' : {'$gt':25000}
		}
	},
	/* Count average population of cities */
	{
		'$group' : {
			'_id' : '$state',
			'avg_pop' : {'$avg':'$pop'}
		}
	},
	/* Display only result */
	{
		'$project' : {
			'_id' : 0,
			'avg_pop' : 1
		}
	}
]);