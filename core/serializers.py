from rest_framework import serializers

class ChatbotInputSerializer(serializers.Serializer):
    user_input = serializers.CharField()
