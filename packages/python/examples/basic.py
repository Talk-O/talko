from __future__ import annotations

import os

from talko_sdk import TalkoClient


def main() -> None:
    api_key = os.environ.get("TALKO_API_KEY")
    if not api_key:
        raise RuntimeError("Missing TALKO_API_KEY")

    client = TalkoClient(api_key=api_key)

    conversations = client.conversations.list(status="OPEN", limit=10)
    print("Open conversations:", conversations)

    connectors = client.connectors.list()
    print("Configured connectors:", connectors)


if __name__ == "__main__":
    main()
