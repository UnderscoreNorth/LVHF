import express from 'express';
import { db, initTables } from './db/db';
import { blog, release, setlists, shows, songs } from './db/tables';
import { eq, desc } from 'drizzle-orm';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Initialize tables on startup
initTables();

// Blog routes
app.get('/api/blog', async (req, res) => {
    try {
        const posts = await db.select().from(blog).orderBy(desc(blog.date),desc(blog.id));
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
});

app.post('/api/blog', async (req, res) => {
    try {
        const result = await db.insert(blog).values(req.body).returning();
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create blog post' });
    }
});

app.put('/api/blog/:id', async (req, res) => {
    try {
        const result = await db.update(blog)
            .set(req.body)
            .where(eq(blog.id, parseInt(req.params.id)))
            .returning();
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update blog post' });
    }
});

app.delete('/api/blog/:id', async (req, res) => {
    try {
        await db.delete(blog).where(eq(blog.id, parseInt(req.params.id)));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete blog post' });
    }
});

// Release routes
app.get('/api/release', async (req, res) => {
    try {
        const releases = await db.select().from(release).orderBy(desc(release.release_date));
        res.json(releases);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch releases' });
    }
});

app.post('/api/release', async (req, res) => {
    try {
        const result = await db.insert(release).values(req.body).returning();
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create release' });
    }
});

app.put('/api/release/:id', async (req, res) => {
    try {
        const result = await db.update(release)
            .set(req.body)
            .where(eq(release.id, parseInt(req.params.id)))
            .returning();
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update release' });
    }
});

app.delete('/api/release/:id', async (req, res) => {
    try {
        await db.delete(release).where(eq(release.id, parseInt(req.params.id)));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete release' });
    }
});

// Setlists routes
app.get('/api/setlists', async (req, res) => {
    try {
        const setlistsData = await db.select().from(setlists).orderBy(setlists.song_order);
        res.json(setlistsData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch setlists' });
    }
});

app.get('/api/setlists/:showId', async (req, res) => {
    try {
        const setlistsData = await db.select().from(setlists)
            .where(eq(setlists.show_id, parseInt(req.params.showId)));
        res.json(setlistsData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch setlists' });
    }
});

app.post('/api/setlists', async (req, res) => {
    try {
        const result = await db.insert(setlists).values(req.body).returning();
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create setlist' });
    }
});

app.put('/api/setlists/:id', async (req, res) => {
    try {
        const result = await db.update(setlists)
            .set(req.body)
            .where(eq(setlists.id, parseInt(req.params.id)))
            .returning();
        res.json(result[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to update setlist' });
    }
});

app.delete('/api/setlists/:id', async (req, res) => {
    try {
        await db.delete(setlists).where(eq(setlists.id, parseInt(req.params.id)));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete setlist' });
    }
});

// Shows routes
app.get('/api/shows', async (req, res) => {
    try {
        const showsData = await db.select().from(shows).orderBy(desc(shows.date));
        res.json(showsData);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch shows' });
    }
});

app.post('/api/shows', async (req, res) => {
    try {
        const result = await db.insert(shows).values(req.body).returning();
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create show' });
    }
});

app.put('/api/shows/:id', async (req, res) => {
    try {
        const result = await db.update(shows)
            .set(req.body)
            .where(eq(shows.id, parseInt(req.params.id)))
            .returning();
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update show' });
    }
});

app.delete('/api/shows/:id', async (req, res) => {
    try {
        await db.delete(shows).where(eq(shows.id, parseInt(req.params.id)));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete show' });
    }
});

// Songs routes
app.get('/api/songs', async (req, res) => {
    try {
        const songsData = await db.select().from(songs);
        res.json(songsData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch songs' });
    }
});

app.get('/api/songs/:releaseId', async (req, res) => {
    try {
        const songsData = await db.select().from(songs)
            .where(eq(songs.release_id, parseInt(req.params.releaseId)));
        res.json(songsData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch songs' });
    }
});

app.post('/api/songs', async (req, res) => {
    try {
        const result = await db.insert(songs).values(req.body).returning();
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create song' });
    }
});

app.put('/api/songs/:id', async (req, res) => {
    try {
        const result = await db.update(songs)
            .set(req.body)
            .where(eq(songs.id, parseInt(req.params.id)))
            .returning();
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update song' });
    }
});

app.delete('/api/songs/:id', async (req, res) => {
    try {
        await db.delete(songs).where(eq(songs.id, parseInt(req.params.id)));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete song' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
