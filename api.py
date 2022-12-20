import json;
import requests;
from transformers import pipeline;

base_url = "http://localhost:3001"
uri = base_url + "/twitter/search-all/in_reply_to_status_id?id=448110947937165312&start_time=2014-03-08&end_time=2014-04-05"
response = requests.get(uri)
content = json.loads(response.content)
data = content["data"]

result = []
for item in data:
    result.append(item['text'])
# print(result)

# zeroshot_classifier = pipeline('zero-shot-classification', model='facebook/bart-large-mnli')
# candidate_labels = ('joy', 'happy', 'crash', 'crisis')

# zeroshot_classifier(result, candidate_labels)

sentiment_classifier = pipeline('sentiment-analysis', model='finiteautomata/bertweet-base-sentiment-analysis')
resp = sentiment_classifier(result)
print(resp)
