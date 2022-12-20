import api from "../../api";

export function setUserObj(user){
    return{
        type:"setUser",
        user
    }
}

export function logOut(){
    return dispatch=>{
        dispatch(setUserObj({}))
    }
}

export function asynSetUserObj(data){
    return dispatch=>{
        return api.login(data).then((res)=>{
            // console.log("redux",res.data.id)
            if(res.data.status === 200){
                dispatch(setUserObj({
                    uid:res.data.id,
                    token:res.data.token,
                    nick:res.data.nick,
                    username:res.data.username,
                    userType:res.data.userType,

                }))
                /**
                 * 存入到本地
                 */
                localStorage.setItem("userinfo",JSON.stringify({
                    uid:res.data.id,
                    token:res.data.token,
                    nick:res.data.nick,
                    username:res.data.username,
                    userType:res.data.userType
                }))
            }
            return res
        })
    }
}

export function asynSetUserObjByPhone(data){
    return dispatch=>{
        return api.comparephonecode(data).then((res)=>{
            console.log(res)
            if(res.data.status === 200){
                dispatch(setUserObj({
                    uid:res.data.id,
                    token:res.data.token,
                    nick:res.data.nick,
                    username:res.data.username,
                    userType:res.data.userType,

                }))
                /**
                 * 存入到本地
                 */
                localStorage.setItem("userinfo",JSON.stringify({
                    uid:res.data.id,
                    token:res.data.token,
                    nick:res.data.nick,
                    username:res.data.username,
                    userType:res.data.userType
                }))
            }
            return res
        })
    }
}

export function asynSetUserObjByMail(data){
    return dispatch=>{
        return api.comparemailcode(data).then((res)=>{
            console.log(res)
            if(res.data.status === 200){
                dispatch(setUserObj({
                    uid:res.data.id,
                    token:res.data.token,
                    nick:res.data.nick,
                    username:res.data.username,
                    userType:res.data.userType,

                }))
                /**
                 * 存入到本地
                 */
                localStorage.setItem("userinfo",JSON.stringify({
                    uid:res.data.id,
                    token:res.data.token,
                    nick:res.data.nick,
                    username:res.data.username,
                    userType:res.data.userType
                }))
            }
            return res
        })
    }
}