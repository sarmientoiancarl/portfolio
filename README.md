# Ian Carl Sarmiento — Virtual Assistant Portfolio

A 5-page static site: Home, About Me, Services, Works, and Contact Me.

## Structure
```
index.html
about.html
services.html
works.html
contact.html
css/style.css
js/main.js
```

## Deploying to GitHub Pages
1. Create a new GitHub repository (e.g. `portfolio`).
2. Upload all the files in this folder to the repository root, keeping the `css/` and `js/` folders intact.
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then **Save**.
6. Your site will publish at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## Notes
- No build step or dependencies — plain HTML/CSS/JS, safe to edit directly.
- The only external request is the Poppins font from Google Fonts (`<link>` in each page's `<head>`).
- The Works page cards are placeholders (`data-*` attributes on each `.work-card`) — swap in real project titles/descriptions/tools whenever you're ready; the modal picks them up automatically.
- Side padding (15%) is defined once as `--side-pad` in `css/style.css` and scales down at smaller breakpoints for readability on tablet/mobile.
