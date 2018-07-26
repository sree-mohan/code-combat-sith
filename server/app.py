from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from error import InvalidUsage
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['MONGO_DBNAME'] = 'sithDb'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/sithDb'

mongo = PyMongo(app)
#connection to application collection
applications = mongo.db.applications
openings = mongo.db.openings


@app.route('/api/applications', methods=['GET'])
def test():
        response = []
        for q in applications.find():
                q['_id'] = str(q['_id'])
                response.append(q)
        return jsonify(response)

@app.route('/api/apply', methods=['POST'])
def storeApplication():
        application_id = applications.insert(request.json)
        new_application = applications.find_one({
                '_id': application_id
        })
        if new_application:
                new_application['_id'] = str(new_application['_id'])
                return jsonify(new_application)
        else:
                raise InvalidUsage('Something went wrong. Your application was not saved!', status_code=400)


@app.route('/api/applications/<id>')
def getOneApplication(id):
        resp = applications.find_one({
                '_id': ObjectId(id)
        })
        if resp:
                resp['_id']= str(resp['_id'])
                return jsonify(resp)
        else:
                return jsonify({})


@app.route('/api/openings', methods=['GET', 'POST'])
def openings_method():
        if request.method == 'POST':
               return create_opening(request.json)
        if request.method == 'GET':
                return get_opening()

def create_opening(request_body):
        opening_id = openings.insert(request_body)
        new_opening = openings.find_one({
                '_id': opening_id
        })
        if new_opening:
                new_opening['_id'] = str(new_opening['_id'])
                return jsonify(new_opening)
        else:
                raise InvalidUsage('Something went wrong. Your opening was not saved!', status_code=400)

def get_opening():
        response = []
        for q in openings.find():
                q['_id'] = str(q['_id'])
                response.append(q)
        return jsonify(response)



@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
        

if __name__ == '__main__':
        app.run(host='0.0.0.0',debug=True)