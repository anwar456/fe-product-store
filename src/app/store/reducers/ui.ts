import { getItem, setItem } from '@app/helpers/localstorage.helper'
import { createSlice } from '@reduxjs/toolkit'

const isCollapsed = getItem('_sidebar_collapsed', false)

const initialState = {
  themeMode: getItem('_theme_mode', 'light'),
  themeColor: getItem('_theme_color', 'default'),
  activeFilters: null,
  formTitle: null,
  isSidebarMenuCollapsed: isCollapsed == 0 ? true : isCollapsed,
  activePaging: undefined,
  reloadData: null,
  callbackForm: null,
  callbackCancelDelete: null,
  loading: 0,
  showModalBlank: false,
  triggerAddBlock: null,
  menuStyle: getItem('_m_style', 'v2'),
  pagingLimit: getItem('pagingLimit', 10),
  menus: undefined,
  layoutType: 'sidebar',
  searchValue: '',
  autoRefresh: null,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setThemeMode: (state, { payload }) => {
      setItem('_theme_mode', payload)
      state.themeMode = payload
    },
    setThemeColor: (state, { payload }) => {
      setItem('_theme_color', payload)
      state.themeColor = payload
    },

    setMenuStyle: (state, { payload }) => {
      setItem('_m_style', payload)
      state.menuStyle = payload
    },
    // setActivePage: (state, { payload }) => {
    //   state.activePage = payload;
    // },
    setActiveFilters: (state, { payload }) => {
      state.activeFilters = payload
    },
    setCallbackForm: (state, { payload }) => {
      state.callbackForm = payload
    },
    setCallbackCancelDelete: (state, { payload }) => {
      state.callbackCancelDelete = payload
    },
    toggleSidebarMenu: (state, { payload = undefined }: { payload: number | undefined }) => {
      let toggle = state.isSidebarMenuCollapsed == 1 ? 0 : 1
      toggle = payload != undefined ? payload : toggle
      setItem('_sidebar_collapsed', toggle)
      state.isSidebarMenuCollapsed = toggle
    },

    setActivePaging: (state, { payload }) => {
      state.activePaging = payload
    },
    reloadingData: (state, { payload }) => {
      state.reloadData = payload
    },
    setLoading: (state, { payload }) => {
      const loading = state.loading
      state.loading = payload ? loading + 1 : loading == 0 ? 0 : loading - 1
    },
    setSearchValue: (state, { payload }) => {
      state.searchValue = payload
    },
    setShowModalBlank: (state, { payload }) => {
      state.showModalBlank = payload
    },
    setTriggerAddBlock: (state, { payload }) => {
      state.triggerAddBlock = payload
    },
    setPagingLimit: (state, { payload }) => {
      state.pagingLimit = payload
      setItem('pagingLimit', payload)
    },
    setMenus: (state, { payload }) => {
      state.menus = payload
    },
    setFormTitle: (state, { payload }) => {
      state.formTitle = payload
    },
    setLayoutType: (state, { payload }) => {
      state.layoutType = payload
      // setItem('layoutType', payload)
    },
    setAutorefresh: (state, { payload }) => {
      state.autoRefresh = payload
    },
  },
})

export const {
  toggleSidebarMenu,
  setThemeMode,
  // setActivePage,
  setActivePaging,
  reloadingData,
  setActiveFilters,
  setCallbackForm,
  setLoading,
  setSearchValue,
  setMenuStyle,
  setThemeColor,
  setShowModalBlank,
  setTriggerAddBlock,
  setPagingLimit,
  setMenus,
  setLayoutType,
  setFormTitle,
  setCallbackCancelDelete,
  setAutorefresh,
} = uiSlice.actions
export default uiSlice.reducer
