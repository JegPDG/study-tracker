from django.urls import path, include
from .service.gemini_service import user_message
from .views import ConversationView, ChatMessageVIew, ChatMessagesInConvoView, ConversationList

urlpatterns = [
  path("generate", user_message, name='user_message'),
  path("conversations", ConversationView.as_view(), name='conversations' ),
  path("conversation/list", ConversationList.as_view(), name='conversation-list' ),
  path("conversation/<uuid:conversation_id>/messages", ChatMessagesInConvoView.as_view(), name='conversation-messages' ),
  path("chat-message", ChatMessageVIew.as_view(), name='chat-message' )

]