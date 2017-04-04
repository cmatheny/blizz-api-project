import tornado.web

class RequestMapping(tornado.web.RequestHandler):
    handlers = []
        
    def __init__(self, url):
        print(url)
        self.handler = {}
        RequestMapping.handlers.append(self.handler)
        self.url = url
        self.handler["mapping"] = url
    
    def __call__(self, controller):
        print(controller)
        self.handler["controller"] = controller
        controller.url = self.url
        return controller