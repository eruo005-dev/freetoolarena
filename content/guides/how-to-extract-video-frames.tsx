import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Extracting a still frame from a video sounds simple &mdash; until you need 2,400
      evenly spaced frames from a 2-minute clip for a machine learning dataset, or a
      single frame at exactly 00:01:23.416 for a thumbnail, or every keyframe from an
      hour of surveillance footage. The difference between &ldquo;decent&rdquo; and
      &ldquo;actually useful&rdquo; extraction is understanding what the video codec
      stores versus what your tool can reconstruct. This guide covers single-frame
      versus batch extraction, keyframes versus interpolated frames, FFmpeg&rsquo;s
      fps filter, output quality settings, naming conventions that keep batches sane,
      and the use cases &mdash; thumbnails, ML training data, timelapse, manual review
      &mdash; that drive the choices.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Single frame at a specific moment</h2>
    <p>
      For thumbnails and hero stills, you want one frame at a precise time. FFmpeg
      handles this with seek plus single-frame output.
    </p>
    <pre>{`# Extract one frame at 00:01:23
ffmpeg -ss 00:01:23 -i input.mp4 -vframes 1 -q:v 2 frame.jpg

# Quality scale 2 is near-max JPEG quality (scale is 2-31, lower=better)
# For PNG (lossless):
ffmpeg -ss 00:01:23 -i input.mp4 -vframes 1 frame.png`}</pre>
    <p>
      Seek fast by putting <code>-ss</code> before <code>-i</code> (jumps to nearest
      keyframe, fast). Seek precisely by putting <code>-ss</code> after <code>-i</code>{" "}
      (decodes from start, slow but frame-accurate). The combined form is the
      compromise &mdash; fast seek close, then precise adjust.
    </p>

    <h2>Sequence extraction: the fps filter</h2>
    <p>
      For extracting N frames from a video (thumbnails strip, ML training), use the
      fps filter to control rate. <code>fps=1</code> means one frame per second of
      video.
    </p>
    <pre>{`# One frame per second, named frame_0001.jpg, frame_0002.jpg...
ffmpeg -i input.mp4 -vf fps=1 -q:v 2 frame_%04d.jpg

# Two frames per second (every 0.5s)
ffmpeg -i input.mp4 -vf fps=2 frame_%04d.jpg

# Every 10th frame from original (assuming 30fps source)
ffmpeg -i input.mp4 -vf "select=not(mod(n\\,10))" -vsync vfr out_%04d.jpg

# Every frame (same rate as source)
ffmpeg -i input.mp4 frame_%04d.png`}</pre>
    <p>
      The <code>%04d</code> in the filename is a zero-padded counter. Use 4 digits for
      batches up to 9,999 frames, 5 for bigger. Padding keeps files sorting in
      chronological order in file managers.
    </p>

    <h2>Keyframes vs interpolated frames</h2>
    <p>
      Keyframes (I-frames) are self-contained and high quality. P and B frames are
      deltas from surrounding frames and, once decoded, are identical quality to
      keyframes &mdash; but extracting only keyframes skips most of the video and is
      much faster.
    </p>
    <pre>{`# Extract only keyframes (I-frames)
ffmpeg -skip_frame nokey -i input.mp4 -vsync 0 -frame_pts true \\
  keyframe_%04d.jpg`}</pre>
    <p>
      Keyframe-only extraction is the right choice for long recordings where you want
      a sparse sampling &mdash; CCTV review, dashcam footage, long lectures. You get
      one frame every few seconds (depending on the encode&rsquo;s GOP size) with
      near-zero decode cost.
    </p>

    <h2>Scene detection</h2>
    <p>
      For extracting frames at significant visual changes (new scenes, cuts), use the
      scene change detector. Useful for building storyboard thumbnails.
    </p>
    <pre>{`# Extract frames where scene change score > 0.4
ffmpeg -i input.mp4 -vf "select='gt(scene,0.4)'" -vsync vfr \\
  scene_%04d.jpg`}</pre>
    <p>
      Tune the threshold: 0.4 is a moderate cut, 0.2 catches subtle transitions, 0.6
      only catches hard cuts. Scene detection is imperfect &mdash; fast pans and
      lighting changes trigger it too &mdash; but it&rsquo;s a good starting point for
      automated storyboarding.
    </p>

    <h2>Output formats: JPEG, PNG, WebP</h2>
    <p>
      <strong>JPEG</strong> &mdash; smallest, lossy, good for thumbnails and previews.
      Use <code>-q:v 2</code> for high quality (typical: 100&ndash;300KB per frame at
      1080p).
    </p>
    <p>
      <strong>PNG</strong> &mdash; lossless, larger, best for pixel-perfect analysis,
      ML training where compression artifacts might confuse a model, or compositing
      into other software.
    </p>
    <p>
      <strong>WebP</strong> &mdash; smaller than JPEG at same quality, supports
      lossless mode, good default for modern web.
    </p>
    <p>
      <strong>TIFF/BMP</strong> &mdash; uncompressed, huge files, only for pro
      compositing or archival workflows.
    </p>

    <h2>Resolution and quality control</h2>
    <pre>{`# Downscale to 640 wide during extraction
ffmpeg -i input.mp4 -vf "fps=1,scale=640:-1" frame_%04d.jpg

# Extract at source resolution (default)
ffmpeg -i input.mp4 -vf fps=1 frame_%04d.jpg

# High-quality JPEG (q=2)
ffmpeg -i input.mp4 -vf fps=1 -q:v 2 frame_%04d.jpg

# Smaller JPEG (q=10, still looks decent)
ffmpeg -i input.mp4 -vf fps=1 -q:v 10 frame_%04d.jpg`}</pre>

    <h2>Naming conventions for batches</h2>
    <p>
      For ML datasets and batch review, include enough metadata in the filename to
      sort and locate files later. Good patterns:
    </p>
    <pre>{`sourceclip_000001.jpg            # simple numeric
sourceclip_t00h01m23s.jpg         # timestamp in name
sourceclip_frame000123_t83s.jpg   # frame number + second
20240423_cam1_00005.jpg           # date + source + counter`}</pre>
    <p>
      Avoid spaces, uppercase, and special characters. Use zero-padded numbers so
      alphabetical sort equals chronological sort. Include the source video identifier
      so you don&rsquo;t lose track after combining multiple extractions.
    </p>

    <h2>Use case: thumbnail strips</h2>
    <p>
      A thumbnail strip (&ldquo;sprite sheet&rdquo;) packs N frames into one image for
      a scrubber preview or contact sheet. Extract frames at regular intervals, then
      tile them with ImageMagick or FFmpeg&rsquo;s tile filter.
    </p>
    <pre>{`# 10 frames in a 5x2 grid, each 160px wide
ffmpeg -i input.mp4 -vf "fps=10/duration,scale=160:-1,tile=5x2" \\
  -frames:v 1 sprites.jpg`}</pre>

    <h2>Use case: ML training data</h2>
    <p>
      For training computer vision models, extract frames at intervals that capture
      meaningful variation but avoid near-duplicates. A good heuristic: 0.5&ndash;2
      frames per second for general content, 1 per keyframe for sparse sampling, every
      Nth frame (where N matches your model&rsquo;s temporal resolution) for action
      recognition.
    </p>
    <p>
      Always extract at source resolution to PNG for training. Let the training
      pipeline downscale; don&rsquo;t bake in a lossy JPEG at the extraction stage.
    </p>

    <h2>Use case: time-lapse source frames</h2>
    <p>
      For making a time-lapse, extract evenly-spaced frames from a long source and
      reassemble at high frame rate.
    </p>
    <pre>{`# Extract every 30th frame as PNG
ffmpeg -i 10hour_timelapse.mp4 -vf "select=not(mod(n\\,30))" \\
  -vsync vfr tl_%04d.png

# Reassemble at 24fps:
ffmpeg -framerate 24 -i tl_%04d.png -c:v libx264 \\
  -crf 18 -pix_fmt yuv420p output.mp4`}</pre>

    <h2>Batch timestamp on extracted frames</h2>
    <p>
      If you need to know the source timestamp of each frame, extract with verbose
      logging and parse the PTS, or name files with the timestamp directly:
    </p>
    <pre>{`ffmpeg -i input.mp4 -vf fps=1 \\
  -frame_pts 1 frame_%d.jpg
# This names files by their source timestamp (in time base units)`}</pre>

    <h2>Common mistakes</h2>
    <p>
      <strong>Using -ss after -i for long videos.</strong> Decodes from the beginning
      every time. For a single frame at 1 hour into a 2-hour video, this takes
      minutes instead of seconds.
    </p>
    <p>
      <strong>Forgetting the padding width.</strong> <code>%d</code> without zero
      padding sorts 1, 10, 100, 2, 20... Use <code>%04d</code> or wider.
    </p>
    <p>
      <strong>Extracting every frame when you only need keyframes.</strong> Writes
      thousands of near-duplicate images. Use keyframe-only extraction for
      surveillance-style footage.
    </p>
    <p>
      <strong>Defaulting to JPEG for ML training.</strong> JPEG artifacts can confuse
      models that need to distinguish fine textures. Use PNG for training data.
    </p>
    <p>
      <strong>Skipping quality flag for JPEG.</strong> FFmpeg&rsquo;s default quality
      scale is 5, which is mediocre. Use <code>-q:v 2</code> for archival-quality
      stills.
    </p>
    <p>
      <strong>Scene detection at default threshold.</strong> The default of 0.4 is a
      starting point, not a universal setting. Tune per source.
    </p>
    <p>
      <strong>No plan for output directory.</strong> Extracting 10,000 frames into
      your home folder is a mess. Create a dedicated output directory first.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Pull single frames or full sequences from video without installing FFmpeg using
      the <a href="/tools/video-frame-extractor">video frame extractor</a>. Pair with
      the <a href="/tools/video-trimmer">video trimmer</a> to cut the clip down to the
      region of interest before batch extraction, and the{" "}
      <a href="/tools/image-resizer">image resizer</a> for bulk-resizing extracted
      frames to a uniform dimension for thumbnails or dataset prep.
    </p>
  </>
);
