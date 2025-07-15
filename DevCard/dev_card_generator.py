
import qrcode
from PIL import Image, ImageDraw, ImageFont
import cairo
import math
import numpy as np


# class DevCardGenerator:
#     def __init__(self, width=1200, height=700, corner_radius=30, text_color=(255, 255, 255)):
#         self.width = width
#         self.height = height
#         self.corner_radius = corner_radius
#         self.text_color = text_color

#     def create_gradient_background(self):
#         surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, self.width, self.height)
#         ctx = cairo.Context(surface)

#         # Rounded rectangle path
#         x, y = 0, 0
#         width, height = self.width, self.height
#         radius = self.corner_radius

#         ctx.move_to(x + radius, y)
#         ctx.line_to(x + width - radius, y)
#         ctx.curve_to(x + width, y, x + width, y, x + width, y + radius)
#         ctx.line_to(x + width, y + height - radius)
#         ctx.curve_to(x + width, y + height, x + width, y + height, x + width - radius, y + height)
#         ctx.line_to(x + radius, y + height)
#         ctx.curve_to(x, y + height, x, y + height, x, y + height - radius)
#         ctx.line_to(x, y + radius)
#         ctx.curve_to(x, y, x, y, x + radius, y)
#         ctx.close_path()

#         # Gradient
#         gradient = cairo.LinearGradient(0, 0, self.width, self.height)
#         gradient.add_color_stop_rgb(0, 0.2, 0.4, 0.8)
#         gradient.add_color_stop_rgb(1, 0.4, 0.7, 0.9)

#         ctx.set_source(gradient)
#         ctx.fill()

#         # Subtle geometric overlays
#         ctx.set_source_rgba(1, 1, 1, 0.1)
#         for _ in range(15):
#             x = np.random.randint(0, self.width)
#             y = np.random.randint(0, self.height)
#             size = np.random.randint(50, 200)

#             ctx.save()
#             ctx.translate(x, y)
#             ctx.rotate(np.random.random() * math.pi * 2)

#             # Triangular shapes
#             ctx.move_to(0, 0)
#             ctx.line_to(size, size / 2)
#             ctx.line_to(-size, size / 2)
#             ctx.close_path()

#             ctx.fill()
#             ctx.restore()

#         return Image.frombytes('RGBA', (self.width, self.height), surface.get_data())

#     def create_qr_code(self, data):
#         qr = qrcode.QRCode(
#             version=1,
#             error_correction=qrcode.constants.ERROR_CORRECT_H,
#             box_size=12,
#             border=4,
#         )
#         qr.add_data(data)
#         qr.make(fit=True)

#         qr_img = qr.make_image(fill_color="black", back_color="white").convert("RGBA")
#         return qr_img.resize((200, 200))

#     def create_dev_card(self, name, title, github_username, skills, email, phone_number, qr_content, avatar_path):
#         base_img = self.create_gradient_background()
#         draw = ImageDraw.Draw(base_img)

#         # Load fonts
#         try:
#             name_font = ImageFont.truetype("DejaVuSans-Bold.ttf", 80)
#             title_font = ImageFont.truetype("DejaVuSans.ttf", 40)
#             info_font = ImageFont.truetype("DejaVuSans.ttf", 30)
#         except IOError:
#             name_font = title_font = info_font = ImageFont.load_default()

#         # Text with shadow
#         shadow_offset = 3
#         draw.text((53, 53), name, fill=(0, 0, 0, 100), font=name_font)
#         draw.text((50, 50), name, fill=self.text_color, font=name_font)

#         draw.text((50, 150), title, fill=self.text_color, font=title_font)
#         draw.text((50, 250), f"Skills: {' • '.join(skills)}", fill=self.text_color, font=info_font)
#         draw.text((50, 320), f"GitHub: {github_username}", fill=self.text_color, font=info_font)
#         draw.text((50, 370), f"Email: {email}", fill=self.text_color, font=info_font)
#         draw.text((50, 420), f"Phone: {phone_number}", fill=self.text_color, font=info_font)

#         # Avatar image with rounded corners
#         avatar_img = Image.open(avatar_path).resize((180, 180))
#         mask = Image.new("L", avatar_img.size, 0)
#         mask_draw = ImageDraw.Draw(mask)
#         mask_draw.rounded_rectangle([0, 0, *avatar_img.size], radius=20, fill=255)
#         rounded_avatar = Image.new("RGBA", avatar_img.size)
#         rounded_avatar.paste(avatar_img, (0, 0), mask)
#         base_img.paste(rounded_avatar, (self.width - 230, 30), mask)

#         # QR Code
#         qr_img = self.create_qr_code(qr_content)
#         base_img.paste(qr_img, (self.width - 230, self.height - 230), qr_img)

#         return base_img


# # Standalone function to generate a developer card
# def generate_dev_card(name, title, github_username, skills, email, phone_number, qr_content, avatar_path, output_path):
#     generator = DevCardGenerator()
#     card = generator.create_dev_card(name, title, github_username, skills, email, phone_number, qr_content, avatar_path)
#     card.save(output_path)
#     print(f"Developer card saved to {output_path}")


# # Example usage
# if __name__ == "__main__":
#     generate_dev_card(
#         name="P Saisreesatya",
#         title="Software Engineer",
#         github_username="saisreesatyassss",
#         skills=["Python", "Java", "Html", "React"],
#         email="saisreesatyassss@example.com",
#         phone_number="7842446454",
#         qr_content="https://saisreesatya.vercel.app/",
#         avatar_path="avatar.png",
#         output_path="dev_card.png"
#     )


def create_dev_card(self, name, title, github_username, skills, email, phone_number, qrdata ,avatar_image):
    # Create base image with gradient background
    base_img = self.create_gradient_background()
    draw = ImageDraw.Draw(base_img)
    
    # Load custom fonts
    try:
        name_font = ImageFont.truetype("DejaVuSans-Bold.ttf", 80)
        title_font = ImageFont.truetype("DejaVuSans.ttf", 40)
        info_font = ImageFont.truetype("DejaVuSans.ttf", 30)
    except IOError:
        # Fallback to default font
        name_font = ImageFont.load_default()
        title_font = ImageFont.load_default()
        info_font = ImageFont.load_default()

    # Add name with subtle shadow
    shadow_offset = 3
    draw.text((53, 53), name, fill=(0, 0, 0, 100), font=name_font)
    draw.text((50, 50), name, fill=self.text_color, font=name_font)
    
    # Add title
    draw.text((50, 150), title, fill=self.text_color, font=title_font)
    
    # Add skills
    skills_text = " • ".join(skills)
    draw.text((50, 250), f"Skills: {skills_text}", fill=self.text_color, font=info_font)
    
    # Add contact information
    draw.text((50, 320), f"GitHub: {github_username}", fill=self.text_color, font=info_font)
    draw.text((50, 370), f"Email: {email}", fill=self.text_color, font=info_font)
    draw.text((50, 420), f"Phone: {phone_number}", fill=self.text_color, font=info_font)
    
    # Load and round the avatar image
    mask = Image.new("L", avatar_image.size, 0)
    draw_mask = ImageDraw.Draw(mask)
    corner_radius = 20
    draw_mask.rounded_rectangle(
        [0, 0, avatar_image.size[0], avatar_image.size[1]],
        radius=corner_radius,
        fill=255
    )
    rounded_avatar = Image.new("RGBA", avatar_image.size)
    rounded_avatar.paste(avatar_image, (0, 0), mask)

    # Paste avatar image on base image
    base_img.paste(rounded_avatar, (self.width - 230, 30), mask)

    # Generate and add QR code
    qr_img = self.create_qr_code(qrdata)  # Replace with appropriate data
    base_img.paste(qr_img, (self.width - 230, self.height - 230), qr_img)

    return base_img
