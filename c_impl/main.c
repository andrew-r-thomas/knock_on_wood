/*
	 TODO:
	 - do linking for mongoose (in a makefile)
	 - test that it's working with react app
*/

#include <stdio.h>
#include "mongoose.h"

static void handler(struct mg_connection *c, int ev, void *ev_data)
{
	if (ev == MG_EV_HTTP_MSG) {  // New HTTP request received
		struct mg_http_message *hm = (struct mg_http_message *) ev_data;  // Parsed HTTP request
		if (mg_match(hm->uri, mg_str("/knock"), NULL)) {              // REST API call?
			mg_http_reply(c, 200, "Content-Type: application/json\r\n", "{%m:%s}\n", MG_ESC("message"), "\"knock knock\"");    // Yes. Respond JSON
		} else {
			struct mg_http_serve_opts opts = {.root_dir = "."};  // For all other URLs,
			mg_http_serve_dir(c, hm, &opts);                     // Serve static files
		}
	}

}

int main(void)
{
	struct mg_mgr mgr;  // Mongoose event manager. Holds all connections
	mg_mgr_init(&mgr);  // Initialise event manager
	mg_http_listen(&mgr, "http://192.168.50.68:8090", handler, NULL);  // Setup listener
	for (;;) {
		mg_mgr_poll(&mgr, 1000);  // Infinite event loop
	}
	return 0;
}
