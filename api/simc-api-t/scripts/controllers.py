import json
import logger
import tornado.web
from handlers import RequestMapping

@RequestMapping(url = r"/")
class MainHandler:
    #url = "r/"
    def get(self):
        print("Hello, world")

@RequestMapping(url = r"/simulate")
class SimulationHandler:
    def get(self):
        print("Do a simulation")


'''        
mappings.append(r"/simulate", SimulateHandler)
class SimulateHandler(tornado.web.RequestHandler):
    def post(self):
            request_json = flask.request.get_json(force=True)
        print(request_json, file=sys.stderr)
        results_json = service.simc_armory_to_json(request_json)
        return return_json(results_json)
        
def stringify(json_dict):
    return json.dumps(json_dict, sort_keys=True, indent=2)
   ''' 
