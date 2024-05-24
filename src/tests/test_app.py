#import sys
#sys.path.insert(0, '../')

import unittest
from flask_testing import TestCase
import index

class TestApp(TestCase):
    def create_app(self):
        return index.app

    def test_initial_view(self):
        response = self.client.get('/')
        self.assert200(response)

if __name__ == '__main__':
    unittest.main()

