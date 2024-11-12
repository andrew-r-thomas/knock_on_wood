package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-webauthn/webauthn/webauthn"
)

type knockResponse struct {
	Message string `json:"message"`
}

func knock(w http.ResponseWriter, r *http.Request) {
	resp := knockResponse{
		Message: "knock knock",
	}
	json.NewEncoder(w).Encode(resp)
}

var (
	webAuthn *webauthn.WebAuthn
	err      error
)

func main() {
	wconfig := &webauthn.Config{
		RPDisplayName: "knock on wood",
		RPID:          "go-webauthn.local",
		RPOrigins:     []string{"https://login.go-webauthn.local"},
	}
	if webAuthn, err = webauthn.New(wconfig); err != nil {
		fmt.Println(err)
	}
	http.HandleFunc("/knock", knock)
	http.ListenAndServe(":8090", nil)
}
