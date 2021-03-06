export let  Categories = [
  { name: "General Knowledge", id: "9", icone: "graduation" },
  { name: "Books", id: "10", icone: "book-open" },
  { name: "Movies", id: "11", icone: "film" },
  { name: "Music", id: "12", icone: "music-tone-alt" },
  { name: "Theater", id: "13", icone: "puzzle" },
  { name: "Television", id: "14", icone: "social-youtube" },
  { name: "Video Games", id: "15", icone: "game-controller" },
  { name: "Board Games", id: "16", icone: "paper-plane" },
  { name: "Science & Nature", id: "17", icone: "chemistry" },
  { name: "Computers", id: "18", icone: "screen-tablet" },
  { name: "Mathematics", id: "19", icone: "chart" },
  { name: "Mythology", id: "20", icone: "ghost" },
  { name: "Sports", id: "21", icone: "social-dribbble" },
  { name: "Geography", id: "22", icone: "globe-alt" },
  { name: "History", id: "23", icone: "shield" },
  { name: "Politics", id: "24", icone: "people" },
  { name: "Art", id: "25", icone: "magic-wand" },
  { name: "Celebrities", id: "26", icone: "star" },
  { name: "Animals", id: "27", icone: "symbol-male" },
  { name: "Japanese Anime & Manga", id: "31", icone: "rocket" },
  { name: "Vehicles", id: "28", icone: "social-steam" },
  { name: "Comics", id: "29", icone: "social-reddit" },
  { name: "Gadgets", id: "30", icone: "umbrella" },
  { name: "Cartoon", id: "32", icone: "social-github" },
];

export function escapeHtml(text) {
  return text
    .replace(/&amp;/gi, "&")
    .replace(/&gt;/gi, ">")
    .replace(/&lt;/gi, "<")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'");
}