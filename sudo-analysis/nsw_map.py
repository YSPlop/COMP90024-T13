
"""
Produces an interactive Map for NSW
"""



import folium
import geopandas as gpd
import matplotlib.pyplot as plt
import couchdb
import pandas as pd
import re




if __name__ == '__main__':
        # Import SUDO dataset 
        path = '../sudo_data/phidu_families_lga_2016-6565623058087549581.json'
        df = gpd.read_file(path)