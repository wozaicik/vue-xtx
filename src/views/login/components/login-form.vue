<template>
    <div class="account-box">
      <div class="toggle">
        <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
          <i class="iconfont icon-user"></i> 使用账号登录
        </a>
        <a @click="isMsgLogin=true" href="javascript:;" v-else>
          <i class="iconfont icon-msg"></i> 使用短信登录
        </a>
      </div>
      <Form ref="formCom" class="form" :validation-schema="schema" autocomplete="off" v-slot="{errors}">
        <template v-if="!isMsgLogin">
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <Field :class="{error:errors.account}" v-model="form.account" name="account" type="text" placeholder="请输入用户名或手机号" />
            </div>
            <div v-if="errors.account" class="error"><i class="iconfont icon-warning" />{{errors.account}}</div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-lock"></i>
              <Field :class="{error:errors.password}" v-model="form.password" name="password" type="password" placeholder="请输入密码"/>
            </div>
            <div v-if="errors.password" class="error"><i class="iconfont icon-warning" />{{errors.password}}</div>
          </div>
        </template>
        <template v-else>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <Field  :class="{error:errors.mobile}" v-model="form.mobile" name="mobile" type="text" placeholder="请输入手机号" />
            </div>
            <div v-if="errors.mobile" class="error"><i class="iconfont icon-warning" />{{errors.mobile}}</div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-code"></i>
              <Field :class="{error:errors.code}" v-model="form.code" name="code" type="text" placeholder="请输入验证码"/>
              <span class="code">发送验证码</span>
            </div>
            <div v-if="errors.code" class="error"><i class="iconfont icon-warning" />{{errors.code}}</div>
          </div>
        </template>
        <div class="form-item">
          <div class="agree">
            <XtxCheckbox v-model="form.isAgree" name="isAgree"/>
            <span>我已同意</span>
            <a href="javascript:;">《隐私条款》</a>
            <span>和</span>
            <a href="javascript:;">《服务条款》</a>
          </div>
          <div v-if="errors.isAgree" class="error"><i class="iconfont icon-warning" />{{errors.isAgree}}</div>
        </div>
        <a @click="login()" href="javascript:;" class="btn">登录</a>
      </Form>
      <div class="action">
        <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
        <div class="url">
          <a href="javascript:;">忘记密码</a>
          <a href="javascript:;">免费注册</a>
        </div>
      </div>
    </div>
  </template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import { watch } from '@vue/runtime-core'
import Message from '@/components/library/Message'
import { userAccountLogin, userMobileLogin } from '@/api/user'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'LoginForm',
  components: {
    Form,
    Field
  },
  setup () {
    // 切换短信登录
    const isMsgLogin = ref(false)
    const form = reactive({
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null
    })

    // cee-validate 校验基本步骤
    // 1.0 导入Form Field 组件将form和input值进行替换，需要加上name  name用来指定将来的校验规则
    // 2.0 Field需要进行数据绑定 字段的名称最好和后台接口一致
    // 3.0 定义Field name属性指定的校验规则函数 Form的validation-schema接收定义好的校验规则，是一个对象
    // 4.0 自定义组件需要校验必须先支持v-model
    const mySchema = {
      // 校验函数规则：返回TRUE就是校验成功，返回一个字符串就是失败，字符串就是错误提示
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      isAgree: schema.isAgree
    }
    const formCom = ref(null)
    // 监听isMsgLogin重置表单数据 数据+清除校验结果
    watch(isMsgLogin, () => {
      form.isAgree = true
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
      // 如果没有销毁Field组件，之前的校验结果是不会销毁的
      // form组件提供了一个resetForm 函数清除校验结果
      formCom.value.resetForm()
    })

    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    // 需要在点击登录的时候，对整体表单进行校验
    // const login = async () => {
    //   // Form 组件提供了一个validate函数作为整体表单校验 返回的是一个promise
    //   const valid = await formCom.value.validate()
    //   // console.log(valid)
    //   // Message({ type: 'error', text: '用户名或者密码错误' })
    //   // 1.0 准备一个api做账号登录
    //   // 2.0 调用aou函数
    //   // 3.0 成功：跳转至来源页或者首页 存储用户信息
    //   // 4.0 失败：消息提示
    //   if (valid) {
    //     // try catch
    //     try {
    //       let data = null
    //       if (isMsgLogin.value) {
    //         // 手机号登录
    //         // 准备一个api函数做手机号登录
    //         // 调用api函数
    //         // 成功 存储用户信息
    //         // 失败 消息提示
    //         const { mobile, code } = form
    //         data = await userMobileLogin({ mobile, code })
    //       } else {
    //         const { account, password } = form
    //         data = await userAccountLogin({ account, password })
    //         // userAccountLogin({ account, password }).then(data => {
    //       }
    //       // 存储用户信息
    //       const { id, account, avatar, moblie, nickname, token } = data.result
    //       store.commit('user/setUser', { id, account, avatar, moblie, nickname, token })
    //       store.dispatch('cart/mergeCart').then(() => {
    //         router.push(route.query.redirectUrl || '/')
    //         // 友好提示 登录成功
    //         Message({ type: 'success', text: '登录成功' })
    //       })
    //     } catch (e) {
    //       if (e.response.data) {
    //         Message({ type: 'error', text: e.response.data.message || '登录失败' })
    //       }
    //     }
    //   }
    // }
    const login = async () => {
      try {
        let data = null
        if (isMsgLogin.value) {
          // 手机号登录
          // 准备一个api函数做手机号登录
          // 调用api函数
          // 成功 存储用户信息
          // 失败 消息提示
          const { mobile, code } = form
          data = await userMobileLogin({ mobile, code })
        } else {
          const { account, password } = form
          data = await userAccountLogin({ account, password })
          // userAccountLogin({ account, password }).then(data => {
        }
        // 存储用户信息
        const { id, account, avatar, moblie, nickname, token } = data.result
        store.commit('user/setUser', { id, account, avatar, moblie, nickname, token })
        store.dispatch('cart/mergeCart').then(() => {
          router.push(route.query.redirectUrl || '/')
          // 友好提示 登录成功
          Message({ type: 'success', text: '登录成功' })
        })
      } catch (e) {
        if (e.response.data) {
          Message({ type: 'error', text: e.response.data.message || '登录失败' })
        }
      }
    }

    // 拿到当前实例  获取组件实例
    // const { proxy } = getCurrentInstance()

    return { isMsgLogin, form, schema: mySchema, formCom, login }
  }
}

</script>

<style lang="less" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,&:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
