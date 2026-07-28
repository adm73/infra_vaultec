package controller

import (
	"net/http/httptest"
	"testing"

	"github.com/adm73/infra_vaultec/common"
	"github.com/adm73/infra_vaultec/model"
	"github.com/adm73/infra_vaultec/setting"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/require"
)

func TestPricingAlwaysDisplaysDefaultAndVIPGroups(t *testing.T) {
	originalGroups := setting.UserUsableGroups2JSONString()
	require.NoError(t, setting.UpdateUserUsableGroupsByJSONString("{}"))
	t.Cleanup(func() {
		require.NoError(t, setting.UpdateUserUsableGroupsByJSONString(originalGroups))
	})

	gin.SetMode(gin.TestMode)
	ctx, _ := gin.CreateTestContext(httptest.NewRecorder())

	group := getPricingUserGroup(ctx)
	require.Equal(t, anonymousPricingGroup, group)

	displayGroups := getPricingDisplayGroups(group)
	require.Contains(t, displayGroups, "default")
	require.Contains(t, displayGroups, "vip")

	pricing := []model.Pricing{
		{ModelName: "default-model", EnableGroup: []string{"default"}},
		{ModelName: "vip-model", EnableGroup: []string{"vip"}},
		{ModelName: "svip-model", EnableGroup: []string{"svip"}},
	}
	filtered := filterPricingByUsableGroups(pricing, displayGroups)
	require.Len(t, filtered, 2)
	require.ElementsMatch(t, []string{"default-model", "vip-model"}, []string{
		filtered[0].ModelName,
		filtered[1].ModelName,
	})
}

func TestPricingUsesAuthenticatedUserGroup(t *testing.T) {
	db := setupModelListControllerTestDB(t)
	user := &model.User{
		Username: "pricing-vip-user",
		Password: "password",
		Group:    "vip",
		Status:   common.UserStatusEnabled,
	}
	require.NoError(t, db.Create(user).Error)

	ctx, _ := gin.CreateTestContext(httptest.NewRecorder())
	ctx.Set("id", user.Id)

	require.Equal(t, "vip", getPricingUserGroup(ctx))
	displayGroups := getPricingDisplayGroups("vip")
	require.Contains(t, displayGroups, "default")
	require.Contains(t, displayGroups, "vip")
}
