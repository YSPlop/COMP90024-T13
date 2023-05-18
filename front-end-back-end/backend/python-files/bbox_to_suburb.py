import reverse_geocoder as rg
import numpy as np

def bbox_to_location(bbox):
    """Convert a bounding box to subrub.

    Arguments:
        bbox (list): bounding box in the form [longitude, latitude, longitude, latitude]
    
    Returns:
        subrub (str): Suburb Name
        state (str): State Name
        lga (str): Local government area
        centrex (float): Centre of bounding box longitude
        centrey (float): Centre of bounding box lattitude
    """

    # Calculate the center of the bounding box
    centrex, centrey = (np.average(bbox[::2]), np.average(bbox[1::2]))

    # Perform the reverse geocoding lookup and return desired location attributes
    location_data = rg.search((centrey, centrex))
    suburb = location_data[0]['name']
    state =  location_data[0]['admin1']
    lga = location_data[0]['admin2']
    
    return suburb, lga, state, centrex, centrey
