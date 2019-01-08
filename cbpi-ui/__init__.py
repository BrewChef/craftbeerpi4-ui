
import os
from cbpi.api import *

class CBPiUi(CBPiExtension):

    def __init__(self, cbpi):
        self.cbpi = cbpi
        path = os.path.dirname(__file__)
        self.cbpi.register(self, "/ui", static=os.path.join(path, "static"))


def setup(cbpi):

    cbpi.plugin.register("UI", CBPiUi)
