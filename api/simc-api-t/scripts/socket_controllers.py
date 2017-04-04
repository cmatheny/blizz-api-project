import json
import logger
from services import SimcService as service
import tornado.web
from handlers import RequestMapping
from tornado.websocket import WebSocketHandler

#@SocketController(r"/echo")
class EchoWebSocket(tornado.websocket.WebSocketHandler):
    url = r"/echo"
    def open(self):
        logger.log("WebSocket opened")

    def on_message(self, message):
        logger.log("Message received: ", json.loads(message))
        self.write_message(u"You said: " + message)

    def on_close(self):
        logger.log("WebSocket closed")
        
#@SocketController(r"/sim")
class SimcWebSocket(tornado.websocket.WebSocketHandler):
    url = r"/sim"
    def open(self):
        logger.log("WebSocket opened")

    def on_message(self, message):
        try:
            sim_json = json.loads(message)
        except json.decoder.JSONDecodeError:
            self.write_message("Invalid Format: Requires JSON")
        service.simc_armory_to_json(sim_json)
        self.write_message(u"You said: " + message)

    def on_close(self):
        logger.log("WebSocket closed")