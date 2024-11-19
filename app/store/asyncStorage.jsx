import { ToastAndroid } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const showToastWithGravity = (msg) => {
  ToastAndroid.showWithGravity(
    msg || "error",
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  )
}

// AUTH
export const getRole = async () => {
  try {
    const role = await AsyncStorage.getItem("role")
    return role
  } catch (error) {
    showToastWithGravity("Error getRole: " + error.message)
  }
}

export const setRole = async (role) => {
  try {
    await AsyncStorage.setItem("role", role)
  } catch (error) {
    showToastWithGravity("Error setRole: " + error.message)
  }
}

export const getIsLogin = async () => {
  try {
    const isLogin = await AsyncStorage.getItem("isLogin")
    return isLogin
  } catch (error) {
    showToastWithGravity("Error getIsLogin: " + error.message)
  }
}

export const setIsLogin = async (isLogin) => {
  try {
    await AsyncStorage.setItem("isLogin", isLogin)
  } catch (error) {
    showToastWithGravity("Error setIsLogin: " + error.message)
  }
}

export const getIdAsync = async () => {
  try {
    const isLogin = await AsyncStorage.getItem("id")
    return isLogin
  } catch (error) {
    showToastWithGravity("Error getIsLogin: " + error.message)
  }
}

export const setIdAsync = async (id) => {
  try {
    await AsyncStorage.setItem("id", id)
  } catch (error) {
    showToastWithGravity("Error setIsLogin: " + error.message)
  }
}


export const getCodeAsync = async () => {
  try {
    const code = await AsyncStorage.getItem("code")
    return code
  } catch (error) {
    showToastWithGravity("Error getCodeAsync: " + error.message)
  }
}

export const setCodeAsync = async (code) => {
  try {
    await AsyncStorage.setItem("code", code)
  } catch (error) {
    showToastWithGravity("Error setCodeAsync: " + error.message)
  }
}

export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken")
    return accessToken
  } catch (error) {
    showToastWithGravity("Error getAccessToken: " + error.message)
  }
}

export const setAccessToken = async (accessToken) => {
  try {
    await AsyncStorage.setItem("accessToken", accessToken)
  } catch (error) {
    showToastWithGravity("Error setAccessToken: " + error.message)
  }
}

export const getRefreshToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("refreshToken")
    return accessToken
  } catch (error) {
    showToastWithGravity("Error refreshToken: " + error.message)
  }
}

export const setRefreshToken = async (refreshToken) => {
  try {
    await AsyncStorage.setItem("refreshToken", refreshToken)
  } catch (error) {
    showToastWithGravity("Error refreshToken: " + error.message)
  }
}
