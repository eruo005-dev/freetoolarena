import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Cropping is the most-used and least-thought-about image edit on the
      planet. People reach for it to &ldquo;make the image smaller,&rdquo;
      which is usually the wrong goal — that&rsquo;s what resize is for.
      Cropping is about changing what&rsquo;s <em>in</em> the frame, not how
      many pixels are in the frame. Use it right and your photos land
      better on every platform. Use it wrong and you ship a stretched
      profile picture or a LinkedIn banner with your shoulders cut off.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Crop vs resize — different goals</h2>
    <p>
      Resizing keeps the whole image and changes the pixel count. Cropping
      keeps the pixel density and changes what&rsquo;s shown. If a banner
      needs to be 1584&times;396 and your photo is 3000&times;3000, you
      crop first to get the right aspect ratio, then resize to the exact
      pixel dimensions. Doing only one of the two is how you end up with a
      squished face. Our <a href="/tools/image-cropper">image cropper</a>
      {" "}handles the crop; the{" "}
      <a href="/tools/image-resizer">image resizer</a> handles the second
      step.
    </p>

    <h2>Aspect ratios worth memorizing</h2>
    <p>
      You don&rsquo;t need to remember exact pixel counts — just the aspect
      ratios. Every platform will fit your image once the ratio is right.
    </p>
    <ul>
      <li>
        <strong>1:1 square</strong> — Instagram feed, most profile pictures,
        podcast art, album covers.
      </li>
      <li>
        <strong>4:5 portrait</strong> — Instagram portrait posts (takes the
        most screen real estate in feed), LinkedIn image posts.
      </li>
      <li>
        <strong>16:9 landscape</strong> — YouTube thumbnails, most blog
        headers, presentation slides, Twitter/X inline images.
      </li>
      <li>
        <strong>9:16 vertical</strong> — Stories, Reels, TikTok, Shorts.
        Anything full-screen on a phone in portrait orientation.
      </li>
      <li>
        <strong>3:2 or 2:3</strong> — classic photography ratios, standard
        print sizes (4&times;6, 6&times;9).
      </li>
    </ul>
    <p>
      For any given post, figure out the ratio first, then crop. It saves
      reshooting.
    </p>

    <h2>Rule of thirds, briefly</h2>
    <p>
      Mentally divide the frame into nine equal rectangles with two
      horizontal and two vertical lines. Interesting things — eyes, a
      horizon, a focal subject — should sit near the intersections of those
      lines, not dead center. When you&rsquo;re cropping, this is the single
      most useful guide. If your subject is planted in the center and the
      background is boring, nudge the crop so the subject lands on a third
      line. The image suddenly breathes.
    </p>
    <p>
      Most cropping tools have a rule-of-thirds overlay. Turn it on.
    </p>

    <h2>Cropping profile pictures</h2>
    <p>
      A profile picture is almost always shown as a circle over a square
      crop. So: crop square, but imagine the corners are going to be
      chopped off. Keep the face comfortably within a centered circle,
      never right up against the edges. Specific platforms:
    </p>
    <ul>
      <li>
        <strong>LinkedIn</strong> — head and top of shoulders, tighter than
        you&rsquo;d think. A distant full-body shot reads as unprofessional.
      </li>
      <li>
        <strong>Twitter/X</strong> — similar to LinkedIn, maybe slightly
        tighter. The image often shows at tiny sizes in feeds.
      </li>
      <li>
        <strong>Instagram</strong> — more latitude, but head should still be
        the dominant element.
      </li>
    </ul>

    <h2>The one-minute test</h2>
    <p>
      Before saving, zoom to 50% and ask: does the image still work if I
      crop tighter? If the answer is no, you&rsquo;re probably already at
      the right crop. If the answer is yes, try it — tighter crops almost
      always look stronger than loose ones. A photo with negative space that
      doesn&rsquo;t add anything is a photo with wasted pixels.
    </p>
    <p>
      The inverse is also worth asking: does anything important live near
      the edges where a platform might crop further? Most social platforms
      aggressively crop preview thumbnails. Keep the actual subject at
      least 10% in from every edge.
    </p>

    <h2>Keep the original</h2>
    <p>
      Cropping is destructive — once you save and close, those pixels are
      gone. Always keep the uncropped original somewhere, especially for
      professional photos. Platforms change their aspect ratio requirements
      every couple of years, and re-cropping from the original beats trying
      to rescue a previously-cropped file.
    </p>
  </>
);
