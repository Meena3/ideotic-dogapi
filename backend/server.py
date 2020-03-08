from flask import Flask
from flask import request,jsonify,make_response
from flask_cors import CORS
from flask_mysqldb import MySQL
import hashlib
import os
import json
import jwt
import math

app = Flask(__name__,static_url_path = '/static')
CORS(app)

app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = "Mysql"
app.config["MYSQL_DB"] = "manage_dogapi"
app.config["MYSQL_CURSOR"] = "DictCursor"
mysql = MySQL(app)

def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    return hash.hexdigest()

def generate_salt():
    salt = os.urandom(16)
    return salt.hex()

# register user
@app.route('/register' ,methods = ['POST'])
def register():
    user_name = request.json["user_name"]
    email = request.json["email"]
    password = request.json["password"]
    salt = generate_salt()
    password_hash = md5_hash(password+salt)
    cursor = mysql.connection.cursor()
    cursor.execute(
        """insert into users(user_name,email,password_hash,salt)
        values(%s,%s,%s,%s)""",(user_name,email,password_hash,salt)
    )
    mysql.connection.commit()
    cursor.close()
    return {"message":"Success"}

# login user
@app.route('/login',methods = ['POST'])
def loginUser():
    flag = False
    email = request.json["email"]
    password = request.json["password"]
    cursor = mysql.connection.cursor()
    cursor.execute("""select * from users where email = (%s)""",[email])
    result = cursor.fetchall()    
    cursor.close()
    # print(result)
    for i in range(len(result)):
        if str(email)==result[i][2] and (result[i][3])==str(md5_hash(password+result[i][4])):
            flag = True
            encoded_jwt=jwt.encode(
            {"id":result[i][0], "name": result[i][1]},'secretkey',algorithm='HS256').decode("utf-8")
    if flag == True:
        return json.dumps(encoded_jwt)
    else:
        return json.dumps("Wrong password")

# adding dog breed details names in one table
@app.route('/add_dog_breed',methods = ['POST'])
def addDog():
    dog_breed = request.json["dog_breed"]
    cursor = mysql.connection.cursor()
    cursor.execute(
        """insert into dog_breed_details(dog_breed)
        values(%s)""",[dog_breed]
    )
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Added")

# dog details adding into database
@app.route('/add_dog_breed_image',methods = ['POST'])
def addDogImage():
    if request.method == 'POST':
        f = request.files['dog_image']
        location = "static/img/" + f.filename
        f.save(location)
    cursor = mysql.connection.cursor()
    cursor.execute(
        """insert into dog_breed_images(dog_image)
        values(%s)""",[location]
    )
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Success")

# adding dog breed id into dog images table
@app.route('/add_dog_breed_id',methods = ['POST'])
def addDogId():
    dog_breed_id = request.json["dog_breed_id"]
    dog_breed_image_id = request.json["dog_breed_image_id"]
    cursor = mysql.connection.cursor()
    cursor.execute(
        """update dog_breed_images set dog_breed_id = (%s) 
        where dog_breed_image_id = (%s)""",[dog_breed_image_id,dog_breed_id]

    )
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Success")

# to get dog details to show case on frontend
@app.route('/get_details',methods = ['GET'])
def getDetails():
    cursor = mysql.connection.cursor()
    cursor.execute(
        """select dog_image,dog_breed from dog_breed_images join dog_breed_details 
        on dog_breed_images.dog_breed_id = dog_breed_details.dog_breed_id"""
    )
    result = cursor.fetchall()
    data = list()
    for item in result:
        data.append(item)
    cursor.close()
    return jsonify(data)

if __name__== "main":
    app.run(debug=True)
    # dog_breed_image_id