package middleware

import (
	"fmt"
	"net/http"
	"runtime/debug"

	"github.com/adm73/infra_vaultec/common"
	"github.com/gin-gonic/gin"
)

func RelayPanicRecover() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				common.SysLog(fmt.Sprintf("panic detected: %v", err))
				common.SysLog(fmt.Sprintf("stacktrace from panic: %s", string(debug.Stack())))
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": gin.H{
						"message": "An internal server error occurred. Please contact support at vaultec.ai.",
						"type":    "internal_server_error",
					},
				})
				c.Abort()
			}
		}()
		c.Next()
	}
}
