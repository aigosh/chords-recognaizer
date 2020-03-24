from flask import Flask
from flask_restful import Api, Resource, reqparse
import json
import werkzeug


class Recognize(Resource):
    def post(self):
        parse = reqparse.RequestParser()
        parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
        args = parse.parse_args()
        audioFile = args['file']
        audioFile.save("audio.wav")
        return {'success': True}, 200


if __name__ == '__main__':
    app = Flask(__name__)
    api = Api(app)

    api.add_resource(Recognize, "/api/v1/recognize", "/api/v1/recognize")

    app.run(debug=True, port=8080)
