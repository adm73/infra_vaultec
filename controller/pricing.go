package controller

import (
	"strings"

	"github.com/adm73/infra_vaultec/common"
	"github.com/adm73/infra_vaultec/model"
	"github.com/adm73/infra_vaultec/service"
	"github.com/adm73/infra_vaultec/setting/ratio_setting"

	"github.com/gin-gonic/gin"
)

const anonymousPricingGroup = "default"

var publicPricingGroups = map[string]string{
	"default": "默认分组",
	"vip":     "VIP 分组",
}

func filterPricingByUsableGroups(pricing []model.Pricing, usableGroup map[string]string) []model.Pricing {
	if len(pricing) == 0 {
		return pricing
	}
	if len(usableGroup) == 0 {
		return []model.Pricing{}
	}

	filtered := make([]model.Pricing, 0, len(pricing))
	for _, item := range pricing {
		if common.StringsContains(item.EnableGroup, "all") {
			filtered = append(filtered, item)
			continue
		}
		for _, group := range item.EnableGroup {
			if _, ok := usableGroup[group]; ok {
				filtered = append(filtered, item)
				break
			}
		}
	}
	return filtered
}

func getPricingUserGroup(c *gin.Context) string {
	group := anonymousPricingGroup
	userID, exists := c.Get("id")
	if !exists {
		return group
	}

	user, err := model.GetUserCache(userID.(int))
	if err == nil && strings.TrimSpace(user.Group) != "" {
		group = user.Group
	}
	return group
}

func getPricingDisplayGroups(userGroup string) map[string]string {
	groups := service.GetUserUsableGroups(userGroup)
	for group, description := range publicPricingGroups {
		if _, exists := groups[group]; !exists {
			groups[group] = description
		}
	}
	return groups
}

func GetPricing(c *gin.Context) {
	pricing := model.GetPricing()
	usableGroup := map[string]string{}
	groupRatio := map[string]float64{}
	for s, f := range ratio_setting.GetGroupRatioCopy() {
		groupRatio[s] = f
	}
	group := getPricingUserGroup(c)
	for g := range groupRatio {
		ratio, ok := ratio_setting.GetGroupGroupRatio(group, g)
		if ok {
			groupRatio[g] = ratio
		}
	}

	usableGroup = getPricingDisplayGroups(group)
	pricing = filterPricingByUsableGroups(pricing, usableGroup)
	// check groupRatio contains usableGroup
	for group := range ratio_setting.GetGroupRatioCopy() {
		if _, ok := usableGroup[group]; !ok {
			delete(groupRatio, group)
		}
	}

	c.JSON(200, gin.H{
		"success":            true,
		"data":               pricing,
		"vendors":            model.GetVendors(),
		"group_ratio":        groupRatio,
		"usable_group":       usableGroup,
		"supported_endpoint": model.GetSupportedEndpointMap(),
		"auto_groups":        service.GetUserAutoGroup(group),
		"pricing_version":    "a42d372ccf0b5dd13ecf71203521f9d2",
	})
}

func ResetModelRatio(c *gin.Context) {
	defaultStr := ratio_setting.DefaultModelRatio2JSONString()
	err := model.UpdateOption("ModelRatio", defaultStr)
	if err != nil {
		c.JSON(200, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}
	err = ratio_setting.UpdateModelRatioByJSONString(defaultStr)
	if err != nil {
		c.JSON(200, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"success": true,
		"message": "重置模型倍率成功",
	})
}
