import requests
from pprint import pprint

def get_agent_data():
  url = 'https://valorant-api.com/v1/agents'
  response = requests.get(url)

  if response.status_code == 404:
    print('404')

  response.raise_for_status()
  val_json = response.json()
  val = val_json['data']

  agent_list = []

  for agent in val:

    if 'role' in agent and agent['role'] is not None:
      agent_details = {
      'name': agent['displayName'],
      'role': agent['role']['displayName'],
      'description': agent['description'],
      'picture': agent['displayIcon'],
    }
      agent_list.append(agent_details)

  return agent_list # Return Python object, not JSON string


def get_map_data():
  url = 'https://valorant-api.com/v1/maps'
  response = requests.get(url)

  if response.status_code == 404:
    print('404')

  response.raise_for_status()
  val_json = response.json()
  map_data = val_json['data']

  map_list = []

  for map in map_data:
    map_details = {
      'map_name': map['displayName'],
      'map_img_url': map['splash'],
      'map_sites': map['tacticalDescription'],
    }
    map_list.append(map_details)


  return map_list # Return Python object, not JSON string