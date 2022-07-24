from django.urls import reverse
from rest_framework.test import APITestCase
from users.models import User

                
class SignupTest(APITestCase):
    # 회원가입 200
    def test_signUp(self):
        url = reverse('users')
        user_data = {
            "username" : "username",
            "password" : "password",
            "email" : "email@test.com",
            "fullname" : "fullname",
        }
        response = self.client.post(url, user_data)
        self.assertEqual(response.status_code, 200)
        
        
class LoginTest(APITestCase):
    def setUp(self):
        self.data = {'username': 'john', 'password':'johnpassword'}
        self.user = User.objects.create_user('john', 'johnpassword')

    # 로그인 200
    def test_login(self):
        response = self.client.post(reverse('token_obtain_pair'), self.data)
        self.assertEqual(response.status_code, 200)

    # 사용자 정보 조회 200
    def test_get_user_data(self):
        access_token = self.client.post(reverse('token_obtain_pair'), self.data).data['access']
        response = self.client.get(
            path = reverse('users'),
            HTTP_AUTHORIZATION = f'Bearer {access_token}'
        )
        self.assertEqual(response.data['username'], self.data['username'])