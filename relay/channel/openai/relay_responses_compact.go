package openai

import (
	"io"
	"net/http"

	"github.com/adm73/infra_vaultec/common"
	"github.com/adm73/infra_vaultec/dto"
	"github.com/adm73/infra_vaultec/service"
	"github.com/adm73/infra_vaultec/types"

	"github.com/gin-gonic/gin"
)

func OaiResponsesCompactionHandler(c *gin.Context, resp *http.Response) (*dto.Usage, *types.VaultecError) {
	defer service.CloseResponseBodyGracefully(resp)

	responseBody, err := io.ReadAll(service.LimitUpstreamResponseBody(resp.Body))
	if err != nil {
		return nil, types.NewOpenAIError(err, types.ErrorCodeReadResponseBodyFailed, http.StatusInternalServerError)
	}

	var compactResp dto.OpenAIResponsesCompactionResponse
	if err := common.Unmarshal(responseBody, &compactResp); err != nil {
		return nil, types.NewOpenAIError(err, types.ErrorCodeBadResponseBody, http.StatusInternalServerError)
	}
	if oaiError := compactResp.GetOpenAIError(); oaiError != nil && oaiError.Type != "" {
		return nil, types.WithOpenAIError(*oaiError, resp.StatusCode)
	}

	service.IOCopyBytesGracefully(c, resp, responseBody)

	usage := dto.Usage{}
	if compactResp.Usage != nil {
		usage.PromptTokens = compactResp.Usage.InputTokens
		usage.CompletionTokens = compactResp.Usage.OutputTokens
		usage.TotalTokens = compactResp.Usage.TotalTokens
		if compactResp.Usage.InputTokensDetails != nil {
			usage.PromptTokensDetails.CachedTokens = compactResp.Usage.InputTokensDetails.CachedTokens
			usage.PromptTokensDetails.CacheWriteTokens = compactResp.Usage.InputTokensDetails.CacheWriteTokens
		}
	}

	return &usage, nil
}
