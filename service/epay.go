package service

import (
	"github.com/adm73/infra_vaultec/setting/operation_setting"
	"github.com/adm73/infra_vaultec/setting/system_setting"
)

func GetCallbackAddress() string {
	if operation_setting.CustomCallbackAddress == "" {
		return system_setting.ServerAddress
	}
	return operation_setting.CustomCallbackAddress
}
