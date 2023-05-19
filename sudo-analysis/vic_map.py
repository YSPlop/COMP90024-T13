import folium
import geopandas as gpd
import matplotlib.pyplot as plt
import couchdb
import pandas as pd
import re
import seaborn as sns
import statsmodels.api as sm
from shapely.geometry import MultiPolygon, shape
from cccmapping import sudo2df, twitter2df, formatmerge


if __name__ == "__main__":
    
    view_path_1 = '_design/sudo/_view/children_mother_education'
    df = sudo2df(view_path_1)
        
    view_twitter = '_design/location/_view/location'
    df_sentiment = twitter2df(view_twitter)
    df_plot = formatmerge(df, df_sentiment, "lga_name")

    # Create map centered on Victoria
    map = folium.Map(location=[-31.3, 147], zoom_start=6, tiles ="CartoDB Positron")
    df_plot['chldrn_fmls_mthr_lw_edctnl_attnmnt_2016_pc_in_whre_the_hs'] = df_plot['chldrn_fmls_mthr_lw_edctnl_attnmnt_2016_pc_in_whre_the_hs'].astype(float)

    # add chropleth layer
    folium.Choropleth(
        geo_data = df_plot, 
        name = 'Choropleth', 
        data = df_plot,
        columns = ['lga_code', "chldrn_fmls_mthr_lw_edctnl_attnmnt_2016_pc_in_whre_the_hs"],
        key_on = 'feature.properties.feature_code',
        fill_color = "BuPu",
        fill_opacity = 0.7,
        line_opacity = 0.2,
        legend_name = "Percent of Children In Families Where The Mother Has Low Educational Attainment").add_to(map)
    
    # add hover over pop up
    highlights = folium.features.GeoJson(df_plot,style_function= lambda x: {'color':'transparent', 'fillColor':'transparent', 'weight':0}, highlight_function = lambda x: {'fillColor': '#000000', 
    'color':'#000000', 'fillOpacity': 0.50, 'weight': 0.1}, tooltip=folium.features.GeoJsonTooltip(fields=['lga_name' , 'chldrn_fmls_mthr_lw_edctnl_attnmnt_2016_pc_in_whre_the_hs', 'avg' ], aliases = [ "LGA", "Mother Low Education", "Sentiment Score"], labels = True,sticky = False))
    map.add_child(highlights)
    map.keep_in_front(highlights)
    map.save('./sudo-analysis/maps/sydney-map.html')