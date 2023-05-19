import folium
import geopandas as gpd
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
import statsmodels.api as sm
from cccmapping import sudo2df, twitter2df, formatmerge


if __name__ == "__main__":
    
    view_path_1 = '_design/sudo/_view/children_mother_education'
    df = sudo2df(view_path_1)
        
    view_twitter = '_design/location/_view/location'
    df_sentiment = twitter2df(view_twitter)
    df_plot = formatmerge(df, df_sentiment, "lga_name")

    # Define a dictionary mapping the old values to the new values
    value_mapping = {
        'Shoalhaven': 'Shoalhaven Shire',
        'Tamworth': 'Tamworth Regional',
        'Dubbo': 'Dubbo Regional',
        'Armidale Dumaresq': 'Armidale Regional',
        'Lake Macquarie Shire': 'Lake Macquarie',
        'Port Stephens Shire': 'Port Stephens',
        'Byron Shire':'Byron',
        'Queanbeyan': 'Queanbeyan-Palerang Regional',  
        # Add more mappings as needed
    }

    # Replace the values using the dictionary
    df_sentiment['key'] = df_sentiment['key'].replace(value_mapping)

    # Create map centered on Victoria
    map = folium.Map(location=[-32.1, 147], zoom_start=6.3, tiles ="CartoDB Positron")
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
    map.save('./sudo-analysis/maps/nsw-map.html')


    # Filter out rows with "no tweet data" values
    df_filtered = df_plot[df_plot['avg'] != 'No tweet data']

    # Convert 'value' column to float
    df_filtered['avg'] = df_filtered['avg'].astype(float)

    # Set plot style to 'darkgrid'
    sns.set_style('darkgrid')

    # Set plot size
    plt.figure(figsize=(12, 8))

    # Create scatterplot with x and y labels
    ax = sns.scatterplot(data=df_filtered, x='chldrn_fmls_mthr_lw_edctnl_attnmnt_2016_pc_in_whre_the_hs', y='avg')
    ax.set(xlabel='Percent of Children In Families Where The Mother Has Low Educational Attainment', ylabel='Tweet Sentiment Score')

    # Fit OLS model and print summary
    X = sm.add_constant(df_filtered['chldrn_fmls_mthr_lw_edctnl_attnmnt_2016_pc_in_whre_the_hs'])
    y = df_filtered['avg']
    model = sm.OLS(y, X)
    results = model.fit()
  
    # Overlay fitted line on scatterplot
    sns.lineplot(x=df_filtered['chldrn_fmls_mthr_lw_edctnl_attnmnt_2016_pc_in_whre_the_hs'], y=results.fittedvalues, color='grey')

    # Add a title to the plot
    plt.title("Scatter Plot of Mother Educational Attainment and Tweet Sentiment", fontsize =16)

    # Save the plot as a PNG file
    plt.savefig('nsw_scater.png', format='png', dpi=300)