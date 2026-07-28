package relay

import (
	relaycommon "github.com/adm73/infra_vaultec/relay/common"
	"github.com/adm73/infra_vaultec/types"
)

func vaultecErrorFromParamOverride(err error) *types.VaultecError {
	if fixedErr, ok := relaycommon.AsParamOverrideReturnError(err); ok {
		return relaycommon.VaultecErrorFromParamOverride(fixedErr)
	}
	return types.NewError(err, types.ErrorCodeChannelParamOverrideInvalid, types.ErrOptionWithSkipRetry())
}
