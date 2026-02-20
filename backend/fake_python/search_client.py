from langchain_community.tools.tavily_search import TavilySearchResults
from config import SEARCH_RESULTS_K
from dotenv import load_dotenv
load_dotenv()

search_tool = TavilySearchResults(k=SEARCH_RESULTS_K)

def get_evidence(query: str) -> str:
    results = search_tool.invoke(query)

    blocks = []

    for r in results:
        title = r.get("title","")
        content = r.get("content","")
        url = r.get("url","")

        blocks.append(
            f"TITLE: {title}\nCONTENT: {content}\nURL: {url}\n"
        )

    return "\n---\n".join(blocks)


