package handler

import (
	"net/http"
)

// Route handles the routing of the application
func Route() {
	// Static files routes
	http.HandleFunc("/favicon.ico", StaticFileHandler)
	http.HandleFunc("/css/", StaticFileHandler)
	http.HandleFunc("/js/", StaticFileHandler)
	http.HandleFunc("/img/", StaticFileHandler)

	// Index page routes
	http.HandleFunc("/", IndexHandler)
}
