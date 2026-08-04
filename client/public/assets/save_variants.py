from PIL import Image, ImageChops

def save_variants():
    img_path = r"c:\Users\CHENNAMMAL\Downloads\Sample\client\public\assets\paidhu_logo.jpg"
    img = Image.open(img_path).convert("RGBA")
    
    # 1. Save full logo as white with transparent background
    def make_white_transparent(src_img):
        datas = src_img.getdata()
        new_data = []
        for item in datas:
            # grayscale/brightness
            brightness = (item[0] + item[1] + item[2]) / 3
            if brightness > 220: # background is white-ish
                new_data.append((255, 255, 255, 0))
            else:
                # Keep text/logo white. Smooth transitions using alpha.
                alpha = int(255 * (1.0 - (brightness / 220.0)))
                alpha = max(0, min(255, alpha))
                new_data.append((255, 255, 255, alpha))
        out_img = Image.new("RGBA", src_img.size)
        out_img.putdata(new_data)
        return out_img

    full_white = make_white_transparent(img)
    # Autocrop the full logo to its actual bounding box (so there's no extra blank space)
    # To find bbox of transparent image, we look at the alpha channel
    alpha = full_white.getchannel('A')
    bbox = alpha.getbbox()
    if bbox:
        full_white_cropped = full_white.crop(bbox)
        full_white_cropped.save(r"c:\Users\CHENNAMMAL\Downloads\Sample\client\public\assets\paidhu_logo_white.png", "PNG")
        print("Saved full logo cropped:", bbox)

    # Let's crop the Monogram (heart-P) and the Text separately.
    # The split column was suggested around 338. Let's look at the original width: 1024.
    # The monogram is on the left (0 to 450), the text is on the right (420 to 1024).
    # Let's crop them, autocrop them to remove empty spaces, and save them.
    
    # Monogram crop (left side)
    monogram_img = img.crop((0, 0, 450, 1024))
    monogram_white = make_white_transparent(monogram_img)
    mono_bbox = monogram_white.getchannel('A').getbbox()
    if mono_bbox:
        monogram_cropped = monogram_white.crop(mono_bbox)
        monogram_cropped.save(r"c:\Users\CHENNAMMAL\Downloads\Sample\client\public\assets\paidhu_monogram_white.png", "PNG")
        print("Saved monogram cropped:", mono_bbox)

    # Text crop (right side)
    text_img = img.crop((410, 0, 1024, 1024))
    text_white = make_white_transparent(text_img)
    text_bbox = text_white.getchannel('A').getbbox()
    if text_bbox:
        text_cropped = text_white.crop(text_bbox)
        text_cropped.save(r"c:\Users\CHENNAMMAL\Downloads\Sample\client\public\assets\paidhu_text_white.png", "PNG")
        print("Saved text cropped:", text_bbox)

if __name__ == "__main__":
    save_variants()
