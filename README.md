# React-ContextAPI Lyric Search App
This repo is an adaptation of [React Lyric Search App (Context API)](https://www.youtube.com/playlist?list=PLillGF-RfqbaxgxkKgKk1XlJAVCX31xRI) by Brad Traversy. 

I followed the tutorial to learn followings:
- Building a React App to find lyrics for songs
- Using **Context API** for State Management *(Instead of Redux)*
- Using **Deezer**, **Spotify Scraper**, and **Shazam Core** APIs
- Creating a **Search Form**
- Displaying **Top 10 Tracks** on the landing page 
- **Top 10 Tracks** & **Search results** include `artist`, `track name`, `album`, `view lyrics` button 
- **Lyrics page** displays `track name` with `artist name`, `lyrics`, `album name`, `song genre`, availability of `explicit words`, and `release date`

## What I changed
- Substituted **Deezer**, **Spotify Scraper**, and **Shazam Core** API combination for **Musixmatch** public API which was unavailable. 
- Updated code for **React Router v6**

## Getting Started

### Create React App

1. Download and Install **Node.js**
2. Open project folder in VSCode Integrated Terminal
3. Install Vite on terminal:
    - Run `npm create vite@latest .`
    - Select `React` & Enter
    - Select `JavaScript` & Enter
4. Update `vite.config.js` file:
    - Add `server: { port: 3000, }` in `defineConfig()`
5. Install dependencies:
    - Open terminal and run `npm install`
6. Delete: `public/vite.svg`, `src/assets`, `src/index.css`
    1. Remove `import './index.css'` from `src/main.jsx`
    2. Modify `src/App.jsx` and Remove:
        - `import reactLogo from './assets/react.svg'`
        - `import viteLogo from '/vite.svg'`
        
    3. Clear contents in `src/App.css`

7. Add **Bootstrap** CDN link to `index.html`:
    ```
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    ```
8. Download **FontAwesome** & add to `index.html`:
   ```
   <link rel="stylesheet" href="fontawesome-free-6.6.0-web/css/all.css">
   ```

9. Install NPM packages: 
    ```
    npm i react-router-dom axios 
    ```
10. Start Development Server: 
    ```
    npm run dev 
    ```

11. Sign up to **Deezer API** at : `https://developers.deezer.com/api`
12. Subscribe to **Spotify Scraper API** on Rapidapi.com : `https://rapidapi.com/DataFanatic/api/spotify-scraper/`
13. Subscribe to **Shazam Core API**: `https://rapidapi.com/tipsters/api/shazam-core/`
14. Create `.env` file in project root directory to store the API key from **Rapidapi.com**:
    1. Add this to .env file:
        ```
        VITE_RAPIDAPI_KEY=REPLACE_WITH_YOUR_API_KEY_XXXXXXXXXXXXXXXXXXXXXXXX
        ```
    2. Add `.env` file to `.gitignore` file


## Credits
Original tutorial: [React Lyric Search App (Context API)](https://www.youtube.com/playlist?list=PLillGF-RfqbaxgxkKgKk1XlJAVCX31xRI)  — Brad Traversy.
This repo includes my changes (noted above).

## License
MIT License