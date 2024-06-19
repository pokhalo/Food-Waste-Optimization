import spacy
import spacy_stanza
import stanza


class LanguageProcessor:
    """Class to process menu items
    using natural language processing -methods
    """

    def __init__(self):
        self.nlp = None

        self._load_nlp()

    def _load_nlp(self):
        stanza.download(lang="fi")
        self.nlp = spacy_stanza.load_pipeline(name="fi")

    def process(self, item):
        return self.nlp(item)


language_processor = LanguageProcessor()

if __name__ == "__main__":
    lm = LanguageProcessor()
    lm._load_nlp()
    print(lm.process("kasvoin"))
