# So think about models here as a file will be containing classes and them classes are typically tables in our sql databaase 
# in  order to start a class here we first need to import our db from the app where alchemy been  passed 

from app import db

class Friend(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    desc = db.Column(db.Text, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    img_url = db.Column(db.String(300), nullable=True)
    
    
    # taking a Friend when would be passed and turning to json 
    
    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "role": self.role,
            "gender": self.gender,
            "desc": self.desc,
            "img_url": self.img_url
        }
   