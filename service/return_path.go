package service

import (
	"strings"

	"github.com/adm73/infra_vaultec/common"
	"github.com/adm73/infra_vaultec/setting/system_setting"
)

func PaymentReturnURL(suffix string) string {
	base := strings.TrimRight(system_setting.ServerAddress, "/")
	return base + common.ThemeAwarePath(suffix)
}
