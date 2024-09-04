import { RuleAPI } from "@/apis/RuleAPI";
import { RoleUpdate } from "@/types/api/roleAPI.type";
import { ApiStatus } from "@/types/api/status";
import { Rule } from "@/types/slices/ruleType";
import { useRuleActions, useRuleList, useRuleListView, useRuleListViewDisabled, useRuleListViewEnabled, useRuleSelectRule, useRuleStatus } from "@/zustand/rules";
import toast from 'react-hot-toast'

export const useRuleStore = () => {

    const rules = useRuleList();
    const views = useRuleListView();
    const viewsEnabled = useRuleListViewEnabled();
    const viewsDisabled= useRuleListViewDisabled();
    const status = useRuleStatus();
    const selectedRule = useRuleSelectRule();
    const { onFetchRules, onFetchViews, onFetchViewsEnabled, onFetchViewsDisabled, changeStatus, onSelectRule } = useRuleActions();

    const getRule = async () => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await RuleAPI.get()
            if (response?.code === 400) {
                toast.error(response?.data?.message)
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchRules(response?.data?.detail)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const createRule = async (data: any) => {
        try {
            changeStatus(ApiStatus.FETCHING)
            const response = await RuleAPI.createRole(data)
            changeStatus(ApiStatus.FETCHED)
            if (!response?.status) {
                return toast.error(response.data.message)
            }
            toast.success(response.data.message)
            return true
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const editRule = async (idrole: number, data: any) => {
        try {
            changeStatus(ApiStatus.FETCHING)
            const response = await RuleAPI.editRole(idrole, data)
            changeStatus(ApiStatus.FETCHED)
            if (!response?.status) {
                return toast.error(response.data.message)
            }
            toast.success(response.data.message)
            return true
        } catch (error) {
            console.log(error)
        }
    }

    const getViewFrontIdrole = async (IDROLE: number) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await RuleAPI.getViewFrontByIdrole(IDROLE)
            if (response?.code === 400) {
                toast.error(response?.data?.message)
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchViewsEnabled(response?.data?.detail?.enabled)
            onFetchViewsDisabled(response?.data?.detail?.disabled)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const getViewFront = async () => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await RuleAPI.getViewFront()
            if (response?.code === 400) {
                toast.error(response?.data?.message)
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            onFetchViews(response?.data?.detail)
            changeStatus(ApiStatus.FETCHED)
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }

    const updateRoleView = async (data: RoleUpdate) => {
        changeStatus(ApiStatus.FETCHING)
        try {
            const response = await RuleAPI.update(data)
            if (response?.code === 400) {
                toast.error(response?.data?.message)
                changeStatus(ApiStatus.FETCHED)
                return false
            }
            changeStatus(ApiStatus.FETCHED)
            return true
        } catch (error) {
            console.error(error)
            changeStatus(ApiStatus.FETCHED)
        }
    }


    const setSelectRule = (rule: Rule) => {
        onSelectRule(rule)
    }

    return {
        //states
        status,
        rules,
        views,
        viewsEnabled,
        viewsDisabled,
        selectedRule,
        //actions
        getRule,
        createRule,
        editRule,
        getViewFrontIdrole,
        getViewFront,
        setSelectRule,
        updateRoleView,
    }
}