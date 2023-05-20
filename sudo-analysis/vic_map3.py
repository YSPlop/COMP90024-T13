import folium
#import geopandas as gpd
import matplotlib.pyplot as plt
#import pandas as pd
import seaborn as sns
import statsmodels.api as sm
from cccmapping import sudo2df, twitter2df, formatmerge


if __name__ == "__main__":
    
    view_path_3 = '_design/sudo/_view/family_violence'
    df = sudo2df(view_path_3)
        
    view_twitter = '_design/location/_view/location'
    df_sentiment = twitter2df(view_twitter)
    # Define a dictionary mapping the old values to the new values
    value_mapping = {
        'Ballarat North': 'Ballarat',
        'Mildura Shire': 'Mildura'

        # Add more mappings as needed
    }

    # Replace the values using the dictionary
    df_sentiment['key'] = df_sentiment['key'].replace(value_mapping)
    df_plot = formatmerge(df, df_sentiment, "lga_name11")

    
    # Create map centered on Victoria
    map = folium.Map(location=[-37, 145], zoom_start=6, tiles ="CartoDB Positron")
    # add chropleth layer
    # Proportion of children at school entry whose parents report high levels of family stress in the past month.
    # add chropleth layer
    # Proportion of children at school entry whose parents report high levels of family stress in the past month.
    folium.Choropleth(
        geo_data = df, 
        name = 'Choropleth', 
        data = df,
        columns = ['feature_code', "domestic_family_sexual_violence_rate_per_100k"],
        key_on = 'feature.properties.feature_code',
        fill_color = "BuPu",
        fill_opacity = 0.7,
        line_opacity = 0.2,
        legend_name = "Domestic/Family/Sexual violence rate per 100,000 population 2016-2018.").add_to(map)
        
    # add hover over pop up
    highlights = folium.features.GeoJson(df_plot,style_function= lambda x: {'color':'transparent', 'fillColor':'transparent', 'weight':0}, highlight_function = lambda x: {'fillColor': '#000000', 
    'color':'#000000', 'fillOpacity': 0.50, 'weight': 0.1}, tooltip=folium.features.GeoJsonTooltip(fields=['lga_name11' , 'domestic_family_sexual_violence_rate_per_100k', 'avg' ], aliases = [ "LGA", "Domestic/Family/Sexual violence rate", "Sentiment Score"], labels = True,sticky = False))
    map.add_child(highlights)
    map.keep_in_front(highlights)

    map.save('vic-map3.html')


    # Filter out rows with "no tweet data" values
    df_filtered = df_plot[df_plot['avg'] != 'No tweet data']

    # Convert 'value' column to float
    df_filtered['avg'] = df_filtered['avg'].astype(float)

    # Set plot style to 'darkgrid'
    sns.set_style('darkgrid')

    # Set plot size
    plt.figure(figsize=(10, 6))

    # Create scatterplot with x and y labels
    ax = sns.scatterplot(data=df_filtered, x='domestic_family_sexual_violence_rate_per_100k', y='avg')
    ax.set(xlabel='Family Violence patient rate per 100k', ylabel='Tweet Sentiment Score')

    # Fit OLS model and print summary
    X = sm.add_constant(df_filtered['domestic_family_sexual_violence_rate_per_100k'])
    y = df_filtered['avg']
    model = sm.OLS(y, X)
    results = model.fit()

    # Overlay fitted line on scatterplot
    sns.lineplot(x=df_filtered['domestic_family_sexual_violence_rate_per_100k'], y=results.fittedvalues, color='grey')

    # Add a title to the plot
    plt.title("Scatter Plot of Domestic/Family/Sexual Violence Rate and Tweet Sentiment", fontsize =16)

    # Save the plot as a PNG file
    plt.savefig('vic_scater3.png', format='png', dpi=300)
