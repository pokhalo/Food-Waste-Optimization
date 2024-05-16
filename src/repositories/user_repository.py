
class UserRepository:
    """Class to handle connection to db
    """
    def __init__(self, username: str, name: str):
        self.username = username
        self.name = name