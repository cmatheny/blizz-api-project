import settings
import module_scanner as ms
import tornado.web
a = ms.generate_handlers(settings)
print(a)
b = tornado.web.Application(a)
print(b.handlers)

import run
app = run.make_app()
