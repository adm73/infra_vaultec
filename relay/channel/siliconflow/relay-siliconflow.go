package siliconflow

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/adm73/infra_vaultec/dto"
	relaycommon "github.com/adm73/infra_vaultec/relay/common"
	"github.com/adm73/infra_vaultec/service"
	"github.com/adm73/infra_vaultec/types"

	"github.com/gin-gonic/gin"
)

func siliconflowRerankHandler(c *gin.Context, info *relaycommon.RelayInfo, resp *http.Response) (*dto.Usage, *types.VaultecError) {
	responseBody, err := io.ReadAll(service.LimitUpstreamResponseBody(resp.Body))
	if err != nil {
		return nil, types.NewOpenAIError(err, types.ErrorCodeReadResponseBodyFailed, http.StatusInternalServerError)
	}
	service.CloseResponseBodyGracefully(resp)
	var siliconflowResp SFRerankResponse
	err = json.Unmarshal(responseBody, &siliconflowResp)
	if err != nil {
		return nil, types.NewOpenAIError(err, types.ErrorCodeBadResponseBody, http.StatusInternalServerError)
	}
	usage := &dto.Usage{
		PromptTokens:     siliconflowResp.Meta.Tokens.InputTokens,
		CompletionTokens: siliconflowResp.Meta.Tokens.OutputTokens,
		TotalTokens:      siliconflowResp.Meta.Tokens.InputTokens + siliconflowResp.Meta.Tokens.OutputTokens,
	}
	rerankResp := &dto.RerankResponse{
		Results: siliconflowResp.Results,
		Usage:   *usage,
	}

	jsonResponse, err := json.Marshal(rerankResp)
	if err != nil {
		return nil, types.NewError(err, types.ErrorCodeBadResponseBody)
	}
	c.Writer.Header().Set("Content-Type", "application/json")
	c.Writer.WriteHeader(resp.StatusCode)
	service.IOCopyBytesGracefully(c, resp, jsonResponse)
	return usage, nil
}
