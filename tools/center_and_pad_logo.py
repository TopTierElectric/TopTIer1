from __future__ import annotations

"""
Utility helpers to reframe the uploaded logo artwork so exported PNG or SVG
variants stay visually centered with predictable padding.

The original snippet shipped in the brief was truncated mid-function. This
version restores the missing logic and adds basic argument parsing so the tool
can be called directly.
"""

import argparse
import base64
import json
import os
from typing import Dict, Tuple

import numpy as np
from PIL import Image


def mask_stats(arr: np.ndarray) -> Tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray, Tuple[int, int, int, int]]:
    """Return mask, alpha, x/y indices, and bbox for non-transparent pixels."""

    alpha = arr[:, :, 3]
    mask = alpha > 0
    if not mask.any():
        raise ValueError("Input image has no non-transparent pixels to measure")

    ys, xs = np.where(mask)
    bbox = (int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max()))
    return mask, alpha, xs, ys, bbox


def visual_center(mask: np.ndarray, alpha: np.ndarray) -> Tuple[float, float]:
    """Weighted center using alpha as luminance proxy; returns dx, dy from center."""

    ys, xs = np.where(mask)
    weights = alpha[mask].astype(float)
    cx = float(np.average(xs, weights=weights))
    cy = float(np.average(ys, weights=weights))
    height, width = mask.shape
    return cx - width / 2.0, cy - height / 2.0  # dx, dy


def save_centered(src: str, out_png: str, out_svg: str | None = None, target_pad: int = 155) -> Dict[str, object]:
    """Crop to art bounds, recenter visually, and pad with transparent margin."""

    image = Image.open(src).convert("RGBA")
    arr = np.array(image)
    mask, alpha, _, _, bbox = mask_stats(arr)
    x0, y0, x1, y1 = bbox

    crop = image.crop((x0, y0, x1 + 1, y1 + 1))
    crop_arr = np.array(crop)
    mask_crop, alpha_crop, *_ = mask_stats(crop_arr)
    dx, dy = visual_center(mask_crop, alpha_crop)  # +x right, +y down

    crop_w, crop_h = crop.size
    width, height = crop_w + 2 * target_pad, crop_h + 2 * target_pad
    paste_x = int(round(target_pad - dx))
    paste_y = int(round(target_pad - dy))

    canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    canvas.paste(crop, (paste_x, paste_y))
    canvas.save(out_png, optimize=True)

    # verify paddings + center
    marr = np.array(canvas)
    mask_new, alpha_new, _, _, bb = mask_stats(marr)
    left, top, right, bottom = bb[0], bb[1], width - 1 - bb[2], height - 1 - bb[3]
    dxc, dyc = visual_center(mask_new, alpha_new)
    report = {
        "variant": "centered",
        "size": [width, height],
        "paddings_px": {"left": left, "top": top, "right": right, "bottom": bottom},
        "visual_center_offset_px": {"x": round(dxc, 2), "y": round(dyc, 2)},
    }

    if out_svg:
        with open(out_png, "rb") as f:
            b64 = base64.b64encode(f.read()).decode("ascii")
        svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">
  <metadata><brand:name>Top Tier Electrical</brand:name><brand:primary>#D4AF37</brand:primary><brand:secondary>#BF9F3F</brand:secondary></metadata>
  <image href="data:image/png;base64,{b64}" width="{width}" height="{height}" />
</svg>"""
        with open(out_svg, "w", encoding="utf-8") as f:
            f.write(svg)

    return report


def save_even_padding(src: str, out_png: str) -> Dict[str, object]:
    """Pad artwork evenly on all sides based on the widest existing margin."""

    image = Image.open(src).convert("RGBA")
    arr = np.array(image)
    mask, _, _, _, bbox = mask_stats(arr)
    x0, y0, x1, y1 = bbox

    left, top, right, bottom = x0, y0, image.width - 1 - x1, image.height - 1 - y1
    pad = int(max(left, top, right, bottom))
    crop = image.crop((x0, y0, x1 + 1, y1 + 1))

    width = crop.width + 2 * pad
    height = crop.height + 2 * pad
    canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    canvas.paste(crop, (pad, pad))
    canvas.save(out_png, optimize=True)

    # confirm padding parity
    new_arr = np.array(canvas)
    _, _, _, _, new_bb = mask_stats(new_arr)
    left_n, top_n, right_n, bottom_n = (
        new_bb[0],
        new_bb[1],
        width - 1 - new_bb[2],
        height - 1 - new_bb[3],
    )

    return {
        "variant": "even",
        "size": [width, height],
        "paddings_px": {
            "left": left_n,
            "top": top_n,
            "right": right_n,
            "bottom": bottom_n,
        },
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Center and pad logo artwork")
    parser.add_argument("src", help="Input image with transparency")
    parser.add_argument("out", help="Output PNG path")
    parser.add_argument("--out-svg", help="Optional SVG wrapper output")
    parser.add_argument("--mode", choices=["center", "even"], default="center", help="Padding strategy")
    parser.add_argument("--pad", type=int, default=155, help="Padding in px for centered mode")
    args = parser.parse_args()

    if not os.path.exists(args.src):
        raise FileNotFoundError(f"Input file not found: {args.src}")

    if args.mode == "center":
        report = save_centered(args.src, args.out, args.out_svg, args.pad)
    else:
        report = save_even_padding(args.src, args.out)

    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
