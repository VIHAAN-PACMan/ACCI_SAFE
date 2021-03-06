from flask import Flask, make_response, jsonify, request
import json
from keras.models import load_model
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D
from keras.layers import Activation, Dropout, Flatten, Dense
from keras.preprocessing import image
import uuid
import os
    
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')


import urllib.request

app = Flask(__name__)
model = load_model('./models/epochs20.h5')

def url_to_jpg(uri,file_path):
    urllib.request.urlretrieve(uri,file_path)

@app.route('/identifyAccident', methods = ["POST"])
def predict():
    # load model
    data = request.get_json()
    uri = data['imageUrl']
    print(uri)
    # uri = "https://firebasestorage.googleapis.com/v0/b/pacman-73ff5.appspot.com/o/events%2Fa%40g.com%2Fimage0.279252745985788751234?alt=media&token=eed00af5-5563-4458-91bd-a46e30a9fbe5"
    
    id = str(uuid.uuid1())
    filename = id+".jpg"
    file_path = "images/" + filename
    url_to_jpg(uri,file_path)

    # print("file Saved")
    img_path = file_path
    img = image.load_img(img_path, target_size=(224, 224))

    img_array = image.img_to_array(img)
    new_array = img_array.reshape(1,224,224,3)
    prediction = model.predict(new_array)

    #####################################################
    ####         status = 1 means accident           ####
    ####         status = 0 means noAccident         ####
    #####################################################

    data = {"status" : 0 }
    if(prediction[0] < 0.5) :
        print("Accident")
        data["status"] = 1
    else:
        print("No Accident Yet")

    response = make_response(
                jsonify(
                    data
                ),
                200,
            )
    response.headers["Content-Type"] = "application/json"
    os.remove(file_path)
    # print("file deleted")

    return response

    # return "hey"



lemmatizer = WordNetLemmatizer()

accidents = ['Oh', 'man', 'pretty', 'We']

@app.route('/verifyText', methods = ["POST"])
def nlp_part():
    textdata = request.get_json()
    text = textdata["text"]
    # sample_text = "Oh man, this is pretty cool. We will do more such things."
    text_tokens = word_tokenize(text)
    count=0
    tokens_without_sw = [lemmatizer.lemmatize(word) for word in text_tokens if not word in stopwords.words('english')]
    for token in tokens_without_sw:
        if token in accidents:
            count+=1
    print(1 if count>2 else 0)
    data = 1
    if(count>2):
        data = 0

    toSend = {"status" : data}

    response = make_response(
                jsonify(
                    toSend
                ),
                200,
            )
    response.headers["Content-Type"] = "application/json"
    return response

if __name__ == '__main__':
    app.run()