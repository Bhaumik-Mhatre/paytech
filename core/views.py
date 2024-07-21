from django.shortcuts import render, redirect
from django.contrib import messages, auth
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils import timezone
from .models import Chat
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ChatbotInputSerializer
from .chatbot import greet, response, sentence_tokens, word_tokens
import nltk

class ChatbotView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ChatbotInputSerializer(data=request.data)
        if serializer.is_valid():
            user_input = serializer.validated_data['user_input'].lower()
            if user_input in ('bye', 'thanks', 'thank you'):
                return Response({"bot_response": "You are welcome! Goodbye!"}, status=status.HTTP_200_OK)

            if greet(user_input):
                bot_response = greet(user_input)
            else:
                sentence_tokens.append(user_input)
                word_tokens.extend(nltk.word_tokenize(user_input))
                bot_response = response(user_input)
                sentence_tokens.remove(user_input)

            return Response({"bot_response": bot_response}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@login_required(login_url='signin')
def index(request):
    return render(request, 'index.html')

def signin(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        
        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect("/")
        else:
            messages.info(request, "Invalid credentials")
            return redirect("signin")
    else:
        return render(request, 'signin.html')

def signup(request):
    if request.method == "POST":
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        repeat_password = request.POST['repeat_password']

        if password == repeat_password:
            if User.objects.filter(email=email).exists():
                messages.info(request, "Email is already taken")
                return redirect("signup")
            elif User.objects.filter(username=username).exists():
                messages.info(request, "Username is already taken")
                return redirect("signup")
            else:
                user = User.objects.create_user(username=username, email=email, password=password)
                user.save()
                return redirect("signin")
        else:
            messages.info(request, "Passwords do not match")
            return redirect("signup")
    else:
        return render(request, 'signin.html')


def user_logout(request):
    auth.logout(request)
    return redirect('/')
def chat(request):
    chats = Chat.objects.filter(user=request.user)

    if request.method == 'POST':
        message = request.POST.get('message')
        response = ChatbotView.post(message)

        chat = Chat(user=request.user, message=message, response=response, created_at=timezone.now())
        chat.save()
        return JsonResponse({'message': message, 'response': response})
    return render(request, 'chatbot.html', {'chats': chats})

def tickets(request):
    return render(request, 'tickets.html')

