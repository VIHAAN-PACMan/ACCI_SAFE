# FlaskAccidentAPI

<img src="./images/logo_final.png" align="right"
     alt="Accident" width="140" height="160">

FlaskAccidentAPI is a easy to use API used for identifying whether a image 
contains a vehicle accident senario or no. The API uses Deep Learning techniques to process the image.

<br>

Apart from the Accident Detection, it also processes the block of text to identify whether the text is related to an precautions from accidents. 

## Features and Details
* **CNN Model** with an accuracy of  **93.4%** on test data.
* The Dataset used for training the CNN model can be found <a href="https://www.kaggle.com/jerrinbright/accident">here</a>
* The trained model can be found in the `/models` directory.
* `/identifyAccident` route of the API accepts a JSON which contains the firebase image URI of the image and responds with a JSON packet with 
    **status : 1** if the image is a vehicle accident and **status : 0** if not.
* `/verifyText` route of the API accepts a JSON which contains the text and responds with a JSON packet with
    **status : 1** if it is not a precaution from accidents and **status : 0** if not.

## Usage

Install required modules like tensorflow, keras, nltk, flask, etc.
```
pip install -r requirements.txt
```
Run the flask server

```
python app.py
```
