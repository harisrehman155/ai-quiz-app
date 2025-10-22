import json
import os
from tavily import AsyncTavilyClient
from dotenv import load_dotenv
from agents import function_tool

load_dotenv()

tavily_client = AsyncTavilyClient(api_key=os.getenv("TAVILY_API_KEY"))


@function_tool
async def web_search(query: str) -> str:
    response = await tavily_client.search(query=query, search_depth="advanced")
    results = response["results"]

    filtered_results = []
    for item in results[:5]:
        filtered_results.append(
            {
                "title": item.get("title", ""),
                "url": item.get("url", ""),
                "content": item.get("content", ""),
            }
        )

    # Convert the filtered results list to JSON string
    return json.dumps(filtered_results)
