def delete_terms_of_service_versions(cos, bucket_name, item_names):
    delete_request = {
        "Objects": [{"Key": item_name} for item_name in item_names]
    }
    response = cos.delete_objects(Bucket=bucket_name, Delete=delete_request)
    print(response)
    return [{"Key": deleted.pop("Key")} for deleted in response.pop("Deleted")]
