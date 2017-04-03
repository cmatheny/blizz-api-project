import json
import tornado.web

class RequestMapping():
    mappings=[]
        
    def __call__(controller, url):
        mappings.append(url)
        return contrpller
        
@RequestMapping(url = r"/")
class MainHandler(tornado.web.RequestHandler):
    url = "r/"
    def get(self):
        self.write("Hello, world")

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
