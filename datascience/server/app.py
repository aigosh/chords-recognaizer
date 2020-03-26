from flask import Flask
from flask_restful import Api, Resource, reqparse
import json
import werkzeug
import pickle
import librosa

class Recognize(Resource):
    class2indx = {
        'am': 0,
        'dm': 1,
        'c': 2,
        'e': 3,
        'g': 4
    }

    i2class = {}
    for ac in class2indx.keys():
        i2class[class2indx[ac]] = ac

    with open('model', 'rb') as f:
        clf = pickle.load(f)

    def get_chord(y, sr):
        # print(input_file)
        import numpy as np
        from librosa import display
        # input_file = 'samples/e0.wav'
        # Create templates for major, minor, and no-chord qualities
        maj_template = np.array([1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0])
        min_template = np.array([1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0])
        N_template = np.array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.]) / 4.
        # Generate the weighting matrix that maps chroma to labels
        weights = np.zeros((25, 12), dtype=float)
        labels = ['C:maj', 'C#:maj', 'D:maj', 'D#:maj', 'E:maj', 'F:maj',
                  'F#:maj', 'G:maj', 'G#:maj', 'A:maj', 'A#:maj', 'B:maj',
                  'C:min', 'C#:min', 'D:min', 'D#:min', 'E:min', 'F:min',
                  'F#:min', 'G:min', 'G#:min', 'A:min', 'A#:min', 'B:min',
                  'N']
        for c in range(1):
            weights[c, :] = np.roll(maj_template, c)  # c:maj
            weights[c + 12, :] = np.roll(min_template, c)  # c:min
            weights[-1] = N_template  # the last row is the no-chord class
            # Make a self-loop transition matrix over 25 states
            trans = librosa.sequence.transition_loop(25, 0.9)
            # Load in audio and make features
            # y, sr = librosa.load(input_file)
            chroma = librosa.feature.chroma_cens(y=y, sr=sr, bins_per_octave=36)
            # Map chroma (observations) to class (state) likelihoods
            probs = np.exp(weights.dot(chroma))  # P[class | chroma] proportional to exp(template' chroma)
            probs /= probs.sum(axis=0, keepdims=True)  # probabilities must sum to 1 in each column
        sum_ = chroma.sum(axis=1)
        return sum_


    def post(self):
        parse = reqparse.RequestParser()
        parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
        args = parse.parse_args()
        # audioFile = args['file']
        # audioFile.save("audio.wav")
        try:
            res = []
            y, sr = librosa.load(args['file'])
            for i in range(0, len(y), 40000):
                chord = clf.predict([get_chord(y[i:i + 40000], sr)])
                res.append(i2class[chord[0]])                
            return {'success': True}, res
        except:
            return {'success': False}, 200


if __name__ == '__main__':
    app = Flask(__name__)
    api = Api(app)

    api.add_resource(Recognize, "/api/v1/recognize", "/api/v1/recognize")

    app.run(debug=True, port=8080)
