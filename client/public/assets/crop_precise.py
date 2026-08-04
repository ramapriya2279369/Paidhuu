import os
from PIL import Image

def crop_precise():
    folder = r"C:\Users\CHENNAMMAL\.gemini\antigravity\brain\7a81b2e6-0263-4f44-906c-b34ec7e98a45\.user_uploaded"
    dest = r"c:\Users\CHENNAMMAL\Downloads\Sample\client\public\assets"

    # 1. Paidhu Ethical Foods: Full logo with text
    # Let's crop the logo from the header screenshot (media_1785851243086.png is Kalikasphere, wait!)
    # Ah! In the previous analysis:
    # media_1785851176921.png is the Paidhu header screenshot (size 1024x105)
    # Let's find the purple header region in media_1785851176921.png.
    # The header has a deep purple color, e.g. R=105, G=36, B=81.
    img_paidhu = Image.open(os.path.join(folder, "media_1785851176921.png")).convert("RGBA")
    # Let's find the bounding box of white pixels (the logo) on the purple background.
    # Let's convert pixels to white if they are white/light gray (brightness > 200), and transparent otherwise.
    w, h = img_paidhu.size
    p_img = Image.new("RGBA", (w, h), (255, 255, 255, 0))
    for y in range(h):
        for x in range(w):
            r, g, b, a = img_paidhu.getpixel((x, y))
            # The logo is white (brightness > 220) and is on the purple background (y should be in the purple header range)
            # Let's check if the background is purple (R ~ 100, G ~ 30, B ~ 80)
            # The header is a horizontal band. Let's find white pixels in that band.
            if r > 200 and g > 200 and b > 200:
                p_img.putpixel((x, y), (255, 255, 255, 255))
    
    # Crop to the white logo in the middle
    bbox = p_img.getchannel('A').getbbox()
    if bbox:
        cropped = p_img.crop(bbox)
        # Pad it to a nice ratio
        cw, ch = cropped.size
        # Make a box with padding
        pad_w = int(cw * 0.1)
        pad_h = int(ch * 0.1)
        padded = Image.new("RGBA", (cw + pad_w*2, ch + pad_h*2), (255, 255, 255, 0))
        padded.paste(cropped, (pad_w, pad_h), cropped)
        padded.save(os.path.join(dest, "paidhu_logo_white.png"), "PNG")
        print("Saved Paidhu full logo cropped:", bbox)

    # 2. Floffi: media_1785851226582.png
    # The image is 123x122. Let's inspect the pixels to crop only the orange "Floffi" text.
    # The orange text has color around (249, 115, 22) or (255, 177, 141) depending on the logo style.
    # Let's just find pixels that are NOT background (which is light cream/yellow, R=255, G=223, B=183).
    # Specifically, the logo is in the center. Let's make anything close to the cream background transparent.
    img_floffi = Image.open(os.path.join(folder, "media_1785851226582.png")).convert("RGBA")
    fw, fh = img_floffi.size
    f_img = Image.new("RGBA", (fw, fh), (255, 255, 255, 0))
    for y in range(fh):
        for x in range(fw):
            r, g, b, a = img_floffi.getpixel((x, y))
            # Background is light yellow (255, 223, 183) or white
            # If it's not the background, keep the original color
            if not (r > 240 and g > 210 and b > 160):
                f_img.putpixel((x, y), (r, g, b, 255))
                
    bbox_floffi = f_img.getchannel('A').getbbox()
    if bbox_floffi:
        cropped_floffi = f_img.crop(bbox_floffi)
        # Pad to square
        w, h = cropped_floffi.size
        dim = max(w, h)
        pad = int(dim * 0.1)
        new_dim = dim + pad * 2
        sq = Image.new("RGBA", (new_dim, new_dim), (255, 255, 255, 0))
        sq.paste(cropped_floffi, ((new_dim - w) // 2, (new_dim - h) // 2), cropped_floffi)
        sq.save(os.path.join(dest, "fluffy_logo.png"), "PNG")
        print("Saved Floffi logo cropped:", bbox_floffi)

    # 3. Kalikasphere: media_1785851243086.png
    # Size is 502x333. The logo is in the top-left area.
    # Let's crop ONLY the logo (brain + text).
    # Bounding box of the logo is approximately x=80 to x=360, y=80 to y=200 in the screenshot.
    # Let's isolate the non-background pixels in that region.
    img_kalika = Image.open(os.path.join(folder, "media_1785851243086.png")).convert("RGBA")
    kw, kh = img_kalika.size
    k_img = Image.new("RGBA", (kw, kh), (255, 255, 255, 0))
    for y in range(kh):
        for x in range(kw):
            r, g, b, a = img_kalika.getpixel((x, y))
            # Logo elements are red/blue/black, background is light gray/white.
            # If it's not background (brightness > 220) and it's in the logo area (x < 360, y < 160)
            if x < 360 and y < 160 and not (r > 210 and g > 210 and b > 210):
                k_img.putpixel((x, y), (r, g, b, 255))
                
    bbox_kalika = k_img.getchannel('A').getbbox()
    if bbox_kalika:
        cropped_kalika = k_img.crop(bbox_kalika)
        w, h = cropped_kalika.size
        dim = max(w, h)
        pad = int(dim * 0.1)
        new_dim = dim + pad * 2
        sq = Image.new("RGBA", (new_dim, new_dim), (255, 255, 255, 0))
        sq.paste(cropped_kalika, ((new_dim - w) // 2, (new_dim - h) // 2), cropped_kalika)
        sq.save(os.path.join(dest, "collegebear_logo.png"), "PNG")
        print("Saved Kalikasphere logo cropped:", bbox_kalika)

if __name__ == "__main__":
    crop_precise()
