package handler

import (
	"log"
	"net/http"

	"github.com/cloudcat-org/6panel/internal/module"
)

// ErrorHandler Common error response handler
func ErrorHandler(w http.ResponseWriter, r *http.Request, statusCode int) {
	loadErrorTemplate()

	w.WriteHeader(statusCode)
	SetHeaders(w, "text/html; charset=utf-8")

	var title, message string
	switch statusCode {
	case http.StatusNotFound:
		title = "404 Sources Not Found"
		message = "Oops, we can't find your dimension!"
	case http.StatusInternalServerError:
		title = "500 Internal Server Error"
		message = "Oops, there is an error in this dimension!"
	case http.StatusBadRequest:
		title = "400 Bad Request"
		message = "Oops, you have accessed the wrong dimension!"
	case http.StatusForbidden:
		title = "403 Forbidden"
		message = "You don't have permission to access this dimension."
	default:
		title = "Error"
		message = "An unexpected error occurred."
	}

	log.Printf("[Web Access] Return %d error: %s", statusCode, message)

	data := module.ErrorPageData{
		StatusCode: statusCode,
		Title:      title,
		Message:    message,
	}

	if err := errorTemplate.Execute(w, data); err != nil {
		log.Printf("[Error] Failed to render error page: %v", err)
	}
}
