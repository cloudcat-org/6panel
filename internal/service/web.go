package service

import (
	"fmt"
	"log"
	"net"
	"net/http"

	"github.com/cloudcat-org/6panel/internal/handler"
)

func WebService() {
	config, err := handler.GetConfig()
	if err != nil {
		log.Fatalf("[Error] Failed to load config: %v", err)
	}

	var listener net.Listener
	var address_v4 string
	var address_v6 string
	var msg string

	log.Printf("[Info] Starting web service")
	switch {
	case config.Server.IPv6.Enabled && config.Server.IPv4.Enabled:
		address_v6 = fmt.Sprintf("[%s]:%d", config.Server.IPv6.Host, config.Server.IPv6.Port)
		address_v4 = fmt.Sprintf("%s:%d", config.Server.IPv4.Host, config.Server.IPv4.Port)
		log.Printf("[Info] IPv4 address: %s, IPv6 address: %s", address_v4, address_v6)
		msg = "Dual-stack: IPv6 + IPv4"
		err := http.ListenAndServe(address_v6, nil)
		if err != nil {
			log.Fatalf("[Error] Failed to start server: %v", err)
		}
	case config.Server.IPv6.Enabled:
		address_v6 = fmt.Sprintf("[%s]:%d", config.Server.IPv6.Host, config.Server.IPv6.Port)
		log.Printf("[Info] Address: %s", address_v6)
		listener, err = net.Listen("tcp6", address_v6)
		if err != nil {
			log.Fatalf("[Error] Failed to listen on IPv6 address %s: %v", address_v6, err)
		}
		msg = "IPv6 only"
		err := http.Serve(listener, nil)
		if err != nil {
			log.Fatalf("[Error] Failed to start server: %v", err)
		}
	case config.Server.IPv4.Enabled:
		address_v4 = fmt.Sprintf("%s:%d", config.Server.IPv4.Host, config.Server.IPv4.Port)
		log.Printf("[Info] Address: %s", address_v4)
		listener, err = net.Listen("tcp4", address_v4)
		if err != nil {
			log.Fatalf("[Error] Failed to listen on IPv4 address %s: %v", address_v4, err)
		}
		msg = "IPv4 only"
		err := http.Serve(listener, nil)
		if err != nil {
			log.Fatalf("[Error] Failed to start server: %v", err)
		}
	default:
		log.Fatal("[Error] Both IPv4 and IPv6 are disabled. No service started.")
	}
	log.Printf("[Info] Web service started on %s", msg)
}
