package module

// ErrorPageData Data model for error page template
type ErrorPageData struct {
	StatusCode int
	Title      string
	Message    string
}

// IndexPageData Data model for index page template
type IndexPageData struct {
	StatusCode int
	Title      string
	I18n       string
}
