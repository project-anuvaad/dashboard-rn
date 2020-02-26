import AsyncStorage  from "@react-native-community/async-storage";

const appLanguage = 'APP_LANGUAGE'

export const setAppLanguage = async (code, language) => {
    let data = null
    if (code && language) {
        data = {
            code: code,
            language: language
        }
    }
    try {
        await AsyncStorage.setItem(appLanguage, data ? JSON.stringify(data) : null);
    } catch (err) {
    }
}

export const getAppLanguage = async () => {

    let appLangCode = await AsyncStorage.getItem(appLanguage);
    if (appLangCode !== null) {
        return JSON.parse(appLangCode);
    }
    else {
        return null;
    }
}