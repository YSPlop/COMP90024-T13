from flask import Flask, jsonify, request
from flask_cors import CORS
import couchdb
import ijson
import random
from werkzeug.middleware.proxy_fix import ProxyFix
from MastadonT13 import MastodonT13


app = Flask(__name__)

app.wsgi_app = ProxyFix(
    app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
)


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

@app.route("/hashtagList")
def get_hashtag_list():
    mastodon = MastodonT13()
    hashtag_list = mastodon.hashtag_list()
    print("hashtagList fetched: ", hashtag_list)
    return jsonify(hashtag_list)

@app.route("/barChart")
def get_bar_chart():
    mastodon = MastodonT13()
    path = mastodon.bar_chart()
    print("barChart fetched: ", path)
    return jsonify(path)

@app.route("/histogram", methods=["POST"])
def get_histogram():
    hashtag = request.json['hashtag']
    hashtag = hashtag['member']
    mastodon = MastodonT13()
    path = mastodon.histogram(hashtag)
    print("histogram fetched: ", path)
    return jsonify(path)


    

# (everyone can access this API)
if __name__ == "__main__":
    app.run(
        port=5100,
        debug=True,
    )