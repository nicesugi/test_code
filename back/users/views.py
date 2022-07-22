from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from users.serializers import UserSerializer
from users.serializers import UserSignupSerializer


class UserView(APIView):
    # 사용자 정보 조회
    def get(self, request):
        return Response(UserSerializer(request.user).data, status=status.HTTP_200_OK)
    
    # 회원가입
    def post(self, request):
        serializer = UserSignupSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            
            return Response({'message': '가입성공'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': '가입실패'}, status=status.HTTP_400_BAD_REQUEST)
    
    # 회원정보 수정
    def put(self, request):
        return Response({})
    
    # 회원탈퇴
    def delete(self, request):
        return Response({})