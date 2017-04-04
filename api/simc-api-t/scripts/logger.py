import inspect
import settings
import datetime

def log(*args, stdout=settings.DEFAULT_STDOUT, separator="", end="\n"):
    if 'log' in settings.LOG_INCLUDE:
        caller = inspect.currentframe().f_back.f_code.co_name
        output = "".join([str(arg) for arg in args])
        full_output = "\t".join(["---LOG:", timestamp(), caller, output])
        print(full_output, file=stdout, sep=separator, end=end, flush=True)
        
def timestamp():
    if settings.LOG_TIMESTAMP is True:
        return str(datetime.datetime.now())
    else:
        return ""
        