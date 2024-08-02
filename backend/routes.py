from app import app,db
from models import Friend
from flask import jsonify,request

# get all friends 
@app.route("/api/friends",methods=["GET"])
def get_friends():
    friends = Friend.query.all()
    result =  [friend.to_json() for friend in friends ]
    return jsonify(result)


@app.route("/api/friends",methods=["POST"])
def create_friends():
    try:
      data = request.get_json()
    #   let validate here something
      required_fileds = ["name","role","gender","desc"]
      
      
      
      for field in required_fileds:
        #   checking as validation that field is there and not empty as well 
          if field not in data or not  data.get(field):
                return jsonify({"error": f"A {field} is missing. Please add it to proceed."}), 400

      
      name = data.get("name")
      role = data.get("role")
      desc = data.get("desc")
      gender = data.get("gender")
    #   fetching images based on gender using api
      if gender.lower() == "male":
          img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
      elif gender.lower() == "female":
         img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"

      else:
          img_url = None
          
      new_friend = Friend(name=name,role=role,desc=desc,gender=gender,img_url=img_url)
      db.session.add(new_friend)
      db.session.commit()
      return jsonify({"msg": "Successfully created", "friend": new_friend.to_json()}), 201
      
      
      
    except Exception as e : 
     db.session.rollback()

     return jsonify({"Erorr ":str(e)}),500
    
    
# Delete a Friend usuing delte method would 
@app.route("/api/friends/<int:id>",methods=["DELETE"])
def delete_friend(id):
    
    try:    
     friend = Friend.query.get(id)
     if friend is  None:
         return jsonify({"Erorr":"Sorry there no record for the id of the person that you passed "}),404
     db.session.delete(friend)
     db.session.commit()
     return jsonify({"msg":"record been succesfully Deleted"}),200
     
    except Exception as e:
        db.session.rollback()
        return jsonify({"erorr":str(e)}),500
    
    # update a method using patch to update partialy what we need  
@app.route("/api/friends/<int:id>",methods=["PATCH"])
def update_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error": "This record doesn't exist."}), 404
        
        data =request.get_json()
        if data is None:
            return jsonify({"error": "Invalid JSON data."}), 400
        # Update the friend's details with the new data or retain the old one
        friend.name = data.get("name", friend.name)
        friend.role = data.get("role", friend.role)
        friend.gender = data.get("gender", friend.gender)
        friend.desc = data.get("desc", friend.desc)
        db.session.commit()
        return jsonify(friend.to_json()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}),500

     