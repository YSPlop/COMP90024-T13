from flask import Flask, jsonify
from flask_cors import CORS
import couchdb
import ijson
import random


app = Flask(__name__)
CORS(app)



# database view and return a number to front end
@app.route("/mastadon_server_count")
def get_mastadon_server_count():
    
    server = couchdb.Server('http://admin:password@172.26.131.88:5984')
    
    # Connect to mastodon db
    db_mastodon = server['mastodon']

    # Query all data from mastodon db
    view_mastodon = db_mastodon.view('_all_docs', stale = 'ok', include_docs = True)
    
    # Count the number of data
    count = len(view_mastodon)
    # temp = count + random.randrange(1,100)
    print("mastadon_server_count is ", count)
    
    # return the number of data
    return jsonify(count)


# Member API route
@app.route("/members")
def get_members():
    # return{"members" : ["Member1", "Member2", "Member3"]}
    list_i_want = ["lol", "lol2", "lol3"]
    temp = jsonify(list_i_want)
    print("members list is ", temp);
    return temp

@app.route("/random_number")
def get_random_number():
    temp = random.randrange(1,100)
    print("random number requested ", temp )
    return jsonify(temp)

# (everyone can access this API)
if __name__ == "__main__":
    app.run(
        host="100.95.194.150",
        port=5100,
        debug=True,
    )