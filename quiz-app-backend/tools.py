import os
from tavily import AsyncTavilyClient
from dotenv import load_dotenv
from agents import function_tool

load_dotenv()

tavily_client = AsyncTavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

@function_tool
async def tavily_search(query: str):
    """
    Performs an asynchronous web search using the Tavily Search API to find information on a given topic.
    """
    response = await tavily_client.search(query=query, search_depth="advanced")
    return response["results"]
