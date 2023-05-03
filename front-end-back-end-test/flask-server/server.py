from flask import Flask

app = Flask(__name__)

# Member API route
@app.route("/members")
def get_members():
    return{"members" : ["Member1", "Member2", "Member3"]}

if __name__ == "__main__":
    app.run(
        debug=True
    )