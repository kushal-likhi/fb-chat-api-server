
##API##

To send a message make a get call with query params:

```
http://<domain>/api/fb/chat/message/send?senderId=<IDOfSender>&receiverId=<ReceiverFBID>&accessToken=<accessTokenWithChatRights>&message=<message>&appId=<FB_APP_ID>
```

##IMPORTANT##
When requesting token then make sure you take the `chat` permission named as `xmpp_login` in scope parameters.

Link: https://developers.facebook.com/docs/chat