package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func SecurityHeaders() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Content-Security-Policy", "base-uri 'self'; frame-ancestors 'none'; object-src 'none'")
		c.Header("Cross-Origin-Opener-Policy", "same-origin-allow-popups")
		c.Header("Permissions-Policy", "geolocation=(), payment=(), usb=()")
		c.Header("Referrer-Policy", "strict-origin-when-cross-origin")
		c.Header("X-Content-Type-Options", "nosniff")
		c.Header("X-Frame-Options", "DENY")

		if c.Request.TLS != nil {
			c.Header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
		}

		if c.Request.Method == http.MethodOptions {
			c.Header("Cache-Control", "no-store")
		}
		c.Next()
	}
}
