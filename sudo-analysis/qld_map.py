import folium
import matplotlib.pyplot as plt
import seaborn as sns
import statsmodels.api as sm
from cccmapping import sudo2df, twitter2df, formatmerge


if __name__ == "__main__":
    
    view_path_6 = '_design/sudo/_view/income'
    df = sudo2df(view_path_6)
    # Filter rows based on the condition
    df = df[df['lga_code'].str.startswith('3')]
        
    view_twitter = '_design/location/_view/location'
    df_sentiment = twitter2df(view_twitter)
    df_plot = formatmerge(df, df_sentiment, "lga_name")


    # Create map centered on QLD
    map = folium.Map(location=[-22.29, 144.25], zoom_start=5, tiles ="CartoDB Positron")
    
   # add chropleth layer
    # Proportion of children at school entry whose parents report high levels of family stress in the past month.
    folium.Choropleth(
        geo_data = df, 
        name = 'Choropleth', 
        data = df,
        columns = ['feature_code', "median_aud"],
        key_on = 'feature.properties.feature_code',
        fill_color = "BuPu",
        fill_opacity = 0.7,
        line_opacity = 0.2,
        legend_name = "Median Personal Income ($AUD)").add_to(map)
    
    # add hover over pop up
    highlights = folium.features.GeoJson(df_plot,style_function= lambda x: {'color':'transparent', 'fillColor':'transparent', 'weight':0}, highlight_function = lambda x: {'fillColor': '#000000', 
    'color':'#000000', 'fillOpacity': 0.50, 'weight': 0.1}, tooltip=folium.features.GeoJsonTooltip(fields=['lga_name' , 'median_aud', 'avg' ], aliases = [ "LGA", "Family Stress", "Sentiment Score"], labels = True,sticky = False))
    map.add_child(highlights)
    map.keep_in_front(highlights)

    map.save('qld-map.html')


    # Filter out rows with "no tweet data" values
    df_filtered = df_plot[df_plot['avg'] != 'No tweet data']

    # Convert 'value' column to float
    df_filtered['avg'] = df_filtered['avg'].astype(float)

    # Set plot style to 'darkgrid'
    sns.set_style('darkgrid')

    # Set plot size
    plt.figure(figsize=(12, 8))

    # Create scatterplot with x and y labels
    ax = sns.scatterplot(data=df_filtered, x='median_aud', y='avg')
    ax.set(xlabel='Median Personal Income ($AUD)', ylabel='Tweet Sentiment Score')

    # Fit OLS model and print summary
    X = sm.add_constant(df_filtered['median_aud'])
    y = df_filtered['avg']
    model = sm.OLS(y, X)
    results = model.fit()

    # Overlay fitted line on scatterplot
    sns.lineplot(x=df_filtered['median_aud'], y=results.fittedvalues, color='grey')

    # Add a title to the plot
    plt.title("Scatter Plot of Median Personal Income and Tweet Sentiment", fontsize =16)

    # Save the plot as a PNG file
    plt.savefig('qld_scatter.png', format='png', dpi=300)
