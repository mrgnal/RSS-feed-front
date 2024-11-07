from dotenv import load_dotenv
from rest_framework.views import APIView
import os

load_dotenv()
KAFKA_HOST = os.getenv('KAFKA_HOST')
KAFKA_PORT = os.getenv('KAFKA_PORT')

class EventAPIView(APIView):
    def post(self, request):
        url = request.data.get('url')  # Отримуємо URL з тіла запиту
        if not url:
            return Response({'error': 'URL is required'}, status=400)

        data = {
            'url': url
        }
        producer_conf = {
            'bootstrap.servers': f'{KAFKA_HOST}:{KAFKA_PORT}'
        }
        producer = Producer(producer_conf)

        try:
            producer.produce('check_rss_chanel', value=json.dumps(data).encode('utf-8'))
            producer.flush()
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        print(data.get('url'))
        return Response({'status': 'message sent'})
