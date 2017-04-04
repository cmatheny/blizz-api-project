import handlers
import importlib
import logger
import module_scanner
import os
import services
import settings as settings
import sys
import tornado.ioloop
import tornado.web
import tornado.websocket

def make_app(settings_file = "settings"):
    settings = importlib.import_module(settings_file)
    handlers = module_scanner.generate_handlers(settings.CONTROLLER_MODULES)
    app = tornado.web.Application(handlers)
    app.listen(settings.SERVER_PORT)
    logger.log("Server listening on port: ", settings.SERVER_PORT)
    return app

if __name__ == '__main__':
    with open("/root/.simc_apikey", "w") as f: 
        f.write(os.environ['APIKEY'])
    
    #service = services.SimcService()
    logger.log("Debug Test")
    logger.log("Log Test")
    logger.warn("Warn Test")
    logger.err("Error Test")
    app = make_app()
    service = services.SimcService()
    tornado.ioloop.IOLoop.current().start()