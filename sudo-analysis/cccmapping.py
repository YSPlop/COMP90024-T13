import geopandas as gpd
import matplotlib.pyplot as plt
import couchdb
import pandas as pd
import re
import seaborn as sns
import statsmodels.api as sm
from shapely.geometry import MultiPolygon, shape
import json


def sudo2df(view_path):
    server = couchdb.Server('http://admin:password@172.26.131.88:5984')
    db = server['sudo']
    # Create view and read as GeoPandas dataframe
    data_1 = db.view(view_path, include_docs = True, reduce = False)
    list_1 = []
    for item in data_1:
        geo_str = str(item['doc']['geometry'])
        geo_json = json.loads(geo_str.replace("'", '"'))
        item['doc']['geometry'] = MultiPolygon(shape(geo_json))
        list_1.append(item['doc'])

    df = gpd.GeoDataFrame(list_1)
    df.set_crs(epsg = "4283", inplace = True)
    return df


def twitter2df(view_path):
    # Connect to CouchDB- twitter
    server = couchdb.Server('http://admin:password@172.26.131.88:5984')
    db = server['twitter']

    # Query aggregated document per lga
    view_lga = db.view(view_path, reduce = True, group_level = 2)
    data = []
    for item in view_lga:
        if item.key[1] != '':
            data.append({'key': item.key[1],
                        'avg': "{:.3f}".format(round(item.value['avg'], 3)), 
                        'max': "{:.3f}".format(round(item.value['max'], 3)),
                        'count': int(item.value['count'])})

    # Convert the list of dictionaries to a pandas dataframe using pd.DataFrame()
    df = pd.DataFrame(data)
    return df


# function to clean LGA names
def clean_lga_name(lga_name):
    # Standardise LGA Names
    remove_words = ["City", "of", "Municipality"]
    
    # convert to lowercase and remove any extra whitespace
    lga_name = lga_name.strip()
    # remove the specified keywords
    for word in remove_words:
        lga_name = lga_name.replace(word, "")
    return lga_name.strip()

def formatmerge(df_sudo, df_sentiment, sudo_lga_col):
    df_sentiment['key'] = df_sentiment['key'].apply(clean_lga_name)

    # Standardise LGA Names
    df_sudo[sudo_lga_col] = df_sudo[sudo_lga_col].apply(lambda x: re.sub(r'\s*\([^)]*\)', '', x))

    df_plot = gpd.GeoDataFrame(df_sudo.merge(df_sentiment, left_on = sudo_lga_col, right_on ="key", how= "left"))

    # Fill NaN values in column with 'No tweets'
    df_plot['avg'].fillna('No tweet data', inplace=True)
    df_plot['max'].fillna('No tweet data', inplace=True)
    df_plot['count'].fillna('No tweet data', inplace=True)

    return df_plot