from flask import Flask, jsonify
from flask_cors import CORS
import couchdb
import ijson
import random
from werkzeug.middleware.proxy_fix import ProxyFix


app = Flask(__name__)

app.wsgi_app = ProxyFix(
    app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
)

#CORS(app)


# Set port number as 5000 for the front end and back end

# Check connection between front end and back end

# display graph on web page

# COMP90024-T13/front-end-back-end/flask-server/python-files/couchdb_view.py
# Everytime i do database.view the data gets refreshed.

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
    temp = count + random.randrange(1,100)
    print("count is ", temp)
    
    # return the number of data
    return jsonify(temp)


# Member API route
@app.route("/members")
def get_members():
    # return{"members" : ["Member1", "Member2", "Member3"]}
    list_i_want = ["lol", "lol2", "lol3"]
    temp = jsonify(list_i_want)
    return temp



# Fix Cors Issue, Cross-Origin = * (everyone can access this API)
if __name__ == "__main__":
    app.run(
        port=5100,
        debug=True,
    )