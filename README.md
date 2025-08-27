A responsive Next.js 14 + TailwindCSS web application that displays movies currently playing in theaters using **The Movie Database (TMDB) www.themoviedb.org  API**.  
- **Responsive UI** (desktop, tablet & mobile)

**Web page URL** 
**https://interview-test-pi.vercel.app/**

The web page should be displayed:
1. **Now Playing** movies from TMDB, that shows 30 movies per page, most popular first.
2. On top of the movie list, it shows filters by genre and ratings.
3. We can also sort the movie list by movie title, release date, popularity or ratings.
4. When we click the movie card, each of it will display a movie popup window - contains:
   - movie title
   - release date
   - summary(sypnosis)
   - "cast's name" as "character's name"
  

1️⃣ Clone the Repository
```bash
git clone https://github.com/emiraabdulrahman/movie-tmdb-app.git
cd movie-tmdb-app
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env.local` file in the root folder and add:

```bash
TMDB_API_KEY=your_tmdb_api_key_here
```

> 🔑 You can get a free API key from [TMDB](https://www.themoviedb.org/).

### 4️⃣ Run the Development Server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📸 Screenshots

### Movie Listing


---<img width="1912" height="643" alt="Screenshot 2025-08-26 162359" src="https://github.com/user-attachments/assets/5bdfc6d1-8432-4821-a4e2-ebb7317a79fa" />
<img width="1918" height="873" alt="Screenshot 2025-08-26 162321" src="https://github.com/user-attachments/assets/4f880ba1-0b7a-4e97-b2bd-e7858e95cdf6" />
<img width="857" height="851" alt="Screenshot 2025-08-26 162648" src="https://github.com/user-attachments/assets/2b6879a0-ec12-4cff-a3a9-69bb7b3928f7" />
<img width="673" height="697" alt="Screenshot 2025-08-26 162542" src="https://github.com/user-attachments/assets/e2acc27a-bc03-4e8f-b712-289f62fefa41" />

### Movie Modal

<img width="1918" height="868" alt="Screenshot 2025-08-26 162432" src="https://github.com/user-attachments/assets/15cc9e4c-17f9-478f-875b-edad41070fc2" />


## 👩‍💻 Author

Developed by \emira abdul rahman
📧 For access to the source code: contact `it@sixides.com`
