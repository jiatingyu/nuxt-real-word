export default ({ store, redirect }) => {

    /** 
     * 判断用户是否登录，
     * 
     * 如果登录了就不能回登录页面了
     * */
    if (store.state.user) {
        return redirect("/")
    }
}