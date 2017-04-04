import json
import logger
import tornado.web

class RequestMapping:
    
    def __init__(self, *args, **kwargs):
        self.url = kwargs["url"]
        
        logger.debug("args: ", args)
        logger.debug("kwargs: ", kwargs)
    
    def __call__(self, controller):
        mapped_controller = type(controller.__name__,
                (controller, tornado.web.RequestHandler), {"url": self.url})
        
        return mapped_controller
