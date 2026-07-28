package meta

import relaycommon "github.com/adm73/infra_vaultec/relay/common"

func RelayInfoChannelType(info *relaycommon.RelayInfo) int {
	if info == nil || info.ChannelMeta == nil {
		return 0
	}
	return info.ChannelType
}

func RelayInfoUpstreamModelName(info *relaycommon.RelayInfo) string {
	if info == nil || info.ChannelMeta == nil {
		return ""
	}
	return info.UpstreamModelName
}
