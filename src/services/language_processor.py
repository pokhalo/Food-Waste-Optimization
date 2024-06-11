import stanza, spacy, spacy_stanza

class LanguageProcessor:
    """Class to process menu items
    using natural language processing -methods
    """
    def __init__(self):
        self.nlp = None
    
    def _load_nlp(self):
        spacy_stanza.download(lang="fi", package="ftb")
        self.nlp = stanza.Pipeline(lang="fi", processors="tokenize, pos")



language_processor = LanguageProcessor()

if __name__== "__main__":
    lm = LanguageProcessor()
    lm._load_nlp()
    print(type(lm.nlp))