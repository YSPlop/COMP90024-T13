# Team 13: Alex Wang 1427869, Ka Shun Carson Young 1086178, Eldon Yeh 1276574, Yukash Sivaraj 1054297
import folium
#import geopandas as gpd
import matplotlib.pyplot as plt
#import pandas as pd
import seaborn as sns
import statsmodels.api as sm
from cccmapping import sudo2df, twitter2df, formatmerge


if __name__ == "__main__":
    
    view_path_5 = '_design/sudo/_view/housing_stress'
    df = sudo2df(view_path_5)
    df['stress_rate']= (df['very_low_income_less_than_603_dollars_per_wk']+df['low_income_603_to_964_dollars_per_wk'])/df['total']
    df['stress_rate'] =df['stress_rate'].round(3)

    view_twitter = '_design/location/_view/location'
    df_sentiment = twitter2df(view_twitter)
    df_plot = formatmerge(df, df_sentiment, "lga_name16")

    # Create map centered on SA
    map = folium.Map(location=[-33, 135.6], zoom_start=6.2, tiles ="CartoDB Positron") 
    
    # add chropleth layer
    folium.Choropleth(
        geo_data = df_plot, 
        name = 'Choropleth', 
        data = df_plot,
        columns = ['lga_code16', "stress_rate"],
        key_on = 'feature.properties.feature_code',
        fill_color = "BuPu",
        fill_opacity = 0.7,
        line_opacity = 0.2,
        legend_name = "Households in Income Stress").add_to(map)
    

    # add hover over pop up
    highlights = folium.features.GeoJson(df_plot,style_function= lambda x: {'color':'transparent', 'fillColor':'transparent', 'weight':0}, highlight_function = lambda x: {'fillColor': '#000000', 
    'color':'#000000', 'fillOpacity': 0.50, 'weight': 0.1}, tooltip=folium.features.GeoJsonTooltip(fields=['lga_name16' , 'stress_rate', 'avg' ], aliases = [ "LGA", "Income Stress", "Sentiment Score"], labels = True,sticky = False))
    map.add_child(highlights)
    map.keep_in_front(highlights)
    map.save('sa-map.html')

    
    # Filter out rows with "no tweet data" values
    df_filtered = df_plot[df_plot['avg'] != 'No tweet data']

    # Convert 'value' column to float
    df_filtered['avg'] = df_filtered['avg'].astype(float)

    # Set plot style to 'darkgrid'
    sns.set_style('darkgrid')

    # Set plot size
    plt.figure(figsize=(12, 8))

    # Create scatterplot with x and y labels
    ax = sns.scatterplot(data=df_filtered, x='stress_rate', y='avg')
    ax.set(xlabel='Housing Stress Rate', ylabel='Tweet Sentiment Score')

    # Fit OLS model and print summary
    X = sm.add_constant(df_filtered['stress_rate'])
    y = df_filtered['avg']
    model = sm.OLS(y, X)
    results = model.fit()

    # Overlay fitted line on scatterplot
    sns.lineplot(x=df_filtered['stress_rate'], y=results.fittedvalues, color='grey')

    # Add a title to the plot
    plt.title("Scatter Plot of Housing Stress and Tweet Sentiment", fontsize =16)

    # Save the plot as a PNG file
    plt.savefig('sa_scater.png', format='png', dpi=300)

