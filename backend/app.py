from flask import Flask,send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

# Starting Flask
app = Flask(__name__)
CORS(app)

# Connecting to the database
# The `///` means that we are connecting to a local database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///friends.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Creating the SQLAlchemy instance and passing the app
db = SQLAlchemy(app)
# joining the python with react here 
frontend_folder=os.path.join(os.getcwd(),"..","frontend")
dist_folder=os.path.join(frontend_folder,"dist")


# server static files from the dist under the fronend directory
@app.route("/",defaults={"filename":""})
@app.route("/<path:filename>")
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder,filename)


# Importing the routes after the app and db have been initialized
import routes
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    # with app.app_context():
        # Drop all existing tables
        # db.drop_all()

        # Create all tables
        # db.create_all()

    # Run the Flask app
    app.run(debug=True, port=5000)
