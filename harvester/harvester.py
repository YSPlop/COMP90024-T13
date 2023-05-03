from mastodon import Mastodon, MastodonNotFoundError, MastodonRatelimitError, StreamListener
import csv, os, time, json

m = Mastodon(
        api_base_url=f'https://mastodon.social',
        access_token=os.environ['MASTODON_ACCESS_TOKEN']
    )

class Listener(StreamListener):
    def on_update(self, status):
        proccesItem(status)
        
def proccesItem(item, hashtag=None):
    output = {}
    if item['language'] is None:
        return
    elif str.lower(item['language']) == "en":
        output['item'] = item['content']
        print(json.dumps(output))

m.stream_public(Listener())

# Stream by hashtag
# m.stream_hashtag("#SilentSunday", Listener())