import json
import subprocess
import sys

from app.ui import MusicWidget


def main():
    app = MusicWidget()

    def load_media():
        try:
            result = subprocess.run(
                [sys.executable, "-m", "app.media_probe"],
                capture_output=True,
                text=True,
                timeout=5,
            )

            if result.returncode != 0:
                print("Ошибка media_probe:", result.stderr)
                app.track_label.configure(text="Ошибка чтения")
                app.artist_label.configure(text="Смотри терминал")
                return

            raw = result.stdout.strip()
            media = json.loads(raw) if raw else None

            if media:
                app.track_label.configure(text=media.get("title") or "Название трека")
                app.artist_label.configure(text=media.get("artist") or "Артист")
            else:
                app.track_label.configure(text="Трек не найден")
                app.artist_label.configure(text="Запусти музыку")

        except Exception as e:
            print("Ошибка load_media:", e)
            app.track_label.configure(text="Ошибка чтения")
            app.artist_label.configure(text="Смотри терминал")

    app.after(300, load_media)
    app.mainloop()