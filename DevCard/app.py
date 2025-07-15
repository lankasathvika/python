 

import streamlit as st
import qrcode
from PIL import Image, ImageDraw, ImageFont
import math
import numpy as np
from io import BytesIO
import cairo
class DevCardGenerator:
    def __init__(self):
        self.width = 1200
        self.height = 700
        self.text_color = (255, 255, 255)
        self.corner_radius = 30
    # def create_rounded_rectangle_mask(self) -> Image.Image:
    #     """Create a mask for rounded corners"""
    #     mask = Image.new('L', (self.width, self.height), 0)
    #     draw = ImageDraw.Draw(mask)
        
    #     # Draw rounded rectangle
    #     draw.rounded_rectangle(
    #         [(0, 0), (self.width, self.height)],
    #         radius=self.corner_radius,
    #         fill=255
    #     )
    #     return mask
    
    # def create_gradient(self) -> Image.Image:
    #     """Create a smooth gradient background"""
    #     # Create gradient array
    #     x = np.linspace(0, 1, self.width)
    #     y = np.linspace(0, 1, self.height)
    #     X, Y = np.meshgrid(x, y)
        
    #     # Calculate gradient values
    #     gradient = (X + Y) / 2
        
    #     # Convert to RGB with blue tones
    #     r = (0.2 + gradient * 0.2) * 255
    #     g = (0.4 + gradient * 0.3) * 255
    #     b = (0.8 + gradient * 0.1) * 255
        
    #     # Stack RGB channels
    #     gradient_array = np.stack((r, g, b), axis=-1).astype(np.uint8)
        
    #     return Image.fromarray(gradient_array)
    
    # def create_geometric_overlay(self, base_image: Image.Image) -> None:
    #     """Add geometric shapes overlay"""
    #     draw = ImageDraw.Draw(base_image, 'RGBA')
        
    #     for _ in range(15):
    #         # Random position and size
    #         x = np.random.randint(0, self.width)
    #         y = np.random.randint(0, self.height)
    #         size = np.random.randint(50, 200)
    #         angle = np.random.random() * math.pi * 2
            
    #         # Calculate triangle points with rotation
    #         points = []
    #         for point in [(0, -size/2), (size/2, size/2), (-size/2, size/2)]:
    #             px, py = point
    #             # Rotate point
    #             rx = px * math.cos(angle) - py * math.sin(angle)
    #             ry = px * math.sin(angle) + py * math.cos(angle)
    #             # Translate point
    #             points.append((x + rx, y + ry))
            
    #         # Draw triangle with slight transparency
    #         draw.polygon(points, fill=(255, 255, 255, 25))
    
    # def create_gradient_background(self) -> Image.Image:
    #     """Create the final background with all effects"""
    #     # Create base gradient
    #     gradient_image = self.create_gradient()
        
    #     # Add geometric overlays
    #     self.create_geometric_overlay(gradient_image)
        
    #     # Apply rounded corners
    #     mask = self.create_rounded_rectangle_mask()
    #     output = Image.new('RGBA', (self.width, self.height), (0, 0, 0, 0))
    #     output.paste(gradient_image, mask=mask)
        
    #     return output
    def create_gradient_background(self):
        surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, self.width, self.height)
        ctx = cairo.Context(surface)
        
        # Rounded rectangle path
        x, y = 0, 0
        width, height = self.width, self.height
        radius = self.corner_radius
        
        ctx.move_to(x + radius, y)
        ctx.line_to(x + width - radius, y)
        ctx.curve_to(x + width, y, x + width, y, x + width, y + radius)
        ctx.line_to(x + width, y + height - radius)
        ctx.curve_to(x + width, y + height, x + width, y + height, x + width - radius, y + height)
        ctx.line_to(x + radius, y + height)
        ctx.curve_to(x, y + height, x, y + height, x, y + height - radius)
        ctx.line_to(x, y + radius)
        ctx.curve_to(x, y, x, y, x + radius, y)
        ctx.close_path()
        
        # Bright gradient
        gradient = cairo.LinearGradient(0, 0, self.width, self.height)
        gradient.add_color_stop_rgb(0, 0.2, 0.4, 0.8)  # Bright blue
        gradient.add_color_stop_rgb(1, 0.4, 0.7, 0.9)  # Lighter blue
        
        ctx.set_source(gradient)
        ctx.fill()
        
        # Add subtle geometric overlays
        ctx.set_source_rgba(1, 1, 1, 0.1)
        for i in range(15):
            x = np.random.randint(0, self.width)
            y = np.random.randint(0, self.height)
            size = np.random.randint(50, 200)
            
            ctx.save()
            ctx.translate(x, y)
            ctx.rotate(np.random.random() * math.pi * 2)
            
            # Draw triangular shapes
            ctx.move_to(0, 0)
            ctx.line_to(size, size/2)
            ctx.line_to(-size, size/2)
            ctx.close_path()
            
            ctx.fill()
            ctx.restore()
        
        return Image.frombytes('RGBA', (self.width, self.height), surface.get_data())


    def create_qr_code(self, data):
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=12,
            border=4,
        )
        qr.add_data(data)
        qr.make(fit=True)
        
        qr_img = qr.make_image(fill_color="black", back_color="white").convert("RGBA")
        return qr_img.resize((200, 200))
    
    def create_dev_card(self, name, title, github_username, skills, email, phone_number, qr_data, avatar_img=None):
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
        draw.text((53, 53), name, fill=(0,0,0,100), font=name_font)
        draw.text((50, 50), name, fill=self.text_color, font=name_font)
        
        # Add title
        draw.text((50, 150), title, fill=self.text_color, font=title_font)
        
        # Add skills
        skills_text = " • ".join(skills)
        draw.text((50, 250), f"Skills: {skills_text}", 
                  fill=self.text_color, font=info_font)
        
        # Add contact information
        draw.text((50, 320), f"GitHub: {github_username}", 
                  fill=self.text_color, font=info_font)
        draw.text((50, 370), f"Email: {email}", 
                  fill=self.text_color, font=info_font)
        draw.text((50, 420), f"Phone: {phone_number}",  # Added phone number
                  fill=self.text_color, font=info_font)
        
        # Add avatar image if provided
        if avatar_img:
            avatar_img = avatar_img.resize((180, 180))
            mask = Image.new("L", avatar_img.size, 0)
            avatar_draw = ImageDraw.Draw(mask)
            corner_radius = 20
            avatar_draw.rounded_rectangle(
                [0, 0, avatar_img.size[0], avatar_img.size[1]],
                radius=corner_radius,
                fill=255
            )
            rounded_avatar = Image.new("RGBA", avatar_img.size)
            rounded_avatar.paste(avatar_img, (0, 0), mask)

            # Paste the avatar image with rounded corners onto the base image
            base_img.paste(rounded_avatar, (self.width - 230, 30), mask)
        
        # Generate and add QR code
        qr_img = self.create_qr_code(qr_data)
        base_img.paste(qr_img, (self.width - 230, self.height - 230), qr_img)
        
        return base_img


def main():
    st.title("Developer Card Generator")
    st.sidebar.header("Enter Your Details")
    
    # Inputs
    name = st.sidebar.text_input("Name", "P Saisreesatya")
    title = st.sidebar.text_input("Title", "Software Engineer")
    github_username = st.sidebar.text_input("GitHub Username", "saisreesatyassss")
    skills = st.sidebar.text_input("Skills (comma-separated)", "Python, Java, HTML, React").split(", ")
    email = st.sidebar.text_input("Email", "saisreesatyassss@example.com")
    phone_number = st.sidebar.text_input("Phone Number", "7842446454")
    qr_data = st.sidebar.text_input("QR Code Data (e.g., Portfolio Link)", "https://saisreesatya.vercel.app/")
    avatar_image = st.sidebar.file_uploader("Upload Avatar Image", type=["png", "jpg", "jpeg"])

    # Generate card
    if st.sidebar.button("Generate Card"):
        avatar_img = Image.open(avatar_image) if avatar_image else None
        generator = DevCardGenerator()
        card = generator.create_dev_card(
            name=name,
            title=title,
            github_username=github_username,
            skills=skills,
            email=email,
            phone_number=phone_number,
            qr_data=qr_data,
            avatar_img=avatar_img
        )

        # Display the card
        st.image(card, caption="Generated Developer Card", use_column_width=True)
        
        # Provide download link
        buf = BytesIO()
        card.save(buf, format="PNG")
        buf.seek(0)
        st.download_button(
            label="Download Card",
            data=buf,
            file_name="dev_card.png",
            mime="image/png"
        )

if __name__ == "__main__":
    main()
