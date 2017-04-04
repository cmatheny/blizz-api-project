from handlers import RequestMapping as RequestMapping
import importlib
import inspect
import logger
from tornado.web import RequestHandler

def generate_handlers(module_list):
    
    def loop_over_modules(module_list):
        handlers = []
        for module_name in module_list:
            logger.log(module_name)
            for controller in scan_controller_module(module_name):
                handlers.append((controller.url, controller))
        return handlers
        
    def scan_controller_module(module_name):
        module = importlib.import_module(module_name)
        module_dict=module.__dict__
        module_classes = extract_classes(module_dict)
        return [ klass for klass in module_classes if (issubclass(klass, RequestHandler)) ]
    
    def extract_classes(module_dict):
        return [ module_dict[key] for key in module_dict if (isinstance(module_dict[key], type)) ]
    
    logger.log(module_list)
            
    return loop_over_modules(module_list)

# Partially pseudo-code
def scan_controllers(app, settings_file="settings"):
    settings = importlib.import_module(settings_file)
    for modname in settings.CONTROLLER_MODULES:
        controller_module = importlib.import_module(modname)
