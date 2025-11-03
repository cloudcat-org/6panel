// module/config.go
package module

// Config represents the full configuration structure
type Config struct {
	Server struct {
		IPv4 struct {
			Enabled bool   `json:"enabled"`
			Host    string `json:"host"`
			Port    int    `json:"port"`
		} `json:"ipv4"`
		IPv6 struct {
			Enabled bool   `json:"enabled"`
			Host    string `json:"host"`
			Port    int    `json:"port"`
		} `json:"ipv6"`
		TLS struct {
			Enabled bool   `json:"enabled"`
			Cert    string `json:"cert"`
			Key     string `json:"key"`
		} `json:"tls"`
		Entrance string `json:"entrance"`
	} `json:"server"`
	API struct {
		Enabled bool   `json:"enabled"`
		Key     string `json:"key"`
	} `json:"api"`
	Users []struct {
		Uid      int    `json:"uid"`
		Username string `json:"username"`
		Password string `json:"password"`
		Language string `json:"language"`
	} `json:"users"`
}
