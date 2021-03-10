export default ({ store, redirect }) => {

    // 判断用户是否登录，没有就调回首页
    if (!store.state.user) {
        return redirect("/login")
    }
}