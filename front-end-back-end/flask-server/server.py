from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Set port number as 5000 for the front end and back end

# Check connection between front end and back end

# display graph on web page

# 

# Member API route
@app.route("/members")

def get_members():
    return{"members" : ["Member1", "Member2", "Member3"]}




# Fix Cors Issue, Cross-Origin = * (everyone can access this API)
if __name__ == "__main__":
    app.run(
        debug=True
    )