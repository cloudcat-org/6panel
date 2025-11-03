package main

import (
	"github.com/cloudcat-org/6panel/internal/handler"
	"github.com/cloudcat-org/6panel/internal/service"
)

func main() {
	handler.Route()
	service.WebService()
}
