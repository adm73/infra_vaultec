package controller

import (
	"errors"
	"fmt"

	"github.com/adm73/infra_vaultec/middleware"
	"github.com/adm73/infra_vaultec/model"
	relaycommon "github.com/adm73/infra_vaultec/relay/common"
	"github.com/adm73/infra_vaultec/types"

	"github.com/gin-gonic/gin"
)

func Playground(c *gin.Context) {
	var vaultecError *types.VaultecError

	defer func() {
		if vaultecError != nil {
			c.JSON(vaultecError.StatusCode, gin.H{
				"error": vaultecError.ToOpenAIError(),
			})
		}
	}()

	useAccessToken := c.GetBool("use_access_token")
	if useAccessToken {
		vaultecError = types.NewError(errors.New("暂不支持使用 access token"), types.ErrorCodeAccessDenied, types.ErrOptionWithSkipRetry())
		return
	}

	relayInfo, err := relaycommon.GenRelayInfo(c, types.RelayFormatOpenAI, nil, nil)
	if err != nil {
		vaultecError = types.NewError(err, types.ErrorCodeInvalidRequest, types.ErrOptionWithSkipRetry())
		return
	}

	userId := c.GetInt("id")

	// Write user context to ensure acceptUnsetRatio is available
	userCache, err := model.GetUserCache(userId)
	if err != nil {
		vaultecError = types.NewError(err, types.ErrorCodeQueryDataError, types.ErrOptionWithSkipRetry())
		return
	}
	userCache.WriteContext(c)

	tempToken := &model.Token{
		UserId: userId,
		Name:   fmt.Sprintf("playground-%s", relayInfo.UsingGroup),
		Group:  relayInfo.UsingGroup,
	}
	_ = middleware.SetupContextForToken(c, tempToken)

	Relay(c, types.RelayFormatOpenAI)
}
