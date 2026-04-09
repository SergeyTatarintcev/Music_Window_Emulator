import asyncio
from winrt.windows.media.control import (
    GlobalSystemMediaTransportControlsSessionManager as MediaManager,
)


async def get_current_media_info():
    sessions = await MediaManager.request_async()
    current_session = sessions.get_current_session()

    if current_session is None:
        return None

    info = await current_session.try_get_media_properties_async()

    return {
        "title": info.title,
        "artist": info.artist,
    }


def get_current_media():
    return asyncio.run(get_current_media_info())