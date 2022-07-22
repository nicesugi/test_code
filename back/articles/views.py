from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from articles.models import Article as ArticleModel
from articles.serializers import ArticleSerializer


class ArticleView(APIView):
    # 게시글 전체 조회
    def get(self, request):
        articles = ArticleModel.objects.all()
        serializer = ArticleSerializer(articles, many=True).data
        
        return Response(serializer, status=status.HTTP_200_OK)
    
    # 게시글 작성
    def post(self, request):
        serializer = ArticleSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            
            return Response({'message': '글 작성 완료!!'}, status=status.HTTP_200_OK)
        
        else:
            return Response({'message': '글 작성 실패!'}, status=status.HTTP_400_BAD_REQUEST)