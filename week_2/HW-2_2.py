import pymongo
import sys

# Establish a connection to the database
connection = pymongo.Connection("mongodb://localhost", safe=True)

# Get a handle to the students database
db = connection.students
grades = db.grades # get a handle to the grades collection

query = {'type':'homework'}
selector = {'type':0}

try:
	results = grades.find(query,selector).sort([('student_id' , pymongo.ASCENDING), ('score' , pymongo.ASCENDING)])
except:
	print "Error: ", sys.exc_info()[0]

studentId = -1
for student in results:
	if(studentId != student['student_id']):
		studentId = student['student_id']
		grades.remove({'_id':student['_id']})

print('DONE')