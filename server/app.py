from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from error import InvalidUsage

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'sithDb'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/sithDb'

mongo = PyMongo(app)
#connection to application collection
applications = mongo.db.applications


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
        print(application_id)
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
@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
        

if __name__ == '__main__':
        app.run(host='0.0.0.0',debug=True)