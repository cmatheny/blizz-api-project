import importlib
import inspect
import logger

# Partially pseudo-code
def scan_controllers(app, settings_file="settings"):
    settings = importlib.import_module(settings_file)
    for modname in settings.CONTROLLER_MODULES:
        controller_module = importlib.import_module(modname)
        for name, controller in [ obj for obj 
                in inspect.getmembers(controller_module)
                if inspect.isclass(obj[1])]:
            logger.log("".join(["Mapped ", name, " to ", controller.url]))
            app.add_handlers(controller.url, controller)

