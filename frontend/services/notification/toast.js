export const Toast = {
  notifySuccess(notification, title, msg){
    notification.show({
      message: msg,
      title: title,
      variant: "success"
    })
  },
  
  notifyError(notification, title, msg){
    notification.show({
      message: msg,
      title: title,
      variant: "error",
    })
  }

}
