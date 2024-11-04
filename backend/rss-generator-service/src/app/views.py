from rest_framework.views import APIView
from rest_framework.response import Response
from .feed import get_source, parse, get_artecles


class RssChannelAPI(APIView):
    def post(self, request):
        url = request.data.get('url')
        if not url:
            return Response({'error': 'URL is required'}, status=400)

        parsed_data = parse(url)
        source_data = get_source(parsed_data)
        articles = get_artecles(parsed_data)

        return Response({'source': source_data,
                        'articles': articles,
                         },
                        status=200)