import handlers
import os
import services
import sys
import tornado.ioloop
import tornado.web

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
    ])

'''
@app.route('/queue', methods=['GET'])
def get_queue():
    queue = service.get_queue()
    print(queue, file=sys.stderr)
    return flask.jsonify(queue)

@app.route('/test', methods=['GET'])
def test_endpoint():
    print("Got request")

@app.route('/test', methods=['POST'])
def test_endpoint_post():
    request_json = flask.request.get_json(force=True)
    print(request_json, file=sys.stderr)
    results_json = service.simc_armory_to_json(request_json)
    return flask.jsonify(results_json)
'''

if __name__ == '__main__':
    with open("/root/.simc_apikey", "w") as f: 
        f.write(os.environ['APIKEY'])

    service = services.SimcService()

    app = make_app()
    app.listen(8888)

    tornado.ioloop.IOLoop.current().start()
    