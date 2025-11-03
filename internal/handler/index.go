package handler

import (
	"log"
	"net/http"

	"github.com/cloudcat-org/6panel/internal/module"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	loadPageTemplate()

	config, err := GetConfig()
	if err != nil {
		log.Fatalf("[Error] Failed to load config: %v", err)
	}

	data := module.IndexPageData{
		StatusCode: 200,
		Title:      "CloudCat 6Panel",
		I18n:       config.Users[0].Language,
	}

	var shouldRender bool

	if config.Server.Entrance == "" {
		shouldRender = (r.URL.Path == "/")
	} else {
		shouldRender = (r.URL.Path == "/"+config.Server.Entrance)
	}

	if shouldRender {
		w.WriteHeader(200)
		SetHeaders(w, "text/html; charset=utf-8")
		if err := pageTemplate.Execute(w, data); err != nil {
			log.Printf("[Error] Failed to render index page: %v", err)
		}
	} else {
		ErrorHandler(w, r, http.StatusNotFound)
	}
}
