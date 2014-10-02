import pymongo
import sys

# Establish a connection to the database
connection = pymongo.Connection("mongodb://localhost", safe=True)

db = connection.photosharing
albums = db.albums

try:
	images = db.images.find()
except:
	print "Error: ", sys.exc_info()[0]

for image in images:
	album = albums.find_one({'images' : {'$in' : [image['_id']]}})
	if not album:
		db.images.remove({'_id' : image['_id']})

print('DONE')