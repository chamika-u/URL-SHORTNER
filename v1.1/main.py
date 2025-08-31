from flask import Flask, render_template, request
import pyshorteners
import bitly_api

app = Flask(__name__)

@app.route("/", methods=['POST', 'GET'])
def home():
    old_url = ""
    new_url = ""
    
    if request.method == "POST":
        url_received = request.form["url"]
        old_url = url_received

        # ---- Option 1: TinyURL (works without token)
        new_url = pyshorteners.Shortener().tinyurl.short(url_received)

        # ---- Option 2: Bitly (only if you want to use your token)
        # bitly = bitly_api.Connection(access_token="YOUR_BITLY_TOKEN")
        # result = bitly.shorten(uri=url_received)
        # new_url = result['url']   # extract actual short URL

    return render_template("index.html", old_url=old_url, new_url=new_url)

if __name__ == "__main__":
    app.run(debug=True)