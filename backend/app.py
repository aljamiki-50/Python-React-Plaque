from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Starting Flask
app = Flask(__name__)
CORS(app)

# Connecting to the database
# The `///` means that we are connecting to a local database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///friends.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Creating the SQLAlchemy instance and passing the app
db = SQLAlchemy(app)




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
