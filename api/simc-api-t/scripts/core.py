import tornado.web
import settings as settings

class WebApp(tornado.web.Application):
    
def start_application():
    def decorator_func(func):
        def wrapper_func(*args, **kwargs):
            # Invoke the wrapped function first
            retval = func(*args, **kwargs)
            # Now do something here with retval and/or action
            print 'In wrapper_func, handling action {!r} after wrapped function returned {!r}'.format(action, retval)
            return retval
        return wrapper_func
    return decorator_func