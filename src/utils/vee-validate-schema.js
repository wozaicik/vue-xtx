// 提供校验规则函数
export default {
  account (value) {
    if (!value) return '请输入用户名'
    // 规则：字母开头6-20字符之间
    if (!/^[a-zA-Z]\w{5,19}$/.text(value)) return '字母开头且6-20个字符'
    return true
  },
  // 密码校验
  password (value) {
    if (!value) return '请输入用密码'
    // 规则：密码6-24个字符
    if (!/^\w{6,24}$/.text(value)) return '密码格式6-24个字符'
    return true
  },
  //
  mobile (value) {
    if (!value) return '请输入手机号'
    // 规则：1开头 3-9之间 9个数字
    if (!/^1[3-9]\d{9}$/.text(value)) return '手机号格式不对'
    return true
  },
  //   验证码
  code (value) {
    if (!value) return '请输入短信验证码'
    // 规则：1开头 3-9之间 9个数字
    if (!/^\d{6}$/.text(value)) return '短信验证码6个字符'
    return true
  },
  //
  isAgree (value) {
    if (!value) return '请勾选用户协议'
    return true
  }
}
