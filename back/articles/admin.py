from django.contrib import admin
from articles.models import Article as ArticleModel


admin.site.register(ArticleModel)