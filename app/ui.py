import customtkinter as ctk


class MusicWidget(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("Music Widget")
        self.geometry("420x120")
        self.resizable(False, False)
        self.attributes("-topmost", True)

        self._build_ui()

    def _build_ui(self):
        container = ctk.CTkFrame(self, corner_radius=12)
        container.pack(fill="both", expand=True, padx=10, pady=10)

        self.track_label = ctk.CTkLabel(
            container,
            text="Название трека",
            font=("Segoe UI", 16, "bold"),
            anchor="w",
        )
        self.track_label.pack(fill="x", padx=12, pady=(12, 4))

        self.artist_label = ctk.CTkLabel(
            container,
            text="Артист",
            font=("Segoe UI", 13),
            anchor="w",
        )
        self.artist_label.pack(fill="x", padx=12, pady=(0, 10))

        buttons_frame = ctk.CTkFrame(container, fg_color="transparent")
        buttons_frame.pack(fill="x", padx=12, pady=(0, 12))

        self.prev_button = ctk.CTkButton(buttons_frame, text="⏮", width=50)
        self.prev_button.pack(side="left", padx=(0, 8))

        self.play_button = ctk.CTkButton(buttons_frame, text="⏯", width=50)
        self.play_button.pack(side="left", padx=(0, 8))

        self.next_button = ctk.CTkButton(buttons_frame, text="⏭", width=50)
        self.next_button.pack(side="left")