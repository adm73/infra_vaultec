package jsonutil

import (
	"fmt"

	"github.com/adm73/infra_vaultec/common"
)

func ToJSONString(v interface{}) string {
	bytes, err := common.Marshal(v)
	if err != nil {
		return fmt.Sprintf("%v", v)
	}
	return string(bytes)
}
