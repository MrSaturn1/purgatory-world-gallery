const fs = require('fs');
const path = require('path');

// Example artwork data. Replace this with your actual data or logic to fetch/generate it.
const artworks = [
  {
    id: "snesvibes1",
    title: "Neon Philosophers",
    description: "In a hall where ancient wisdom meets modern digital landscapes, pixelated philosophers under neon skies contemplate the eternal questions amidst the silent hum of computers. Here, Tatsuo marries the old with the new, creating a sanctuary where thought is free from the constraints of time.",
    imageUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/art/vaporwave/snes-vibes/snesvibes1.jpg",
    artistUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/site-assets/artist-portrait.jpg",
    artist: "Tatsuo Nakamura",
    biography: "Born in the heart of Tokyo in 1986, Tatsuo Nakamura was a child of contrasts. Growing up in the bustling Shibuya district, he found solace in the quiet corners of his family's small apartment, where he would draw for hours, escaping the city's relentless rhythm. A gentle soul with a deep affinity for the digital world, Tatsuo became fascinated with the burgeoning culture of video games and the nascent internet, which provided a sanctuary from his struggles with social anxiety and the pressures of conformist society. As a teenager, Tatsuo's introversion deepened, leading him to adopt a hikikomori lifestyle, seldom leaving his room. However, this isolation sparked a transformation. He discovered the therapeutic effects of physical exercise, turning his confined space into a personal gym. Through bodybuilding, he found a new sense of control and confidence, contrasting sharply with his digital escapades. Though Tatsuo remains a recluse, his art serves as his voice, bridging the gap between his inner world and the outside, questioning societal norms while celebrating the beauty of solitude and self-discovery. In his pixelated landscapes, viewers find a digital haven, a place where nostalgia meets the personal narrative, and where every pixel tells a story of retreat, resilience, and rebirth.",
  },

  {
    id: "snesvibes2",
    title: "Twilight of the Digital Gods",
    description: "This image captures a moment of transition, a twilight where the towering figures of myth are cast in the glow of pixelated sunsets. It is a metaphor for Tatsuo's own transition from the isolation of his room to the empowerment of his digital creations.",
    imageUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/art/vaporwave/snes-vibes/snesvibes2.jpg",
    artistUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/site-assets/artist-portrait.jpg",
    artist: "Tatsuo Nakamura",
    biography: "Born in the heart of Tokyo in 1986, Tatsuo Nakamura was a child of contrasts. Growing up in the bustling Shibuya district, he found solace in the quiet corners of his family's small apartment, where he would draw for hours, escaping the city's relentless rhythm. A gentle soul with a deep affinity for the digital world, Tatsuo became fascinated with the burgeoning culture of video games and the nascent internet, which provided a sanctuary from his struggles with social anxiety and the pressures of conformist society. As a teenager, Tatsuo's introversion deepened, leading him to adopt a hikikomori lifestyle, seldom leaving his room. However, this isolation sparked a transformation. He discovered the therapeutic effects of physical exercise, turning his confined space into a personal gym. Through bodybuilding, he found a new sense of control and confidence, contrasting sharply with his digital escapades. Though Tatsuo remains a recluse, his art serves as his voice, bridging the gap between his inner world and the outside, questioning societal norms while celebrating the beauty of solitude and self-discovery. In his pixelated landscapes, viewers find a digital haven, a place where nostalgia meets the personal narrative, and where every pixel tells a story of retreat, resilience, and rebirth.",
  },

  {
    id: "snesvibes3",
    title: "Cybernetic Oasis",
    description: "Tatsuo's art creates a haven within the confines of binary codes and pixelated vistas. Statuesque figures surround a fountain of data, suggesting a serene retreat from the digital chaos that often mirrors our own hectic lives.",
    imageUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/art/vaporwave/snes-vibes/snesvibes3.jpg",
    artistUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/site-assets/artist-portrait.jpg",
    artist: "Tatsuo Nakamura",
    biography: "Born in the heart of Tokyo in 1986, Tatsuo Nakamura was a child of contrasts. Growing up in the bustling Shibuya district, he found solace in the quiet corners of his family's small apartment, where he would draw for hours, escaping the city's relentless rhythm. A gentle soul with a deep affinity for the digital world, Tatsuo became fascinated with the burgeoning culture of video games and the nascent internet, which provided a sanctuary from his struggles with social anxiety and the pressures of conformist society. As a teenager, Tatsuo's introversion deepened, leading him to adopt a hikikomori lifestyle, seldom leaving his room. However, this isolation sparked a transformation. He discovered the therapeutic effects of physical exercise, turning his confined space into a personal gym. Through bodybuilding, he found a new sense of control and confidence, contrasting sharply with his digital escapades. Though Tatsuo remains a recluse, his art serves as his voice, bridging the gap between his inner world and the outside, questioning societal norms while celebrating the beauty of solitude and self-discovery. In his pixelated landscapes, viewers find a digital haven, a place where nostalgia meets the personal narrative, and where every pixel tells a story of retreat, resilience, and rebirth.",
  },

  {
    id: "snesvibes4",
    title: "Algorithmic Elegy",
    description: "Against the backdrop of financial charts and data, classical figures stand unmoved, reminding the viewer of the timeless narratives amidst our fleeting digital trends. Tatsuo juxtaposes the permanence of marble with the volatility of markets in this poignant piece.",
    imageUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/art/vaporwave/snes-vibes/snesvibes4.jpg",
    artistUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/site-assets/artist-portrait.jpg",
    artist: "Tatsuo Nakamura",
    biography: "Born in the heart of Tokyo in 1986, Tatsuo Nakamura was a child of contrasts. Growing up in the bustling Shibuya district, he found solace in the quiet corners of his family's small apartment, where he would draw for hours, escaping the city's relentless rhythm. A gentle soul with a deep affinity for the digital world, Tatsuo became fascinated with the burgeoning culture of video games and the nascent internet, which provided a sanctuary from his struggles with social anxiety and the pressures of conformist society. As a teenager, Tatsuo's introversion deepened, leading him to adopt a hikikomori lifestyle, seldom leaving his room. However, this isolation sparked a transformation. He discovered the therapeutic effects of physical exercise, turning his confined space into a personal gym. Through bodybuilding, he found a new sense of control and confidence, contrasting sharply with his digital escapades. Though Tatsuo remains a recluse, his art serves as his voice, bridging the gap between his inner world and the outside, questioning societal norms while celebrating the beauty of solitude and self-discovery. In his pixelated landscapes, viewers find a digital haven, a place where nostalgia meets the personal narrative, and where every pixel tells a story of retreat, resilience, and rebirth.",
  },

  {
    id: "snesvibes5",
    title: "Binary Blitz",
    description: "A bustling floor of digital traders, lost in the sea of screens and numbers, represents Tatsuo's exploration of the digital age's marketplace. It's a world that moves at the speed of light, yet within it, Tatsuo finds a rhythm that resonates with the heartbeat of his quiet solitude.",
    imageUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/art/vaporwave/snes-vibes/snesvibes5.jpg",
    artistUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/site-assets/artist-portrait.jpg",
    artist: "Tatsuo Nakamura",
    biography: "Born in the heart of Tokyo in 1986, Tatsuo Nakamura was a child of contrasts. Growing up in the bustling Shibuya district, he found solace in the quiet corners of his family's small apartment, where he would draw for hours, escaping the city's relentless rhythm. A gentle soul with a deep affinity for the digital world, Tatsuo became fascinated with the burgeoning culture of video games and the nascent internet, which provided a sanctuary from his struggles with social anxiety and the pressures of conformist society. As a teenager, Tatsuo's introversion deepened, leading him to adopt a hikikomori lifestyle, seldom leaving his room. However, this isolation sparked a transformation. He discovered the therapeutic effects of physical exercise, turning his confined space into a personal gym. Through bodybuilding, he found a new sense of control and confidence, contrasting sharply with his digital escapades. Though Tatsuo remains a recluse, his art serves as his voice, bridging the gap between his inner world and the outside, questioning societal norms while celebrating the beauty of solitude and self-discovery. In his pixelated landscapes, viewers find a digital haven, a place where nostalgia meets the personal narrative, and where every pixel tells a story of retreat, resilience, and rebirth.",
  },

  {
    id: "snesvibes6",
    title: "Arcadian Algorithms",
    description: "Nestled between towering pillars wrapped in digital vines, Tatsuo creates a garden of bytes and bits. This artwork reflects his journey of self-discovery, a place where nature and technology exist in harmony, celebrating his solace in both the natural and virtual worlds.",
    imageUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/art/vaporwave/snes-vibes/snesvibes6.jpg",
    artistUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/site-assets/artist-portrait.jpg",
    artist: "Tatsuo Nakamura",
    biography: "Born in the heart of Tokyo in 1986, Tatsuo Nakamura was a child of contrasts. Growing up in the bustling Shibuya district, he found solace in the quiet corners of his family's small apartment, where he would draw for hours, escaping the city's relentless rhythm. A gentle soul with a deep affinity for the digital world, Tatsuo became fascinated with the burgeoning culture of video games and the nascent internet, which provided a sanctuary from his struggles with social anxiety and the pressures of conformist society. As a teenager, Tatsuo's introversion deepened, leading him to adopt a hikikomori lifestyle, seldom leaving his room. However, this isolation sparked a transformation. He discovered the therapeutic effects of physical exercise, turning his confined space into a personal gym. Through bodybuilding, he found a new sense of control and confidence, contrasting sharply with his digital escapades. Though Tatsuo remains a recluse, his art serves as his voice, bridging the gap between his inner world and the outside, questioning societal norms while celebrating the beauty of solitude and self-discovery. In his pixelated landscapes, viewers find a digital haven, a place where nostalgia meets the personal narrative, and where every pixel tells a story of retreat, resilience, and rebirth.",
  },

  {
    id: "snesvibes7",
    title: "Pixelated Pagoda",
    description: "A serene digital temple reflects the balance of Tatsuo's dual love for the serenity of Japanese tradition and the promise of the digital future. The calm waters and blooming cherry trees are composed of countless pixels, each a testament to his journey from isolation to inner peace.",
    imageUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/art/vaporwave/snes-vibes/snesvibes7.jpg",
    artistUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/site-assets/artist-portrait.jpg",
    artist: "Tatsuo Nakamura",
    biography: "Born in the heart of Tokyo in 1986, Tatsuo Nakamura was a child of contrasts. Growing up in the bustling Shibuya district, he found solace in the quiet corners of his family's small apartment, where he would draw for hours, escaping the city's relentless rhythm. A gentle soul with a deep affinity for the digital world, Tatsuo became fascinated with the burgeoning culture of video games and the nascent internet, which provided a sanctuary from his struggles with social anxiety and the pressures of conformist society. As a teenager, Tatsuo's introversion deepened, leading him to adopt a hikikomori lifestyle, seldom leaving his room. However, this isolation sparked a transformation. He discovered the therapeutic effects of physical exercise, turning his confined space into a personal gym. Through bodybuilding, he found a new sense of control and confidence, contrasting sharply with his digital escapades. Though Tatsuo remains a recluse, his art serves as his voice, bridging the gap between his inner world and the outside, questioning societal norms while celebrating the beauty of solitude and self-discovery. In his pixelated landscapes, viewers find a digital haven, a place where nostalgia meets the personal narrative, and where every pixel tells a story of retreat, resilience, and rebirth.",
  },

  {
    id: "snesvibes8",
    title: "Synthwave Symposium",
    description: "A gathering of digital denizens under the watchful eyes of classical statues and the pulsating beat of a digital soundtrack. This piece exemplifies Tatsuo's comfort in the crowd of anonymity, finding unity in the shared experience of music and art.",
    imageUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/art/vaporwave/snes-vibes/snesvibes8.jpg",
    artistUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/site-assets/artist-portrait.jpg",
    artist: "Tatsuo Nakamura",
    biography: "Born in the heart of Tokyo in 1986, Tatsuo Nakamura was a child of contrasts. Growing up in the bustling Shibuya district, he found solace in the quiet corners of his family's small apartment, where he would draw for hours, escaping the city's relentless rhythm. A gentle soul with a deep affinity for the digital world, Tatsuo became fascinated with the burgeoning culture of video games and the nascent internet, which provided a sanctuary from his struggles with social anxiety and the pressures of conformist society. As a teenager, Tatsuo's introversion deepened, leading him to adopt a hikikomori lifestyle, seldom leaving his room. However, this isolation sparked a transformation. He discovered the therapeutic effects of physical exercise, turning his confined space into a personal gym. Through bodybuilding, he found a new sense of control and confidence, contrasting sharply with his digital escapades. Though Tatsuo remains a recluse, his art serves as his voice, bridging the gap between his inner world and the outside, questioning societal norms while celebrating the beauty of solitude and self-discovery. In his pixelated landscapes, viewers find a digital haven, a place where nostalgia meets the personal narrative, and where every pixel tells a story of retreat, resilience, and rebirth.",
  },

  {
    id: "snesvibes9",
    title: "Serenade of the Silicon Muse",
    description: "In this grand hall, a digital DJ spins a visual symphony for statues come to life, blending the lines between the chiseled forms of antiquity and the sleek edges of the modern era. It's Tatsuo's homage to the harmonies that connect us across all ages.",
    imageUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/art/vaporwave/snes-vibes/snesvibes9.jpg",
    artistUrl: "https://h7jkfrcfzumlmjhb.public.blob.vercel-storage.com/pwg-blob/site-assets/artist-portrait.jpg",
    artist: "Tatsuo Nakamura",
    biography: "Born in the heart of Tokyo in 1986, Tatsuo Nakamura was a child of contrasts. Growing up in the bustling Shibuya district, he found solace in the quiet corners of his family's small apartment, where he would draw for hours, escaping the city's relentless rhythm. A gentle soul with a deep affinity for the digital world, Tatsuo became fascinated with the burgeoning culture of video games and the nascent internet, which provided a sanctuary from his struggles with social anxiety and the pressures of conformist society. As a teenager, Tatsuo's introversion deepened, leading him to adopt a hikikomori lifestyle, seldom leaving his room. However, this isolation sparked a transformation. He discovered the therapeutic effects of physical exercise, turning his confined space into a personal gym. Through bodybuilding, he found a new sense of control and confidence, contrasting sharply with his digital escapades. Though Tatsuo remains a recluse, his art serves as his voice, bridging the gap between his inner world and the outside, questioning societal norms while celebrating the beauty of solitude and self-discovery. In his pixelated landscapes, viewers find a digital haven, a place where nostalgia meets the personal narrative, and where every pixel tells a story of retreat, resilience, and rebirth.",
  },
];

// Directory where JSON files will be saved. Adjust the path as necessary.
const outputDir = path.join(__dirname, 'artworkDetails');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

artworks.forEach((artwork) => {
  const filename = `${artwork.id}.json`;
  const filepath = path.join(outputDir, filename);
  
  // Convert the artwork object into a JSON string
  const data = JSON.stringify(artwork, null, 2);
  
  // Write the JSON string to a file
  fs.writeFile(filepath, data, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log(`Successfully written ${filename}`);
    }
  });
});
