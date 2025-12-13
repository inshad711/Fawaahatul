import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalSetting {
  logoSettings: {
    logoPath: string;
    altText: string;
  };
  menus: {
    headermenu: any[];
  };
  exchangeRate: {
    usd: number;
  };
}

interface GlobalSettingSlice {
  globalSetting: GlobalSetting | null;
}

export const globalSettingSlice = createSlice({
  name: "globalSetting",
  initialState: {
    globalSetting: null,
  } as GlobalSettingSlice,
  reducers: {
    setGlobalSetting: (state, action: PayloadAction<GlobalSetting>) => {
      state.globalSetting = action.payload;
    },
  },
});

export const { setGlobalSetting } = globalSettingSlice.actions;

export default globalSettingSlice.reducer;
