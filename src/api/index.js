// 统一API出口
import { Banner, recommend, recommendMv, mvAddress } from './Find'
import { songDetail, musicUrl } from './SongDetail'
import { searchMusic } from './TopBar'
import { login, captchaLogin, captcha, register } from './Login'
import { userInfo, updatePass, logout } from './UserCenter'

export {
  Banner, recommend, recommendMv, mvAddress,
  songDetail, musicUrl,
  searchMusic,
  login, captchaLogin, captcha, register,
  userInfo, updatePass, logout
}
