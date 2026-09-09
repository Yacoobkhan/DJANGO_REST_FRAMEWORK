from rest_framework import serializers

from api.serializers import UserPublicSerializer
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    user = UserPublicSerializer(read_only=True)
    class Meta:
        model = Article
        fields = [
            'pk',
            'user',
            'title',
            'body',
            'path',
            'endpoint',
        ]