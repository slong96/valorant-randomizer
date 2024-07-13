from django.shortcuts import render
from .apis.valorant_api import get_agent_data, get_map_data
from django.http import JsonResponse

def get_agents(request):
  """
  agent_data = get_agent_data() instead of agent_data = get_agent_data 
  because I am calling it to execute the function,
  instead of assigning the function to a variable.

  safe=False: Allows returning any JSON-serializable object, including lists.
  """
  agent_data = get_agent_data() # Call the function to get the data
  return JsonResponse(agent_data, safe=False) # Return as JSON response


def get_maps(request):
  """
  map_data = get_map_data() instead of map_data = get_map_data
  because I am calling it to execute the function,
  instead of assigning the function to a variable.

  safe=False: Allows returning any JSON-serializable object, including lists.
  """
  map_data = get_map_data() # Call the function to get the data
  return JsonResponse(map_data, safe=False) # Return as JSON response


def home(request):
  title = 'Valorant Randomizer'
  return render(request, 'home.html', {'title': title})

def error_404(request, exception):
    response = render(request, 'error_404.html', status=404)
    return response

def error_500(request):
    response = render(request, 'error_500.html', status=500)
    return response