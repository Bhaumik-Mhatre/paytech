import numpy as np
import nltk
import string
import random
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


nltk.download('punkt')
nltk.download('wordnet')
nltk.download('omw-1.4')
# Load and preprocess the dataset
with open('C:/Users/mhatr/Desktop/paytech/backend/dataset.txt', 'r', errors='ignore') as f:
    raw = f.read().lower()

# Tokenize the dataset into sentences and words
sentence_tokens = nltk.sent_tokenize(raw)
word_tokens = nltk.word_tokenize(raw)

# Lemmatization function
lemmer = nltk.stem.WordNetLemmatizer()

def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]

# Remove punctuation and normalize text
remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)

def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))

# Greeting function
greet_inputs = ('hello', 'hi', 'greetings', 'sup', 'hey', "hello there")
greet_responses = ['hi', 'hey', '*nods*', 'hi there']

def greet(sentence):
    for word in sentence.split():
        if word.lower() in greet_inputs:
            return random.choice(greet_responses)

# Generate bot response
def response(user_response):
    robo1_response = ''
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words='english')
    tfidf = TfidfVec.fit_transform(sentence_tokens)
    vals = cosine_similarity(tfidf[-1], tfidf)
    idx = vals.argsort()[0][-2]
    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]
    if req_tfidf == 0:
        robo1_response = "I am sorry! I don't understand you"
    else:
        robo1_response = sentence_tokens[idx]
    return robo1_response
