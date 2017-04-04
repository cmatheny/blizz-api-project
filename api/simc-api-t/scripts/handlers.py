import json
import tornado.web

class RequestMapping:
    
    def __init__(self, url):
        print(url)
        self.url = url
        #self.handler["mapping"] = url
    
    def __call__(self, controller):
        class MappedHandler(controller, tornado.web.RequestHandler):
            url =  self.url
        print(MappedHandler)
        return MappedHandler
