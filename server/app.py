import os
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from error import InvalidUsage
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

app.config['MONGO_DBNAME'] = 'sithDb'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/sithDb'

#Resume upload config
UPLOAD_FOLDER = './'
ALLOWED_EXTENSIONS = set(['pdf'])

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

mongo = PyMongo(app)
applications = mongo.db.applications
openings = mongo.db.openings

#Upload resume PDF
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload-resume/<id>', methods=['POST'])
def upload_file(id):
        f = request.files['file']
        print(request.files)
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], (secure_filename('resume.pdf'))))
        file_contents()
        return 'file uploaded successfully'

def file_contents():
        import resumeparser
        myString = resumeparser.convert('resume.pdf')
        #name = resumeparser.extract_name(myString)
        phone = resumeparser.extract_phone_numbers(myString)
        email = resumeparser.extract_email_addresses(myString)
        resumeparser.extract_information(myString)
        print('in file contents')
        print(email, phone)

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

@app.route('/api/openings/<id>/applications')
def getApplicantsForOpening(id):
        resp = []
        for q in applications.find({'JobId': id}):
                q['_id'] = str(q['_id'])
                resp.append(q)
        
        return jsonify(resp)

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