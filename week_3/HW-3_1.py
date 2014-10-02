import pymongo
import sys

# Establish a connection to the database
connection = pymongo.Connection("mongodb://localhost", safe=True)

# Get a handle to the school database
db = connection.school
students = db.students # get a handle to the students collection

query = {'scores.type': 'homework'}

try:
	results = students.find(query)
except:
	raise "Error: ", sys.exc_info()[0]

for student in results:
	homework_scores = []
	for score in student['scores']:
		if score['type'] == 'homework':
			homework_scores.append(score['score'])

	students.update({'_id' : student['_id']}, {'$pull' : {'scores' : {'score' : min(homework_scores)}}})

print('DONE')