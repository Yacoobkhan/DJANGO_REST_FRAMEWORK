from algoliasearch_django import algolia_engine

def get_client():  # it takes records from the particular index
    return algolia_engine.client

def get_index(index_name='cfe_Product'):   # To say the Algolia this is the index we are going to use 
    client = get_client()
    index = client.init_index(index_name)     # give me the interface/objects for the cfe_product
    return index

def perform_index(query, **kwargs):
    index = get_index()  # it gets objects from algolia index
    params={}
    tags=""
    if "tags" in kwargs:
        tags = kwargs.pop("tags") or []
        if len(tags) != 0:
            params['tagFilters'] = tags
    index_filters = [f"{k}:{v}" for k,v in kwargs.items()]
    if len(index_filters) != 0:
        params['facetFilters'] = index_filters
    print(params)
    results = index.search(query,params) # it search inside the algolia index with query and params
    return results